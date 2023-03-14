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
  Alert,
  ActivityIndicator,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./OtherUserProfileStyle";
import Edit from "../../images/svg/my-profile/edit.svg";
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
import ProfileRank from "../../images/svg/my-profile/profileRank.svg";
import Moment from "moment";
import CustomButton from "../../components/CustomButton";
import MoreWhite from "../../images/svg/my-profile/moreWhite.svg";
import NetInfo from "@react-native-community/netinfo";

import colors from "../../themes/Colors";
import { NoDataFound } from "../../components/NoDataFound";
class OtherUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profiledata: this.props.route.params.data,
      OtherUserDATA: [],
      tabActive: "ADDITIONAL",
      userDebates: "",
      followerData: "",
      friendListData: [],
      friendListData: "",
      followingsData: [],
      hasMoreToLoad: true,
      spinner: false,
      perpage: 1,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.otherUserProfileData();
      this.getDebatesByUser();
      this.getFollower();
      this.getFollowing();
      this.getFriendsList();
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
            this.setState({ loading: true });
            let url =
              URLConstants.GET_USER_FOLLOWING +
              `/${this.state.profiledata._id}`;
            console.log(url, "getFollowinggetFollowing==url");
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
            this.setState({ loading: true });
            let url =
              URLConstants.USER_BY_FRIEND_LIST +
              `?userId=${this.state.profiledata._id}`;
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

  otherUserProfileData = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            let url =
              URLConstants.GET_USER_BY_ID +
              `/${this.state.profiledata._id}?currentUserId=${userID}`;
            console.log(url, "==");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(
                //   response,
                //   "==============otherUserProfileDataotherUserProfileDataotherUserProfileDataotherUserProfileData"
                // );
                // AsyncStorage.setItem(
                //   "USER_PROFILE",
                //   response.data.data.profilePic
                // );
                // AsyncStorage.setItem("USER_EMAIL", response.data.data.email);
                this.setState({ OtherUserDATA: response.data.data });
                console.log(
                  response.data.data,
                  "==============otherUserProfileData"
                );
                this.setState({ loading: false });
              })
              .catch((error) => {
                // handle error
                // console.log(
                //   error.response,
                //   error,
                //   "======================================="
                // );
                this.setState({ loading: false });
                console.log(error.response.data);
                // alert(error.response.data.message);
                Alert.alert(
                  "Alert",
                  `${error.response.data.message}`,
                  [
                    {
                      text: "Ok",
                      onPress: () => {
                        this.props.navigation.goBack();
                      },
                    },
                  ],
                  { cancelable: false }
                );
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  //   async componentWillUnmount() {
  //     this.unsubscribe.remove();
  //   }

  getFollower = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        this.setState({ loading: true });
        let url =
          URLConstants.GET_FOLLOWER_BY_ID + `/${this.state.profiledata._id}`;
        console.log(url, "==url");
        axios
          .get(url, {
            headers: {
              Token: value,
            },
          })
          .then((response) => {
            // console.log(response.data.data, "==============response");
            this.setState({ followerData: response.data.data });
            this.setState({ loading: false });
          });
      });
    });
  };

  getDebatesByUser = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        this.setState({ spinner: true });
        var dataToSend = {
          userId: this.state.profiledata._id,
          limit: 10,
          page: this.state.perpage,
          currentUserId: userID,
          // : item.friend._id,
          // type: "reject",
        };
        console.log(
          dataToSend,
          URLConstants.GET_DEBATES_BYUSER,
          "+=============url and data to send huehfuehfiuedfie"
        );
        axios({
          method: "post",
          url: URLConstants.GET_DEBATES_BYUSER,
          data: dataToSend,
          headers: {
            Token: value,
          },
        }).then((response) => {
          console.log(response.data.data, "==============getDebatesByUser");
          response.data.data.length <= 9
            ? this.setState({ hasMoreToLoad: false })
            : this.setState({ hasMoreToLoad: true });

          console.log(response.data.data, "=================allUser========");
          this.setState({
            userDebates:
              this.state.perpage === 1
                ? response.data.data
                : [...this.state.userDebates, ...response.data.data],
            refreshing: false,
            spinner: false,
            loading: false,
          });
        });
      });
    });
  };

  // renderCardData = (item) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.cardConatiner}
  //       // onPress={() => this.onCategoryPress(item)}
  //     >
  //       {/* {this.state.cat_array_Id.map((data) => {
  //         return (
  //           <View>
  //             {data === item._id ? (
  //               <CheckIcon style={styles.checkIocn} />
  //             ) : (
  //               <View />
  //             )}
  //           </View>
  //         );
  //       })} */}
  //       <DefaultProfileImage
  //         uri={`${URLConstants.IMAGE_URL}${item.category.image}`}
  //         style={styles.imagesstyle}
  //       />
  //       <CustomText item={item.category.name} style={styles.categoryTitle} />
  //     </TouchableOpacity>
  //   );
  // };

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
                this.getFollower();
                this.getFollowing();
                this.otherUserProfileData();
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
                this.getFollowing();
                this.otherUserProfileData();

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
  };

  handleLoadMore = () => {
    // console.log(this.state.perpage, "=============");
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
      <View>
        <View style={styles.imageContainer}>
          {/* <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    justifyContent: "flex-end",
                    top: 9,
                    right: 14,
                  }}
                  //   onPress={() =>
                  //     this.props.navigation.navigate("EditProfile", {
                  //       profiledata: this.state.profiledata,
                  //     })
                  //   }
                >
                  <MoreWhite />
                </TouchableOpacity> */}
          {this.state.OtherUserDATA.profilePic == "" ? (
            <Image style={styles.image} source={images.blankProfile} />
          ) : (
            <DefaultProfileImage
              style={styles.image}
              uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.OtherUserDATA.profilePic}`}
            />
          )}
        </View>
        {this.state.OtherUserDATA.rank == "0" ? (
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
                // backgroundColor: "green",
              }}
            >
              <CustomText item={`Rank`} style={styles.ranktext} />
              {/* this.state.profiledata.rank */}
              {}
              <CustomText
                item={this.state.OtherUserDATA.rank}
                style={styles.rankNumber}
              />
            </View>
          </View>
        )}

        <View style={styles.numberConatiner}>
          <View>
            <CustomText
              item={`${
                this.state.OtherUserDATA.firstName
                  ? this.state.OtherUserDATA.firstName
                  : ""
              } ${
                this.state.OtherUserDATA.lastName
                  ? this.state.OtherUserDATA.lastName
                  : ""
              }`}
              style={styles.name}
              numberOfLines={1}
            />
            <View style={styles.UserNameconatiner}>
              <CustomText
                item={`Username: ${
                  this.state.OtherUserDATA.username
                    ? this.state.OtherUserDATA.username
                    : ""
                }`}
                style={styles.username}
                numberOfLines={1}
              />
              <CustomText
                item={`Win: ${
                  this.state.OtherUserDATA.win
                    ? this.state.OtherUserDATA.win
                    : 0
                } | Loss: ${
                  this.state.OtherUserDATA.loss
                    ? this.state.OtherUserDATA.loss
                    : 0
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
              marginHorizontal: 5,
              justifyContent: "space-between",
              alignSelf: "auto",
            }}
          >
            <TouchableOpacity
            // onPress={() =>
            //   this.props.navigation.navigate("FriendsList", {
            //     data: this.state.profiledata.followings,
            //     friendType: "Following",
            //   })
            // }
            >
              <CustomText
                item={this.state.followingsData.length}
                style={styles.numberstyle}
              />
              <CustomText item={"Following"} style={styles.numberstyle1} />
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() =>
            // //   this.props.navigation.navigate("FriendsList", {
            // //     data: this.state.followerData,
            // //     friendType: "Followers",
            // //   })
            // }
            >
              <CustomText
                item={this.state.followerData.length}
                style={styles.numberstyle}
              />
              <CustomText item={"Followers"} style={styles.numberstyle1} />
            </TouchableOpacity>
            <TouchableOpacity
            // onPress={() =>
            //   this.props.navigation.navigate("FriendsList", {
            //     data: this.state.friendListData,
            //     friendType: "Close Friends",
            //   })
            // }
            >
              <CustomText
                item={this.state.friendListData.length}
                style={styles.numberstyle}
              />
              <CustomText item={"Close Friends"} style={styles.numberstyle1} />
            </TouchableOpacity>
            {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("FriendsList", {
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
                  </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.numberConatiner}>
          <View style={{ marginVertical: 12, marginLeft: 15 }}>
            {this.state.OtherUserDATA.follow ? (
              <CustomButton
                onPress={() => this.unFollowUser(this.state.OtherUserDATA)}
                title="Unfollow"
                buttonStyles={{ width: 134, height: 44 }}
              />
            ) : (
              <CustomButton
                onPress={() => this.followUser(this.state.OtherUserDATA)}
                title="Follow"
                buttonStyles={{ width: 134, height: 44 }}
              />
            )}
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
                  this.state.OtherUserDATA.about == ""
                    ? "NA"
                    : this.state.OtherUserDATA.about
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
                  item={`Email: ${
                    this.state.OtherUserDATA.email
                      ? this.state.OtherUserDATA.email
                      : "NA"
                  }`}
                  style={styles.email}
                />
                <CustomText
                  item={`Phone: ${
                    this.state.OtherUserDATA.contactNo
                      ? this.state.OtherUserDATA.contactNo
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
                  item={`City: ${
                    this.state.OtherUserDATA.city
                      ? this.state.OtherUserDATA.city
                      : "NA"
                  }`}
                  style={styles.city}
                />
                <CustomText
                  item={`State: ${
                    this.state.OtherUserDATA.state
                      ? this.state.OtherUserDATA.state
                      : "NA"
                  }`}
                  style={styles.state}
                />
              </View>
              <CustomText
                item={`DOB: ${
                  this.state.OtherUserDATA.dateOfBirth
                    ? Moment(new Date(this.state.OtherUserDATA.dateOfBirth).toUTCString()).utc().format(
                        "DD MMMM,YYYY"
                      )
                    : "NA"
                }`}
                style={styles.email}
              />
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginHorizontal: 15,
                marginTop: verticalScale(20),
              }}
            >
              <CustomText
                item={"Favorite Sport Category"}
                style={styles.about}
              />
              {/* <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("ChangeCategory", {
                          selectedCategory: this.state.profiledata.categories,
                        })
                      }
                    >
                      <CustomText item={"Change"} style={styles.changestyle} />
                    </TouchableOpacity> */}
            </View>
            {/* <View style={{ marginBottom: 50 }}></View> */}
          </View>
        ) : null}
      </View>
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
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Loader loading={this.state.loading} />
          {this.state.tabActive == "ADDITIONAL" ? (
            <FlatList
              data={this.state.OtherUserDATA.categories}
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
                extraData={this.state.userDebates}
                ListHeaderComponent={this.flatlistheader}
                ListFooterComponent={this.renderFooter}
                onEndReachedThreshold={0.5}
                onEndReached={
                  this.state.hasMoreToLoad ? this.handleLoadMore : null
                }
                ListEmptyComponent={this.ListEmpty}
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

export default OtherUserProfile;
