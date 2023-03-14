import { StyleSheet } from "react-native";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";

export default StyleSheet.create({
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
    padding: scale(4),
  },
  searchicon: {
    alignSelf: "center",
    marginHorizontal: scale(13),
  },

  filterstyle: {
    zIndex: 9999,
    position: "absolute",
    bottom: verticalScale(25),
    right: scale(20),
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
    elevation: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerUserStyles: {
    width: scale(375),
    height: verticalScale(54),
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    marginLeft: scale(15),
    alignSelf: "center",
    fontSize: scale(18),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
  },

  cancelstyle: {
    width: scale(22),
    height: scale(24),
    alignSelf: "center",
  },

  category: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.namecolor_333333,
  },

  Debates: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.namecolor_333333,
    marginTop: verticalScale(26),
  },

  DebatesCategory: {
    fontFamily: Fonts.type.JostBold,
    fontSize: scale(18),
    color: colors.namecolor_333333,
    marginLeft: scale(10),
    marginBottom: verticalScale(15),
  },

  categoryName: {
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
  },

  bedatestitles: {
    fontSize: scale(15),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
  },

  checkStyle: {
    width: scale(16),
    height: scale(17),
    alignSelf: "center",
    marginRight: scale(5),
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
    fontSize: scale(18),
    color: colors.black,
  },

  cardConatiner: {
    width: scale(345),
    height: verticalScale(72),
    backgroundColor: colors.whiteText,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: verticalScale(9),
    // flexDirection: "row",
    alignSelf: "center",
  },

  imagesstyle: {
    width: scale(51),
    height: scale(51),
    borderRadius: 100,
    alignSelf: "center",
    marginRight: scale(10),
    borderColor: colors.borderColor,
    borderWidth: 1,
  },

  namestyle: {
    // marginLeft:scale(4.5),
    textAlign: "left",
    fontSize: scale(18),
    fontFamily: Fonts.type.JostRegular,
    color: colors.textColor_222222,
    width: scale(200),
  },

  textstyle: {
    fontSize: scale(13),
    fontFamily: Fonts.type.JostRegular,
    color: colors.follow,
  },
  textstyle1: {
    fontSize: scale(12),
    fontFamily: Fonts.type.JostRegular,
    color: colors.block,
    alignSelf: "flex-start",
    width: scale(180),
    // borderWidth: scale(0.5),
  },
  Container: {
    //height:verticalScale(812.78),
    width: scale(345),
    alignSelf: "center",
  },

  titlestyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    textAlign: "left",
    color: colors.textColor_222222,
    marginVertical: verticalScale(8),
  },
  More: {
    height: verticalScale(3),
    width: scale(3),
    // alignSelf:'center',
    marginLeft: scale(168),
    marginTop: scale(6),
    // marginRight: scale(7),
  },

  verticleLine: {
    height: "100%",
    width: 1,
    marginHorizontal: scale(10),
    backgroundColor: "#909090",
  },
});
