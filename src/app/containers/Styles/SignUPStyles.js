import { Platform, StyleSheet } from "react-native";
import scale, { verticalScale } from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    // backgroundColor: COLOR_CONST.white,
  },
  backIconstyle: {
    width: scale(19),
    height: scale(19),
    marginTop:
      Platform.OS === "android" ? verticalScale(20) : verticalScale(50),
    marginLeft: scale(19),
  },
  appLogo: {
    width: scale(50),
    height: scale(50),
    alignSelf: "center",
  },
  camera: {
    zIndex: 9999,
    position: "absolute",
    //alignSelf: 'flex-end',
    marginTop: verticalScale(75),
    marginLeft: scale(70),
  },
  iconContainer: {
    width: scale(100),
    height: scale(100),
    alignSelf: "center",
  },
  container: {
    width: scale(345),
    alignSelf: "center",
    //marginBottom: verticalScale(20),
  },
  textSignIn: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(29),
    textAlign: "center",
    color: colors.whiteText,
    marginTop: verticalScale(15.8),
    marginBottom: verticalScale(15.8),
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
    marginLeft: scale(20),
    opacity: 1,
  },
  createAccountStyle: {
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    color: colors.whiteText,
  },
  somePlaceholderStyle: {
    color: colors.whiteText,
  },
  modelBackgroud: {
    justifyContent: "flex-end",
    backgroundColor: colors.color_00000080,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },

  modalContainer: {
    flex: 1,
  },

  transparentBg: {
    flex: 1,
    backgroundColor: colors.color_00000080,
    opacity: 0.55,
  },

  bottomView: {
    width: scale(375),
    height: scale(211),
    backgroundColor: colors.whiteText,
  },

  crossIcon: {
    width: scale(24),
    height: scale(24),
    alignSelf: "flex-end",
    marginTop: verticalScale(16),
    marginRight: scale(16),
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(19),
  },

  leftButton: {
    alignItems: "center",
    marginRight: scale(39),
  },

  rightButton: {
    alignItems: "center",
    marginLeft: scale(39),
  },

  takePictureText: {
    fontSize: scale(14),
    lineHeight: scale(20),
    marginTop: verticalScale(24),
    fontFamily: Fonts.type.JostMedium,
    textAlign: "center",
    color: colors.black,
  },

  galleryIcon: {
    width: scale(50),
    height: scale(50),
  },
  cameraIcon: {
    width: scale(50),
    height: scale(50),
  },
  linkText:{
    fontSize: 16,
    color: "white",
    lineHeight: 24,
  },
  termsWrap: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
