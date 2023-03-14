import { StyleSheet } from "react-native";
import scale from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.whiteF1F2,
    borderRadius: 10,
    padding: 20,
  },
  titleText: {
    fontSize: 22,
    color: colors.bgColor,
    paddingHorizontal: 10,
  },
  descText: {
    fontSize: 16,
    color: colors.bgColor,
    padding: 10,
    lineHeight: 25,
  },
  cancelText: {
    color: colors.blue,
    fontSize: scale(16),
  },
  confirmText: {
    fontFamily: Fonts.nunitoBold,
    fontSize: scale(16),
    color: colors.whiteText,
  },
  btn: {
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    width: "46%",
    justifyContent: "center",
    alignItems: "center",
  },
});
