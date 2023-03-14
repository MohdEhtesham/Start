import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    //height:verticalScale(812.78),
    width: scale(345.72),
    alignSelf: "center",
    marginTop: verticalScale(14),
    backgroundColor: colors.background,
  },

  cardContainer: {
    width: scale(345),
    alignSelf: "center",
    //backgroundColor:"red",
  },

  profileImages: {
    width: scale(54),
    height: scale(54),
    borderRadius: 100,
    marginTop: verticalScale(10),
    marginLeft: scale(5),
    marginBottom: verticalScale(10),
    borderColor: colors.profile_border,
    borderWidth: 1.5,
  },

  TextContainer: {
    marginLeft: scale(10),
    width: scale(276),
    alignSelf: "center",
  },

  titlestyles: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.textcolor_333A42,
  },

  time: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(12),
    color: colors.iconimage_707070,
    marginLeft: scale(5),
  },

  button: {
    width: scale(72),
    height: scale(31),
    borderRadius: 5,
    color: colors.textblack_555555,
    marginTop: verticalScale(1),
    backgroundColor: "white",
    // marginLeft: scale(98),
    borderWidth: 0.4,
    // textAlign:"center",
  },

  buttontext: {
    fontSize: scale(16),
    color: colors.namecolor_333333,
    fontFamily: Fonts.type.JostRegular,
    textAlign: "center",
    marginTop: verticalScale(3),
  },

  name: {
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    textAlign: "left",
    alignSelf: "center",
    width: scale(180),
  },

  sepration: {
    borderStyle: "dotted",
    borderWidth: 0.1,
    borderRadius: 0.2,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
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
    color: colors.black,
  },

  heading: {
    marginLeft: scale(15),
    alignSelf: "flex-start",
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    marginTop: scale(15),
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
