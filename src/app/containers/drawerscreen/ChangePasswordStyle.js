import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    //height:verticalScale(812.78),
    width: scale(345.72),
    alignSelf: "center",
    backgroundColor: colors.background,
  },

  titlestyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    textAlign: "left",
    color: colors.namecolor_333333,
    marginVertical: verticalScale(14),
  },

  subtitlestyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "left",
    color: colors.namecolor_333333,
    marginVertical: verticalScale(7),
  },

  textInputstyle: {
    color: colors.textblack_555555,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "left",
    marginLeft: scale(20),
    // opacity: 1,
    alignItems: "center",
    padding: verticalScale(4),
  },

  textInputConatiner: {
    height: verticalScale(40),
    width: scale(345),
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: colors.whiteText,
    borderColor: colors.textbox_CCCCCC,
    marginBottom: verticalScale(23),
  },
});
