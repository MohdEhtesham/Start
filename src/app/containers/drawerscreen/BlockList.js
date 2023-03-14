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
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import styles from "./FriendListStyle";
import colors from "../../themes/Colors";
import { CustomText } from "../../components/CustomText";
import scale, { verticalScale } from "../../themes/Metrics";
import More from "../../images/svg/my-profile/more.svg";
import images from "../../themes/Images";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import Loader from "../../components/Loader";
import { NoDataFound } from "../../components/NoDataFound";
class BlockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followerData: [],
      friendListData: [],
      blockList: [],
      followingsData: [],
      loading: false,
      pendingRequestData: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getBlocklist();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  unBlockUser = (item) => {
    Alert.alert(
      "Alert",
      `Are you sure you want to UnBlock ${item.firstName} ${item.lastName}?`,
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            AsyncStorage.getItem("USER_ID").then((userID) => {
              AsyncStorage.getItem("USER_TOKEN").then((value) => {
                NetInfo.fetch().then((state) => {
                  if (state.isConnected) {
                    var dataToSend = {
                      userId: userID,
                      unBlockingUserId: item._id,
                    };
                    console.log(dataToSend, URLConstants.USER_UNBLOCK);
                    this.setState({ loading: true });
                    axios({
                      method: "post",
                      url: URLConstants.USER_UNBLOCK,
                      data: dataToSend,
                      headers: {
                        Token: value,
                      },
                    })
                      .then((response) => {
                        // handle success
                        console.log(response.data, "unBlockUser======");
                        this.getBlocklist();
                        // this.setState({ blockList: response.data.data });
                        this.setState({ loading: false });
                      })
                      .catch((error) => {
                        // handle error
                        this.setState({ loading: false, refreshing: false });
                        console.log(error.response.data);
                        alert(error.response.data.message);
                      })
                      .catch((error) => {
                        console.log(
                          error.response,
                          "==============response===="
                        );
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
                    this.setState({ loading: false, refreshing: false });
                    alert(strings.Please_check_Internet);
                  }
                });
              });
            }),
        },
      ],
      { cancelable: false }
    );
  };

  getBlocklist = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
            };
            console.log(dataToSend, URLConstants.GET_ALLBLOCK_BY_USER);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.GET_ALLBLOCK_BY_USER,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "getBlocklist======");
                this.setState({ blockList: response.data.data });
                this.setState({ loading: false, refreshing: false });
              })
              .catch((error) => {
                // handle error
                this.setState({ loading: false, refreshing: false });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            this.setState({ loading: false, refreshing: false });
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  renderitemsblockList = (item) => {
    return (
      <View style={styles.cardConatiner}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            marginLeft: scale(15),
            marginRight: scale(5),
          }}
        >
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() =>
                this.props.navigation.navigate("OtherUserProfile", {
                  data: item,
                })
              }
            >
              {!item.profilePic == "" ? (
                <DefaultProfileImage
                  uri={`${URLConstants.PROFILE_IMAGE_URL}${item.profilePic}`}
                  style={styles.imagesstyle}
                />
              ) : (
                <Image
                  style={styles.imagesstyle}
                  source={images.blankProfile}
                />
              )}
              <View style={{ alignSelf: "center" }}>
                <CustomText
                  style={styles.namestyle}
                  numberOfLines={1}
                  item={`${item.firstName} ${item.lastName}`}
                />
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => this.unBlockUser(item)}>
                    <CustomText style={styles.textstyle} item={"UnBlock"} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  footerCOMP = () => {
    return <View style={{ marginTop: verticalScale(150) }}></View>;
  };

  headerCompy = () => {
    return (
      <CustomText
        item={this.props.route.params.friendType}
        style={styles.titlestyle}
      />
    );
  };

  headerCompyPending = () => {
    return <CustomText item={"Friend Request"} style={styles.titlestyle} />;
  };

  handleRefresh = () => {
    this.getBlocklist();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.Container}>
          <Loader loading={this.state.loading} />
          <CustomText
            item={this.props.route.params.friendType}
            style={styles.titlestyle}
          />
          <FlatList
            data={this.state.blockList}
            renderItem={({ item, index }) => this.renderitemsblockList(item)}
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
            ListFooterComponent={this.footerCOMP}
            ListEmptyComponent={
              this.state.blockList.length == 0 ? this.ListEmpty : null
            }
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default BlockList;
