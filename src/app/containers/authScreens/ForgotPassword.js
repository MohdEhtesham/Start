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
  Alert,
} from "react-native";
import BackIcon from "../../images/svg/back.svg";
import styles from "../Styles/ForgotPasswordStyles";
import CustomButton from "../../components/CustomButton";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import { Strings as strings } from "../../utils/Strings";
import colors from "../../themes/Colors";
import scale from "../../themes/Metrics";
import Images from "../../themes/Images";
import { CustomText } from "../../components/CustomText";
import Loader from "../../components/Loader";
import { isEmailValid } from "../../utils/AppUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NetInfo from "@react-native-community/netinfo";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      loading: false,
    };
  }

  forgotPassword = () => {
    if (!this.state.UserEmail) {
      alert(strings.please_enter_email);
      return;
    }

    if (!isEmailValid(this.state.UserEmail)) {
      alert(strings.please_enter_valid_email);
      return;
    }

    var dataToSend = {
      email: this.state.UserEmail,
    };
    console.log(dataToSend, URLConstants.FORGOTPASSWORD);
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({ loading: true });
        axios({
          method: "post",
          url: URLConstants.FORGOTPASSWORD,
          data: dataToSend,
        })
          .then((response) => {
            this.setState({ loading: false, UserEmail: "" });
            Alert.alert("Success", strings.password_reset_instructions);
          })
          .catch((error) => {
            this.setState({ loading: false });
            alert(error.response.data.message);
          });
      } else {
        // Ideally load from local storage
        this.setState({ loading: false });
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
        <Loader loading={this.state.loading} />
        <View style={styles.backIconstyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <BackIcon width={scale(19)} height={scale(19)} />
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image source={Images.splashLogo} style={styles.appLogo} />
            {/* <Text style={styles.textSignIn}>
              {strings.forgotpasswordTitle}
           </Text>*/}
            <CustomText
              style={styles.textSignIn}
              item={strings.forgotpasswordTitle}
            />
            <CustomText
              style={styles.forgotpasswordDescription}
              item={strings.forgotpasswordDescription}
            />
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"none"}
                value={this.state.UserEmail}
                placeholderTextColor={colors.whiteText}
                placeholder={"Email Address"}
                autoCorrect={false}
                onChangeText={(email) => this.setState({ UserEmail: email })}
              />
            </View>
            <CustomButton
              title={"Submit"}
              // onPress={() => this.props.navigation.navigate("OtpVerification")}
              onPress={this.forgotPassword}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default ForgotPassword;
