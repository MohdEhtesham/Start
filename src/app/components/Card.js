import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    margin: "2%",
    padding: "2%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export const Card = (props) => {
  return <View style={[styles.card, props.cardStyle]}>{props.children}</View>;
};
