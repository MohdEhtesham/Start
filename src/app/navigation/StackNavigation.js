import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../containers/splashscreen/Splash";
import Login from "../containers/authScreens/Login";
import ForgotPassword from "../containers/authScreens/ForgotPassword";
import SignUp from "../containers/authScreens/SignUp";
import PrivacyPolicy from "../containers/drawerscreen/PrivacyPolicy";
import TermAndConditions from "../containers/drawerscreen/TermAndConditions";
import OtpVerification from "../containers/authScreens/OtpVerification";
import BottomTabsNavigator from "./BottomTabsNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerNavigation from "./DrawerNavigation";
import SportsCategory from "../containers/onboardingScreen/SportsCategory";
import colors from "../themes/Colors";
import { TouchableOpacity, View, Text } from "react-native";
import BackIcon from "../images/svg/back.svg";
import scale, { verticalScale } from "../themes/Metrics";
import Fonts from "../themes/Fonts";
import UserFollowScreen from "../containers/onboardingScreen/UserFollowScreen";
import Comments from "../containers/dashBoard/timelinescreen/Comments";
import BellIcon from "../images/svg/header/bell.svg";
import Circle from "../images/svg/header/circle.svg";
import { HeaderRight } from "../components/HeaderRight";
import Notifications from "../containers/notifications/Notifications";
import VideoPlayerScreen from "../containers/dashBoard/timelinescreen/VideoPlayerScreen";
import OtherUserProfile from "../containers/drawerscreen/OtherUserProfile";
import FeatureDebates from "../containers/dashBoard/feature/FeatureDebates";
import { CustomText } from "../components/CustomText";
import SharedDebates from "../containers/dashBoard/timelinescreen/SharedDebates";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const MainNavigator = (props) => {
  return (
    <Stack.Navigator
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={" Sports Talk"}
            />
          ),
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() =>
                props.navigation.navigate("Notifications")
              }
            />
          ),
          // headerTitleContainerStyle: {left: 30},
          headerTintColor: colors.whiteText,
        }}
      />

      <Stack.Screen
        name="SharedDebates"
        component={SharedDebates}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerTitleStyle: {
            fontSize: scale(15),
            fontFamily: Fonts.type.JostRegular,
          },
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() =>
                props.navigation.navigate("Notifications")
              }
            />
          ),
          // headerTitleContainerStyle: {left: 30},
          headerTintColor: colors.whiteText,
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={" Sports Talk"}
            />
          ),
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          // headerRight: () => <HeaderRight />,
          // headerTitleContainerStyle: {left: 30},
          headerTintColor: colors.whiteText,
        }}
      />
      <Stack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{
          headerShown: true,
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={" Sports Talk"}
            />
          ),
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          // headerRight: () => <HeaderRight />,
          // headerTitleContainerStyle: {left: 30},
          headerTintColor: colors.whiteText,
        }}
      />

      <Stack.Screen
        name="OtherUserProfile"
        component={OtherUserProfile}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontSize: scale(15),
            fontFamily: Fonts.type.JostRegular,
          },
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
              }}
              item={"Sports Talk"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() =>
                props.navigation.navigate("Notifications")
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="FeatureDebates"
        component={FeatureDebates}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontSize: scale(15),
            fontFamily: Fonts.type.JostRegular,
          },
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
              }}
              item={"Sports Talk"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() =>
                props.navigation.navigate("Notifications")
              }
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const OnBoardingScreen = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SportsCategory"
        component={SportsCategory}
        options={{
          gestureEnabled: false,
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={" Sports Talk"}
            />
          ),
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerLeft: () => null,
          // (
          //   <TouchableOpacity onPress={() => props.navigation.goBack()}>
          //     <BackIcon
          //       style={{ height: 20, width: 20, marginLeft: scale(15) }}
          //     />
          //   </TouchableOpacity>
          // ),
          // headerTitleContainerStyle: {left: 30},
          headerTintColor: colors.whiteText,
        }}
      />
      <Stack.Screen
        name="UserFollowScreen"
        component={UserFollowScreen}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={" Sports Talk"}
            />
          ),
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerTintColor: colors.whiteText,
        }}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"ForgotPassword"}
        component={ForgotPassword}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"SignUp"}
        component={SignUp}
        options={{ headerShown: false, gestureEnabled: false }}
      />

      <Stack.Screen
        name="TermAndConditions"
        component={TermAndConditions}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerRight: () => null,
          headerShown: true,
          headerTitleStyle: {
            fontSize: scale(15),
          },
          headerTintColor:
          "white",
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={"Sports Talk"}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
          headerTintColor:
          "white",
          headerRight: () => null,
          headerShown: true,
          headerTitleStyle: {
            fontSize: scale(15),
          },
          headerStyle: {
            backgroundColor: colors.RedHeader,
          },
          headerTitle: () => (
            <CustomText
              style={{
                color: colors.whiteText,
                fontSize: scale(15),
                alignSelf: "center",
                fontFamily: Fonts.type.JostRegular,
              }}
              item={"Sports Talk"}
            />
          ),
        
        }}
      />

      <Stack.Screen
        name={"OtpVerification"}
        component={OtpVerification}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name={"Splash"}
        component={Splash}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"AuthNavigator"}
        component={AuthNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"OnBoardingScreen"}
        component={OnBoardingScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"MainNavigator"}
        component={MainNavigator}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;
