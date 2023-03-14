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
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    justifyContent: "space-between",
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
    padding: verticalScale(4),
  },

  searchicon: {
    alignSelf: "center",
    marginHorizontal: scale(13),
  },
  chatContainer: {
    width: scale(345),
    alignSelf: "center",
    marginTop: verticalScale(16),
    // height: verticalScale(96),
    shadowColor: "#000",
    backgroundColor: colors.whiteText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
  },

  profileImages: {
    width: scale(62),
    height: scale(62),
    borderRadius: 100,
    marginTop: verticalScale(13),
    marginBottom: verticalScale(21),
    marginLeft: scale(6),
  },

  chatTextContainer: {
    marginLeft: scale(20),
    width: scale(250),
  },

  chatNameContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: verticalScale(17),
  },

  titlestyles: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(18),
    color: colors.black,
  },

  time: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(12),
    color: colors.textBlack_757575,
    alignSelf: "center",
  },
  chatitem: {
    fontSize: scale(13),
    fontFamily: Fonts.type.JostRegular,
    color: colors.textblack_555555,
    textAlign: "left",
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
});
