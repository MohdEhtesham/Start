import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    //height:verticalScale(812.78),
    width: scale(345),
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

  contentstyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "left",
    color: colors.textblack_555555,
    //marginVertical: verticalScale(14),
    width: scale(345),
  },
});
