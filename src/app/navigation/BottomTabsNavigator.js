/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import TimeLineScreen from "../containers/dashBoard/timelinescreen/TimeLineScreen";
import Feature from "../containers/dashBoard/feature/Feature";
import Chat from "../containers/dashBoard/chat/Chat";
import ChatDetails from "../containers/dashBoard/chat/ChatDetails";
import Ranking from "../containers/dashBoard/ranking/Ranking";
import JoinAndStart from "../containers/dashBoard/joinAndStart/JoinAndStart";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import scale, { verticalScale } from "../themes/Metrics";
import colors from "../themes/Colors";
// import {HeaderTitle} from '../components/HeaderTitle';
const stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import HeaderMenuIcon from "../images/svg/header/HeaderMenuIcon.svg";
import TimeLineActive from "../images/svg/bottomtabs/timeline-active.svg";
import TimeLineInActive from "../images/svg/bottomtabs/timeline.svg";
import FeatureInActive from "../images/svg/bottomtabs/featured.svg";
import FeatureActive from "../images/svg/bottomtabs/featured-active.svg";
import JoinAndStartInActive from "../images/svg/bottomtabs/join-start.svg";
import JoinAndStartActive from "../images/svg/bottomtabs/join-start-active.svg";
import ChatActive from "../images/svg/bottomtabs/chats-active.svg";
import ChatInActive from "../images/svg/bottomtabs/chats.svg";
import RankingActive from "../images/svg/bottomtabs/ranking-active.svg";
import RankingInActive from "../images/svg/bottomtabs/ranking.svg";
import BellIcon from "../images/svg/header/bell.svg";
import Circle from "../images/svg/header/circle.svg";
// import TimeLineInActive from '../images/svg/header/timeline.svg'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderRight } from "../components/HeaderRight";
import ChangePassword from "../containers/drawerscreen/ChangePassword";
import MyProfile from "../containers/drawerscreen/MyProfile";
import TermAndConditions from "../containers/drawerscreen/TermAndConditions";
import PrivacyPolicy from "../containers/drawerscreen/PrivacyPolicy";
import MySubscription from "../containers/drawerscreen/MySubscription";
import EditProfile from "../containers/drawerscreen/Editprofile";
import BackIcon from "../images/svg/back.svg";
import Fonts from "../themes/Fonts";
import { CustomText } from "../components/CustomText";

const TimeLineScreenNavigator = ({ navigation }) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: colors.black,
        headerStyle: {
          backgroundColor: colors.RedHeader,
        },
      }}
    >
      <stack.Screen
        name="TimeLineScreen"
        component={TimeLineScreen}
        options={{
          backgroundColor: "red",
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
                navigation.openDrawer();
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
    </stack.Navigator>
  );
};

const FeatureNavigator = ({ navigation }) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: colors.black,
        headerStyle: {
          backgroundColor: colors.RedHeader,
        },
      }}
    >
      <stack.Screen
        name="Feature"
        component={Feature}
        options={{
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
                navigation.openDrawer();
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
    </stack.Navigator>
  );
};

const JoinAndStartNavigator = ({ navigation }) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: colors.whiteText,
        headerStyle: {
          backgroundColor: colors.RedHeader,
        },
      }}
    >
      <stack.Screen
        name="JoinAndStart"
        component={JoinAndStart}
        options={{
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
                navigation.openDrawer();
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
    </stack.Navigator>
  );
};

const ChatNavigator = ({ navigation }) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: colors.black,
        headerStyle: {
          backgroundColor: colors.RedHeader,
        },
      }}
    >
      <stack.Screen
        name="Chat"
        component={Chat}
        options={{
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
                navigation.openDrawer();
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
      {/* <stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={{
          headerShown: true,
        }}
      /> */}
    </stack.Navigator>
  );
};

const RankingNavigator = ({ navigation }) => {
  return (
    <stack.Navigator
      screenOptions={{
        //headerBackTitleVisible: false,
        headerTintColor: colors.black,
        headerStyle: {
          backgroundColor: colors.RedHeader,
        },
      }}
    >
      <stack.Screen
        name="Ranking"
        component={Ranking}
        options={{
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
                navigation.openDrawer();
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
    </stack.Navigator>
  );
};
export default function BottomTabsNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="TimeLineScreen"
      tabBarOptions={{
        activeTintColor: colors.voilet,
        keyboardHidesTabBar: true,
        style: {
          // paddingBottom: 5,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : "1%",
          // height: 47,
          height: Platform.OS === "ios" ? scale(60) + insets.bottom : "8%",
          paddingTop: Platform.OS === "ios" ? insets.bottom / 2 : null,
          backgroundColor: colors.black,
          //marginBottom:10,
          //height:verticalScale(65)
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="TimeLineScreen"
        component={TimeLineScreenNavigator}
        options={{
          headerShown: false,
          // tabBarVisible: state ? false : true,
          tabBarLabel: ({ color, focused }) => {
            if (!focused) {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    // paddingVertical:10,
                    fontSize: scale(14),
                    textAlign: "center",
                    color: colors.BottomTabstextInactice,
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Timeline"}
                />
              );
            } else {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    color: colors.yellowButton,
                    textAlign: "center",
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Timeline"}
                />
              );
            }
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <TimeLineInActive
                  // source={R.images.timeline}
                  style={{
                    width: scale(13.15),
                    height: scale(21.8),
                  }}
                />
              );
            } else {
              return (
                <TimeLineActive
                  // source={R.images.timelineActive}
                  style={{
                    width: scale(13.15),
                    height: scale(21.8),
                  }}
                />
              );
            }
          },
        }}
      />

      <Tab.Screen
        name="Feature"
        component={FeatureNavigator}
        options={{
          headerShown: false,
          // tabBarVisible: state ? false : true,
          tabBarLabel: ({ color, focused }) => {
            if (!focused) {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    textAlign: "center",
                    color: colors.BottomTabstextInactice,
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Featured"}
                />
              );
            } else {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    color: colors.yellowButton,
                    textAlign: "center",
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Featured"}
                />
              );
            }
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <FeatureInActive
                  // source={R.images.featured}
                  style={{
                    height: scale(20),
                    width: scale(18),
                  }}
                />
              );
            } else {
              return (
                <FeatureActive
                  // source={R.images.featuredActive}
                  style={{
                    height: scale(20),
                    width: scale(18),
                  }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="JoinAndStart"
        component={JoinAndStartNavigator}
        options={{
          headerShown: false,
          // tabBarVisible: state ? false : true,
          tabBarLabel: ({ color, focused }) => {
            if (!focused) {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    fontSize: scale(14),
                    textAlign: "center",
                    color: colors.BottomTabstextInactice,
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Join/Start"}
                />
              );
            } else {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    color: colors.yellowButton,
                    textAlign: "center",
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Join/Start"}
                />
              );
            }
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <JoinAndStartInActive
                  // source={R.images.joinAndStart}
                  style={{
                    height: scale(17.3),
                    width: scale(17.3),
                  }}
                />
              );
            } else {
              return (
                <JoinAndStartActive
                  // source={R.images.joinAndStartActive}
                  style={{
                    height: scale(22),
                    width: scale(20),
                  }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          headerShown: false,
          // tabBarVisible: state ? false : true,
          tabBarLabel: ({ color, focused }) => {
            if (!focused) {
              return (
                <CustomText
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    textAlign: "center",
                    color: colors.BottomTabstextInactice,
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Chats"}
                />
              );
            } else {
              return (
                <CustomText
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    color: colors.yellowButton,
                    textAlign: "center",
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Chats"}
                />
              );
            }
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <ChatInActive
                  // source={R.images.chats}
                  style={{
                    height: scale(20),
                    width: scale(18),
                  }}
                />
              );
            } else {
              return (
                <ChatActive
                  // source={R.images.chatsActive}
                  style={{
                    height: scale(20),
                    width: scale(18),
                  }}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingNavigator}
        options={{
          headerShown: false,
          // tabBarVisible: state ? false : true,
          tabBarLabel: ({ color, focused }) => {
            if (!focused) {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    textAlign: "center",
                    color: colors.BottomTabstextInactice,
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Ranking"}
                />
              );
            } else {
              return (
                <CustomText
                  numberOfLines={1}
                  style={{
                    // fontFamily: R.fonts.JostRegular,
                    fontSize: scale(14),
                    color: colors.yellowButton,
                    textAlign: "center",
                    fontFamily: Fonts.type.JostRegular,
                    marginBottom: scale(5),
                  }}
                  item={"Ranking"}
                />
              );
            }
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (!focused) {
              return (
                <RankingInActive
                  // source={R.images.ranking}
                  style={{
                    height: scale(20),
                    width: scale(18),
                  }}
                />
              );
            } else {
              return (
                <RankingActive
                  // source={R.images.rankingActive}
                  style={{
                    height: scale(20),
                    width: scale(18),
                  }}
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}
