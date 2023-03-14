import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default StyleSheet.create({
  buttonTouchableOpacity: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: verticalScale(60),
    width: scale(345),
    backgroundColor: colors.yellowButton,
  },
  buttonText: {
    fontSize: scale(16),
    color: colors.whiteText,
    // fontFamily: R.fonts.JostRegular,
  },
  photostyle: {
    width: scale(188),
    height: verticalScale(270),
  },
  Container: {
    borderWidth: 1,
    // borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: colors.whiteText,
    marginTop: verticalScale(14),
  },

  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  textContainer: {
    marginTop: verticalScale(6),
    marginHorizontal: scale(15),
    // backgroundColor: colors.borderColor,
  },

  textstyle: {
    color: colors.whiteText,
    fontSize: scale(11),
    fontFamily: Fonts.type.JostRegular,
  },
  textstyle: {
    color: colors.whiteText,
    fontSize: scale(12),
    fontFamily: Fonts.type.JostBold,
  },

  touchableopacitystyle: {
    position: "absolute",
    zIndex: 9999,
    alignSelf: "center",
  },
  imagestyle: {
    width: 50,
    height: 50,
  },

  voteContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: verticalScale(9.78),
    marginHorizontal: scale(20),
    // marginLeft: scale(43),
    // marginRight: scale(40),
    // marginHorizontal: scale(42),
  },
  voteContainer1: {
    borderRadius: 2,
    borderWidth: 0.5,
    width: scale(67),
    height: verticalScale(28),
    justifyContent: "center",
    alignSelf: "center",
    marginTop: verticalScale(15),
  },

  votetext: {
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    alignSelf: "center",
    fontSize: scale(14),
  },

  vsCircle: {
    width: scale(39),
    height: scale(39),
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    marginTop: scale(15),
  },

  vstext: {
    alignSelf: "center",
    color: colors.whiteText,
  },

  bottomblock: {
    borderWidth: 0.3,
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "black",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
  },
  bottomtext: {
    textAlign: "left",
    marginHorizontal: scale(16),
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
  },

  shareblock: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: scale(16),
    marginTop: verticalScale(14),
    marginBottom: verticalScale(15),
  },

  likestyle: {
    width: scale(60),
    height: verticalScale(60),
    marginHorizontal: scale(2),
    //marginTop:verticalScale(4),
    marginVertical: verticalScale(3),
    color: colors.likecolore_666666,
  },
  fivetext: {
    color: colors.textblack_555555,
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
  },

  fivetextliked: {
    color: colors.yellowButton,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(16),
  },
  commentContainer: {
    borderWidth: 0.3,
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "black",
    marginBottom: verticalScale(9),
  },
  commenttext: {
    alignSelf: "center",
    marginBottom: verticalScale(10),
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
  },
  nametext: {
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    alignSelf: "center",
    fontSize: scale(16),
    width: scale(100),
    textAlign: "center",
  },
  backgroundVideo: {
    height: 250,
    width: "100%",
  },
  mediaControls: {
    height: "100%",
    flex: 1,
    alignSelf: "center",
  },

  modelBackgroud: {
    justifyContent: "flex-end",
    backgroundColor: colors.color_00000080,
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },

  headerStyles: {
    width: scale(375),
    height: verticalScale(54),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    marginLeft: scale(15),
    alignSelf: "center",
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: colors.black,
  },

  voteheaderTitle: {
    // marginLeft: scale(15),
    alignSelf: "center",
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: colors.whiteText,
  },

  cancelstyle: {
    width: scale(22),
    height: scale(24),
    alignSelf: "center",
  },

  voteContainercolor: {
    borderRadius: 2,
    width: scale(67),
    height: verticalScale(28),
    justifyContent: "center",
    alignSelf: "center",
    marginTop: verticalScale(15),
    backgroundColor: colors.yellowButton,
  },

  serarchMainContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: scale(16),
    marginTop: verticalScale(15),
  },

  searchcontainer: {
    width: scale(345),
    height: verticalScale(44),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    // justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.whiteText,
  },

  buttonStylesInvite: {
    width: verticalScale(86),
    height: scale(38),
  },

  inputstyle: {
    flex: 1,
    marginLeft: scale(15),
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
  },
  searchicon: {
    alignSelf: "center",
    marginHorizontal: scale(13),
  },
});
