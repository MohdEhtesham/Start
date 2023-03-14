import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    width: scale(375),
    alignSelf: "center",
  },

  textInputConatiner: {
    height: verticalScale(52),
    width: scale(188),
    backgroundColor: colors.whiteText,
    justifyContent: "center",
    borderColor: colors.BORDER,
    borderWidth: 1,
  },
  textInputConatinerADDITIONAL: {
    height: verticalScale(52),
    width: scale(188),
    backgroundColor: colors.RedHeader,
    justifyContent: "center",
    borderColor: colors.BORDER,
    borderWidth: 0.5,
  },
  textInputConatiner1: {
    height: verticalScale(52),
    width: scale(188),
    backgroundColor: colors.RedHeader,
    justifyContent: "center",
    borderColor: colors.BORDER,
    borderWidth: 0.5,
  },
  textInputConatinercopy: {
    height: verticalScale(52),
    width: scale(188),
    backgroundColor: colors.whiteText,
    justifyContent: "center",
    borderColor: colors.BORDER,
    borderWidth: 1,
  },
  planstyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "center",
    color: colors.namecolor_333333,
  },

  planstyleactive: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "center",
    color: colors.whiteText,
  },

  addstyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "center",
    color: colors.whiteText,
  },
  addstyleactive: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    textAlign: "center",
    color: colors.namecolor_333333,
  },
  numberConatiner: {
    width: scale(374.5),
    backgroundColor: colors.whiteText,
    borderColor: colors.BORDER,
    borderWidth: 1,
    backgroundColor: colors.background,
  },
  numberstyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(14),
    textAlign: "center",
    color: colors.namecolor_333333,
    marginTop: verticalScale(10),
  },
  numberstyle1: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    textAlign: "center",
    color: colors.textblack_555555,
    marginBottom: verticalScale(11),
  },
  name: {
    fontFamily: Fonts.type.JostBold,
    fontSize: scale(22),
    textAlign: "left",
    color: colors.namecolor_333333,
    marginHorizontal: scale(2),
    marginTop: verticalScale(12),
    width: scale(280),
  },
  username: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    textAlign: "left",
    width: scale(180),
    color: colors.namecolor_333333,
    // marginHorizontal: scale(15),
    marginBottom: verticalScale(19.5),
  },
  winloss: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(12),
    color: colors.namecolor_333333,
    // marginLeft: scale(110),
    marginTop: verticalScale(4),
    textAlign: "right",
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
  infoConatiner: {
    width: scale(374.5),
    backgroundColor: colors.whiteText,
    // justifyContent: "center",
    borderColor: colors.BORDER,
    // borderWidth: 1,
    // marginBottom: verticalScale(20),
    backgroundColor: colors.background,
  },
  about: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    textAlign: "left",
    color: colors.textColor_222222,
    marginTop: verticalScale(18),
  },

  phone: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    textAlign: "left",
    //marginRight:8,
    width: scale(150),
    color: colors.textColor_222222,
    marginHorizontal: scale(10),
    marginTop: 5,
  },

  state: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    textAlign: "left",
    //marginRight:8,
    width: scale(150),
    color: colors.textColor_222222,
    marginHorizontal: scale(10),
  },

  email: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    textAlign: "left",
    width: scale(200),
    color: colors.namecolor_333333,
    marginTop: verticalScale(6),
  },

  city: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    textAlign: "left",
    width: scale(200),
    color: colors.namecolor_333333,
    marginTop: verticalScale(6),
  },

  contentstyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(15),
    // textAlign: "left",
    color: colors.textblack_555555,
    marginVertical: verticalScale(3),
  },

  cardConatiner: {
    width: scale(163),
    backgroundColor: colors.whiteText,
    marginHorizontal: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    marginTop: verticalScale(18),
    marginBottom: verticalScale(18),
  },

  imagesstyle: {
    width: scale(96),
    height: scale(96),
    marginTop: verticalScale(21),
    alignSelf: "center",
    borderRadius: 100,
  },

  categoryTitle: {
    color: colors.black,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(16),
    textAlign: "center",
    marginTop: verticalScale(12),
    marginBottom: verticalScale(14),
  },

  changestyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(13),
    textAlign: "right",
    color: colors.textColor_222222,
    marginTop: verticalScale(25),
  },

  emptyData: {
    //backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignSelf: "center",
  },

  nodata: {
    alignSelf: "center",
    marginTop: verticalScale(150),
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(13),
    color: colors.black,
  },

  ranktext: {
    color: colors.whiteLow,
    fontFamily: Fonts.type.JostSemiBold,
    fontSize: scale(10),
  },
  rankNumber: {
    color: colors.whiteLow,
    fontFamily: Fonts.type.JostExtraBold,
    fontSize: scale(14),
  },

  UserNameconatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(18),
  },
});
