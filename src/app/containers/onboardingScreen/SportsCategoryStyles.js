import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

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

  checkIocn: {
    zIndex: 9999,
    position: "absolute",
    //alignSelf: 'flex-end',
    marginTop: verticalScale(8),
    marginLeft: scale(134),
  },
});
