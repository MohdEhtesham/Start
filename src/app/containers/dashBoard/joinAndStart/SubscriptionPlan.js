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
} from "react-native";
import { CustomText } from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./SubscriptionPlanStyle";
import scale, { verticalScale } from "../../../themes/Metrics";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../../utils/Strings";
// import R from '../../R';
import * as RNIap from "react-native-iap";
const regex = /(<([^>]+)>)/gi;

const itemSubs = Platform.select({
  ios: ["com.sportstalk.monthly", "icom.sportstalk.weekly"],
  android: ["com.sportstalk.monthly", "icom.sportstalk.weekly"],
});

class SubscriptionPLan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.allSubPlan();
    this.initilizeIAPConnection();
    let purchaseUpdateSubscription = null;
    let purchaseErrorSubscription = null;
    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase) => {
        console.log("purchase", purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            if (Platform.OS === "ios") {
              RNIap.finishTransactionIOS(purchase.transactionId);
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
  }

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
      const Products = await RNIap.getSubscriptions(itemSubs);
      console.log(" IAP Su=============", Products);
      if (Products.length !== 0) {
        if (Platform.OS === "android") {
          console.log("android============");
          //Your logic here to save the products in states etc
        } else if (Platform.OS === "ios") {
          console.log("ios============");
          // your logic here to save the products in states etc
          // Make sure to check the response differently for android and ios as it is different for both
        }
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
          this.setState({ refreshing: true });
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

  requestSubscriptionPlan = async (sku) => {
    // setBuyIsLoading(true);
    console.log("IAP req", sku);
    try {
      await RNIap.requestSubscription(sku)
        .then(async (result) => {
          console.log("IAP req sub", result);
          if (Platform.OS === "android") {
            console.log(result, "==================android");
            // setPurchaseToken(result.purchaseToken);
            // setPackageName(result.packageNameAndroid);
            // setProductId(result.productId);
            // can do your API call here to save the purchase details of particular user
          } else if (Platform.OS === "ios") {
            console.log(result, "==================ios");
            console.log(result.transactionReceipt);
            // setProductId(result.productId);
            // setReceipt(result.transactionReceipt);
            // can do your API call here to save the purchase details of particular user
          }
          // setBuyIsLoading(false);
        })
        .catch((err) => {
          // setBuyIsLoading(false);
          console.log(`IAP req ERROR %%%%% ${err.code}`, err.message);
          // setError(err.message);
        });
    } catch (err) {
      // setBuyIsLoading(false);
      console.log(`err================= ${err}`, err.message);
      // setError(err.message);
    }
  };

  goToFriendList = (item) => {
    // console.log(
    //   "isJoinedScreen isJoinedScreen",
    //   this.props.route.params.isJoinedScreen
    // );

    // if (Platform.OS === "android") {
    //   this.requestSubscriptionPlan(item)
    // }
    // else{

    if (this.props.route.params.isJoinedScreen == true) {
      console.log("hello-----", this.props.route.params.userCategory);
      this.props.navigation.navigate("VideoRoomScreen", {
        isJoinedScreen: true,
        janusURL: "ws://3.133.56.152/wss",
        roomId:"",
        username:  this.props.route.params.userName + Math.floor(1000 + Math.random() * 9000),
        isParticipant: true,
        userCategory: this.props.route.params.userCategory,
        creatorId: this.props.route.params.creatorId,
        debateId: "",
        fullName: this.props.route.params.fullName,
        profilePic:this.props.route.params.profilePic,
        // userName: this.props.route.params.userName,
      });
    } else {
      // this.props.navigation.navigate("Inviteyourfriend", {
      //   debateId: this.props.route.params.debateId,
      //   question: this.props.route.params.question,
      //   isJoinedScreen: false,
      // });
      console.log("dbdhhfb room id",this.props.route.params.roomId)
      this.props.navigation.navigate("VideoRoomScreen", {
        isJoinedScreen: false,
        janusURL: "ws://3.133.56.152/wss",
        roomId:this.props.route.params.roomId,
        username: this.props.route.params.userName + Math.floor(1000 + Math.random() * 9000),
        isParticipant: false,
        debateQuestion: this.props.route.params.debateQuestion,
        userCategory: [],
        creatorId: this.props.route.params.creatorId,
        debateId: this.props.route.params.debateId,
        fullName: this.props.route.params.fullName,
        profilePic:"",
        // userName: this.props.route.params.userName,
      });
      // }
    }
  };
  renderSubPlanData = (item) => {
    console.log(item, "");
    return (
      <View style={styles.textInputConatiner}>
        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <CustomText item={item.name} style={styles.planstyle} />
            <CustomText item={`$${item.price}`} style={styles.$style} />
          </View>
          <CustomText item={"Benefits"} style={styles.$style1} />
          <CustomText
            item={item.description.replace(regex, "")}
            style={styles.contentstyle}
          />
          {/* {console.log(itemSubs[0], "============000000")} */}
          <CustomButton
            title={"Buy"}
            buttonStyles={{
              width: scale(70),
              height: verticalScale(40),
              marginTop: verticalScale(10),
              marginBottom: verticalScale(25),
              //  marginLeft: scale(2)
            }}
            // onPress={() => this.requestSubscriptionPlan(itemSubs[0])}
            onPress={() => this.goToFriendList(itemSubs[0])}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView>
            {/* <Loader loading={this.state.loading} /> */}
            <ScrollView style={styles.Container}>
              <FlatList
                data={this.state.subPlan}
                ListHeaderComponent={() => (
                  <CustomText
                    item={"Subscribe To Our Plan"}
                    style={styles.titlestyle}
                  />
                )}
                renderItem={({ item, index }) => this.renderSubPlanData(item)}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default SubscriptionPLan;
