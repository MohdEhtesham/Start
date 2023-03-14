import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../themes/Metrics";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";

export default StyleSheet.create({
  cardConatiner: {
    width: scale(345),
    height: verticalScale(82),
    backgroundColor: colors.whiteText,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: verticalScale(9),
    // flexDirection: "row",
  },

  imagesstyle: {
    width: scale(51),
    height: scale(51),
    borderRadius: 100,
    alignSelf: "center",
    marginRight: scale(6),
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
    //width:scale(80)
  },
  textstyle3: {
    fontSize: scale(13),
    fontFamily: Fonts.type.JostRegular,
    color: colors.follow,
    width: scale(200),
  },
  textstyle2: {
    fontSize: scale(13),
    fontFamily: Fonts.type.JostRegular,
    color: colors.follow,
    width: scale(180),
  },
  textstyle1: {
    fontSize: scale(15),
    fontFamily: Fonts.type.JostRegular,
    color: colors.block,
    alignSelf: "center",
    // borderWidth: scale(0.5),
  },
  Container: {
    //height:verticalScale(812.78),
    width: scale(345),
    alignSelf: "center",
    backgroundColor: colors.background,
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
    // width: scale(3),
    // alignSelf:'center',
    // marginLeft: scale(168),
    marginTop: scale(6),
    alignSelf:'center'
    // marginRight: scale(7),
  },
  menuTextTitle: {
    color: "#555555",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(13),
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

  ListPendingEmpty: {
    alignSelf: "center",
    // marginVertical: verticalScale(100),
    fontFamily: Fonts.type.JostMedium,
    opacity: 0.5,
    fontSize: scale(18),
    color: colors.black,
  },

  verticleLine: {
    height: "100%",
    width: 1,
    marginHorizontal: scale(10),
    backgroundColor: "#909090",
  },
});
