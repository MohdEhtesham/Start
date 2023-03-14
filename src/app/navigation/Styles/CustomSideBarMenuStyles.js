import { StyleSheet } from "react-native";
import colors from "../../themes/Colors";
import Fonts from "../../themes/Fonts";
import scale, { verticalScale } from "../../themes/Metrics";

export default StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: colors.RedHeader,
  },

  useremail: {
    color: colors.whiteText,
    alignSelf: "center",
    marginTop: verticalScale(3),
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
  },

  timelinescreen: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(18),
    marginBottom: verticalScale(26),
    color: colors.whiteText,
  },

  timelinescreenNotication: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(18),
    color: colors.whiteText,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  imageconatiner: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    marginTop: verticalScale(20),
    alignSelf: "center",
  },

  imageprofile: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.whiteText,
  },
  backIconstyle: {
    width: scale(19),
    height: scale(19),
    marginTop: verticalScale(20),
    marginLeft: scale(19),
  },
  userName: {
    color: colors.whiteText,
    marginTop: verticalScale(29),
    fontSize: scale(22),
    fontFamily: Fonts.type.JostSemiBold,
    textAlign: "center",
    width: 300,
  },

  sideMenuProfileIcon: {
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
  },
});
