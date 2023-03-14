import { StyleSheet, Dimensions } from "react-native";
import scale, { verticalScale } from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLOR_CONST.white,
  },
  appLogo: {
    width: scale(81),
    height: verticalScale(84),
    alignSelf: "center",
  },
  container: {
    width: scale(345),
    marginTop:
      Dimensions.get("window").height <= 880
        ? Dimensions.get("window").height * 0.2
        : Dimensions.get("window").height * 0.3,
    //flex:1,
    alignSelf: "center",
    justifyContent: "center",
    //marginTop: verticalScale(200),
  },
  textSignIn: {
    fontFamily: Fonts.type.JostMedium,
    //...fonts.style.medium_26,
    fontSize: scale(29),
    textAlign: "center",
    color: colors.whiteText,
    marginTop: verticalScale(12.6),
    marginBottom: verticalScale(21.5),
    letterSpacing: 2.9,
  },
  createandforgotcontainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: verticalScale(8.4),
  },
  textInputConatiner: {
    height: verticalScale(58.3),
    width: scale(344.98),
    backgroundColor: colors.textFieldBackgroudcolur,
    justifyContent: "center",
    marginBottom: verticalScale(9.6),
    borderRadius: 5,
  },
  textInputstyle: {
    color: colors.whiteText,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "left",
    marginLeft: scale(15),
  },
  createAccountStyle: {
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    color: colors.whiteText,
  },
  somePlaceholderStyle: {
    color: colors.whiteText,
  },
});
