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
  Alert,
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
// const regex = /(<([^>]+)>)/gi;
const regex = /(&nbsp;|<([^>]+)>)/gi;

import io from "socket.io-client";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "@react-native-firebase/admob";

// const adUnitId = TestIds.INTERSTITIAL;
const adUnitId= Platform.OS === "android"? "ca-app-pub-6649447227642695/3534907011":"ca-app-pub-6649447227642695/5212048249";


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

class CategoryAllChoose extends Component {

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
      modalVisible: false,
      modalVisibleRule: false,
      debateQuestion: "",
      categoryId: "",
      debateId: "",
      userId: "",
      roomId: "",
      checkPlan: false,
      adsLoaded: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      // your logic will go here
      // this.setState({ cat_array_Id: [], SportsCategoryData: [], perpage: 1 });
      this.allCategory();
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

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.allCategory();
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        perpage: this.state.perpage + 1,
      },
      () => this.allCategory()
    );
  };

  subscriptionScreen = (response, userId) => {
    // console.log("final response", response);
    this.props.navigation.navigate("VideoRoomScreen", {
      debateId: response.data.data.debateId,
      debateQuestion: this.state.debateQuestion,
      isJoinedScreen: false,
      creatorId: userId,
    });
  };

  allCategory = () => {
    // console.log("page", this.state.perpage);
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState({ loading: true });
          // this.setState({ refreshing: true });
          axios
            .get(
              URLConstants.GET_ALL_CATEGORY +
                "?page=" +
                this.state.perpage +
                "&limit=" +
                30,
              {
                headers: {
                  Token: value,
                },
              }
            )
            .then((response) => {
              this.setState({
                SportsCategoryData:
                  this.state.perpage === 1
                    ? response.data.data
                    : [...this.state.SportsCategoryData, ...response.data.data],
              });
              // console.log(
              //   this.state.SportsCategoryData,
              //   "==============SportsCategoryData"
              // );

              this.setState({ loading: false });
              this.setState({ refreshing: false });
            });
        } else {
          // Ideally load from local storage
          this.setState({ loading: false });
          this.setState({ refreshing: false });
          alert(strings.Please_check_Internet);
        }
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

  debateQuestionCall = () => {
    if (this.state.debateQuestion.length > 0) {
      this.state.debateQuestion.trimStart();
    }
    // console.log("question", this.state.debateQuestion)

    if (this.state.debateQuestion.length == 0) {
      alert("Debate Question is Mandatory ");
    } else {
      this.setState({ loading: true });

      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        AsyncStorage.getItem("USER_ID").then((userId) => {
          NetInfo.fetch().then((state) => {
            if (state.isConnected) {
              var dataToSend = {
                creatorId: userId,
                categoryId: this.state.categoryId,
                time: 60000, //one min
                question: this.state.debateQuestion,
              };
              console.log("data", dataToSend);
              axios({
                method: "post",
                url: URLConstants.ADD_DEBATE_QUESTION,
                data: dataToSend,

                headers: {
                  Token: value,
                },
              }).then((response) => {
                console.log("responsr-----debate id----", response.data.data);

                this.setState({ modalVisible: false, loading: true });
                this.getActiveRule(response, response.data.data.question);
                // Alert.alert(
                //   "Success",
                //   response.data.message,
                //   // <- this part is optional, you can pass an empty string
                //   [
                //     {
                //       text: "OK",
                //       onPress: () =>
                //         this.getActiveRule(
                //           response,
                //           response.data.data.question
                //         ),
                //     },
                //   ],
                //   { cancelable: false }
                // );
              });
            } else {
              this.setState({ loading: false });

              // Ideally load from local storage
              alert(strings.Please_check_Internet);
            }
          });
        });
      });
    }
  };
  categorySelected = () => {
    // console.log("called");
    if (this.props.route.params.isJoinedScreen == true) {
    } else {
      this.setState({ modalVisible: false });
    }
  };

  sendNotification = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userid) => {
        var dataToSend = {
          creatorId: userid,
          debateId: this.state.debateId,
        };
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            let finalurl = URLConstants.SEND_NOTIFICATION;
            console.log(
              "sendNotification=======",
              finalurl,
              dataToSend,
              "=====url==========="
            );
            axios({
              method: "post",
              url: URLConstants.SEND_NOTIFICATION,
              headers: {
                Token: value,
              },
              data: dataToSend,
            }).then((response) => {
              this.setState({ loading: false });
              this.setState({ refreshing: false });
            });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  getActiveRule = (responseNew, questions) => {
    AsyncStorage.getItem("USER_ID").then((USERID) => {
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
                console.log(
                  "response=====-----------==================",
                  responseNew,
                  USERID,
                  this.state.debateQuestion
                );
                console.log("plan active--------->", this.state.checkPlan);
                this.setState({
                  modalVisible: false,
                  loading: false,
                  ruleData: response.data.data,
                  debateId: responseNew.data.data.debateId,
                  debateQuestion: this.state.debateQuestion,
                  userId: USERID,
                  roomId: responseNew.data.data.roomId,
                });
                setTimeout(() => {
                  if (this.state.checkPlan) {
                    console.log("cmng this1");

                    this.setState({
                      modalVisibleRule: true,
                    });
                  } else {
                    if (this.state.adsLoaded) {
                      console.log("cmng this");
                      interstitial.show();
                    } else {
                      console.log("cmng this2");

                      this.setState({
                        modalVisibleRule: true,
                      });
                    }
                  }
                }, 500);

                // this.props.navigation.navigate("SubscriptionPlan", {
                //   debateId:response.data.data.debateId,
                // });
              })
              .catch((err) => {
                // console.log("erro", err.response.data.message);
                this.setState({ loading: false });
                alert(err.response.data.message);
                // alert(error.response);
              });
          }
        });
      });
    });
  };
  ruleItem = (item, index) => {
    // console.log("item", index);
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <CustomText
            item={item.description.replace(regex, "")}
            style={styles.rules}
          />
        </View>
      </TouchableOpacity>
    );
  };
  startDebate = () => {
    this.setState({ modalVisible: false, modalVisibleRule: false });
    const {fullName,username,profilePic } =this?.props?.route?.params?.userInfo;
    this.props.navigation.navigate("VideoRoomScreen", {
      isJoinedScreen: false,
      janusURL: "ws://3.133.56.152/wss",
      roomId: this.state.roomId,
      username: username,
      isParticipant: false,
      debateQuestion: this.state.debateQuestion,
      userCategory: [],
      creatorId: this.state.userId,
      debateId: this.state.debateId,
      fullName: fullName,
      profilePic: profilePic,
    });
    this.sendNotification();
  };
  // getMyProfile = () => {
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
  //               console.log("before ========connection ==== video");
  //               const socket = io(URLConstants.SOCKET_URL);
  //               socket.on("connect", function () {
  //                 console.log("connection done ==== Video");
  //               });
  //               console.log(" after  connection ==== video");
  //               this.setState({
  //                 loading: false,
  //               });
  //               this.props.navigation.navigate("VideoRoomScreen", {
  //                 isJoinedScreen: false,
  //                 janusURL: "ws://3.133.56.152/wss",
  //                 roomId: this.state.roomId,
  //                 username:
  //                   response.data.data.username +
  //                   Math.floor(1000 + Math.random() * 9000),
  //                 isParticipant: false,
  //                 debateQuestion: this.state.debateQuestion,
  //                 userCategory: [],
  //                 creatorId: this.state.userId,
  //                 debateId: this.state.debateId,
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
                title={"Start Debate"}
                buttonStyles={{
                  width: scale(114),
                  height: verticalScale(44),
                  marginTop: verticalScale(10),
                  marginBottom: verticalScale(25),
                  marginLeft: scale(15),
                }}
                onPress={() => this.startDebate()}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    );
  };

  renderReport = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          this.setState({ modalVisible: false });
        }}
      >
        <Pressable style={styles.modelBackgroud}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
            behavior={Platform.OS == "ios" ? "padding" : ""}
            enabled
            keyboardVerticalOffset={0}
          >
            <View
              style={{
                backgroundColor: colors.whiteText,
                width: scale(345),
                alignSelf: "center",
              }}
            >
              <View style={styles.headerStyles}>
                <CustomText
                  item={"Debate Question"}
                  style={styles.headerTitle}
                />
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: scale(15),
                    alignSelf: "center",
                  }}
                  onPress={() => this.setState({ modalVisible: false })}
                >
                  <Image source={images.close} style={styles.cancelstyle} />
                </TouchableOpacity>
              </View>
              <TextInput
                style={{
                  width: scale(319),
                  height: verticalScale(104),
                  marginTop: verticalScale(20),
                  alignSelf: "center",
                  borderWidth: 0.5,
                  borderRadius: 5,
                  padding: 10,
                  color: colors.black,
                  textAlignVertical: "top",
                }}
                placeholderTextColor={colors.textblack_555555}
                // editable
                //maxLength={100}
                //numberOfLines={4}
                placeholder={""}
                //value={description}
                onChangeText={(text) => this.setState({ debateQuestion: text })}
                multiline={true}
                // underlineColorAndroid="transprent"
              />
              <CustomButton
                // onPress={() => addReport(item)}
                title={"Submit"}
                buttonStyles={{
                  width: scale(137),
                  height: verticalScale(44),
                  marginTop: verticalScale(10),
                  marginBottom: verticalScale(25),
                  marginLeft: scale(13),
                }}
                onPress={() => this.debateQuestionCall()}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    );
  };
  onCategoryPress = (data) => {
    this.setState({
      modalVisible: true,
      categoryId: data._id,
      debateQuestion: "",
    });
  };

  renderCardDataAll = (item) => {
    // console.log("final----------------",item.image,item._id)
    return (
      <TouchableOpacity
        style={styles.cardConatiner}
        onPress={() => this.onCategoryPress(item)}
      >
        {this.state.cat_array_Id.map((data) => {
          return (
            <View>
              {data === item._id ? (
                <CheckIcon style={styles.checkIocn} />
              ) : (
                <View />
              )}
            </View>
          );
        })}
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
          {this.renderReport()}
          {this.renderRules()}
          <FlatList
            data={this.state.SportsCategoryData}
            ListHeaderComponent={() => (
              <CustomText item={""} style={styles.titlestyle} />
            )}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            // onEndReachedThreshold={0.1}
            // onEndReached={this.handleLoadMore}
            //style={{marginTop: 2, marginStart: 2}}

            renderItem={({ item, index }) => this.renderCardDataAll(item)}
            numColumns={2}
            // indicatorStyle={"white"}
            extraData={this.state.RefreshFlatList}
            ListFooterComponent={() => (
              <View style={styles.flatlistconatiner} />
            )}
            // showsVerticalScrollIndicator={true}
          />
          {/* </ScrollView> */}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default CategoryAllChoose;
