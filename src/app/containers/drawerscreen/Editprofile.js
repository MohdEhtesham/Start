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
  TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
// import R from '../../R';
import Camera from "../../images/svg/my-profile/camera.svg";
import CustomButton from "../../components/CustomButton";
import { CustomText } from "../../components/CustomText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./EditprofileStyle";
import { URLConstants } from "../../utils/URLConstants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from "react-native-image-crop-picker";
import images from "../../themes/Images";
import scale, { verticalScale } from "../../themes/Metrics";
import Loader from "../../components/Loader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../utils/Strings";
import Colors from "../../themes/Colors";
import { AuthApi } from "../../utils/Services";
import AlertBox from "../../components/AlertBox";

// import {
//   isEmailValid,
//   isUserNameValid,
//   phoneNumberInUsFormat,
// } from "../../utils/AppUtils";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // firstName: this.props.route.params.profiledata.firstName,
      // lastName: this.props.route.params.profiledata.lastName,
      // dateOfBirth: this.props.route.params.profiledata.dateOfBirth,
      // username: this.props.route.params.profiledata.username,
      // email: this.props.route.params.profiledata.email,
      // contact: this.props.route.params.profiledata.contactNo,
      // city: this.props.route.params.profiledata.city,
      // state: this.props.route.params.profiledata.state,
      // about: this.props.route.params.profiledata.about,
      // profilePic: this.props.route.params.profiledata.profilePic,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      username: "",
      email: "",
      contact: "",
      city: "",
      state: "",
      about: "",
      profilePic: "",
      showPickerModal: false,
      profileImageData: "",
      isVisible: false,
      profileImage: "",
      DOB: "",
      loading: true,
      fileUri: "",
      modalStatus: false,
    };
  }
  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getMyProfile();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  getMyProfile = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            //this.setState({ loading: true });
            let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                
                if (response.status == 200) {
                  this.setState({
                    firstName: response?.data?.data?.firstName,
                    lastName: response?.data?.data?.lastName,
                    dateOfBirth: response?.data?.data?.dateOfBirth,
                    username: response?.data?.data?.username,
                    email: response?.data?.data?.email,
                    contact: response?.data?.data?.contactNo,
                    city: response?.data?.data?.city,
                    state: response?.data?.data?.state,
                    about: response?.data?.data?.about,
                    profilePic: response?.data?.data?.profilePic,
                    profileImage: response?.data?.data?.profilePic,
                  });
                }
                setTimeout(() => {
                  this.setState({
                    loading:false
                  })
                }, 500);
              })
              .catch((error) => {
                this.setState({
                  loading: false,
                });
              });
          } else {
            this.setState({
              loading: false,
            });
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  updateProfile = () => {
    if (!this.state.firstName) {
      alert(strings.please_enter_firstname);
      return;
    }

    if (!this.state.lastName) {
      alert(strings.please_enter_LastName);
      return;
    }
    // if (!phoneNumberInUsFormat(this.state.contact)) {
    //   alert("Please check number");
    //   return
    // }

    // if (!this.state.UserName) {
    //   alert(strings.please_enter_username);
    //   return;
    // }
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: userID,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              dateOfBirth:
                this.state.DOB == "" ? this.state.dateOfBirth : this.state.DOB,
              contact: this.state.contact,
              city: this.state.city,
              state: this.state.state,
              about: this.state.about,
              profilePic: this.state.profileImage,
            };
            console.log(dataToSend, URLConstants.UPDATE_PROFILE);
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.UPDATE_PROFILE,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // handle success
                console.log(response.data);
                this.setState({ loading: false });
                Alert.alert("Success", " Profile Updated Successfully");
                this.props.navigation.navigate("MyProfile");
              })
              .catch((error) => {
                // handle error
                this.setState({ loading: false });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
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
              // headers: {
              //   Token: value,
              // },
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
              // headers: {
              //   Token: value,
              // },
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

  deleteUser = () => {
    this.setState({ modalStatus: true });
  };
  onConfirm = async () => {
    this.setState({ loading: true, modalStatus: false });

    const userToken = await AsyncStorage.getItem("USER_TOKEN");
    var dataToSend = {
      userId: this.props.route.params.profiledata._id,
    };
    let url = URLConstants.DELETE_USER;

    try {
      AuthApi(userToken, url, "POST", dataToSend, false)
        .then((res) => {
          this.setState({ loading: false });

          if (res.status === 200) {
            AsyncStorage.clear().then(() => {
              this.props.navigation.reset({
                index: 0,
                routes: [{ name: "AuthNavigator" }],
              });
            });
          } else {
            alert(res.message);
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
    } catch (error) {
      this.setState({ loading: false });
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
    console.log("profile state", this.state);
    console.log("new Date ", new Date());
    const dob = Moment(new Date(this.state.dateOfBirth).toUTCString())
      .utc()
      .format("MM/DD/YYYY");
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Loader loading={this.state.loading} />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            style={styles.Container}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    justifyContent: "flex-end",
                    top: 9,
                    right: 14,
                  }}
                  onPress={() => this.setState({ showPickerModal: true })}
                >
                  <Camera />
                </TouchableOpacity>
                {this.state.profileImageData == "" ? (
                  <DefaultProfileImage
                    uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.profileImage}`}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={{ uri: this.state.profileImageData }}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <CustomText item={"First Name"} style={styles.subtitlestyle} />
                <View style={styles.textInputConatiner}>
                  <TextInput
                    style={styles.textInputstyle}
                    autoCapitalize={"words"}
                    maxLength={25}
                    value={this.state.firstName}
                    onChangeText={(firstName) =>
                      this.setState({ firstName: firstName })
                    }
                  />
                </View>

                <CustomText item={"Last Name"} style={styles.subtitlestyle} />
                <View style={styles.textInputConatiner}>
                  <TextInput
                    style={styles.textInputstyle}
                    autoCapitalize={"words"}
                    maxLength={25}
                    value={this.state.lastName}
                    onChangeText={(lastName) =>
                      this.setState({ lastName: lastName })
                    }
                  />
                </View>
                <CustomText item={"Username"} style={styles.subtitlestyle} />
                <View style={styles.textInputConatiner}>
                  <CustomText
                    style={styles.textInputstyleUserName}
                    item={this.state.username}
                  />
                </View>
                <CustomText
                  item={"Date Of Birth (Optional)"}
                  style={styles.subtitlestyle}
                />
                <TouchableOpacity
                  style={styles.textInputConatiner}
                  onPress={() => this.setState({ isVisible: true })}
                >
                  <DateTimePickerModal
                    isVisible={this.state.isVisible}
                    mode={"date"}
                    locale={"en_GB"}
                    date={
                      this.state.dateOfBirth != "" ? new Date(dob) : new Date()
                    }
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 1, 1)}
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />
                  {this.state.DOB === "" ? (
                    <CustomText style={styles.textInputstyle} item={dob} />
                  ) : (
                    <CustomText
                      style={styles.textInputstyle}
                      item={this.state.DOB}
                    />
                  )}
                </TouchableOpacity>

                <CustomText
                  item={"Email Address"}
                  style={styles.subtitlestyle}
                />
                <View style={styles.textInputConatiner}>
                  <CustomText
                    style={styles.textInputstyleUserName}
                    item={this.state.email}
                    //   this.setState({ FirstName: firstName })
                    // }
                  />
                </View>
                <CustomText
                  item={"Phone (Optional)"}
                  style={styles.subtitlestyle}
                />
                <View style={styles.textInputConatiner}>
                  <TextInput
                    style={styles.textInputstyle}
                    autoCapitalize={"none"}
                    keyboardType={"number-pad"}
                    maxLength={10}
                    value={this.state.contact}
                    onChangeText={(contact) =>
                      this.setState({ contact: contact })
                    }
                  />
                </View>

                <CustomText
                  item={"City (Optional)"}
                  style={styles.subtitlestyle}
                />
                <View style={styles.textInputConatiner}>
                  <TextInput
                    style={styles.textInputstyle}
                    autoCapitalize={"words"}
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city: city })}
                  />
                </View>

                <CustomText
                  item={"State (Optional)"}
                  style={styles.subtitlestyle}
                />
                <View style={styles.textInputConatiner}>
                  <TextInput
                    style={styles.textInputstyle}
                    autoCapitalize={"words"}
                    value={this.state.state}
                    onChangeText={(state) => this.setState({ state: state })}
                  />
                </View>
                <CustomText
                  item={"About me (Optional)"}
                  style={styles.subtitlestyle}
                />
                <View style={styles.textInputConatiner1}>
                  <TextInput
                    style={styles.textInputstyle1}
                    autoCapitalize={"none"}
                    maxLength={100}
                    numberOfLines={3}
                    multiline={true}
                    value={this.state.about}
                    onChangeText={(about) => this.setState({ about: about })}
                  />
                </View>
                <CustomButton
                  title={"Save and Update"}
                  buttonStyles={styles.buttonStylesInvite}
                  onPress={() => this.updateProfile()}
                />
                <CustomButton
                  title={"Delete Profile"}
                  buttonStyles={[
                    styles.buttonStylesInvite,
                    { backgroundColor: Colors.RedHeader, marginVertical: 10 },
                  ]}
                  onPress={() => this.deleteUser()}
                />
              </View>
              <View style={{ marginBottom: verticalScale(50) }} />
            </View>
          </KeyboardAwareScrollView>
          {this.renderImagePickerModal()}
          <AlertBox
            isVisible={this.state.modalStatus}
            onCancel={() => this.setState({ modalStatus: false })}
            onConfirm={this.onConfirm}
            title={strings.delUser}
            desc={strings.confirmDelUser}
            cancelBtnText={strings.cancel}
            confirmBtnText={strings.confirm}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default EditProfile;
