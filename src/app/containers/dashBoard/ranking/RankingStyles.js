import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../themes/Metrics";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";

export default StyleSheet.create({
  cardConatiner: {
    width: scale(345),
    height: verticalScale(72),
    backgroundColor: colors.whiteText,
    marginHorizontal: scale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    marginTop: verticalScale(13),
    flexDirection: "row",
  },

  imagesstyle: {
    width: scale(51),
    height: scale(51),
    borderRadius: 100,
    alignSelf: "center",
    marginLeft: scale(9),
    marginRight: scale(10),
    borderColor: colors.borderColor,
    borderWidth: 1,
  },

  numberstyle: {
    fontSize: scale(18),
    alignSelf: "center",
    marginLeft: scale(20),
    marginRight: scale(14.5),
    color: colors.textColor_222222,
    fontFamily: Fonts.type.JostRegular,
  },

  namestyle: {
    // marginLeft:scale(4.5),
    fontSize: scale(18),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    textAlign: "left",
    width: scale(200),
  },

  textstyle: {
    fontSize: scale(12),
    fontFamily: Fonts.type.JostRegular,
    color: colors.textblack_555555,
  },

  verticleLine: {
    height: "100%",
    width: 0.5,
    backgroundColor: "#909090",
    color: colors.borderColor,
  },

  emptyData: {
    // backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignSelf: "center",
  },

  nodata: {
    alignSelf: "center",
    marginTop: "60%",
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.black,
  },
});
