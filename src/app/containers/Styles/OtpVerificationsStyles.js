import { StyleSheet, Platform, Dimensions } from "react-native";
import scale, { verticalScale } from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLOR_CONST.white,
  },

  appLogo: {
    width: scale(100),
    height: scale(100),
    alignSelf: "center",
  },
  container: {
    width: scale(345),
    alignSelf: "center",
    justifyContent: "center",
    //marginTop: verticalScale(120),
    marginTop:
      Dimensions.get("window").height <= 880
        ? Dimensions.get("window").height * 0.15
        : Dimensions.get("window").height * 0.2,
  },
  textSignIn: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(20),
    textAlign: "center",
    color: colors.whiteText,
    marginTop: verticalScale(12.6),
    marginBottom: verticalScale(6.5),
  },
  forgotpasswordDescription: {
    fontFamily: Fonts.type.JostRegular,
    color: colors.whiteText,
    textAlign: "center",
    fontSize: scale(16),
    marginBottom: verticalScale(13.3),
  },
  textInputConatiner: {
    height: verticalScale(58.3),
    width: scale(200),
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: verticalScale(20),
    borderRadius: 5,
    //marginLeft: 20
  },
  underlineStyleBase: {
    backgroundColor: colors.textFieldBackgroudcolur,
    borderWidth: 0,
    marginEnd: 5,
  },
  underlineStyleHighLighted: {
    borderWidth: 0,
  },
  textInputstyle: {
    color: colors.whiteText,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "left",
    marginLeft: scale(30),
    opacity: 1,
  },
  resendCode: {
    color: colors.whiteText,
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    alignSelf: "center",
    marginTop: verticalScale(16.6),
  },
});
