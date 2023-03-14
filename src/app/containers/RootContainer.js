import React, { Component } from "react";
import { View, StatusBar } from "react-native";
// import ReduxNavigation from "../navigation/ReduxNavigation";
// import { connect } from 'react-redux';
// import StartupActions from "../redux/StartupRedux";
import { NavigationContainer } from "@react-navigation/native";
import styles from "./Styles/RootContainerStyles";
import RootNavigator from "../navigation/StackNavigation";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";
import colors from "../themes/Colors";
import {
  navigationRef,
  isReadyRef,
  navigateTo,
} from "../utils/NavigationService";
import crashlytics from "@react-native-firebase/crashlytics";
import NotifService from "./NotifService";

const linking = {
  prefixes: [
    "https://stage.sportstalkapp.co",
    "stage.sportstalkapp.co/",
    "stage.sportstalkapp.co://",
  ],
};
class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this)
    );
  }

  onRegister(token) {
    // console.log("toke-->", token);
  }
  onNotif(notif) {
    // console.log("notif-->", notif);
  }

  componentDidMount() {
    crashlytics().log("App mounted.");
    this.getFcmToken();
    this.requestUserPermission();

    AsyncStorage.setItem("fromKillState", JSON.stringify({ status: true }));
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    AsyncStorage.setItem("DEVICE_TOKEN", fcmToken);
    if (fcmToken) {
    } else {
    }
  };

  render() {
    return (
      <>
        <StatusBar
          backgroundColor={colors.RedHeader}
          barStyle="light-content"
        />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}
          linking={linking}
        >
          <View style={styles.applicationView}>
            <RootNavigator />
          </View>
        </NavigationContainer>
      </>
    );
  }
}
export default RootContainer;

// // wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup())
// })

// export default connect(null, mapDispatchToProps)(RootContainer)
