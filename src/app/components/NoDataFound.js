/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import scale, { verticalScale } from "../themes/Metrics";
import Fonts from "../themes/Fonts";
import { CustomText } from "../components/CustomText";
import colors from "../themes/Colors";

export const NoDataFound = () => {
  return (
    <View style={styles.emptyData}>
      <CustomText style={styles.nodata} item={"No Data Available"} />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyData: {
    //backgroundColor: "#ecf0f1",
    height: verticalScale(100),
    justifyContent: "center",
    alignSelf: "center",
  },

  nodata: {
    alignSelf: "center",
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.black,
  },
});
