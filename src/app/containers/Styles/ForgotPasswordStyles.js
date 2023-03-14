import { StyleSheet, Platform, Dimensions } from "react-native";
import scale, { verticalScale } from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems:"center",
    // backgroundColor: COLOR_CONST.white,
  },
  backIconstyle: {
    width: scale(19),
    height: scale(19),
    marginTop:
      Platform.OS === "android" ? verticalScale(20) : verticalScale(50),
    marginLeft: scale(16),
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
        ? Dimensions.get("window").height * 0.15
        : Dimensions.get("window").height * 0.2,
    //flex:1,
    alignSelf: "center",
    //justifyContent:"center",
    // marginTop: verticalScale(200),
  },
  textSignIn: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(29),
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.whiteText,
    marginTop: verticalScale(12.6),
    marginBottom: verticalScale(6.5),
    letterSpacing: 2.9,
  },
  forgotpasswordDescription: {
    fontFamily: Fonts.type.JostRegular,
    color: colors.whiteText,
    textAlign: "center",
    marginBottom: verticalScale(13.3),
    fontSize: scale(15),
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
    marginLeft: scale(20),
    opacity: 1,
  },
});
