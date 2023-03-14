import React, { Component } from "react";
import RootContainer from "./RootContainer";
import messaging from "@react-native-firebase/messaging";
import { notifService } from "./NotifService";

class App extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  componentDidMount() {
    messaging().onMessage((messageRecvd) => {
      notifService.localNotif(
        "default",
        messageRecvd.notification.title,
        messageRecvd.data.body,
        messageRecvd.data
      );
    });
  }
  render() {
    return <RootContainer />;
  }
}

export default App;
