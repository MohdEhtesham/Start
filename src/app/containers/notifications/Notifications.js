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
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "./NotificationsStyle";
import { CustomText } from "../../components/CustomText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Star from "../../images/svg/notification/star.svg";
import Time from "../../images/svg/notification/time.svg";
import Accepted from "../../images/svg/notification/accepted.svg";
import Commented from "../../images/svg/notification/commented.svg";
import Like from "../../images/svg/notification/like.svg";
import NewRequest from "../../images/svg/notification/new request.svg";
import Trophy from "../../images/svg/notification/trophy.svg";
import Video from "../../images/svg/notification/video.svg";
import { getFontScale } from "react-native-device-info";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../utils/Strings";
import moment from "moment";
import scale, { verticalScale } from "../../themes/Metrics";
import HTML from "react-native-render-html";
import colors from "../../themes/Colors";
import images from "../../themes/Images";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: "",
      RefreshFlatList: false,
      notificationdata: [],
      loading: false,
      refreshing: false,
      perpage: 1,
      loadmoredata: true,
    };
  }

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.getAllNotification();
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        perpage: this.state.perpage + 1,
      },
      () => this.getAllNotification()
    );
  };

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getAllNotification();
    });
  }

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem("NOTIFICATION_RECIVE");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  getAllNotification = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              page: this.state.perpage,
              limit: "20",
            };
            console.log(dataToSend, URLConstants.NOTIFICATION_BY_USER);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.NOTIFICATION_BY_USER,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                response.data.data == 0
                  ? 
                  setTimeout(() => {
                    this.setState({ loadmoredata: false })
                  }, 1000)
                  : this.setState({ loadmoredata: true });
                this.setState({
                  notificationdata:
                    this.state.perpage === 1
                      ? response.data.data
                      : [...this.state.notificationdata, ...response.data.data],
                });
                this.removeValue();
                this.setState({ loading: false, refreshing: false });
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
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  navigateTo = (item) => {
    console.log("item", item);
    const { navigation } = this.props;
    if (item.type !== null && item.type !== undefined) {
      if (
        item.type === "frnd_new_req" ||
        item.type === "frnd_req_acpt" ||
        item.type === "frnd_req_rej"
      ) {
        this.props.navigation.navigate("FriendsList", {
          friendType: "Close Friends",
        });
      } else if (
        item.payload !== undefined &&
        (item.type === "dbt_like" ||
          item.type === "dbt_comment" ||
          item.type === "dbt_share")
      ) {
        this.props.navigation.navigate("SharedDebates", {
          debateid: item.payload.debateId,
        });
      } else if (
        item.type === "dbt_won" ||
        item.type === "dbt_lost" ||
        item.type === "rank_top"
      ) {
        this.props.navigation.navigate("Ranking");
      } else if (item.type === "chat_new_msg") {
        navigation.navigate("Chat");
      } else if (
        item.payload !== undefined &&
        (item.type === "dbt_start" || item.type === "dbt_invite")
      ) {
        this.props.navigation.navigate("VideoRoomScreen", {
          isJoinedScreen: true,
          janusURL: "ws://3.133.56.152/wss",
          roomId: "",
          username:
            item.payload.username + Math.floor(1000 + Math.random() * 9000),
          isParticipant: true,
          userCategory: item.payload.categories !==undefined && item.payload.categories,
          creatorId: item.user,
          debateId: "",
          fullName: item.payload.firstName + " " + item.payload.lastName,
          profilePic: item.payload.profilePic,
        });
      } else {
      }
    } else {
    }
  };

  notificationcard = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          
          this.navigateTo(item);
        }}
      >
        <View style={styles.notificationContainer}>
          <View style={{ flexDirection: "row" }}>
            {item.type === "dbt_start" && (
              <Video style={styles.profileImages} />
            )}
            {item.type === "dbt_comment" && (
              <Commented style={styles.profileImages} />
            )}
            {item.type === "dbt_like" && <Like style={styles.profileImages} />}
            {item.type === "dbt_invite" && (
              <Video style={styles.profileImages} />
            )}
            {item.type === "frnd_new_req" && (
              <NewRequest style={styles.profileImages} />
            )}
            {item.type === "frnd_req_acpt" && (
              <Accepted style={styles.profileImages} />
            )}
            {item.type === "frnd_req_rej" && (
              <Image
                source={images.frnd_req_rejected}
                style={styles.profileImages}
              />
            )}
            {item.type === "chat_new_msg" && (
              <Image source={images.chat} style={styles.profileImages} />
            )}
            {item.type === "dbt_lost" && (
              <Image source={images.debate_lost} style={styles.profileImages} />
            )}
            {item.type === "dbt_won" && <Trophy style={styles.profileImages} />}
            {item.type === "dbt_share" && (
              <Video style={styles.profileImages} />
            )}
            {item.type === "rank_top" && <Star style={styles.profileImages} />}
            {item.type === "custom" && (
              <Image
                source={images.notification}
                style={styles.profileImages}
              />
            )}
            <View style={styles.notificationTextContainer}>
              <View
                style={{
                  flexDirection: "row",
                  width: scale(250),
                }}
              >
                {/* <CustomText item={item.body} style={styles.notificationitem} /> */}
                <HTML source={{ html: item.body }} contentWidth={scale(100)} />
              </View>
              <View
                style={{ flexDirection: "row", marginTop: verticalScale(5) }}
              >
                <Time style={styles.timeImages} />
                <CustomText
                  item={moment(item.createdAt).fromNow()}
                  style={styles.time}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
  };

  render() {
    //const windowSize = this.state.notificationdata.length > 30 ?  this.state.notificationdata.length / 4 : 21;
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <View style={styles.Container}>
            {/* <Loader loading={this.state.loading} /> */}
            <FlatList
              data={this.state.notificationdata}
              renderItem={({ item, index }) => this.notificationcard(item)}
              // initialNumToRender={20}
              // maxToRenderPerBatch={windowSize}
              // windowSize={windowSize}
              indicatorStyle={"white"}
              showsVerticalScrollIndicator={true}
              ListHeaderComponent={() => (
                <CustomText item={"Notifications"} style={styles.titlestyle} />
              )}
              refreshing={this.state.refreshing}
              keyExtractor={(item, index) => item.key}
              onRefresh={this.handleRefresh}
              onEndReachedThreshold={0.1}
              onEndReached={
                this.state.loadmoredata ? this.handleLoadMore : null
              }
              //indicatorStyle={"white"}
              extraData={this.state.RefreshFlatList}
              ListFooterComponent={this.renderFooter}
              ItemSeparatorComponent={(item) => (
                <View style={styles.sepration}></View>
              )}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default Notifications;
