/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import scale, { verticalScale } from "../themes/Metrics";
import HeaderMenuIcon from "../images/svg/header/HeaderMenuIcon.svg";
import BellIcon from "../images/svg/header/bell.svg";
import Fonts from "../themes/Fonts";
import { CustomText } from "../components/CustomText";

export const Header = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => props.navigation && props.navigation.navigate("Chat")}
      >
        <HeaderMenuIcon
          // tintColor={R.colors.white}
          style={{
            margin: scale(16),
            width: scale(16.93),
            height: scale(15.25),
          }}
        />
      </TouchableOpacity>
      <CustomText
        style={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: scale(15),
          fontFamily: Fonts.type.JostRegular,
        }}
        onPress={props.onPress}
        item={props.title}
      />
      <TouchableOpacity>
        <BellIcon
          // tintColor={R.colors.white}
          style={{
            margin: scale(16),
            width: scale(16.93),
            height: scale(15.25),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
