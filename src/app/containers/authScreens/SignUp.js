/* eslint-disable no-alert */
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
  Modal,
  Pressable,
  Alert,
  Keyboard,
  Platform,
  Linking,
} from "react-native";
import styles from "../Styles/SignUPStyles";
import CustomButton from "../../components/CustomButton";
import ImagePicker from "react-native-image-crop-picker";
import {
  isEmailValid,
  isfirstnameValid,
  isPasswordValid,
  isUserNameValid,
} from "../../utils/AppUtils";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loader from "../../components/Loader";
import BackIcon from "../../images/svg/back.svg";
import NetInfo from "@react-native-community/netinfo";
import colors from "../../themes/Colors";
import Images from "../../themes/Images";
import UserIcon from "../../images/svg/account-setup/user.svg";
import Camera from "../../images/svg/account-setup/camera.svg";
import { CustomText } from "../../components/CustomText";
import { Strings as strings } from "../../utils/Strings";
import scale, { verticalScale } from "../../themes/Metrics";
import images from "../../themes/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import DateTimePicker from "react-native-modal-datetime-picker";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImageData: "",
      FirstName: "",
      LastName: "",
      UserName: "",
      EmailAddress: "",
      DOB: "",
      Password: "",
      ConfirmPassword: "",
      isVisible: false,
      userId: "",
      loading: false,
      showPickerModal: false,
      profileImage: "",
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

  signUpUser = () => {
    if (!this.state.FirstName) {
      alert(strings.please_enter_firstname);
      return;
    }

    if (!isfirstnameValid(this.state.FirstName)) {
      alert("Only Alphabets Are Allowed In First Name");
      return;
    }

    if (!this.state.LastName) {
      alert(strings.please_enter_LastName);
      return;
    }
    if (!isfirstnameValid(this.state.LastName)) {
      alert("Only Alphabets Are Allowed In Last Name");
      return;
    }
    if (!this.state.UserName) {
      alert(strings.please_enter_username);
      return;
    }

    if (!isUserNameValid(this.state.UserName)) {
      alert("Invalid Username");
      return;
    }
    // if (!isUserNameValid(this.state.UserName)) {
    //   alert(strings.please_enter_valid_username);
    //   return;
    // }

    if (!this.state.EmailAddress) {
      alert(strings.please_enter_email);
      return;
    }

    if (!isEmailValid(this.state.EmailAddress)) {
      alert(strings.please_enter_valid_email);
      return;
    }

    // if (!this.state.DOB) {
    //   alert(strings.please_enter_dateofBirth);
    //   return;
    // }

    if (!this.state.Password) {
      alert(strings.please_enter_password);
      return;
    }
    if (this.state.Password.length < 8) {
      alert(strings.password_contains_8);
      return;
    }

    if (!this.state.ConfirmPassword) {
      alert(strings.please_enter_confirm_password);
      return;
    }

    if (this.state.Password !== this.state.ConfirmPassword) {
      alert(strings.password_confirm_password_not_match_signup);
      return;
    }
    console.log(dataToSend, URLConstants.SIGNUP_URL);
    var dataToSend = {
      firstName: this.state.FirstName.trim(),
      profilePic: this.state.profileImage,
      lastName: this.state.LastName.trim(),
      username: this.state.UserName.trim(),
      email: this.state.EmailAddress.trim(),
      dateOfBirth: this.state.DOB,
      password: this.state.Password,
      confirmPassword: this.state.ConfirmPassword,
      deviceToken: this.state.deviceToken,
      deviceType: Platform.OS,
    };
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.setState({ loading: true });
        console.log(dataToSend, URLConstants.SIGNUP_URL, "========");
        axios({
          method: "post",
          url: URLConstants.SIGNUP_URL,
          data: dataToSend,
        })
          .then((response) => {
            // handle success
            this.setState({ loading: false });
            this.handaldata(response.data.data.userId);
          })
          .catch((error) => {
            // handle error
            this.setState({ loading: false });
            alert(error.response.data.message);
          });
      } else {
        // Ideally load from local storage
        alert(strings.Please_check_Internet);
      }
    });
  };

  handaldata = (UserId) => {
    this.props.navigation.navigate("OtpVerification", { UserId: UserId });
  };

  hideDatePicker = () => {
    this.setState({ isVisible: false });
  };

  handleConfirm = (date) => {
    var dateValue = new Date(date);
    let DateData =
      (dateValue.getMonth() > 8
        ? dateValue.getMonth() + 1
        : "0" + (dateValue.getMonth() + 1)) +
      "/" +
      (dateValue.getDate() > 9
        ? dateValue.getDate()
        : "0" + dateValue.getDate()) +
      "/" +
      dateValue.getFullYear();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    console.log("A date has been picked: ", DateData, today);
    console.log("x < y", DateData < today);
    this.setState({ DOB: DateData });
    this.hideDatePicker();
  };

  onPressCamera = () => {
    try {
      ImagePicker.openCamera({
        mediaType: "photo",
        compressImageQuality: 1,
        includeBase64: true,
        //cropping: true,
      }).then((image) => {
        console.log("@@@ Selected Image Item =============", image);
        const source = {
          uri: Platform.OS === "android" ? image.path : image.path,
        };
        this.setState({
          profileImageData: image.path,
          showPickerModal: false,
          loading: true,
        });
        const data = new FormData();
        data.append("photo", {
          name: "profile_image.jpg",
          type: image.mime,
          uri: Platform.OS === "ios" ? source.uri : source.uri,
        });
        console.log(data, "====data");
        var url1 = URLConstants.UPLOAD_PROFILE;
        console.log(url1, data, "");
        // AsyncStorage.getItem("USER_ID").then((userID) => {
        // AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            const selectedImage = image;
            console.log(url1, data, "uri data========");
            axios({
              method: "post",
              url: url1,
              data: data,
            })
              .then((response) => {
                this.setState({
                  loading: false,
                  // isInvalidUploadImage: false,
                  // profileImageData: image,
                  profileImage: response.data.filename,
                });
                // handle success
                console.log(response.data, "=======responce");
                // this.setState({ loading: false });
                // this.props.navigation.navigate("MyProfile");
              })
              .catch((error) => {
                this.setState({
                  loading: false,
                });
                console.log(error, "++++++erro");
              });
          } else {
            alert(strings.Please_check_Internet);
          }
        });
        // });
        // });
        this.setState({
          showPickerModal: false,
        });
      });
    } catch (e) {
      console.log("@@@ Error opening camera ==========", e);
    }
  };

  onPressPickImage = () => {
    try {
      ImagePicker.openPicker({
        mediaType: "photo",
        compressImageQuality: 1,
        includeBase64: true,
        //cropping: true,
      }).then((image) => {
        console.log("@@@ Selected Image Item =============", image);
        const source = {
          uri: Platform.OS === "android" ? image.path : image.path,
        };
        this.setState({
          profileImageData: image.path,
          showPickerModal: false,
          loading: true,
        });
        const data = new FormData();
        data.append("photo", {
          name: "profile_image.jpg",
          type: image.mime,
          uri: Platform.OS === "ios" ? source.uri : source.uri,
        });
        console.log(data, "====data");
        var url1 = URLConstants.UPLOAD_PROFILE;
        console.log(url1, data, "");
        // AsyncStorage.getItem("USER_ID").then((userID) => {
        // AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            const selectedImage = image;
            console.log(url1, data, "uri data========");
            axios({
              method: "post",
              url: url1,
              data: data,
            })
              .then((response) => {
                this.setState({
                  loading: false,
                  // isInvalidUploadImage: false,
                  // profileImageData: image,
                  profileImage: response.data.filename,
                });
                // handle success
                console.log(response.data, "=======responce");
                // this.setState({ loading: false });
                // this.props.navigation.navigate("MyProfile");
              })
              .catch((error) => {
                this.setState({
                  loading: false,
                });
                console.log(error, "++++++erro");
              });
          } else {
            alert(strings.Please_check_Internet);
          }
        });
        // });
        // });
        this.setState({
          showPickerModal: false,
        });
      });
    } catch (e) {
      console.log("@@@ Error opening image picker ==========", e);
    }
  };
  
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
            <TouchableOpacity
              onPress={() => this.setState({ showPickerModal: false })}
            >
              <Image source={images.close} style={styles.crossIcon} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.onPressCamera()}
                style={styles.leftButton}
              >
                <Image source={images.camera} style={styles.cameraIcon} />
                <CustomText
                  style={styles.takePictureText}
                  item={`TAKE PICTURE\nFROM CAMERA`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onPressPickImage()}
                style={styles.rightButton}
              >
                <Image source={images.gallery} style={styles.galleryIcon} />
                <CustomText
                  style={styles.takePictureText}
                  item={`ADD FROM\nGALLERY`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <ImageBackground
        source={Images.splashBackgroud}
        style={styles.appContainer}
      >
        <View style={styles.backIconstyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        <Loader loading={this.state.loading} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => this.setState({ showPickerModal: true })}
            >
              {!this.state.profileImageData == "" ? (
                <Image
                  source={{ uri: this.state.profileImageData }}
                  style={{
                    borderColor: "white",
                    width: scale(100),
                    height: scale(100),
                    borderRadius: 100,
                    borderWidth: 1,
                  }}
                />
              ) : (
                <UserIcon style={styles.appLogo} />
              )}
              <Camera style={styles.camera} />
            </TouchableOpacity>
            <CustomText style={styles.textSignIn} item={"SIGN UP"} />
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"words"}
                placeholderTextColor={colors.whiteText}
                placeholder={"First Name"}
                autoCorrect={false}
                maxLength={25}
                onChangeText={(firstName) =>
                  this.setState({ FirstName: firstName })
                }
              />
            </View>
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"words"}
                placeholderTextColor={colors.whiteText}
                placeholder={"Last Name"}
                autoCorrect={false}
                maxLength={25}
                onChangeText={(lastName) =>
                  this.setState({ LastName: lastName })
                }
              />
            </View>
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"none"}
                placeholderTextColor={colors.whiteText}
                placeholder={"Username"}
                autoCorrect={false}
                maxLength={30}
                onChangeText={(userName) =>
                  this.setState({ UserName: userName })
                }
              />
            </View>
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"none"}
                placeholderTextColor={colors.whiteText}
                placeholder={"Email Address"}
                autoCorrect={false}
                maxLength={40}
                onChangeText={(email) => this.setState({ EmailAddress: email })}
              />
            </View>
            <View style={styles.textInputConatiner}>
              <DateTimePickerModal
                isVisible={this.state.isVisible}
                mode="date"
                locale="en_GB"
                maximumDate={new Date()}
                minimumDate={new Date(1900, 1, 1)}
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
              <TouchableOpacity
                onPress={() => this.setState({ isVisible: true })}
              >
                {this.state.DOB === "" ? (
                  <CustomText
                    style={styles.textInputstyle}
                    item={"Date of Birth (Optional)"}
                  />
                ) : (
                  <CustomText
                    style={styles.textInputstyle}
                    item={this.state.DOB}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                autoCapitalize={"none"}
                placeholderTextColor={colors.whiteText}
                placeholder={"Password"}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                blurOnSubmit={false}
                maxLength={30}
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={(password) =>
                  this.setState({ Password: password })
                }
              />
            </View>
            <View style={styles.textInputConatiner}>
              <TextInput
                style={styles.textInputstyle}
                placeholderTextColor={colors.whiteText}
                autoCapitalize={"none"}
                placeholder={"Confirm Password"}
                secureTextEntry={true}
                autoCorrect={false}
                textContentType="password"
                blurOnSubmit={false}
                maxLength={30}
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={(confirmPassword) =>
                  this.setState({ ConfirmPassword: confirmPassword })
                }
              />
            </View>
            <View style={styles.termsWrap}>
              <Text style={styles.linkText}>
                By signing up you are agreeing to our {"\n "}
                <Text
                  onPress={() =>
                    Linking.openURL(
                      URLConstants.TERMS_CONDITION
                    )
                  }
                  style={[styles.linkText, { color: colors.yellowButton }]}
                >
                  Terms & Conditions
                </Text>
                <Text style={styles.linkText}> and </Text>
                <Text
                  onPress={() =>
                    Linking.openURL(
                      URLConstants.PRIVACY_POLICY

                    )
                  }
                  style={[
                    styles.linkText,
                    { color: colors.yellowButton, right: 2 },
                  ]}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
            <CustomButton
              title={"Submit"}
              onPress={this.signUpUser}
              buttonStyles={{ marginBottom: scale(29.7) }}
            />
          </View>
          {this.renderImagePickerModal()}
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

export default SignUp;
