import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./MyProfileStyle";
import Edit from "../../images/svg/my-profile/edit.svg";
import ProfileRank from "../../images/svg/my-profile/profileRank.svg";
import { verticalScale } from "../../themes/Metrics";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader";
import images from "../../themes/Images";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import DebatesCard from "../../components/DebatesCard";

// import scale, { verticalScale } from "../../../themes/Metrics";
// import R from '../../R';
import Moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../utils/Strings";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import { NoDataFound } from "../../components/NoDataFound";
import { getFontScale } from "react-native-device-info";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profiledata: "",
      tabActive: "ADDITIONAL",
      userDebates: "",
      followerData: [],
      friendListData: [],
      blockList: [],
      followingsData: [],
      refreshing: false,
      hasMoreToLoad: true,
      perpage: 1,
      spinner: false,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getMyProfile();
      this.getFollowing();
      this.getDebatesByUser();
      this.getFollower();
      this.getFriendsList();
      this.getBlocklist();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  getFollowing = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            //this.setState({ loading: true });
            let url = URLConstants.GET_USER_FOLLOWING + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data.data, "==============response");
                console.log(response.data.data, "getFollowing==============");
                this.setState({
                  followingsData: response.data.data,
                });
                this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
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
            //this.setState({ loading: true });
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
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  getFriendsList = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            //this.setState({ loading: true });
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
                this.setState({ friendListData: response.data.data });
                this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  getFollower = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            //this.setState({ loading: true });
            let url = URLConstants.GET_FOLLOWER_BY_ID + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data.data, "==============response");
                console.log(response.data, "getFollower==============");
                this.setState({ followerData: response.data.data });
                this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  getMyProfile = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            //this.setState({ loading: true });
            let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                console.log(response.data, "==============");
                AsyncStorage.setItem(
                  "USER_PROFILE",
                  response.data.data.profilePic
                );
                AsyncStorage.setItem("USER_EMAIL", response.data.data.email);
                this.setState({ profiledata: response.data.data });
                console.log(
                  this.state.profiledata,
                  "==============getMyProfile"
                );
                this.setState({ loading: false });
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

  getDebatesByUser = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              page: this.state.perpage,
              limit: 10,
              userId: userID,
              currentUserId: userID,
            };
            this.setState({ spinner: true });
            let url = URLConstants.GET_DEBATES_BYUSER;
            console.log(url, dataToSend, "==url==============getDebatesByUser");
            axios({
              method: "post",
              url: url,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                console.log(response, "getDebatesByUser==============response");
                // console.log(response.data, "==============");
                response.data.data.length <= 9
                  ? this.setState({ hasMoreToLoad: false })
                  : this.setState({ hasMoreToLoad: true });

                console.log(
                  response.data.data,
                  "=================allUser========"
                );
                this.setState({
                  userDebates:
                    this.state.perpage === 1
                      ? response.data.data
                      : [...this.state.userDebates, ...response.data.data],
                  refreshing: false,
                  spinner: false,
                  loading: false,
                });
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
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

 
  renderCardData = (item) => {
    // console.log(item, "=====");
    return (
      <View style={styles.cardConatiner}>
        {/* {this.state.cat_array_Id.map((data) => {
          return (
            <View>
              {data === item._id ? (
                <CheckIcon style={styles.checkIocn} />
              ) : (
                <View />
              )}
            </View>
          );
        })} */}
        {item.category && item.category.image ? (
          <>
            <DefaultProfileImage
              uri={`${URLConstants.IMAGE_URL}${item.category.image}`}
              style={styles.imagesstyle}
            />
            <CustomText
              item={item.category.name}
              style={styles.categoryTitle}
            />
          </>
        ) : null}
      </View>
    );
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  likeCallBack = (item) => {
    let localdata = this.state.userDebates;
    localdata.forEach((element) => {
      if (item.isLiked == false) {
        if (element._id == item._id) {
          element.likes += 1;
          element.isLiked = true;
        }
      } else {
        if (element._id == item._id) {
          element.likes -= 1;
          element.isLiked = false;
        }
      }
    });
    this.setState({ userDebates: localdata });
    this.getDebatesByUser();
  };

  voteCallBack = (item) => {
    let localdata = this.state.userDebates;
    localdata.forEach((element) => {
      if (item.item.isVoted == false) {
        if (element._id == item.item._id) {
          if (item.typeofvoter == "creator") {
            element.isVoted = true;
            element.votedTo = item.item.creator._id;
            element.creatorVote += 1;
          } else {
            element.isVoted = true;
            element.votedTo = item.item.joiner._id;
            element.joinerVote += 1;
          }
        }
      } else {
        if (element._id == item.item._id) {
          if (item.typeofvoter == "creator") {
            element.isVoted = true;
            element.votedTo = item.item.creator._id;
            element.creatorVote += 1;
            element.joinerVote -= 1;
          } else {
            element.isVoted = true;
            element.votedTo = item.item.joiner._id;
            element.joinerVote += 1;
            element.creatorVote -= 1;
          }
        }
      }
    });
    this.setState({ userDebates: localdata });
    this.getDebatesByUser();
  };

  handleLoadMore = () => {
    console.log(this.state.perpage, "=============");
    this.setState(
      {
        perpage: this.state.perpage + 1,
      },
      () => {
        this.getDebatesByUser();
      }
    );
  };

  flatlistheader = () => {
    return (
      <>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 999,
              justifyContent: "flex-end",
              top: 9,
              right: 14,
            }}
            onPress={() =>
              this.props.navigation.navigate("EditProfile", {
                profiledata: this.state.profiledata,
              })
            }
          >
            <Edit />
          </TouchableOpacity>
          {this.state.profiledata.profilePic == "" ? (
            <Image style={styles.image} source={images.blankProfile} />
          ) : (
            <DefaultProfileImage
              style={styles.image}
              uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.profiledata.profilePic}`}
            />
          )}
        </View>
        {this.state.profiledata.rank == "0" ? (
          <View></View>
        ) : (
          <View
            style={{
              zIndex: 9999,
              position: "absolute",
              alignSelf: "flex-end",
              marginTop: verticalScale(200),
              right: 20,
              justifyContent: "center",
            }}
          >
            <ProfileRank></ProfileRank>
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                position: "absolute",
                zIndex: 9999,
                paddingTop: verticalScale(10),
              }}
            >
              <CustomText item={`Rank`} style={styles.ranktext} />
              <CustomText
                item={
                  this.state.profiledata.rank == ""
                    ? " "
                    : this.state.profiledata.rank
                }
                style={styles.rankNumber}
              />
            </View>
          </View>
        )}
        <View style={styles.numberConatiner}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <CustomText
                item={`${this.state.profiledata.firstName
                    ? this.state.profiledata.firstName
                    : ""
                  } ${this.state.profiledata.lastName
                    ? this.state.profiledata.lastName
                    : ""
                  }`}
                numberOfLines={1}
                style={styles.name}
              />
              {/* <TouchableOpacity style={{right:15}} onPress={() => this.deleteUser()}>
                <Image source={images.del} style={{ height: 40, width: 40 }} />
              </TouchableOpacity> */}
            </View>

            <View style={styles.UserNameconatiner}>
              <CustomText
                item={`Username: ${this.state.profiledata.username
                    ? this.state.profiledata.username
                    : ""
                  }`}
                style={styles.username}
                numberOfLines={1}
              />
              <CustomText
                item={`Win: ${this.state.profiledata.win ? this.state.profiledata.win : 0
                  } | Loss: ${this.state.profiledata.loss ? this.state.profiledata.loss : 0
                  }`}
                style={styles.winloss}
              />
            </View>
          </View>
        </View>
        <View style={styles.numberConatiner}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 9,
              alignSelf: "auto",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FollowingList", {
                  data: this.state.profiledata.followings,
                  friendType: "Following",
                })
              }
            >
              <CustomText
                item={
                  this.state.followingsData
                    ? this.state.followingsData.length
                    : "0"
                }
                style={styles.numberstyle}
              />
              <CustomText item={"Following"} style={styles.numberstyle1} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FollowerList", {
                  data: this.state.followerData,
                  friendType: "Followers",
                })
              }
            >
              <CustomText
                item={this.state.followerData.length}
                style={styles.numberstyle}
              />
              <CustomText item={"Followers"} style={styles.numberstyle1} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FriendsList", {
                  data: this.state.friendListData,
                  friendType: "Close Friends",
                })
              }
            >
              {/* {console.log(
                      this.state.friendListData,
                      "================="
                    )} */}
              <CustomText
                item={this.state.friendListData.length}
                style={styles.numberstyle}
              />
              <CustomText item={"Close Friends"} style={styles.numberstyle1} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("BlockList", {
                  data: this.state.blockList,
                  friendType: "Blocked",
                })
              }
            >
              <CustomText
                item={this.state.blockList.length}
                style={styles.numberstyle}
              />
              <CustomText item={"Blocked"} style={styles.numberstyle1} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              this.state.tabActive == "ADDITIONAL"
                ? styles.textInputConatiner
                : styles.textInputConatinerADDITIONAL,
            ]}
            onPress={() => this.setState({ tabActive: "MYDEBATES" })}
          >
            <CustomText
              item={"My Debates"}
              style={[
                this.state.tabActive == "ADDITIONAL"
                  ? styles.planstyle
                  : styles.planstyleactive,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              this.state.tabActive == "ADDITIONAL"
                ? styles.textInputConatiner1
                : styles.textInputConatinercopy,
            ]}
            onPress={() => this.setState({ tabActive: "ADDITIONAL" })}
          >
            <CustomText
              item={"Additional Info"}
              style={[
                this.state.tabActive == "ADDITIONAL"
                  ? styles.addstyle
                  : styles.addstyleactive,
              ]}
            />
          </TouchableOpacity>
        </View>
        {this.state.tabActive == "ADDITIONAL" ? (
          <View style={styles.infoConatiner}>
            <View style={{ marginHorizontal: 12 }}>
              <CustomText item={"About me"} style={styles.about} />
              <CustomText
                item={
                  this.state.profiledata.about == ""
                    ? "NA"
                    : this.state.profiledata.about
                }
                style={styles.contentstyle}
              />
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <CustomText
                  item={`Email: ${this.state.profiledata.email
                      ? this.state.profiledata.email
                      : "NA"
                    }`}
                  style={styles.email}
                />
                <CustomText
                  item={`Phone: ${this.state.profiledata.contactNo
                      ? this.state.profiledata.contactNo
                      : "NA"
                    }`}
                  style={styles.phone}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  item={`City: ${this.state.profiledata.city
                      ? this.state.profiledata.city
                      : "NA"
                    }`}
                  style={styles.city}
                />
                <CustomText
                  item={`State: ${this.state.profiledata.state
                      ? this.state.profiledata.state
                      : "NA"
                    }`}
                  style={styles.state}
                />
              </View>
              <CustomText
                item={`DOB: ${this.state.profiledata.dateOfBirth
                    ? Moment(new Date(this.state.profiledata.dateOfBirth).toUTCString()).utc().format(
                      "DD MMMM,YYYY"
                    )
                    : "NA"
                  }`}
                style={styles.email}
              />
            </View>
            <View style={{ marginBottom: verticalScale(20) }}></View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginHorizontal: 15,
              }}
            >
              <CustomText
                item={"Favorite Sport Category"}
                style={styles.about}
              />
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ChangeCategory", {
                    selectedCategory: this.state.profiledata.categories,
                  })
                }
              >
                <CustomText item={"Change"} style={styles.changestyle} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </>
    );
  };

  renderFooter = () => {
    return (
      <View>
        {this.state.spinner ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
  };

  render() {
    // console.log(this.state.blockList, "===followerData");
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Loader loading={this.state.loading} />
          {this.state.tabActive == "ADDITIONAL" ? (
            <FlatList
              data={this.state.profiledata.categories}
              ListHeaderComponent={this.flatlistheader}
              //style={{marginTop: 2, marginStart: 2}}
              renderItem={({ item, index }) => this.renderCardData(item)}
              numColumns={2}
              indicatorStyle={"white"}
              // extraData={this.state.RefreshFlatList}
              showsVerticalScrollIndicator={true}
            />
          ) : (
            <View>
              <FlatList
                data={this.state.userDebates}
                // refreshing={this.state.refreshing}
                // onRefresh={this.handleRefresh}
                ListHeaderComponent={this.flatlistheader}
                // bounces={false}
                onEndReachedThreshold={0.3}
                onEndReached={
                  this.state.hasMoreToLoad ? this.handleLoadMore : null
                }
                extraData={this.state.userDebates}
                ListEmptyComponent={this.ListEmpty}
                ListFooterComponent={this.renderFooter}
                renderItem={({ item, index }) => (
                  <DebatesCard
                    onPressProductListing={() =>
                      this.props.navigation.navigate("Comments", {
                        data: item,
                      })
                    }
                    videoPlayer={() =>
                      this.props.navigation.navigate("VideoPlayerScreen", {
                        data: item.video,
                      })
                    }
                    item={item}
                    likedebates={() => this.likeCallBack(item)}
                    votedebates={(i) => this.voteCallBack(i)}
                  />
                )}
                indicatorStyle={"white"}
                showsVerticalScrollIndicator={true}
              />
            </View>
          )}
         
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default MyProfile;
