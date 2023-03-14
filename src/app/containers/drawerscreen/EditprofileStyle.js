import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    width: scale(375),
    alignSelf: "center",
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: verticalScale(248),
    width: scale(375),
    // backgroundColor: colors.RedHeader,
  },
  image: {
    width: scale(375),
    height: verticalScale(248),
  },
  textContainer: {
    //height:verticalScale(812.78),
    //width: scale(375),
    alignSelf: "center",
    backgroundColor: colors.background,
  },

  subtitlestyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "left",
    color: colors.namecolor_333333,
    marginTop: verticalScale(18),
    marginBottom: verticalScale(7),
  },

  textInputConatiner1: {
    height: verticalScale(115),
    width: scale(343),
    backgroundColor: colors.whiteText,
    justifyContent: "center",
    marginBottom: verticalScale(20),
    //borderColor: colors.textbox_CCCCCC,
    borderWidth: 0.5,
    borderRadius: 5,
  },

  textInputConatiner: {
    height: verticalScale(44),
    width: scale(343),
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: colors.whiteText,
  },

  textInputstyle: {
    color: colors.textblack_555555,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    marginLeft: scale(10),
    alignItems: "center",
    padding: verticalScale(4),
  },

  textInputstyleUserName: {
    color: colors.textBlack_757575,
    opacity: 0.7,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    marginLeft: scale(16),
    alignItems: "center",
  },

  textInputstyle1: {
    width: scale(342),
    height: verticalScale(118),
    color: colors.textblack_555555,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlignVertical: "top",
    flexWrap: 'wrap',
    marginHorizontal: scale(10),
    marginVertical: verticalScale(6),
  },

  buttonStylesInvite: {
    width: scale(343),
    height: verticalScale(44),
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
  cameraTch:{
    position: "absolute",
    zIndex: 999,
    justifyContent: "flex-end",
    top: 9,
    right: 14,
  }
});
