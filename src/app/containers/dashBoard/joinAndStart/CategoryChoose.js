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
  SafeAreaView,
  Platform,
  BackHandler,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./CategoryChooseStyles";
import { CustomText } from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import CheckIcon from "../../../images/svg/onborarding/check.svg";
import StartTheDebate from "../../../images/svg/joins-start/start.svg";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
// import { SportsCategoryData } from "../../themes/DataConstant";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../../utils/Strings";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";
import images from "../../../themes/Images";
import HTML from "react-native-render-html";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "@react-native-firebase/admob";

// const adUnitId = TestIds.INTERSTITIAL;
// const adUnitId = "ca-app-pub-6649447227642695/3534907011";
const adUnitId= Platform.OS === "android"? "ca-app-pub-6649447227642695/3534907011":"ca-app-pub-6649447227642695/5212048249";


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

// const regex = /(<([^>]+)>)/gi;
const regex = /(&nbsp;|<([^>]+)>)/gi;
import io from "socket.io-client";

const socket = io(URLConstants.SOCKET_URL);

class ChooseCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: "",
      RefreshFlatList: false,
      SportsCategoryData: [],
      loading: false,
      cat_array_Id: [],
      refreshing: false,
      perpage: 1,
      modalVisibleRule: false,
      categoryId: "",
      userId: "",
      checkPlan: false,
      adsLoaded: false,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      // console.log("hello----------", this.props.route.params.isJoinedScreen);
      this.setState({ cat_array_Id: [], SportsCategoryData: [] });
      this.categoryById();
      this.getdebatesRule();
      this.checkSub();
    });
    this.adEventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        console.log("Ad Loaded");
        this.setState({
          adsLoaded: true,
        });
      } else if (type === AdEventType.CLOSED) {
        interstitial.load();
        this.setState({
          modalVisibleRule: true,
        });
      }
    });
    // Start loading the interstitial straight away
    interstitial.load();
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
    this.adEventListener.remove();
  }

  getdebatesRule = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          axios({
            method: "get",
            url: URLConstants.GET_ACTIVE_RULE,
            headers: {
              Token: value,
            },
          })
            .then((response) => {
              console.log("response???????", response);
              this.setState({
                loading: false,
                ruleData: response.data.data,
              });
              // this.props.navigation.navigate("SubscriptionPlan", {
              //   debateId:response.data.data.debateId,
              // });
            })
            .catch((err) => {
              this.setState({ loading: false });
              alert(err.response.data.message);
            });
        }
      });
    });
  };

  categoryById = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            // this.setState({ refreshing: true });
            // let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
            axios
              .get(
                URLConstants.GET_ALL_CATEGORY +
                  "?page=" +
                  this.state.perpage +
                  "&limit=" +
                  50,
                {
                  headers: {
                    Token: value,
                  },
                }
              )
              .then((response) => {
                console.log(response, "=========responce");
                this.setState({
                  SportsCategoryData: response.data.data,
                  loading: false,
                  refreshing: false,
                  userId: userID,
                });
              });
          } else {
            // Ideally load from local storage
            this.setState({ loading: false });
            this.setState({ refreshing: false });
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
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
              });
          } else {
            // Ideally load from local storage
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  onCategoryPress = (data) => {
    this.setState({ cat_array_Id: data._id });
    // const { cat_array_Id } = this.state;
    // const newList = [...cat_array_Id];
    // const itemIndex = newList.findIndex((item) => item === data._id);
    // if (itemIndex > -1) {
    //   newList.splice(itemIndex, 1);
    // } else {
    //   newList.push(data._id);
    // }
    // console.log("==========newlist", newList);
    // this.setState({ cat_array_Id: newList });
  };

  joinDebate = () => {
    this.setState({ modalVisibleRule: false });
    const { fullName, username, profilePic } =
      this?.props?.route?.params?.userInfo;
    this.props.navigation.navigate("VideoRoomScreen", {
      isJoinedScreen: true,
      janusURL: "ws://3.133.56.152/wss",
      roomId: "",
      username: username,
      isParticipant: true,
      userCategory: this.state.cat_array_Id,
      creatorId: this.state.userId,
      debateId: "",
      fullName: fullName,
      profilePic: profilePic,
    });
  };

  categoryValidation = () => {
    return this.state.cat_array_Id.length === 0
      ? alert("Please select atleast one Category")
      : true;
  };

  getActiveRule = () => {
    console.log(this.state.cat_array_Id, "cat ID");
    if (this.state.checkPlan) {
      this.setState({
        modalVisibleRule: true,
      });
    } else {
      if (this.state.adsLoaded) {
        interstitial.show();
      } else {
        this.setState({
          modalVisibleRule: true,
        });
      }
    }
  };

  ruleItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <CustomText
            item={item.description.replace(regex, "")}
            style={styles.rules}
          />

          {/* <HTML source={{ html: item.description }} contentWidth={scale(100)}  style={styles.rules} /> */}

          {/* <CustomText
            item={index + 1 + ".  " + item.description}
            style={styles.rules}
          /> */}
        </View>
      </TouchableOpacity>
    );
  };

  renderRules = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisibleRule}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          this.setState({ modalVisibleRule: false });
        }}
      >
        <Pressable style={styles.modelBackgroud}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              marginVertical: verticalScale(50),
              justifyContent: "flex-end",
            }}
            behavior={Platform.OS == "ios" ? "padding" : ""}
            enabled
            keyboardVerticalOffset={0}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: colors.whiteText,
                width: scale(345),
                alignSelf: "center",
              }}
            >
              <View style={styles.headerStyles}>
                <CustomText
                  item={"Rules of Debate"}
                  style={styles.headerTitle}
                />
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: scale(15),
                    alignSelf: "center",
                  }}
                  onPress={() => {
                    this.setState({ modalVisibleRule: false });
                  }}
                >
                  <Image source={images.close} style={styles.cancelstyle} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={this.state.ruleData}
                renderItem={({ item, index }) => this.ruleItem(item, index)}
                indicatorStyle={"white"}
                showsVerticalScrollIndicator={true}
              />
              <CustomButton
                // onPress={() => addReport(item)}
                title={"Join Debate"}
                buttonStyles={{
                  width: scale(114),
                  height: verticalScale(44),
                  marginTop: verticalScale(10),
                  marginBottom: verticalScale(25),
                  marginLeft: scale(15),
                }}
                onPress={() => this.joinDebate()}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    );
  };

  // getMyProfile = () => {
  //   this.setState({
  //     modalVisibleRule: false,
  //   });
  //   AsyncStorage.getItem("USER_ID").then((userID) => {
  //     AsyncStorage.getItem("USER_TOKEN").then((value) => {
  //       NetInfo.fetch().then((state) => {
  //         if (state.isConnected) {
  //           this.setState({ loading: true });
  //           let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
  //           console.log(url, "==url");
  //           axios
  //             .get(url, {
  //               headers: {
  //                 Token: value,
  //               },
  //             })
  //             .then((response) => {
  //               console.log(
  //                 "======profile choose=================",
  //                 response.data
  //               );
  //               this.setState({
  //                 loading: false,
  //               });
  //               // socket.on("connect", function () {
  //               //   console.log("connection done ==== chat");
  //               //   // socket.emit("user_connection===chat", data);
  //               //   // console.log("tapped called", socket,data)
  //               // });
  //               this.props.navigation.navigate("VideoRoomScreen", {
  //                 isJoinedScreen: true,
  //                 janusURL: "ws://3.133.56.152/wss",
  //                 roomId: "",
  //                 username:
  //                   response.data.data.username +
  //                   Math.floor(1000 + Math.random() * 9000),
  //                 isParticipant: true,
  //                 userCategory: this.state.cat_array_Id,
  //                 creatorId: userID,
  //                 debateId: "",
  //                 fullName:
  //                   response.data.data.firstName +
  //                   " " +
  //                   response.data.data.lastName,
  //                 profilePic: response.data.data.profilePic,
  //               });
  //             });
  //         } else {
  //           // Ideally load from local storage
  //           alert(strings.Please_check_Internet);
  //           this.setState({ loading: false });
  //         }
  //       });
  //     });
  //   });
  // };

  renderAllData = (item) => {
    if (this.props.route.params.isJoinedScreen == true) {
      return (
        <TouchableOpacity
          style={styles.cardConatiner}
          onPress={() => this.onCategoryPress(item)}
        >
          {/* {this.state.cat_array_Id.map((data) => { */}
          {/* return ( */}
          <View>
            {this.state.cat_array_Id === item.category._id ? (
              <CheckIcon style={styles.checkIocn} />
            ) : (
              <View />
            )}
          </View>
          {/* ); */}
          {/* })} */}
          {item.category.image ? (
            <Image
              source={{
                uri: `${URLConstants.IMAGE_URL}${item.category.image}`,
              }}
              style={styles.imagesstyle}
            />
          ) : null}

          <CustomText item={item.category.name} style={styles.categoryTitle} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.cardConatiner}
          onPress={() => this.onCategoryPress(item)}
        >
          {/* {this.state.cat_array_Id.map((data) => {
            return ( */}
          <View>
            {this.state.cat_array_Id === item._id ? (
              <CheckIcon style={styles.checkIocn} />
            ) : (
              <View />
            )}
          </View>
          {/* );
          })} */}
          {item.image ? (
            <Image
              source={{
                uri: `${URLConstants.IMAGE_URL}${item.image}`,
              }}
              style={styles.imagesstyle}
            />
          ) : null}

          <CustomText item={item.name} style={styles.categoryTitle} />
        </TouchableOpacity>
      );
    }
  };

  renderCardData = (item) => {
    return (
      <TouchableOpacity
        style={styles.cardConatiner}
        onPress={() => this.onCategoryPress(item)}
      >
        {/* {this.state.cat_array_Id.map((data) => {
          return ( */}
        <View style={{ position: "absolute", zIndex: 999 }}>
          {this.state.cat_array_Id === item._id ? (
            <CheckIcon style={styles.checkIocn} />
          ) : (
            <View />
          )}
        </View>
        {/* );
        })} */}
        <Image
          source={{
            uri: `${URLConstants.IMAGE_URL}${item.image}`,
          }}
          style={styles.imagesstyle}
        />
        <CustomText item={item.name} style={styles.categoryTitle} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Loader loading={this.state.loading} />
          <FlatList
            data={this.state.SportsCategoryData}
            ListHeaderComponent={() => (
              <CustomText item={""} style={styles.titlestyle} />
            )}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={this.handleLoadMore}
            //style={{marginTop: 2, marginStart: 2}}
            renderItem={({ item, index }) => this.renderCardData(item)}
            numColumns={2}
            // indicatorStyle={"white"}
            extraData={this.state.RefreshFlatList}
            ListFooterComponent={() => (
              <View style={styles.flatlistconatiner} />
            )}
            // showsVerticalScrollIndicator={true}
          />
          {/* </ScrollView> */}
          <View
            style={{
              bottom: Platform.OS === "ios" ? 20 : 0,
              position: "absolute",
            }}
          >
            <CustomButton
              title={"Continue"}
              onPress={() => this.categoryValidation() && this.getActiveRule()}
              buttonStyles={styles.butttonStyles}
            />
          </View>
          {this.renderRules()}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default ChooseCategory;
