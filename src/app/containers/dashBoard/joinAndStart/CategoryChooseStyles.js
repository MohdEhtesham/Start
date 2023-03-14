import { StyleSheet } from "react-native";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";

export default StyleSheet.create({
  titlestyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(20),
    textAlign: "center",
    color: colors.black,
    marginTop: verticalScale(10),
  },

  butttonStyles: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: verticalScale(44),
    width: scale(375),
    backgroundColor: colors.yellowButton,
  },

  flatlistconatiner: {
    justifyContent: "center",
    marginBottom: verticalScale(100),
  },

  cardConatiner: {
    width: scale(163),
    backgroundColor: colors.whiteText,
    marginHorizontal: scale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius: 5,
    marginTop: verticalScale(10),
  },

  imagesstyle: {
    width: scale(96),
    height: scale(96),
    marginTop: verticalScale(21),
    alignSelf: "center",
    borderRadius: 100,
  },

  categoryTitle: {
    color: colors.namecolor_333333,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(16),
    textAlign: "center",
    marginTop: verticalScale(12),
    marginBottom: verticalScale(14),
  },

  modelBackgroud: {
    justifyContent: "center",
    backgroundColor: colors.color_00000080,
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },

  headerStyles: {
    width: scale(345),
    height: verticalScale(54),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10.0,
    elevation: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  headerTitle: {
    marginLeft: scale(15),
    alignSelf: "center",
    fontSize: scale(18),
    fontFamily: Fonts.type.JostMedium,
    color: colors.namecolor_333333,
  },

  cancelstyle: {
    width: scale(22),
    height: scale(24),
    alignSelf: "center",
  },

  rules: {
    margin: scale(14),
    alignSelf: "flex-start",
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    // marginTop: scale(15),
  },
});
