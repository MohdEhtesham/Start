import * as React from "react";
import { Image, TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "../components/Header";
const stack = createStackNavigator();
import BottomTabsNavigator from "./BottomTabsNavigator";
const Drawer = createDrawerNavigator();
import CustomSideBarMenu from "./CustomSideBarMenu";
import colors from "../themes/Colors";
import ChangePassword from "../containers/drawerscreen/ChangePassword";
import SubscriptionPlan from "../containers/dashBoard/joinAndStart/SubscriptionPlan";
import MyProfile from "../containers/drawerscreen/MyProfile";
import TermAndConditions from "../containers/drawerscreen/TermAndConditions";
import PrivacyPolicy from "../containers/drawerscreen/PrivacyPolicy";
import MySubscription from "../containers/drawerscreen/MySubscription";
import EditProfile from "../containers/drawerscreen/Editprofile";
import Inviteyourfriend from "../containers/dashBoard/joinAndStart/Inviteyourfriend";
import BackIcon from "../images/svg/back.svg";
import HeaderMenuIcon from "../images/svg/header/HeaderMenuIcon.svg";
import scale, { verticalScale } from "../themes/Metrics";
import { HeaderRight } from "../components/HeaderRight";
import { DrawerActions } from "@react-navigation/native";
import FriendsList from "../containers/drawerscreen/FriendsList";
import ChangeCategory from "../containers/drawerscreen/ChangeCatgeory";
import ChooseCategory from "../containers/dashBoard/joinAndStart/CategoryChoose";
import CategoryAllChoose from "../containers/dashBoard/joinAndStart/CategoryAllChoose";
import VideoRoomScreen from "../containers/dashBoard/joinAndStart/VideoRoomScreen";
import ChatDetails from "../containers/dashBoard/chat/ChatDetails";

import OtherUserProfile from "../containers/drawerscreen/OtherUserProfile";
import { CustomText } from "../components/CustomText";
import Fonts from "../themes/Fonts";
import FollowingList from "../containers/drawerscreen/FollowingList";
import FollowerList from "../containers/drawerscreen/FollowerList";
import BlockList from "../containers/drawerscreen/BlockList";
const DrawerNavigation = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSideBarMenu {...props} />}
      drawerStyle={{ width: "90%" }}
    >
      <Drawer.Screen name="Home" component={BottomTabsNavigator} />
      <stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={{
          headerShown: true,
          backgroundColor: colors.RedHeader,
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
              item={" Sports Talk"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          backgroundColor: colors.RedHeader,
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
              item={" Sports Talk"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FriendsList"
        component={FriendsList}
        options={{
          headerShown: true,
          backgroundColor: colors.RedHeader,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FollowingList"
        component={FollowingList}
        options={{
          headerShown: true,
          backgroundColor: colors.RedHeader,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FollowerList"
        component={FollowerList}
        options={{
          headerShown: true,
          backgroundColor: colors.RedHeader,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BlockList"
        component={BlockList}
        options={{
          headerShown: true,
          backgroundColor: colors.RedHeader,
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <HeaderMenuIcon
                // source={R.images.headerMenuIcon}
                // tintColor={colors.white}
                style={{
                  margin: scale(16),
                  width: scale(16.93),
                  height: scale(15.25),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
              item={" Sports Talk"}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <HeaderMenuIcon
                // source={R.images.headerMenuIcon}
                // tintColor={colors.white}
                style={{
                  margin: scale(16),
                  width: scale(16.93),
                  height: scale(15.25),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <HeaderMenuIcon
                // source={R.images.headerMenuIcon}
                // tintColor={colors.white}
                style={{
                  margin: scale(16),
                  width: scale(16.93),
                  height: scale(15.25),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <HeaderMenuIcon
                // source={R.images.headerMenuIcon}
                // tintColor={colors.white}
                style={{
                  margin: scale(16),
                  width: scale(16.93),
                  height: scale(15.25),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="MySubscription"
        component={MySubscription}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <HeaderMenuIcon
                // source={R.images.headerMenuIcon}
                // tintColor={colors.white}
                style={{
                  margin: scale(16),
                  width: scale(16.93),
                  height: scale(15.25),
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangeCategory"
        component={ChangeCategory}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="VideoRoomScreen"
        component={VideoRoomScreen}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ChooseCategory"
        component={ChooseCategory}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CategoryAllChoose"
        component={CategoryAllChoose}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Inviteyourfriend"
        component={Inviteyourfriend}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="SubscriptionPlan"
        component={SubscriptionPlan}
        options={{
          headerTitle: "Sports Talk",
          headerTitleAlign: "center",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                style={{ height: 20, width: 20, marginLeft: scale(15) }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderRight
              onPressNotifications={() => navigation.navigate("Notifications")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
