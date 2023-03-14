/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import styles from "./ChatStyles";
import scale, { verticalScale } from "../../../themes/Metrics";
import { CustomText } from "../../../components/CustomText";
import colors from "../../../themes/Colors";
import SearchIcon from "../../../images/svg/timeline/search.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLConstants } from "../../../utils/URLConstants";
import Loader from "../../../components/Loader";
import Moment from "moment";
import io from "socket.io-client";
import { NoDataFound } from "../../../components/NoDataFound";
import images from "../../../themes/Images";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
      loading: false,
      limit: 20,
      page: 1,
      searchTxt: "",
      loaderMoredata: true,
      refreshing: false,
      spinner: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.setState({ friendData: [], page: 1, searchTxt: "" });
      this.friendList();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  onServerSentEvent(data) {
    const socket = io(URLConstants.SOCKET_URL);
    socket.on("connect", function () {
      console.log("connection done ==== chat");
      // socket.emit("user_connection===chat", data);
      // console.log("tapped called", socket,data)
    });
  }

  listTapped = (item) => {
    // console.log("jhdhjbfhjfb", item.friend.firstName)
    // if (!item?.friend?.deleted) {
      AsyncStorage.getItem("USER_ID").then((value) => {
        const socketData = {
          userId: value,
          friendId: item.friend._id,
        };

        this.onServerSentEvent(socketData);
        this.props.navigation.navigate("ChatDetails", {
          name: item.friend.firstName + " " + item.friend.lastName,
          imageName: item.friend.profilePic,
          userId: value,
          friendId: item.friend._id,
          isBlock: item.block,
          isDeleted:item?.friend?.deleted

        });
      });
    // }
  };

  getTimeData = (data) => {
    // var data =   "2021-09-07T15:54:10.285Z"
    var today = Moment();
    var yesterday = Moment().subtract(1, "day");
    var engagementDate = data;
    Moment.locale("en");
    if (Moment(engagementDate).isSame(today, "day")) {
      return Moment(data).format("hh:mm a");
    } else if (Moment(engagementDate).isSame(yesterday, "day")) {
      return "yesterday";
    } else {
      return Moment(data).format("DD/MM/YY");
    }
  };

  friendList = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        this.setState({ spinner: true });
        var dataToSend = {
          userId: userID,
          limit: this.state.limit,
          page: this.state.page,
          search_query: this.state.searchTxt,
        };
        console.log(
          dataToSend,
          URLConstants.GET_BY_ALL_FRIEND__CHAT,
          "========url"
        );
        axios({
          method: "post",
          url: URLConstants.GET_BY_ALL_FRIEND__CHAT,
          data: dataToSend,
          headers: {
            Token: value,
          },
        })
          .then((response) => {
            console.log(
              "finsl data=======================",
              response.data.data
            );
            response.data.data.length <= this.state.limit - 1
              ? this.setState({ loaderMoredata: false })
              : this.setState({ loaderMoredata: true });
            this.setState({
              refreshing: false,
              loading: false,
              spinner: false,
              friendData:
                this.state.page === 1
                  ? response.data.data
                  : [...this.state.friendData, ...response.data.data],
            });
          })
          .catch((error) => {
            console.log(error.response, "==============response====");
            this.setState({
              loading: false,
              spinner: false,
              refreshing: false,
            });
            if (error.response.status == 401) {
              AsyncStorage.clear().then(() => {
                this.props.navigation.reset({
                  index: 0,
                  routes: [{ name: "AuthNavigator" }],
                });
              });
              alert("Your session has been expired");
            } else if (
              error.response.status == 400 ||
              error.response.status == 404
            ) {
              this.setState({
                spinner: false,
                refreshing: false,
                loading: false,
              });
              alert(error.response.data.message);
            } else {
              this.setState({
                spinner: false,
                refreshing: false,
                loading: false,
              });
              alert("Something went worng");
            }
          });
      });
    });
  };

  handleLoadMore = async () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.friendList();
      }
    );
  };

  endEditing = () => {
    this.setState({ page: 1, friendList: [], loading: true }, () => {
      this.friendList();
    });
  };

  renderFooter = () => {
    return (
      <View style={{ marginBottom: verticalScale(20) }}>
        {this.state.spinner ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
  };

  rendersearchbar = () => {
    return (
      <View style={styles.serarchMainContainer}>
        <View style={styles.searchcontainer}>
          <Loader loading={this.state.loading} />
          <TextInput
            autoCorrect={false}
            placeholder={"Search"}
            placeholderTextColor={colors.textblack_555555}
            style={styles.inputstyle}
            underlineColorAndroid="transparent"
            value={this.state.searchTxt}
            onChangeText={(text) => this.setState({ searchTxt: text })}
            returnKeyLabel="Search"
            returnKeyType="search"
            onEndEditing={() => this.endEditing()}
          />
          <SearchIcon style={styles.searchicon} />
        </View>
        {/* <CustomButton title={"Invite"}  buttonStyles={styles.buttonStylesInvite}/> */}
      </View>
    );
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  chatcard = (item) => {
    console.log("item-->", item);
    return (
      <TouchableOpacity
        onPress={() => this.listTapped(item)}
        style={styles.chatContainer}
      >
        <View style={{ flexDirection: "row" }}>
          {!item?.friend?.deleted ? (
            <Image
              style={styles.profileImages}
              source={{
                uri: `${URLConstants.PROFILE_IMAGE_URL}${item.friend.profilePic}`,
              }}
            />
          ) : (
            <Image style={styles.profileImages} source={images.blankProfile} />
          )}
          <View style={styles.chatTextContainer}>
            <View style={styles.chatNameContainer}>
              <View style={{ width: scale(180) }}>
                {!item?.friend.deleted ? (
                  <CustomText
                    numberOfLines={1}
                    item={item.friend.firstName + " " + item.friend.lastName}
                    style={styles.titlestyles}
                  />
                ) : (
                  <CustomText
                    item={"Anonymous"}
                    style={styles.titlestyles}
                  />
                )}
              </View>
              {item.lastMessage === undefined ? (
                <CustomText item={""} style={styles.time} />
              ) : (
                <CustomText
                  item={this.getTimeData(item.lastMessage.createdAt)}
                  style={styles.time}
                />
              )}
            </View>
            {item.lastMessage === undefined ? (
              <CustomText style={styles.chatitem} item={""} />
            ) : (
              <CustomText
                numberOfLines={2}
                style={styles.chatitem}
                item={item.lastMessage.message}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  handleRefresh = () => {
    this.setState({ refreshing: false, page: 1 }, () => {
      this.friendList();
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View>
          <FlatList
            data={this.state.friendData}
            renderItem={({ item }) => this.chatcard(item)}
            indicatorStyle={"white"}
            ListHeaderComponent={this.rendersearchbar()}
            showsVerticalScrollIndicator={true}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={
              this.state.loaderMoredata && !this.state.loading
                ? this.handleLoadMore
                : null
            }
            onEndReachedThreshold={0.3}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={
              this.state.friendData.length == 0 ? this.ListEmpty : null
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Chat;
