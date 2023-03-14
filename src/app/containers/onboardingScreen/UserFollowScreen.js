import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Share,
  Modal,
  Linking,
  Clipboard,
} from "react-native";
import styles from "./UserFollowStyles";
import { CustomText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import { Card } from "../../components/Card";
import RightArrow from "../../images/svg/onborarding/right-arrow.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale } from "../../themes/Metrics";
import SearchIcon from "../../images/svg/timeline/search.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "../../themes/Colors";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../utils/Strings";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import images from "../../themes/Images";
import WhatsApp from "../../images/svg/onborarding/whatsapp.svg";
import Twitter from "../../images/svg/onborarding/twitter.svg";
import SMS from "../../images/svg/onborarding/sms.svg";
import Facebook from "../../images/svg/onborarding/facebook.svg";
import Email from "../../images/svg/onborarding/email.svg";
import Copy from "../../images/svg/onborarding/copycode.svg";
import { NoDataFound } from "../../components/NoDataFound";

class UserFollowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      loading: false,
      userFollow_id: [],
      search: "",
      filterData: [],
      showPickerModal: false,
      RefreshFlatList: false,
      refreshing: false,
      perpage: 1,
      searchKey: "",
      nofilterdata: "",
      loademore: "",
      userfollowButtonCheck: false,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getUserByCategory();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  allUser = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true, refreshing: false });
            let url =
              URLConstants.GET_ALL_USER +
              "?page=" +
              this.state.perpage +
              "&limit=" +
              100 +
              "&search_query=" +
              this.state.searchKey +
              "&userId=" +
              userID;
            console.log(url, value, "====url=============");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                response.data.data.length == 0
                  ? this.setState({ loademore: "alldata" })
                  : this.setState({ loademore: "" });
                console.log(
                  response.data.data,
                  "==============allUser==response"
                );
                let Cat_Data = response.data.data;
                Cat_Data.map((item) => {
                  item.isFollow = true;
                });
                const itemIndex = response.data.data.findIndex(
                  (item) => item.isFollowed == false
                );
                console.log(itemIndex, "================");
                if (itemIndex > -1) {
                  this.setState({ userfollowButtonCheck: false });
                } else {
                  this.setState({ userfollowButtonCheck: true });
                }
                // this.setState({
                //   SportsCategoryData:
                //     this.state.perpage === 1
                //       ? response.data.data
                //       : [...this.state.SportsCategoryData, ...response.data.data],
                // });
                if (response.data.data.length == 0) {
                  this.setState({
                    filterData:
                      this.state.perpage === 1
                        ? response.data.data
                        : [...this.state.filterData, ...response.data.data],
                    nofilterdata: "nodata",
                  });
                } else {
                  this.setState({
                    filterData:
                      this.state.perpage === 1
                        ? response.data.data
                        : [...this.state.filterData, ...response.data.data],
                  });
                }
                console.log(
                  this.state.filterData,
                  "==============searchKeysearchKeysearchKey"
                );
                this.setState({ loading: false, refreshing: false });
              })
              .catch((error) => {
                console.log(error.response, "error=========");
                this.setState({ loading: false, refreshing: false });
                alert(error.response.data.message);
                // alert(error.response);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  shareModel = async () => {
    try {
      const result = await Share.share({
        title: "App link",
        message:
          "Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
        url: "https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
      });

      if (result.action === Share.sharedAction) {
        // alert("Post Shared");
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // alert("Post cancelled");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // handleMailAction = () => {
  //   let message =
  //     "Hey! I'm using SportsTalk. You should try this app, it's a fast and simple for Debate. Get it at https://otssolutions.com/";
  //   const url = `mailto:?subject=Invitation&body=` + message;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         setTimeout(() => alert("Not supported"), 10);
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => printLog("error"));
  // };

  // handleSMSAction = () => {
  //   let message =
  //     "Hey! I'm using SportsTalk. You should try this app, it's a fast and simple for Debate. Get it at https://otssolutions.com/";
  //   const url = `sms:&body=` + message;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         setTimeout(() => alert("Not supported"), 10);
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => printLog("error"));
  // };

  // handleWhatsAppAction = () => {
  //   let message =
  //     "Hey! I'm using SportsTalk. You should try this app, it's a fast and simple for Debate. Get it at https://otssolutions.com/";
  //   const url = "whatsapp://send?text=" + message;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         setTimeout(() => alert("Not supported"), 10);
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => printLog("error"));
  // };
  // handleTwitterAppAction = () => {
  //   let message =
  //     "Hey! I'm using SportsTalk. You should try this app, it's a fast and simple for Debate. Get it at https://otssolutions.com/";
  //   const url = "https://twitter.com/intent/tweet?" + message;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         setTimeout(() => alert("Not supported"), 10);
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => printLog("error"));
  // };
  // handlefecebookAppAction = () => {
  //   let message =
  //     "Hey! I'm using SportsTalk. You should try this app, it's a fast and simple for Debate. Get it at https://otssolutions.com/";
  //   const url = "https://www.facebook.com/OTSSolutions/" + message;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         setTimeout(() => alert("Not supported"), 10);
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => printLog("error"));
  // };

  // handleCopyAction = () => {
  //   let message =
  //     "Hey! I'm using SportsTalk. You should try this app, it's a fast and simple for Debate. Get it at https://otssolutions.com/";
  //   // const url = "https://www.facebook.com/OTSSolutions/" + message;
  //   Clipboard.setString(message);
  // };
  renderImagePickerModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showPickerModal}
        onRequestClose={() => {
          this.setState({ showPickerModal: false });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.transparentBg} />
          <View style={styles.bottomView}>
            <View style={styles.headermodel}>
              <TouchableOpacity
                onPress={() => this.setState({ showPickerModal: false })}
              >
                <Image source={images.close} style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => this.handleWhatsAppAction()}>
                <WhatsApp />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handlefecebookAppAction()}>
                <Facebook />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleTwitterAppAction()}>
                <Twitter />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => this.handleMailAction()}>
                <Email />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleSMSAction()}>
                <SMS />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleCopyAction()}>
                <Copy />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  getUserByCategory = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userId) => {
        let userCategory = this.props.route.params.userCategory;
        var dataToSend = {
          categories: userCategory,
          userId: userId,
          page: this.state.perpage,
          limit: 100,
        };
        console.log(dataToSend, URLConstants.GET_USER_BYCATEGORY);
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.GET_USER_BYCATEGORY,
              data: dataToSend,
            })
              .then((response) => {
                console.log(response.data.data, "====================");
                response.data.data.length == 0
                  ? this.setState({ loademore: "catdata" })
                  : this.setState({ loademore: "" });
                if (response.status === 200) {
                  let Cat_Data = response.data.data;
                  Cat_Data.map((item) => {
                    item.isFollow = true;
                  });
                  console.log("response.data.data-======", response.data.data);
                  this.setState({
                    userData:
                      this.state.perpage === 1
                        ? response.data.data
                        : [...this.state.userData, ...response.data.data],
                  });
                  this.setState({ loading: false, refreshing: false });
                  const itemIndex = response.data.data.findIndex(
                    (item) => item.isFollowed == false
                  );
                  console.log(itemIndex, "================");
                  if (itemIndex > -1) {
                    this.setState({ userfollowButtonCheck: false });
                  } else {
                    this.setState({ userfollowButtonCheck: true });
                  }
                  // arr = arr.filter((item) => item.isFollowed !== false);
                  // console.log(arr, "=========arra===========");
                  // arr
                  //   ? this.setState({ userfollowButtonCheck: true })
                  //   : this.setState({ userfollowButtonCheck: false });

                  // // this.setState({ userData: response.data.data });
                  // this.setState({ filterData: response.data.data });
                  console.log(
                    response.data.data,
                    "==============getUserByCategory"
                  );
                  // // console.log(response, "=========");
                  // this.setState({ loading: false });
                } else {
                  this.setState({ loading: false, refreshing: false });
                  var error = response.error;
                  setTimeout(() => alert(error), 10);
                }
              })
              .catch((error) => {
                this.setState({ loading: false, refreshing: false });
                setTimeout(() => alert(error), 15);
                // handle error
                alert(error.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  userFollowButton = (data) => {
    // console.log(data.item, "=================");
    let updatedDataCopy =
      this.state.filterData.length == 0 && this.state.nofilterdata == ""
        ? this.state.userData
        : this.state.filterData;
    updatedDataCopy.forEach((element) => {
      if (element._id === data.item._id) {
        if (element.isFollow) {
          element.isFollow = false;
          // ids = ids.filter((id) => id != data.id);
        } else {
          element.isFollow = true;
          // ids.push(item.id);
        }
      }
    });

    this.state.filterData.length == 0 && this.state.nofilterdata == ""
      ? this.setState({ userData: updatedDataCopy })
      : this.setState({ filterData: updatedDataCopy });
    // this.setState({ userData: updatedDataCopy });
    AsyncStorage.getItem("USER_ID").then((value) => {
      var dataToSend = {
        userId: value,
        followingId: data.item._id,
      };
      console.log(dataToSend, URLConstants.USER_FOLLOW);
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState({ loading: true });
          axios({
            method: "post",
            url:
              data.userfollow === "Follow"
                ? URLConstants.USER_FOLLOW
                : URLConstants.USER_UNFOLLOW,
            data: dataToSend,
          })
            .then((response) => {
              this.setState({ perpage: 1 });
              // this.getUserByCategory();
              this.state.filterData.length == 0 && this.state.nofilterdata == ""
                ? this.getUserByCategory()
                : this.allUser();
            })
            .catch((error) => {
              this.setState({ loading: false, refreshing: false });
              console.log(error.response.data);
              this.state.filterData.length == 0 && this.state.nofilterdata == ""
                ? this.getUserByCategory()
                : this.allUser();
            });
        } else {
          // Ideally load from local storage
          alert(strings.Please_check_Internet);
        }
      });
    });
  };

  searchFilterFunction = (text) => {
    // if (text) {
    //   const newData = this.state.userData.filter(function (item) {
    //     const itemData = `${item.firstName} ${item.lastName}`
    //       ? `${item.firstName} ${item.lastName}`.toUpperCase()
    //       : "".toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //   });
    //   this.setState({ filterData: newData });
    //   this.setState({ search: text });
    // } else {
    //   this.setState({ filterData: this.state.userData });
    //   this.setState({ search: text });
    // }
  };
  _handleKeyDown = (event) => {
    if (event.nativeEvent.key == "Enter") {
      dismissKeyboard();
    }
  };

  rendersearchbar = () => {
    return (
      <View style={styles.serarchMainContainer}>
        <View style={styles.searchcontainer}>
          <TextInput
            placeholder={"Search"}
            // textAlign = {'left'}
            placeholderTextColor={colors.textblack_555555}
            style={styles.inputstyle}
            autoCorrect={false}
            onChangeText={(text) => this.setState({ searchKey: text })}
            onEndEditing={() => {
              console.log("User typing end");
              this.setState({ perpage: 1 });
              this.allUser();
            }}
          />
          <SearchIcon style={styles.searchicon} />
        </View>
        <CustomButton
          title={"Invite"}
          buttonStyles={styles.buttonStylesInvite}
          onPress={() => this.shareModel()}
        />
      </View>
    );
  };

  renderCategory = (item) => {
    // console.log(item, "==");
    return (
      <View style={{ flexDirection: "row" }}>
        <CustomText
          numberOfLines={1}
          // maxWidth={"100"}
          item={`${item.name}, `}
          style={styles.categorystyles}
        />
      </View>
    );
  };

  renderView = (item, index) => {
    // console.log(
    //   item
    //   // `${URLConstants.IMAGE_URL}${item.key}`,
    //   // "========item======"
    // );
    return (
      <View style={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.arrowstyles}
            onPress={() =>
              this.props.navigation.navigate("MainNavigator", {
                screen: "OtherUserProfile",
                params: { data: item },
              })
            }
          >
            {item.profilePic == "" ? (
              <Image style={styles.imagesstyle} source={images.blankProfile} />
            ) : (
              <DefaultProfileImage
                uri={`${URLConstants.PROFILE_IMAGE_URL}${item.profilePic}`}
                // source={{ uri: `${URLConstants.IMAGE_URL}${item.profilePic}` }}
                style={styles.imagesstyle}
              />
            )}
          </TouchableOpacity>
          <View style={styles.nameconatiner}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <View>
                <TouchableOpacity
                  style={styles.arrowstyles}
                  onPress={() =>
                    this.props.navigation.navigate("MainNavigator", {
                      screen: "OtherUserProfile",
                      params: { data: item },
                    })
                  }
                >
                  <CustomText
                    item={`${item.firstName} ${item.lastName}`}
                    style={styles.titlestyles}
                    numberOfLines={1}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row" }}>
                  <CustomText
                    item={"Category: "}
                    style={styles.categorystyles}
                  />
                  <View
                    style={{
                      width: 160,
                      flexDirection: "row",
                      alignSelf: "center",
                      // backgroundColor: "red",
                    }}
                  >
                    <FlatList
                      data={item.categories}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      ItemSeparatorComponent={() => (
                        <CustomText
                          item={", "}
                          style={styles.categorystylesName}
                        />
                      )}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            flexDirection: "row",
                            // backgroundColor: "red",
                          }}
                        >
                          <View style={styles.bordercategory}>
                            <CustomText
                              numberOfLines={1}
                              item={`${item.name}`}
                              style={styles.categorystylesName}
                            />
                          </View>
                        </View>
                      )}
                    />

                    {/* {item.categories.map((item, index) => {
                      return (
                        <View style={styles.bordercategory}>
                          <CustomText
                            numberOfLines={1}
                            item={`${item.name}, `}
                            style={styles.categorystyles}
                          />
                        </View>
                      );
                    })} */}
                  </View>
                </View>
                {!item.isFollowed ? (
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() =>
                      this.userFollowButton({
                        item,
                        userfollow: "Follow",
                      })
                    }
                  >
                    <CustomText item={"Follow"} style={styles.followtext} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() =>
                      this.userFollowButton({
                        item,
                      })
                    }
                  >
                    <CustomText item={"Unfollow"} style={styles.followtext} />
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={styles.arrowstyles}
                onPress={() =>
                  this.props.navigation.navigate("MainNavigator", {
                    screen: "OtherUserProfile",
                    params: { data: item },
                  })
                }
              >
                <RightArrow />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.getUserByCategory();
    });
  };

  handleLoadMore = () => {
    this.state.filterData.length == 0 && this.state.nofilterdata == ""
      ? this.setState(
          {
            perpage: this.state.perpage + 1,
          },
          () => this.getUserByCategory()
        )
      : this.setState(
          {
            perpage: this.state.perpage + 1,
          },
          () => this.allUser()
        );
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  listofusers = () => {
    return (
      <FlatList
        data={
          this.state.filterData.length == 0 && this.state.nofilterdata == ""
            ? this.state.userData
            : this.state.filterData
        }
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={this.handleLoadMore}
        renderItem={({ item, index }) => this.renderView(item, index)}
        indicatorStyle={"white"}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={this.rendersearchbar()}
        ListEmptyComponent={this.ListEmpty()}
      />
    );
  };

  render() {
    // console.log(
    //   this.state.userfollowButtonCheck,
    //   "this.state.userfollowButtonCheck"
    // );
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Loader loading={this.state.loading} />
          {this.listofusers()}
          <View style={{ marginBottom: 40 }} />
          <View
            style={{
              bottom: Platform.OS === "ios" ? 20 : 0,
              position: "absolute",
            }}
          >
            <CustomButton
              title={this.state.userfollowButtonCheck ? "Continue" : "Skip"}
              onPress={() => this.props.navigation.replace("MainNavigator")}
              buttonStyles={styles.butttonStyles}
            />
          </View>
          {/* {this.renderImagePickerModal()} */}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default UserFollowScreen;
