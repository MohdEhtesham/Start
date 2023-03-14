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
  Pressable,
  SafeAreaView,
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
import { Strings as strings } from "../../utils/Strings";
import colors from "../../themes/Colors";
import { NoDataFound } from "../../components/NoDataFound";

class FriendsList extends Component {
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
      modelvisiblepending: false,
      refreshing: true,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getFriendsList();
      this.getpendingRequest();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  getFriendsList = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            let url = URLConstants.USER_BY_FRIEND_LIST + `?userId=${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data.data, "==============response");
                console.log(response.data, "getFriendsList==============");
                response.data.data.forEach((element) => {
                  element.isCheck = false;
                });
                this.setState({ friendListData: response.data.data });
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

  getpendingRequest = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            let url = URLConstants.GET_PENFING_REQUEST + `?userId=${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data.data, "==============response");
                console.log(response.data, "getpendingRequest==============");
                response.data.data.forEach((element) => {
                  element.isCheck = false;
                });
                this.setState({ pendingRequestData: response.data.data });
                this.setState({ loading: false, refreshing: false });
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

  ListPendingEmpty = () => {
    return <NoDataFound />;
  };

  cancelRequest = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              friendId: item.friend._id,
              type: "reject",
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
                console.log(response.data, "CancelRequest======");
                this.getFriendsList();
                this.getpendingRequest();
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

  acceptRequest = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              friendId: item.friend._id,
            };
            console.log(dataToSend, URLConstants.ACCEPT_FRIEND);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.ACCEPT_FRIEND,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "ACCEPT_FRIEND======");
                this.getFriendsList();
                this.getpendingRequest();
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

  deleteUnfriend = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              friendId: item.friend._id,
            };
            console.log(dataToSend, URLConstants.UNFRINED_DELETE);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.UNFRINED_DELETE,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data, "deleteUnfriend======");
                this.getFriendsList();
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

  renderpendingRequest = (item) => {
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
                    data: item.friend,
                  })
                }
              >
                {!item.friend.profilePic == "" ? (
                  <DefaultProfileImage
                    uri={`${URLConstants.PROFILE_IMAGE_URL}${item.friend.profilePic}`}
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
                      data: item.friend,
                    })
                  }
                >
                  <CustomText
                    style={styles.namestyle}
                    numberOfLines={1}
                    item={`${item.friend.firstName} ${item.friend.lastName}`}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => this.acceptRequest(item)}>
                    <CustomText style={styles.textstyle} item={"Accept"} />
                  </TouchableOpacity>
                  <View style={styles.verticleLine}></View>
                  <TouchableOpacity onPress={() => this.cancelRequest(item)}>
                    <CustomText style={styles.textstyle} item={"Reject"} />
                  </TouchableOpacity>
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
            {this.state.modelvisiblepending && item.isCheck
              ? this.blockModel(item)
              : null}
            <TouchableOpacity
              onPress={() => this.showBlockModel(item)}
              style={{ width: scale(20), height: verticalScale(40) }}
            >
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
          onPress={() =>
            this.setState({ modelvisible: false, modelvisiblepending: false })
          }
        >
          <CustomText style={styles.textstyle1} item={"Cancel"} />
        </Pressable>
      </View>
    );
  };

  blockUser = (item) => {
    Alert.alert(
      "Alert",
      `Are you sure you want to block ${item.friend.firstName} ${item.friend.lastName}?`,
      [
        {
          text: "No",
          onPress: () => {
            item.isCheck = false;
            this.setState({ modelvisible: false , modelvisiblepending:false});
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            AsyncStorage.getItem("USER_ID").then((userID) => {
              AsyncStorage.getItem("USER_TOKEN").then((value) => {
                NetInfo.fetch().then((state) => {
                  item.isCheck = false;
                  this.setState({
                    modelvisible: false,
                    modelvisiblepending: false,
                  });
                  if (state.isConnected) {
                    var dataToSend = {
                      userId: userID,
                      blockingUserId: item.friend._id,
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
                        this.getFriendsList();
                        this.getpendingRequest();
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
    // console.log(item, this.state.modelvisible, "===========showBlockModel");
    var copydatapendingRequestData = [...this.state.pendingRequestData];
    copydatapendingRequestData.forEach((e) => {
      console.log(e, "jjjj", item, "=========");
      if (e.friend._id == item.friend._id) {
        e.isCheck = true;
      } else {
        e.isCheck = false;
      }
    });
    this.setState({
      modelvisiblepending: !this.state.modelvisiblepending,
      pendingRequestData: copydatapendingRequestData,
    });
  };

  showBlockModelfriendList = (item) => {
    console.log(item, this.state.modelvisible, "===========showBlockModel");
    var copydata = [...this.state.friendListData];
    copydata.forEach((e) => {
      console.log(e, "=========");
      if (e.friend._id == item.friend._id) {
        e.isCheck = true;
      } else {
        e.isCheck = false;
      }
    });
    this.setState({
      modelvisible: !this.state.modelvisible,
      friendListData: copydata,
    });
  };

  renderitemsfriendListData = (item) => {
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
              {!item.friend.profilePic == "" ? (
                <DefaultProfileImage
                  uri={`${URLConstants.PROFILE_IMAGE_URL}${item.friend.profilePic}`}
                  style={styles.imagesstyle}
                />
              ) : (
                <Image
                  style={styles.imagesstyle}
                  source={images.blankProfile}
                />
              )}
              <View style={{ alignSelf: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("OtherUserProfile", {
                      data: item.friend,
                    })
                  }
                >
                  <CustomText
                    style={styles.namestyle}
                    numberOfLines={1}
                    item={`${item.friend.firstName} ${item.friend.lastName}`}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => this.deleteUnfriend(item)}>
                    <CustomText
                      style={styles.textstyle3}
                      numberOfLines={1}
                      item={"Remove As Close Friend"}
                    />
                  </TouchableOpacity>
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
            {/* {console.log(item.isCheck, "=================")} */}
            {this.state.modelvisible && item.isCheck
              ? this.blockModel(item)
              : null}
            <TouchableOpacity
              onPress={() => this.showBlockModelfriendList(item)}
              style={{ width: scale(20), height: verticalScale(40) }}
            >
              <More style={styles.More} />
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
    this.getFriendsList();
    this.getpendingRequest();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.Container}>
          <Loader loading={this.state.loading} />
          <CustomText item={"Friend Request"} style={styles.titlestyle} />
          <FlatList
            data={this.state.pendingRequestData}
            renderItem={({ item, index }) => this.renderpendingRequest(item)}
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              this.state.pendingRequestData.length == 0
                ? this.ListPendingEmpty
                : null
            }
            // ListFooterComponent={this.footerCOMP}
            // ListEmptyComponent={this.headerCompyPending}
          />
          <CustomText
            item={this.props.route.params.friendType}
            style={styles.titlestyle}
          />
          <FlatList
            data={this.state.friendListData}
            renderItem={({ item, index }) =>
              this.renderitemsfriendListData(item)
            }
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              this.state.friendListData.length == 0 ? this.ListEmpty : null
            }
            ListFooterComponent={this.footerCOMP}
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
            // ListEmptyComponent={this.headerCompy}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default FriendsList;
