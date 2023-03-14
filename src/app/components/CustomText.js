import React from "react";
import { Text, StyleSheet } from "react-native";
import scale, { verticalScale } from "../themes/Metrics";

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: scale(12),
  },
});

export const CustomText = (props) => {
  return (
    <Text
      // adjustsFontSizeToFit
      // minimumFontScale={2}
      // adjustsFontSizeToFit
      ellipsizeMode="tail"
      numberOfLines={props.numberOfLines}
      style={[styles.defaultStyle, props.style]}
    >
      {props.item}
    </Text>
  );
};
