import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../Styles/LoginStyles";
import CustomButton from "../../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Strings as strings } from "../../utils/Strings";
import colors from "../../themes/Colors";
import { isEmailValid } from "../../utils/AppUtils";
// import { connect } from "react-redux";
// import AuthActions from "../../redux/AuthRedux";
import NetInfo from "@react-native-community/netinfo";
import Images from "../../themes/Images";
import { CustomText } from "../../components/CustomText";
import Loader from "../../components/Loader";
import axios from "axios";
import { URLConstants } from "../../utils/URLConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
// import crashlytics from "@react-native-firebase/crashlytics";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      loading: false,
      deviceToken: "",
    };
  }

  componentDidMount = async () => {
    var fcmToken = await messaging().getToken();
    if (fcmToken) {
      this.setState({ deviceToken: fcmToken });
      console.log("Your Firebase Token is in Login:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const { isLoginSuccess, isLoginFailure } = this.props;
  //   if (
  //     isLoginSuccess !== prevProps.isLoginSuccess &&
  //     isLoginSuccess &&
  //     prevState.loading
  //   ) {
  //     this.setState({ loading: false });
  //     alert("SUcess");
  //     // this.props.navigation.navigate('')
  //     this.props.navigation.navigate("MainNavigator");
  //   }

  //   if (
  //     isLoginFailure !== prevProps.isLoginFailure &&
  //     isLoginFailure &&
  //     prevState.loading
  //   ) {
  //     this.setState({ loading: false });
  //     console.log(isLoginFailure, "=============");
  //     alert("failure");
  //   }
  // }

  loginUser = () => {
    if (!this.state.Email) {
      alert(strings.please_enter_email);
      return;
    }

    if (!isEmailValid(this.state.Email)) {
      alert(strings.please_enter_valid_email);
      return;
    }

    if (!this.state.Password) {
      alert(strings.please_enter_password);
      return;
    }

    // let email = this.state.Email;
    // let password = this.state.Password;
    // this.props.loginRequest(email, password);
    NetInfo.fetch().then((state) => {
      var dataToSend = {
        email: this.state.Email,
        password: this.state.Password,
        deviceToken: this.state.deviceToken,
        deviceType: Platform.OS,
      };
      if (state.isConnected) {
        this.setState({ loading: true });
        console.log(URLConstants.LOGIN_URL, dataToSend, "==============");
        axios({
          method: "post",
          url: URLConstants.LOGIN_URL,
          data: dataToSend,
        })
          .then((response) => {
            // crashlytics().log("UserSignin=========");
            try {
              AsyncStorage.setItem("USER_TOKEN", response.data.token);
              AsyncStorage.setItem("USER_ID", response.data.userId);
              AsyncStorage.setItem("USER_PROFILE", response.data.profilePic);
              AsyncStorage.setItem("USER_EMAIL", response.data.email);
              AsyncStorage.setItem(
                "NOTIFICATION",
                `${response.data.isNotification}`
              );
              // crashlytics().crash();
            } catch (e) {
              alert("Failed to fetch the data from storage");
            }
            console.log(response, "===============res");
            this.setState({ loading: false });
            // let userToken = AsyncStorage.getItem("USER_TOKEN");
            if (response.data.categories.length === 0) {
              this.props.navigation.navigate("OnBoardingScreen");
            } else {
              let userToken = AsyncStorage.getItem("USER_TOKEN");
              if (userToken) {
                AsyncStorage.setItem("CATEGORY_ADDED", "true");
                this.props.navigation.replace("MainNavigator");
              } else {
                this.props.navigation.navigate("Login");
              }
            }
          })
          .catch((error) => {
            this.setState({ loading: false });
            alert(error.response.data.message);
            if (!error.response.data.data.userVerified) {
              this.props.navigation.navigate("OtpVerification", {
                UserId: error.response.data.data.userId,
              });
            }
          });
      } else {
        // Ideally load from local storage
        alert(strings.Please_check_Internet);
      }
    });
  };

  render() {
    return (
      <ImageBackground
        source={Images.splashBackgroud}
        style={styles.appContainer}
      >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Loader loading={this.state.loading} />
            <Image source={Images.splashLogo} style={styles.appLogo} />
            <CustomText item={strings.SignIn} style={styles.textSignIn} />
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"none"}
                placeholderTextColor={colors.whiteText}
                placeholder={"Email Address"}
                autoCorrect={false}
                onChangeText={(email) => this.setState({ Email: email })}
              />
            </View>
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                placeholderTextColor={colors.whiteText}
                autoCapitalize={"none"}
                placeholder={"Password"}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(password) =>
                  this.setState({ Password: password })
                }
              />
            </View>
            <CustomButton
              title={"Submit"}
              onPress={this.loginUser}
              // onPress={()=> this.props.navigation.navigate('MainNavigator')}
            />
            <View style={styles.createandforgotcontainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                <CustomText
                  item={strings.createAccount}
                  style={styles.createAccountStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
              >
                <CustomText
                  item={strings.forgotPassword}
                  style={styles.createAccountStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default Login;

// const mapStateToProps = (state) => ({
//   isLoginSuccess: state.auth.isLoginSuccess,
//   isLoginFailure: state.auth.isLoginFailure,
// });

// // wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = (dispatch) => ({
//   loginRequest: (username, password) =>
//     dispatch(AuthActions.loginRequest(username, password)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
