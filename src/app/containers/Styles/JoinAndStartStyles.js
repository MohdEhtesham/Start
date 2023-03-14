import { StyleSheet } from "react-native";
import R from "../../../R";
import scale, { verticalScale } from "../../../utils/Scale";
import colors from "../../themes/Colors";

export default StyleSheet.create({
  debateContainer: {
    backgroundColor: colors.yellowButton,
    width: scale(345),
    alignSelf: "center",
    marginVertical: verticalScale(19),
    borderRadius: scale(8),
    // marginHorizontal:scale(15),
  },
  joinimage: {
    width: scale(175),
    height: scale(175),
    borderRadius: 100,
    alignSelf: "center",
    marginTop: verticalScale(36),
    marginBottom: verticalScale(26),
  },
  jointextStyle: {
    // fontFamily: R.fonts.JostMedium,
    fontSize: scale(25),
    textAlign: "center",
    color: colors.black,
    marginBottom: verticalScale(27),
  },
});
