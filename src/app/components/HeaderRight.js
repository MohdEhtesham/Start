/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import scale, { verticalScale } from "../themes/Metrics";
import BellIcon from "../images/svg/header/bell.svg";
import Circle from "../images/svg/header/circle.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const HeaderRight = (props) => {
  const [data, setdata] = useState("");
  // useEffect(() => {
  //   AsyncStorage.getItem("NOTIFICATION_RECIVE").then((value) => {
  //     console.log(value, "notificatiuoin header");
  //     setdata(value);
  //   });
  //   // alert("hii");
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("NOTIFICATION_RECIVE").then((value) => {
        console.log(value, "notificatiuoin header");
        setdata(value);
      });
      // alert("hiii");
    }, [])
  );

  return (
    <TouchableOpacity onPress={props.onPressNotifications}>
      <View style={{ flexDirection: "row", margin: scale(16) }}>
        <BellIcon
          style={{
            width: scale(16.93),
            height: scale(15.25),
          }}
        />
        {data ? <Circle /> : null}
      </View>
    </TouchableOpacity>
  );
};
