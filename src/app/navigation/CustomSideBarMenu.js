import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import scale, { verticalScale } from "../themes/Metrics";
import BackIcon from "../images/svg/back.svg";
import images from "../themes/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLConstants } from "../utils/URLConstants";
import axios from "axios";
import Loader from "../components/Loader";
import DefaultProfileImage from "../components/DefaultProfileImage";
import Styles from "./Styles/CustomSideBarMenuStyles";
import { CustomText } from "../components/CustomText";
import colors from "../themes/Colors";
import NetInfo from "@react-native-community/netinfo";
import messaging from "@react-native-firebase/messaging";

class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: "",
      profiledata: "",
      loading: false,
      profileImage: "",
      userEmail: "",
      deviceToken: "",
    };
  }
  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getMyProfile();
      var fcmToken = await messaging().getToken();
      if (fcmToken) {
        this.setState({ deviceToken: fcmToken });
        console.log("Your Firebase Token is in Login:", fcmToken);
      } else {
        console.log("Failed", "No token received");
      }
    });
  }

  componentWillReceiveProps() {
    this.getMyProfile();
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  getMyProfile = () => {
    AsyncStorage.getItem("NOTIFICATION").then((value) => {
      console.log(value, "============================================");
      this.setState({ switchValue: value });
    });
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        this.setState({ loading: true });
        let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
        console.log(url, "==url");
        axios
          .get(url, {
            headers: {
              Token: value,
            },
          })
          .then((response) => {
            // console.log(response.data.data, "==============response");
            // console.log(
            //   response.data,
            //   "==============profiledataprofiledataprofiledata"
            // );
            this.setState({ profiledata: response.data.data });
            this.setState({ loading: false });
          });
      });
    });
  };

  logOutUser = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        "Alert",
        "Are you sure you want to logout?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              this.logOutwithUserToken() &&
                AsyncStorage.clear().then(() => {
                  // this.props.navigation.navigate("Login");
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: "AuthNavigator" }],
                  });
                });
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    } else {
      return false;
    }
  };

  logOutwithUserToken = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userId) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userId,
              deviceToken: this.state.deviceToken,
            };
            axios({
              method: "post",
              url: URLConstants.LOG_OUT,
              data: dataToSend,
              headers: {
                Token: value,
              },
            }).then((response) => {
              console.log("responsr---------", response);
              this.setState({ loading: false });
              this.props.navigation.reset({
                index: 0,
                routes: [{ name: "AuthNavigator" }],
              });
            });
          } else {
            this.setState({ loading: false });
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  notificationManager = (switchValue) => {
    console.log(switchValue, "==========");
    AsyncStorage.setItem("NOTIFICATION", `${switchValue}`);
    this.setState({ switchValue: switchValue });
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        this.setState({ loading: true });
        let showNotification = URLConstants.SHOW_NOTIFICATIONS + `/${userID}`;
        let hideNotification = URLConstants.HIDE_NOTIFICATIONS + `/${userID}`;
        let finalUrl = switchValue ? showNotification : hideNotification;
        console.log(finalUrl, "==url");
        axios
          .get(finalUrl, {
            headers: {
              Token: value,
            },
          })
          .then((response) => {
            console.log(response, "=========");
            this.setState({ loading: false });
          });
      });
    });
  };

  render() {
    return (
      <SafeAreaView style={Styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <BackIcon
            width={scale(19)}
            height={scale(29)}
            style={Styles.backIconstyle}
          />
        </TouchableOpacity>
        <ScrollView>
          <View style={Styles.imageconatiner}>
            {this.state.profiledata.profilePic == "" ? (
              <Image style={Styles.imageprofile} source={images.blankProfile} />
            ) : (
              <DefaultProfileImage
                style={Styles.imageprofile}
                uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.profiledata.profilePic}`}
              />
            )}
          </View>
          <View
            style={{
              // width: scale(300),
              // backgroundColor: "green",
              alignSelf: "center",
            }}
          >
            <CustomText
              numberOfLines={1}
              // maxLength={"50"}
              style={Styles.userName}
              item={`${
                this.state.profiledata.firstName
                  ? this.state.profiledata.firstName
                  : ""
              } ${
                this.state.profiledata.lastName
                  ? this.state.profiledata.lastName
                  : ""
              }`}
            />
            <CustomText
              style={Styles.useremail}
              item={this.state.profiledata.email}
            />
          </View>
          <View
            style={{
              marginHorizontal: scale(14),
              marginTop: verticalScale(34),
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TimeLineScreen")}
            >
              <CustomText style={Styles.timelinescreen} item={"Timeline"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyProfile")}
            >
              <CustomText style={Styles.timelinescreen} item={"My Profile"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MySubscription")}
            >
              <CustomText
                style={Styles.timelinescreen}
                item={"My Subscription"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              <CustomText
                style={Styles.timelinescreen}
                item={"Change Password"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                // this.props.navigation.navigate("TermAndConditions")
                Linking.openURL(URLConstants.TERMS_CONDITION)
              }
            >
              <CustomText
                style={Styles.timelinescreen}
                item={"Terms and Conditions"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                // this.props.navigation.navigate("PrivacyPolicy")
                Linking.openURL(URLConstants.PRIVACY_POLICY)
              }
            >
              <CustomText
                style={Styles.timelinescreen}
                item={"Privacy Policy"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.logOutUser() && this.props.navigation.goBack()
              }
            >
              <CustomText style={Styles.timelinescreen} item={"Log Out"} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: verticalScale(26),
              }}
            >
              <CustomText
                style={Styles.timelinescreenNotication}
                item={"Push Notification"}
              />
              <Switch
                style={{
                  borderColor: "#F1C86B",
                  borderWidth: scale(0.5),
                  borderRadius: scale(15),
                }}
                value={
                  this.state.switchValue == "true"
                    ? true
                    : this.state.switchValue
                }
                trackColor={{ false: "#fffff", true: "#36CE6E" }}
                thumbColor={true ? "#fffff" : "#36CE6E"}
                // ios_backgroundColor={"#6A6A6A"}
                backgroundColor={"transparent"}
                onValueChange={(switchValue) => {
                  this.setState({ switchValue });
                  this.notificationManager(switchValue);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CustomSidebarMenu;
