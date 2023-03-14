import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import styles from "../Styles/OtpVerificationsStyles";
import BackIcon from "../../images/svg/back.svg";
import EmailIcon from "../../images/svg/email.svg";
import { CustomText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import axios from "axios";
import { URLConstants } from "../../utils/URLConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import scale from "../../themes/Metrics";
import Images from "../../themes/Images";
import Loader from "../../components/Loader";
import { Strings } from "../../utils/Strings";
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpCode: "",
      loading: false,
    };
  }

  resendOtpVerification = () => {
    let userID = this.props.route.params.UserId;
    console.log(userID, "=========useridOTp");
    var dataToSend = {
      userId: userID,
    };
    console.log(dataToSend, URLConstants.RESEND_OTP);
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({ loading: true });
        axios({
          method: "post",
          url: URLConstants.RESEND_OTP,
          data: dataToSend,
        })
          .then((response) => {
            this.setState({ loading: false });
            // handle success
            console.log(response.data, "=========");
           Alert.alert('Success',response.data.message);
          })
          .catch((error) => {
            this.setState({ loading: false });
            // handle error
            alert(error.response.data.message);
          });
      } else {
        // Ideally load from local storage
        alert(strings.Please_check_Internet);
      }
    });
  };
  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  backPressed = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        "Exit App",
        "Do you want to exit?",
        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "Cancel",
          },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    } else {
      return false;
    }
  };

  verifyOTP = () => {
    if (!this.state.otpCode) {
      alert(Strings.please_enter_otp);
      return;
    }
    let userID = this.props.route.params.UserId;
    console.log(userID, "=========useridOTp");
    var dataToSend = {
      userId: userID,
      code: this.state.otpCode,
      otpCode: null,
    };
    console.log(dataToSend, URLConstants.VERIFY_OTP);
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({ loading: true });
        axios({
          method: "post",
          url: URLConstants.VERIFY_OTP,
          data: dataToSend,
        })
          .then((response) => {
            // handle success
            console.log(response.data, "=========");
            try {
              AsyncStorage.setItem("USER_TOKEN", response.data.token);
              AsyncStorage.setItem("USER_ID", response.data.userId);
              AsyncStorage.setItem(
                "NOTIFICATION",
                `${response.data.isNotification}`
              );
            } catch (e) {
              alert("Failed to fetch the data from storage");
            }
            // alert(JSON.stringify(response.data));
            let UserID = this.props.route.params.UserId;

            this.props.navigation.replace("OnBoardingScreen", {
              UserID: UserID,
            });
            this.setState({ loading: false });
          })
          .catch((error) => {
            this.setState({ loading: false });
            // handle error
            console.log(error, "====error");
            alert(error.response.data.message);
            // this.setState({ otpCode: null});
            this.setState({ otpCode: "" });
          });
      } else {
        // Ideally load from local storage
        alert(strings.Please_check_Internet);
      }
    });
  };

  render() {
    // debugger
    // console.log(this.props)
    return (
      <ImageBackground
        source={Images.splashBackgroud}
        style={styles.appContainer}
      >
        <Loader loading={this.state.loading} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <EmailIcon width={130} height={130} style={styles.appLogo} />
            <CustomText
              style={styles.textSignIn}
              item={"We have sent a verification code to your Email Address"}
            />
            <CustomText
              style={styles.forgotpasswordDescription}
              item={"Please enter the 4 digit code Provided"}
            />
            <OTPInputView
              style={styles.textInputConatiner}
              pinCount={4}
              code={this.state.otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={(code) => {
                this.setState({ otpCode: code });
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              //codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
            <CustomButton title={"Verify"} onPress={this.verifyOTP} />
            <TouchableOpacity onPress={this.resendOtpVerification}>
              <CustomText style={styles.resendCode} item={"Resend Code"} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default OtpVerification;
