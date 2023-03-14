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
  Pressable,
} from "react-native";
import styles from "./FriendListStyle";
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
import colors from "../../themes/Colors";
import { NoDataFound } from "../../components/NoDataFound";
class FollowingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followerData: [],
      friendListData: [],
      blockList: [],
      followingsData: [],
      loading: false,
      pendingRequestData: [],
      modelvisible: false,
      refreshing: false,
      userId: "",
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getFollowing();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  getFollowing = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        this.setState({ userId: userID });
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            let url = URLConstants.GET_USER_FOLLOWING + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                console.log(response.data.data, "=====before");
                response.data.data.forEach((element) => {
                  element.isCheck = false;
                });
                console.log(response.data.data, "=====after");

                this.setState({
                  followingsData: response.data.data,
                });
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

  ListEmpty = () => {
    return <NoDataFound />;
  };

  sendRequest = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              friendId: item._id,
            };
            console.log(dataToSend, URLConstants.ADD_FRIEND);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.ADD_FRIEND,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "add Friends======");
                this.getFollowing();
                // this.setState({ blockList: response.data.data });
                this.setState({ loading: false });
              })
              .catch((error) => {
                // handle error
                this.setState({ loading: false });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  cancelRequest = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              friendId: item._id,
              type: "cancel",
            };
            console.log(dataToSend, URLConstants.CANCEL_REQUEST);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.CANCEL_REQUEST,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "cancel request======");
                this.getFollowing();
                // this.setState({ blockList: response.data.data });
                this.setState({ loading: false });
              })
              .catch((error) => {
                // handle error
                this.setState({ loading: false });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  unFollowUser = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              followingId: item._id,
            };
            console.log(dataToSend, URLConstants.USER_UNFOLLOW);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.USER_UNFOLLOW,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "unFollowUser======");
                this.getFollowing();
                this.getFollower();
                // this.setState({ blockList: response.data.data });
                this.setState({ loading: false });
              })
              .catch((error) => {
                // handle error
                this.setState({ loading: false });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  followUser = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              followingId: item._id,
            };
            console.log(dataToSend, URLConstants.USER_FOLLOW);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.USER_FOLLOW,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "followUser======");
                this.getFollower();
                // this.setState({ blockList: response.data.data });
                this.setState({ loading: false });
              })
              .catch((error) => {
                // handle error
                this.setState({ loading: false });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  renderitemsFollowing = (item) => {
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
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
              </TouchableOpacity>
              <View style={{ alignSelf: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("OtherUserProfile", {
                      data: item,
                    })
                  }
                >
                  <CustomText
                    style={styles.namestyle}
                    numberOfLines={1}
                    item={`${item.firstName} ${item.lastName}`}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => this.unFollowUser(item)}>
                    <CustomText style={styles.textstyle} item={"Unfollow"} />
                  </TouchableOpacity>
                  {item.friendRequest == "Accepted" ? null : (
                    <>
                      <View style={styles.verticleLine}></View>
                      {item.friendRequest == "Not Sent" ? (
                        <TouchableOpacity
                          onPress={() => this.sendRequest(item)}
                        >
                          <CustomText
                            style={styles.textstyle2}
                            numberOfLines={1}
                            item={"Send Close Friend Request"}
                          />
                        </TouchableOpacity>
                      ) : item.friendRequest == "Pending" &&
                        item.sentBy == this.state.userId ? (
                        <TouchableOpacity
                          onPress={() => this.cancelRequest(item)}
                        >
                          <CustomText
                            style={styles.textstyle}
                            item={"Cancel Request"}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("FriendsList", {
                              friendType: "Close Friends",
                            })
                          }
                        >
                          <CustomText
                            style={styles.textstyle}
                            item={"Awaiting response..."}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              // alignSelf: "flex-start",
              alignItems: "flex-end",
            }}
          >
            {console.log(item.isCheck, "=================")}
            {this.state.modelvisible && item.isCheck
              ? this.blockModel(item)
              : null}
            <TouchableOpacity onPress={() => this.showBlockModel(item)} style={{width:scale(20), height:verticalScale(40)}}>
              <More style={styles.More} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  blockModel = (item) => {
    return (
      <View
        style={{
          position: "absolute",
          zIndex: 999,
          justifyContent: "flex-end",
          top: 8,
          right: 15,
          borderWidth: 0.4,
          borderColor: colors.borderColor,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Pressable
          style={{
            width: scale(70),
            height: scale(40),
            justifyContent: "center",
            backgroundColor: "white",
          }}
          onPress={() => this.blockUser(item)}
        >
          <CustomText style={styles.textstyle1} item={"Block"} />
        </Pressable>
        <Pressable
          style={{
            width: scale(70),
            height: scale(40),
            justifyContent: "center",
            backgroundColor: "white",
          }}
          onPress={() => this.setState({ modelvisible: false })}
        >
          <CustomText style={styles.textstyle1} item={"Cancel"} />
        </Pressable>
      </View>
    );
  };

  blockUser = (item) => {
    Alert.alert(
      "Alert",
      `Are you sure you want to block ${item.firstName} ${item.lastName}?`,
      [
        {
          text: "No",
          onPress: () => {
            item.isCheck = false;
            this.setState({ modelvisible: false });
          },
          style: "Cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            AsyncStorage.getItem("USER_ID").then((userID) => {
              AsyncStorage.getItem("USER_TOKEN").then((value) => {
                NetInfo.fetch().then((state) => {
                  item.isCheck = false;
                  this.setState({ modelvisible: false });
                  if (state.isConnected) {
                    var dataToSend = {
                      userId: userID,
                      blockingUserId: item._id,
                    };
                    console.log(dataToSend, URLConstants.USER_BLOCK);
                    this.setState({ loading: true });
                    axios({
                      method: "post",
                      url: URLConstants.USER_BLOCK,
                      data: dataToSend,
                      headers: {
                        Token: value,
                      },
                    })
                      .then((response) => {
                        // handle success
                        console.log(response.data, "blockUser======");
                        this.getFollowing();
                        // this.setState({ blockList: response.data.data });
                        this.setState({ loading: false });
                      })
                      .catch((error) => {
                        // handle error
                        this.setState({ loading: false });
                        console.log(error.response.data);
                        alert(error.response.data.message);
                      });
                  } else {
                    // Ideally load from local storage
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

  showBlockModel = (item) => {
    console.log(item, this.state.modelvisible, "===========showBlockModel");
    // var copydata = [...this.state.followingsData, item];
 var copydata = [...this.state.followingsData];

     copydata.forEach((e) => {
       console.log(e, "=========");
        if (e._id == item._id) {
          e.isCheck = true;
        } else {
          e.isCheck = false;
        }
     });

    this.setState({
      modelvisible: true,
      followingsData: copydata,
    });
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

  handleRefresh = () => {
    this.getFollowing();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.Container}>
          <CustomText
            item={this.props.route.params.friendType}
            style={styles.titlestyle}
          />
          <Loader loading={this.state.loading} />
          <FlatList
            data={this.state.followingsData}
            renderItem={({ item, index }) => this.renderitemsFollowing(item)}
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              this.state.followingsData.length == 0 ? this.ListEmpty : null
            }
            ListFooterComponent={this.footerCOMP}
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}

            //   ListEmptyComponent={this.headerCompy}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default FollowingList;
