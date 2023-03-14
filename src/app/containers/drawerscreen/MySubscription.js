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
  RefreshControl,
  Linking,
  Platform,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./MySubscriptionStyle";
import scale, { verticalScale } from "../../themes/Metrics";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../utils/Strings";
// import R from '../../R';
import * as RNIap from "react-native-iap";
import colors from "../../themes/Colors";
const regex = /(<([^>]+)>)/gi;
import moment from "moment";
import DeviceInfo from "react-native-device-info";

const itemSubs = Platform.select({
  ios: ["com.sportstalk.weekly", "com.sportstalk.monthly"],
  android: ["com.sportstalk.weekly", "com.sportstalk.monthly"],
});

class MySubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: [],
      loading: false,
      receipt: "",
      receiptdata: "",
      refreshing: false,
      checkPlan: {},
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      console.log(DeviceInfo.getUniqueId(), "========================");
      this.allSubPlan();
      this.checkSub();
      await this.initilizeIAPConnection();
      let purchaseUpdateSubscription = null;
      let purchaseErrorSubscription = null;
      purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
        async (purchase) => {
          console.log("purchase=======", purchase);
          this.setState({ receiptdata: purchase });
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            try {
              if (Platform.OS === "ios") {
                // RNIap.finishTransaction(purchase, true);
                let updatedata = RNIap.validateReceiptIos(receipt).then((res) =>
                  console.log("res=====", res)
                );
              } else if (Platform.OS === "android") {
                await RNIap.consumeAllItemsAndroid(purchase.purchaseToken);
                await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
              }
              await RNIap.finishTransaction(purchase, true);
            } catch (ackErr) {
              console.log("ackErr INAPP>>>>", ackErr);
            }
          }
        }
      );
      purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
        console.log("purchaseErrorListener INAPP>>>>", error);
      });

      return () => {
        if (purchaseUpdateSubscription) {
          purchaseUpdateSubscription.remove();
          purchaseUpdateSubscription = null;
        }
        if (purchaseErrorSubscription) {
          purchaseErrorSubscription.remove();
          purchaseErrorSubscription = null;
        }
      };
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  checkSub = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
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
                  response.data,
                  "checkSub================================="
                );
                this.setState({
                  loading: false,
                  checkPlan: response.data.data,
                });
              })
              .catch((error) => {
                // handle error
                console.log(error.response, "checkSub==================");
                this.setState({ loading: false });
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

  initilizeIAPConnection = async () => {
    await RNIap.initConnection()
      .then(async (connection) => {
        console.log("IAP result", connection);
        this.getItems();
      })
      .catch((err) => {
        console.log(`IAP ERROR ${err.code}`, err.message);
      });
    await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
      .then(async (consumed) => {
        console.log("consumed all items?", consumed);
      })
      .catch((err) => {
        console.log(
          `flushFailedPurchasesCachedAsPendingAndroid ERROR ${err.code}`,
          err.message
        );
      });
  };

  getItems = async () => {
    try {
      console.log("itemSubs ", itemSubs);
      if (Platform.OS === "ios") {
        const Products = await RNIap.getProducts(itemSubs);
        console.log(
          " IAP Su===============================================",
          Products
        );
      } else {
        const Products = await RNIap.getSubscriptions(itemSubs);
        console.log(
          " IAP Su===============================================",
          Products
        );
      }
    } catch (err) {
      console.warn("IAP error", err.code, err.message, err);
      // setError(err.message);
    }
  };

  allSubPlan = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState({ loading: true });
          //this.setState({ refreshing: false });
          axios
            .get(URLConstants.SUBSCRIPTION_PLAN, {
              headers: {
                Token: value,
              },
            })
            .then((response) => {
              console.log(response, "====");
              this.setState({ subPlan: response.data.data });
              this.setState({ loading: false });
              this.setState({ refreshing: false });
            });
        } else {
          // Ideally load from local storage
          alert(strings.Please_check_Internet);
        }
      });
    });
  };

  purchaseSubscription = (purchase) => {
    console.log(DeviceInfo.getUniqueId(), "========================");
    console.log(purchase, "===============purchase");
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            var dataToSend = {
              userId: userID,
              receipt: purchase,
              orderId: purchase.transactionId,
              purchaseToken:
                Platform.OS === "android"
                  ? purchase.purchaseToken
                  : purchase.transactionReceipt,
              subscriptionType:
                purchase.productId == "com.sportstalk.monthly"
                  ? "Monthly"
                  : "Weekly",
              deviceType: Platform.OS === "android" ? "android" : "ios",
              deviceId: DeviceInfo.getUniqueId(),
            };
            console.log(
              dataToSend,
              URLConstants.PAYMENT_ADD,
              "============================"
            );
            axios({
              method: "post",
              url: URLConstants.PAYMENT_ADD,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                this.checkSub();
                console.log(
                  response.data,
                  "purchaseSubscription==================responce"
                );
                this.setState({ loading: false });
              })
              .catch((error) => {
                this.checkSub();
                // handle error
                console.log(
                  error.response,
                  "purchaseSubscription==================error"
                );
                this.setState({ loading: false });
                console.log(error.response.data);
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
  goNext = (purchase) => {
    this.purchaseSubscription(purchase);
    // alert("payment done");
    // console.log(
    //   JSON.stringify(this.state.receipt),
    //   this.state.receipt,
    //   "======="
    // );
    // alert("Thank you for purchasing the plan");
    // Alert.alert("Payment Success Response", JSON.stringify(this.state.receipt));
  };

  requestSubscriptionPlan = async (sku) => {
    console.log(sku, "=====");
    await RNIap.requestPurchase(sku)
      .then(async (purchase) => {
        // this.setState({loading:true})
        console.log("this.state", this.state);
        console.log("purchaseRequest", purchase);
        if (Platform.OS !== "ios") {
          this.setState(
            {
              receipt: purchase.transactionReceipt,
            },
            () => this.goNext(purchase)
          );
        } else {
          this.setState(
            {
              receipt: JSON.parse(JSON.stringify(purchase.transactionReceipt)),
            },
            () => this.goNext(purchase)
          );
        }

        // handle success of purchase product
      })
      .catch((error) => {
        // console.log("requestError", error);
        this.setState({ loading: false });
        // Toast(error.message, "danger");
        console.log("ERROR == ", error.message);
      });
  };

  goToFriendList = () => {
    console.log(
      "isJoinedScreen isJoinedScreen",
      this.props.route.params.isJoinedScreen
    );
    if (this.props.route.params.isJoinedScreen == true) {
      console.log("hello-----");
      // this.props.navigation.navigate("VideoRoomScreen", {
      //   isJoinedScreen:true,
      //   janusURL: "https://janus.codescripts.in/wss",
      //   roomId: "1234",
      //   username: "suv",
      //   isParticipant: false,

      // });
    } else {
      this.props.navigation.navigate("Inviteyourfriend", {
        debateId: this.props.route.params.debateId,
        question: this.props.route.params.question,
        isJoinedScreen: false,
      });
    }
  };
  renderLink = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={styles.bullet} />

        <Text
          onPress={() => Linking.openURL(URLConstants.PRIVACY_POLICY)}
          style={[styles.linkText, { color: "blue", paddingLeft: 10 }]}
        >
          Privacy Policy
        </Text>
        <Text style={[styles.linkText, { paddingHorizontal: 5 }]}>and</Text>
        <Text
          onPress={() =>
            Linking.openURL(
              "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            )
          }
          style={[styles.linkText, { color: "blue" }]}
        >
          and Terms of Use
        </Text>
      </View>
    );
  };
  renderTermsOfUse = (item) => {
    return (
      <>
        <CustomText
          item={item?.title}
          style={[
            styles.planstyle,
            {
              // marginTop: 0,
              fontSize: scale(16),
            },
          ]}
        />
        {item?.condition.map((itemVal) => {
          return (
            <View style={styles.termsWrap}>
              <View style={styles.bullet} />
              <CustomText
                item={itemVal}
                style={[
                  styles.contentstyle,
                  {
                    paddingLeft: 10,
                  },
                ]}
              />
            </View>
          );
        })}
      </>
    );
  };
  renderSubPlanData = (item, index) => {
    console.log("item-->", item);
    return (
      <View style={styles.textInputConatiner}>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // marginVertical: 10,
            }}
          >
            <View style={{ width: scale(210) }}>
              <CustomText item={item.name} style={styles.planstyle} />
            </View>
            <CustomText item={`$${item.price}`} style={styles.$style} />
          </View>
          <CustomText item={"Benefits"} style={styles.$style1} />
          <CustomText
            item={item.description.replace(regex, "")}
            style={styles.contentstyle}
          />
          {/* {console.log(itemSubs[0], "============000000")} */}
          {/* {console.log(itemSubs, item, index, "======================")} */}
          {/* {index==itemSubs} */}
          {/* {Platform.OS === "ios" && (
            <CustomText
              item={item?.iosTermsofUser?.title}
              style={[
                styles.planstyle,
                {
                  // marginTop: 0,
                  fontSize: scale(16),
                },
              ]}
            />
          )} */}
          {/* {Platform.OS === "ios" &&
            item?.iosTermsofUser?.condition.map((itemVal) => {
              return (
                <View
                  style={styles.termsWrap}>
                 
                  <View style={styles.bullet} />
                  <CustomText
                    item={itemVal}
                    style={[
                      styles.contentstyle,
                      {
                        paddingLeft: 10,
                      },
                    ]}
                  />
                </View>
              );
            })} */}
          {Platform.OS === "ios" && this.renderTermsOfUse(item?.iosTermsofUser)}

          {Platform.OS === "android" &&
            this.renderTermsOfUse(item?.androidTermsofUser)}

          {Platform.OS === "ios" && this.renderLink()}

          {index == 0 ? (
            <CustomButton
              title={"Buy"}
              buttonStyles={{
                width: scale(70),
                height: verticalScale(40),
                marginTop: verticalScale(10),
                // marginBottom: verticalScale(25),
                //  marginLeft: scale(2)
              }}
              onPress={() => this.requestSubscriptionPlan(itemSubs[0])}
            />
          ) : index == 1 ? (
            <CustomButton
              title={"Buy"}
              buttonStyles={{
                width: scale(70),
                height: verticalScale(40),
                marginTop: verticalScale(10),
                // marginBottom: verticalScale(25),
                //  marginLeft: scale(2)
              }}
              onPress={() => this.requestSubscriptionPlan(itemSubs[1])}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  };
  loadMore = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.checkSub();
      this.setState({ refreshing: false });
    }, 1000);
  };
  cancelSubscription = () => {
    if (Platform.OS === "android") {
      // Linking.openURL('https://play.google.com/store/apps/details?id=com.pennai')
      Linking.openURL("https://play.google.com/store/account/subscriptions");
    } else Linking.openURL("https://apps.apple.com/account/subscriptions");
  };
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Loader loading={this.state.loading} />
          <ScrollView
            style={styles.Container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadMore}
              />
            }
          >
            {this.state.checkPlan && this.state.checkPlan.user ? (
              <>
                {this.state.checkPlan.user.receipt &&
                this.state.checkPlan.user.receipt.success ? (
                  <ScrollView style={styles.Container}>
                    <CustomText
                      item={"My Subscription Plan"}
                      style={styles.titlestyle}
                    />
                    <View style={styles.textInputConatiner}>
                      <View style={{ marginHorizontal: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* {console.log(
                              this.state.checkPlan.user.receipt.data[0]
                                .productId
                            )} */}
                          <CustomText
                            item={
                              this.state.checkPlan.user.receipt.data[0]
                                .productId == "com.sportstalk.weekly"
                                ? "SportsTalk Weekly Plan"
                                : "SportsTalk Monthly Plan"
                            }
                            style={styles.planstyle}
                          />
                          <CustomText
                            item={
                              this.state.checkPlan.user.receipt.data[0]
                                .productId == "com.sportstalk.weekly"
                                ? "$4.99"
                                : "$9.99"
                            }
                            style={styles.$style}
                          />
                        </View>
                        <CustomText item={"Benefits"} style={styles.$style1} />
                        <CustomText
                          item={this.state.checkPlan.user.benefits}
                          style={styles.contentstyle}
                        />
                        <CustomText
                          item={
                            this.state.checkPlan.user.receipt.data[0]
                              .productId == "com.sportstalk.weekly"
                              ? `Days Remaining: ${moment(
                                  new Date(
                                    parseInt(
                                      this.state.checkPlan.user.receipt.data[0]
                                        .expirationDate
                                    )
                                  )
                                ).fromNow()}`
                              : `Days Remaining: ${moment(
                                  new Date(
                                    parseInt(
                                      this.state.checkPlan.user.receipt.data[0]
                                        .expirationDate
                                    )
                                  )
                                ).fromNow()}`
                          }
                          style={styles.Daysstyle}
                        />
                      </View>
                    </View>
                    <View style={styles.renewandcancelcontainer}>
                      <View></View>

                      <TouchableOpacity
                        onPress={() => this.cancelSubscription()}
                      >
                        <CustomText item={"Cancel"} style={styles.renewStyle} />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                ) : (
                  <FlatList
                    data={this.state.subPlan}
                    ListHeaderComponent={() => (
                      <CustomText
                        item={"Subscribe To Our Plan"}
                        style={styles.titlestyle}
                      />
                    )}
                    renderItem={({ item, index }) =>
                      this.renderSubPlanData(item, index)
                    }
                  />
                )}
              </>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default MySubscription;
