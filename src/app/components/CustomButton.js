import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Styles/CustomButtonStyles";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.buttonTouchableOpacity, props.buttonStyles]}
    >
      <Text style={[styles.buttonText, props.titlestyles]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
