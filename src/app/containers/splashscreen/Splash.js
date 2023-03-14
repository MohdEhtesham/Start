import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import styles from "./SplashStyles";
import * as Animatable from "react-native-animatable";
import Images from "../../themes/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let userToken = await AsyncStorage.getItem("USER_TOKEN");
    this.timeoutHandle = setTimeout(() => {
      if (!userToken) {
        this.props.navigation.replace("AuthNavigator");
      } else {
        AsyncStorage.getItem("CATEGORY_ADDED").then((value) => {
          console.log(value, "value===============value");
          if (value === "true") {
            this.props.navigation.replace("MainNavigator");
          } else {
            this.props.navigation.navigate("OnBoardingScreen");
          }
        });
      }
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <ImageBackground
        source={Images.splashBackgroud}
        style={styles.appContainer}
      >
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={Images.splashLogo}
          style={styles.appLogo}
          resizeMode="stretch"
        />
      </ImageBackground>
    );
  }
}

export default SplashScreen;
