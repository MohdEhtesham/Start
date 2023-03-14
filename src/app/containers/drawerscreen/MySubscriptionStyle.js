import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    //flex:1,
    width: scale(345.72),
    alignSelf: "center",
    //backgroundColor: colors.background,
  },

  titlestyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    textAlign: "left",
    color: colors.namecolor_333333,
    marginVertical: verticalScale(18),
  },

  textInputConatiner: {
    // height: verticalScale(190),
    width: scale(345),
    backgroundColor: colors.whiteText,
    justifyContent: "center",
    marginBottom: verticalScale(15),
    borderColor: colors.textbox_CCCCCC,
    borderRadius: 5,
    borderWidth: 1,
  },
  planstyle: {
    fontFamily: Fonts.type.JostBold,
    fontSize: scale(18),
    textAlign: "left",
    color: colors.namecolor_333333,
    marginTop: verticalScale(18),
  },

  $style: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(21),
    textAlign: "left",
    color: colors.textColor_222222,
    marginHorizontal: scale(10),
    marginTop: verticalScale(18),
  },
  $style1: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(14),
    textAlign: "left",
    color: colors.namecolor_333333,
    //marginHorizontal: scale(10),
  },
  contentstyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(13),
    textAlign: "left",
    color: colors.textblack_555555,
    marginVertical: verticalScale(5),
  },

  headingstyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(14),
    textAlign: "left",
    color: colors.namecolor_333333,
  },

  renewandcancelcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Daysstyle: {
    marginBottom: verticalScale(20),
  },
  bullet: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  termsWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
});
