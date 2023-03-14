import { StyleSheet } from "react-native";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";

export default StyleSheet.create({
  debateContainer: {
    backgroundColor: colors.whiteText,
    width: scale(345),
    //height: verticalScale(300),
    alignSelf: "center",
    marginVertical: verticalScale(20),
    borderRadius: scale(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    //justifyContent:'space-evenly',
  },
  container: {
    flex: 1,
    //flexDirection: 'column',
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  joinimage: {
    width: scale(175),
    height: verticalScale(175),
    borderRadius: 100,
    alignSelf: "center",
    marginTop: verticalScale(36),
    marginBottom: verticalScale(26),
  },
  jointextStyle: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(25),
    textAlign: "center",
    color: colors.black,
    marginBottom: verticalScale(26),
  },
});
