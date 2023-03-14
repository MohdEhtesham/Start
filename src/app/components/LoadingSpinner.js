import React from "react";
import { ActivityIndicator } from "react-native";

import styles from "./Styles/LoadingSpinnerStyles";
import colors from "../themes/Colors";

function LoadingSpinner(props) {
  return (
    <ActivityIndicator
      {...props}
      style={[props.doNotFill ? null : styles.absoluteFill, props.style]}
      color={colors.rgb_767676}
    />
  );
}

export default LoadingSpinner;
