import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Pressable,
  Alert,
  ActivityIndicator,
  Button,
  Linking,
} from "react-native";
import DebatesCard from "../../../components/DebatesCard";
import colors from "../../../themes/Colors";
import SearchIcon from "../../../images/svg/timeline/search.svg";
import { CustomText } from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import styles from "./TimeLineStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FilterIcon from "../../../images/svg/timeline/filter.svg";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import images from "../../../themes/Images";
import scale, { verticalScale } from "../../../themes/Metrics";
import { Strings as strings } from "../../../utils/Strings";
import NetInfo from "@react-native-community/netinfo";
import DefaultProfileImage from "../../../components/DefaultProfileImage";
import { NoDataFound } from "../../../components/NoDataFound";
import AdsComponents from "../../../components/AdsComponents";
import ActionSheet from "react-native-actionsheet";
import requestCameraAndAudioPermission from "../joinAndStart/Permission";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import JanusClient from "../../../../lib/JanusClient";

class TimeLineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAlldata: [],
      loading: false,
      refreshing: false,
      perpage: 1,
      perpageDebates: 1,
      filter: false,
      SportsCategoryData: [],
      debatesActive: [
        { name: "Active", ischeck: false },
        { name: "Completed", ischeck: false },
      ],
      filterCategory: [],
      category_array_Id: [],
      beabtes_status: [],
      searchkey: "",
      followed_friends: false,
      testing: "",
      selectedValue: "Debates",
      modelForUser: false,
      alluserData: [],
      spinner: false,
      hasMoreToLoad: true,
      hasMoreToLoaddebates: true,
      checkPlan: false,
    };
  }

  async componentDidMount() {
    // Dynamic Links Intial Link and Listener
    this.unregister = dynamicLinks().onLink(this.handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        console.log("initial link");
        if (link !== null) {
          console.log("link", link);
          var str = link.url.split("/");
          var linkEventId = str[str.length - 1];
          console.log(linkEventId.length, "===");
          if (linkEventId.length > 20) {
            this.props.navigation.navigate("SharedDebates", {
              debateid: linkEventId,
            });
          }
        }
      });

    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      AsyncStorage.removeItem("fromKillState");

      this.allDebates();
      this.allUser();
      this.checkSub();
      requestCameraAndAudioPermission();
      JanusClient.disconnect();
    });
    this.allCategory();
  }

  handleDynamicLink = (link) => {
    console.log("handled link");
    // Handle dynamic link inside your own application
    if (link !== null) {
      console.log("link", link);
      var str = link.url.split("/");
      var linkEventId = str[str.length - 1];
      console.log(linkEventId.length, "===");
      if (linkEventId.length > 20) {
        this.props.navigation.navigate("SharedDebates", {
          debateid: linkEventId,
        });
      }
    }
  };

  async componentWillUnmount() {
    this.unsubscribe.remove();
    this.unregister.remove();
  }

  allUser = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ spinner: true });
            let url =
              URLConstants.GET_ALL_USER +
              "?page=" +
              this.state.perpage +
              "&limit=" +
              50 +
              "&search_query=" +
              this.state.searchkey +
              "&userId=" +
              userID;
            console.log(
              url,
              "====urlall user================================================="
            );
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                console.log(response.data.data);
                var arr = response.data.data;
                arr = arr.filter((item) => item._id !== userID);
                // console.log(arr, "=====================");
                // this.setState({ alluserData: arr });

                arr.length <= 49
                  ? this.setState({ hasMoreToLoad: false })
                  : this.setState({ hasMoreToLoad: true });

                console.log(
                  response.data.data,
                  "=================allUser========"
                );
                this.setState({
                  alluserData:
                    this.state.perpage === 1
                      ? arr
                      : [...this.state.alluserData, ...arr],
                  refreshing: false,
                  spinner: false,
                  loading: false,
                });
                // console.log(
                //   this.state.alluserData,
                //   "================================================"
                // );
              })
              .catch((error) => {
                // console.log(error.response.data, "==============response");
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

  allCategory = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          // this.setState({ loading: true });
          axios
            .get(URLConstants.GET_ALL_CATEGORY, {
              headers: {
                Token: value,
              },
            })
            .then((response) => {
              // console.log(response, "==============SportsCategoryData");
              let category_Data = response.data.data;
              category_Data.map((item) => {
                item.isCheck = false;
              });
              this.setState({
                SportsCategoryData: response.data.data,
                loading: false,
              });
            })
            .catch((error) => {
              // console.log(error.response.data, "==============response");
              this.setState({ loading: false });
            });
        } else {
          // Ideally load from local storage
          // alert(strings.Please_check_Internet);
        }
      });
    });
  };

  allDebates = () => {
    // console.log(
    //   this.state.beabtes_status,
    //   this.state.category_array_Id,
    //   "========"
    // );
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userid) => {
        var dataToSend = {
          page: this.state.perpageDebates,
          limit: 3,
          userId: userid,
          search: this.state.searchkey,
          type: this.state.beabtes_status,
          categories: this.state.category_array_Id,
          followed: this.state.followed_friends,
        };
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ spinner: true });
            // this.setState({ refreshing: true });
            console.log(
              URLConstants.GET_ALL_DEBATES,
              dataToSend,
              "Url========data"
            );
            axios({
              method: "post",
              url: URLConstants.GET_ALL_DEBATES,
              headers: {
                Token: value,
              },
              data: dataToSend,
            })
              .then((response) => {
                if (response.status === 200) {
                  console.log(response.data, "=======response");
                  response.data.data.length <= 2
                    ? this.setState({ hasMoreToLoaddebates: false })
                    : this.setState({ hasMoreToLoaddebates: true });
                  this.setState({
                    getAlldata:
                      this.state.perpageDebates === 1
                        ? response.data.data
                        : [...this.state.getAlldata, ...response.data.data],
                    spinner: false,
                    refreshing: false,
                    loading: false,
                  });
                } else {
                  this.setState({
                    spinner: false,
                    refreshing: false,
                    loading: false,
                  });
                }
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

  filterApply = () => {
    // console.log("Apply filter");
    // console.log(
    //   this.state.beabtes_status,
    //   this.state.category_array_Id,
    //   "debatesActive"
    // );
    this.setState(
      { filter: !this.state.filter, perpageDebates: 1, getAlldata: [] },
      () => {
        this.allDebates();
      }
    );
  };

  endEditing = () => {
    //loading: true
    this.setState(
      { perpage: 1, getAlldata: [], allUser: [],  },
      () => {
        this.state.selectedValue == "Debates"
          ? this.allDebates()
          : this.allUser();
      }
    );
  };

  rendersearchbar = () => {
    return (
      <View style={styles.serarchMainContainer}>
        <View style={styles.searchcontainer}>
          <View style={{ marginHorizontal: 10, alignSelf: "center" }}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignSelf: "center" }}
              onPress={this.showActionSheet}
            >
              <CustomText
                item={this.state.selectedValue}
                style={styles.bedatestitles}
              />
              <Image
                source={images.downarrow}
                style={{
                  width: 12,
                  height: 10,
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder={"Search"}
            placeholderTextColor={colors.textblack_555555}
            autoCorrect={false}
            //placeholderTextAlign={"center"}
            style={styles.inputstyle}
            onChangeText={(text) => this.setState({ searchkey: text })}
            onEndEditing={() => this.endEditing()}
          />
          <SearchIcon style={styles.searchicon} />
        </View>
      </View>
    );
  };

  // renderdebateUserModel = () => {
  //   return (
  //     <Modal
  //       animationType="slide"
  //       transparent={true}
  //       visible={this.state.modelForUser}
  //       onRequestClose={() => {
  //         // alert("Modal has been closed.");
  //         this.setState({ filter: false });
  //       }}
  //     >
  //       <Pressable
  //         style={styles.modelBackgroud}
  //         // onPress={() => {
  //         //   this.setState({ filter: false });
  //         // }}
  //       >
  //         <View
  //           style={{
  //             backgroundColor: colors.whiteText,
  //             maxHeight: verticalScale(500),
  //           }}
  //         >
  //           <View style={styles.headerUserStyles}>
  //             <CustomText item={""} style={styles.headerTitle} />
  //             <TouchableOpacity
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //                 marginRight: 20,
  //                 alignSelf: "center",
  //               }}
  //               onPress={() => this.setState({ modelForUser: false })}
  //             >
  //               <Image source={images.close} style={styles.cancelstyle} />
  //             </TouchableOpacity>
  //           </View>
  //           <View
  //             style={{
  //               marginLeft: scale(15),
  //               marginBottom: verticalScale(40),
  //             }}
  //           >
  //             <TouchableOpacity
  //               onPress={() =>
  //                 this.setState({
  //                   selectedValue: "Debates",
  //                   modelForUser: false,
  //                 })
  //               }
  //             >
  //               <CustomText item={"Debates"} style={styles.DebatesCategory} />
  //             </TouchableOpacity>
  //             <TouchableOpacity
  //               onPress={() =>
  //                 this.setState({
  //                   selectedValue: "Users",
  //                   modelForUser: false,
  //                 })
  //               }
  //             >
  //               <CustomText item={"Users"} style={styles.DebatesCategory} />
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </Pressable>
  //     </Modal>
  //   );
  // };

  handleRefresh = () => {
    this.setState({ perpage: 1, perpageDebates: 1 });
    this.allDebates();
    this.allUser();
    this.checkSub();
  };

  handleLoadMore = () => {
    this.setState(
      {
        perpageDebates: this.state.perpageDebates + 1,
      },
      () => {
        this.allDebates();
      }
    );
  };

  handleLoadMoreUser = () => {
    this.setState(
      {
        perpage: this.state.perpage + 1,
      },
      () => {
        this.allUser();
      }
    );
  };

  addCategory = (data) => {
    // console.log(data, "=============");
    let updatedDataCopy = this.state.SportsCategoryData;
    updatedDataCopy.forEach((element) => {
      if (element._id === data._id) {
        if (element.isCheck) {
          element.isCheck = false;
          // ids = ids.filter((id) => id != data.id);
        } else {
          element.isCheck = true;
          // ids.push(item.id);
        }
      }
      const { category_array_Id } = this.state;
      const newList = [...category_array_Id];
      const itemIndex = newList.findIndex((item) => item === data._id);
      if (itemIndex > -1) {
        newList.splice(itemIndex, 1);
      } else {
        newList.push(data._id);
      }
      this.setState({ category_array_Id: newList });
      // console.log(newList, this.state.category_array_Id, "==========newlist");
    });
    this.setState({ SportsCategoryData: updatedDataCopy });
  };

  addDebates = (data) => {
    // console.log(data, "=============");
    let updatedDataCopy = this.state.debatesActive;
    updatedDataCopy.forEach((element) => {
      if (element.name === data.name) {
        if (element.isCheck) {
          element.isCheck = false;
        } else {
          element.isCheck = true;
        }
      }
    });
    const { beabtes_status } = this.state;
    const newList = [...beabtes_status];
    const itemIndex = newList.findIndex((item) => item === data.name);
    if (itemIndex > -1) {
      newList.splice(itemIndex, 1);
    } else {
      newList.push(data.name);
    }
    this.setState({ beabtes_status: newList });
    // console.log(newList, "==========newlist");
    this.setState({ debatesActive: updatedDataCopy });
  };

  renderFilter = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.filter}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          this.setState({ filter: false });
        }}
      >
        <Pressable
          style={styles.modelBackgroud}
          // onPress={() => {
          //   this.setState({ filter: false });
          // }}
        >
          <View
            style={{
              backgroundColor: colors.whiteText,
              // maxHeight: verticalScale(500),
            }}
          >
            <ScrollView>
              <View style={styles.headerStyles}>
                <CustomText item={"Filters"} style={styles.headerTitle} />
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 20,
                    alignSelf: "center",
                  }}
                  onPress={() => this.filterApply()}
                >
                  <Image source={images.close} style={styles.cancelstyle} />
                </TouchableOpacity>
              </View>
              <View
                style={{ marginLeft: scale(15), marginTop: verticalScale(15) }}
              >
                <CustomText item={"Categories"} style={styles.category} />
                <View style={{ width: scale(410) }}>
                  <FlatList
                    data={this.state.SportsCategoryData}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          marginTop: verticalScale(6),
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flex: 1,
                          // margin: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={{ flexDirection: "row" }}
                          onPress={() => this.addCategory(item)}
                        >
                          <Image
                            source={
                              item.isCheck ? images.check : images.unCheck
                            }
                            style={styles.checkStyle}
                          />
                          <CustomText
                            item={item.name}
                            style={styles.categoryName}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
                <CustomText item={"Debates"} style={styles.Debates} />
                <View
                  style={{ width: scale(410), marginBottom: verticalScale(25) }}
                >
                  <FlatList
                    data={this.state.debatesActive}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          marginTop: verticalScale(6),
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flex: 1,
                          // margin: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={{ flexDirection: "row" }}
                          onPress={() => this.addDebates(item)}
                        >
                          <Image
                            source={
                              item.isCheck ? images.check : images.unCheck
                            }
                            style={styles.checkStyle}
                          />
                          <CustomText
                            item={item.name}
                            style={styles.categoryName}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  {/* { name: "Followed Friends", ischeck: false }, */}
                  <View
                    style={{
                      marginTop: verticalScale(6),
                      justifyContent: "space-between",
                      flexDirection: "row",
                      flex: 1,
                      // margin: 5,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        marginBottom: verticalScale(20),
                      }}
                      onPress={() =>
                        this.setState({
                          followed_friends: !this.state.followed_friends,
                        })
                      }
                    >
                      <Image
                        source={
                          this.state.followed_friends
                            ? images.check
                            : images.unCheck
                        }
                        style={styles.checkStyle}
                      />
                      <CustomText
                        item={"Followed Friends"}
                        style={styles.categoryName}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    );
  };

  likeCallBack = (item) => {
    let localdata = this.state.getAlldata;
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
    this.setState({ getAlldata: localdata });
  };

  voteCallBack = (item) => {
    let localdata = this.state.getAlldata;
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
    this.setState({ getAlldata: localdata });
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  renderFooter = () => {
    return (
      <View style={{ marginVertical: verticalScale(50) }}>
        {this.state.spinner ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
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
                // console.log(response.data, "unFollowUser======");
                this.allUser();
                this.setState({ loading: false, perpage: 1 });
                // this.setState({ blockList: response.data.data });
                // this.setState({ loading: false });
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

  FollowUser = (item) => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              followingId: item._id,
            };
            console.log(dataToSend, URLConstants.USER_FOLLOW, "========");
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
                this.allUser();
                this.setState({ loading: false, perpage: 1 });

                // this.setState({ blockList: response.data.data });
                // this.setState({ loading: false });
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
                // console.log(response.data, "add Friends======");
                // this.getFollowing();
                this.allUser();
                this.setState({ loading: false, perpage: 1 });

                // this.setState({ blockList: response.data.data });
                // this.setState({ loading: false });
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
                // this.getFollowing();
                this.allUser();
                this.setState({ loading: false, perpage: 1 });
                // this.setState({ blockList: response.data.data });
                // this.setState({ loading: false });
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

  renderAllUser = (item) => {
    // console.log(item, "item of user===============");
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
                <DefaultProfileImage
                  uri={`${URLConstants.PROFILE_IMAGE_URL}${item.profilePic}`}
                  style={styles.imagesstyle}
                />
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
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {item.isFollowed ? (
                    <>
                      <TouchableOpacity onPress={() => this.unFollowUser(item)}>
                        <CustomText
                          style={styles.textstyle}
                          item={"Unfollow"}
                        />
                      </TouchableOpacity>
                      {/* {item.friendRequest == "Accepted" ? null : (
                        <>
                          <View style={styles.verticleLine}></View>
                          {console.log(
                            item.friendRequest,
                            "========================friendRequest"
                          )}
                          {item.friendRequest == "Not Sent" ? (
                            <TouchableOpacity
                              onPress={() => this.sendRequest(item)}
                              style={{ width: 200 }}
                            >
                              <CustomText
                                style={styles.textstyle1}
                                numberOfLines={1}
                                item={"Send Close Friend Request"}
                              />
                            </TouchableOpacity>
                          ) : item.friendRequest == "Pending" ? (
                            <TouchableOpacity
                              onPress={() => this.cancelRequest(item)}
                            >
                              <CustomText
                                style={styles.textstyle}
                                item={"Cancel Request"}
                              />
                            </TouchableOpacity>
                          ) : null}
                        </>
                      )} */}
                    </>
                  ) : (
                    <TouchableOpacity onPress={() => this.FollowUser(item)}>
                      <CustomText style={styles.textstyle} item={"Follow"} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  checkSub = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
            };
            console.log(
              dataToSend,
              URLConstants.CHECK_SUB_PLAN,
              "============================"
            );
            axios({
              method: "post",
              url: URLConstants.CHECK_SUB_PLAN,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(
                  response.data.data,
                  "checkSub============================="
                );
                this.setState({
                  loading: false,
                });
                if (
                  response.data.data.user &&
                  response.data.data.user.receipt
                ) {
                  this.setState({
                    checkPlan: response.data.data.user.receipt.success,
                  });
                }
                console.log(this.state.checkPlan, "========checkplan");
              })
              .catch((error) => {
                // handle error
                console.log(error.response, "checkSub==================");
                // this.setState({ loading: false });
                // console.log(error.response.data);
                // alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* <Loader loading={this.state.loading} /> */}
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={null}
          options={["Debates", "Users", "Cancel"]}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          styles={styles.DebatesCategory}
          onPress={(index) => {
            index == 0 ? this.setState({ selectedValue: "Debates" }) : null;
            index == 1 ? this.setState({ selectedValue: "Users" }) : null;
          }}
        />
        {this.state.selectedValue == "Debates" ? (
          <FlatList
            data={this.state.getAlldata}
            refreshing={this.state.refreshing}
            ListHeaderComponent={this.rendersearchbar()}
            onEndReachedThreshold={0.3}
            onEndReached={
              this.state.hasMoreToLoaddebates ? this.handleLoadMore : null
            }
            extraData={this.state.getAlldata}
            onRefresh={() => this.handleRefresh()}
            ListEmptyComponent={
              this.state.getAlldata.length == 0 ? this.ListEmpty : null
            }
            ListFooterComponent={this.renderFooter}
            renderItem={({ item, index }) =>
              (index + 1) % 4 == 0 ? (
                !this.state.checkPlan ? (
                  <AdsComponents />
                ) : null
              ) : (
                <DebatesCard
                  onPressProductListing={() =>
                    this.props.navigation.navigate("Comments", { data: item })
                  }
                  onPressGotoProfile={(item) => {
                    // alert("hi");
                    this.props.navigation.navigate("MyProfile", { data: item });
                  }}
                  onPressGotoOtherUser={(item) => {
                    // alert("hello");
                    this.props.navigation.navigate("OtherUserProfile", {
                      data: item,
                    });
                  }}
                  videoPlayer={() =>
                    //Linking.openURL(item.video.url)
                    this.props.navigation.navigate("VideoPlayerScreen", {
                      data: item.video,
                    })
                  }
                  item={item}
                  likedebates={() => this.likeCallBack(item)}
                  votedebates={(i) => this.voteCallBack(i)}
                />
              )
            }
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
          />
        ) : (
          <FlatList
            data={this.state.alluserData}
            refreshing={this.state.refreshing}
            ListHeaderComponent={this.rendersearchbar()}
            onEndReachedThreshold={0.3}
            onEndReached={
              this.state.hasMoreToLoad ? this.handleLoadMoreUser : null
            }
            extraData={this.state.alluserData}
            onRefresh={() => this.handleRefresh()}
            ListEmptyComponent={
              this.state.alluserData.length == 0 ? this.ListEmpty : null
            }
            ListFooterComponent={this.renderFooter}
            renderItem={({ item, index }) => this.renderAllUser(item)}
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
            initialNumToRender={this.state.alluserData.length}
          />
        )}
        {this.renderFilter()}
        {this.state.selectedValue == "Debates" ? (
          <TouchableOpacity
            style={styles.filterstyle}
            onPress={() => this.setState({ filter: true })}
          >
            <FilterIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export default TimeLineScreen;
