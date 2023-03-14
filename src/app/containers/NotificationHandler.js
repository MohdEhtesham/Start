import PushNotification from "react-native-push-notification";
import { notifService } from "./NotifService";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { navigateTo } from "../utils/NavigationService";
class NotificationHandler {
  onNotification(notification) {
    console.log("NotificationHandler ---> ", notification);
    AsyncStorage.setItem("NOTIFICATION_RECIVE", JSON.stringify(notification));
    if (typeof this._onNotification === "function") {
      this._onNotification(notification);
    }

    if (notification.userInteraction === false) {
      console.log("Notification -------> ", notification);
        // notifService.localNotif(
        //   'default',
        //   notification.title,
        //   notification.message,
        //   notification.data,
        // );
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
    console.log("notification????", notification);
    if (notification && notification.userInteraction) {
      console.log("cmng-->");
      setTimeout(() => {
        AsyncStorage.getItem("fromKillState")
          .then((res) => JSON.parse(res))
          .then((response) => {
            console.log("cmng-->???", response);

            if (response !== null ) {
              console.log("cmng-->2", response);

              setTimeout(() => {
                if (notification.data?.type === "chat_new_msg") {
                  navigateTo("MainNavigator", {
                    screen: "DrawerNavigation",
                    params: {
                      screen: "Home",
                      params: { screen: "Chat", params: { screen: "Chat" } },
                    },
                  });
                } else {
                  navigateTo("MainNavigator", { screen: "Notifications" });
                }
              }, 8000);
            
          
              console.log("Done.-->");
            } 
            else {
              console.log("cmng-->3");

              if (notification.data?.type === "chat_new_msg") {
                navigateTo("MainNavigator", {
                  screen: "DrawerNavigation",
                  params: {
                    screen: "Home",
                    params: { screen: "Chat", params: { screen: "Chat" } },
                  },
                });
              } else {
                navigateTo("MainNavigator", { screen: "Notifications" });
              }
            }
          }).then(()=>
            AsyncStorage.removeItem("fromKillState")
          );
      }, 500);
    }
  }

  onRegister(token) {
    console.log("NotificationHandler:", token);

    if (typeof this._onRegister === "function") {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.log("Notification action received:");
    console.log(notification.action);
    console.log(notification);

    if (notification.action === "Yes") {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }

  attachRegister(handler) {
    this._onRegister = handler;
  }

  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

export default handler;

