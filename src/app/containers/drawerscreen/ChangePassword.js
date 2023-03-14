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
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./ChangePasswordStyle";
import { Strings as strings } from "../../utils/Strings";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import Loader from "../../components/Loader";
import colors from "../../themes/Colors";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentPassword: "",
      Password: "",
      ConfirmPassword: "",
      loading: false,
    };
  }

    async componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener("focus", async () => {
        this.setState({
          CurrentPassword: "",
          Password: "",
          ConfirmPassword: "",
        });
      });
    }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  changePasswordApi = () => {
    if (!this.state.CurrentPassword) {
      alert(strings.please_enter_old_password);
      return;
    }
    if (!this.state.Password) {
      alert(strings.please_enter_new_password);
      return;
    }
    if (!this.state.ConfirmPassword) {
      alert(strings.please_enter_confirm_New_password);
      return;
    }
    if (this.state.Password.length < 8) {
      alert(strings.password_contains_8);
      return;
    }

    if (this.state.ConfirmPassword.length < 8) {
      alert(strings.password_contains_8);
      return;
    }
    /*
    if (!this.state.ConfirmPassword) {
      alert(strings.please_enter_confirm_New_password);
      return;
    }
*/
    if (this.state.Password !== this.state.ConfirmPassword) {
      alert(strings.password_confirm_password_new_match_signup);
      return;
    }
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        var dataToSend = {
          userId: userID,
          currentPassword: this.state.CurrentPassword,
          password: this.state.Password,
        };
        console.log(dataToSend, URLConstants.CHANGE_PASSWORD);
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.CHANGE_PASSWORD,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                this.setState({
                  loading: false,
                });
                // handle success
                if (this.props.navigation.isFocused()) {
                  Alert.alert(
                    "Success",
                    `${response.data.message}`,
                    [
                      {
                        text: "ok",
                        onPress: () => {
                          this.props.navigation.goBack();
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                  return true;
                } else {
                  return false;
                }
                this.setState({
                  loading: false,
                });
                this.setState({ Password: "" });
                this.setState({ CurrentPassword: "" });
                this.setState({ ConfirmPassword: "" });
              })
              .catch((error) => {
                // handle error
                this.setState({
                  loading: false,
                  CurrentPassword: "",
                  Password: "",
                  ConfirmPassword: "",
                });
                console.log(error.response.data);
                alert(error.response.data.message);
              });
            /*this.setState({
                CurrentPassword:"",
                Password:"",
                ConfirmPassword:"",
              });*/
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <KeyboardAwareScrollView>
            <Loader loading={this.state.loading} />
            <ScrollView style={styles.Container}>
              <CustomText item={"Change Password"} style={styles.titlestyle} />
              <CustomText item={"Old Password"} style={styles.subtitlestyle} />
              <View style={styles.textInputConatiner}>
                <TextInput
                  style={styles.textInputstyle}
                  autoCapitalize={"none"}
                  secureTextEntry={true}
                  autoCorrect={false}
                  minLength={8}
                  textContentType="password"
                  blurOnSubmit={false}
                  value={this.state.CurrentPassword}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onChangeText={(CurrentPassword) =>
                    this.setState({ CurrentPassword: CurrentPassword })
                  }
                />
              </View>

              <CustomText item={"New Password"} style={styles.subtitlestyle} />
              <View style={styles.textInputConatiner}>
                <TextInput
                  style={styles.textInputstyle}
                  autoCapitalize={"none"}
                  secureTextEntry={true}
                  autoCorrect={false}
                  textContentType="password"
                  blurOnSubmit={false}
                  value={this.state.Password}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onChangeText={(Password) =>
                    this.setState({ Password: Password })
                  }
                />
              </View>
              <CustomText
                item={"Confirm New Password"}
                style={styles.subtitlestyle}
              />
              <View style={styles.textInputConatiner}>
                <TextInput
                  style={styles.textInputstyle}
                  autoCapitalize={"none"}
                  secureTextEntry={true}
                  autoCorrect={false}
                  textContentType="password"
                  blurOnSubmit={false}
                  value={this.state.ConfirmPassword}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  onChangeText={(ConfirmPassword) =>
                    this.setState({ ConfirmPassword: ConfirmPassword })
                  }
                />
              </View>
              <CustomButton title={"Submit"} onPress={this.changePasswordApi} />
            </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default ChangePassword;
