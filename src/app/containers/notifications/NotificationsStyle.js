import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    //height:verticalScale(812.78),
    //flex: 1,
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

  notificationContainer: {
    width: scale(345),
    alignSelf: "center",
  },

  profileImages: {
    width: 54,
    height: 54,
    borderRadius: 100,
    marginTop: verticalScale(2),
    marginLeft: scale(5),
    marginBottom: verticalScale(22.5),
    borderColor: colors.borderColor_A8A8A8,
  },

  notificationTextContainer: {
    marginLeft: scale(20),
    width: scale(276),
  },

  titlestyles: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.textcolor_333A42,
  },

  time: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(12),
    color: colors.iconimage_707070,
    marginLeft: scale(5),
  },

  timeImages: {
    width: scale(16),
    height: scale(17),
    borderRadius: 100,
    marginTop: verticalScale(1),
  },

  notificationitem: {
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    color: colors.textblack_555555,
    textAlign: "left",
    //width: scale(180),
  },
  notificationitem1: {
    fontSize: scale(14),
    fontFamily: Fonts.type.JostBold,
    color: colors.textblack_555555,
    textAlign: "left",
    //width: scale(276),
  },

  sepration: {
    borderStyle: "dotted",
    borderWidth: 0.2,
    borderRadius: 0.2,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },

  flatlistconatiner: {
    justifyContent: "center",
    marginBottom: verticalScale(100),
  },
});
