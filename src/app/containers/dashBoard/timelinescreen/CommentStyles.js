import { Platform, StyleSheet } from "react-native";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";

export default StyleSheet.create({
  Container: {
    flex: 1,
    //height:verticalScale(812.78),
    // width: scale(345.72),
    // alignSelf: "center",
  },

  titlestyle: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(18),
    textAlign: "left",
    color: colors.black,
    marginVertical: verticalScale(12),
    marginLeft: scale(20),
  },

  commentContainer: {
    width: scale(343.35),
    alignSelf: "center",
  },

  profileImages: {
    width: scale(63),
    height: scale(63),
    borderRadius: 100,
    marginTop: verticalScale(13),
    marginLeft: scale(6),
    borderColor: colors.borderColor_A8A8A8,
  },

  commentTextContainer: {
    marginLeft: scale(20),
    alignSelf: "center",
  },

  //commentNameContainer: {
  // justifyContent: 'space-between',
  // flexDirection: 'row',
  // marginTop:verticalScale(10)
  //},

  titlestyles: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(18),
    color: colors.textcolor_333A42,
  },

  date: {
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(13),
    color: colors.textblack_555555,
    //alignSelf:'center'
  },
  commentitem: {
    fontSize: scale(13),
    fontFamily: Fonts.type.JostRegular,
    color: colors.textblack_555555,
    textAlign: "left",
    width: scale(263.28),
  },

  profileImagesmessage: {
    width: scale(33),
    height: scale(33),
    borderRadius: 100,
    marginTop: verticalScale(9),
    marginBottom: verticalScale(11),
    marginLeft: scale(10),
    marginRight: scale(3),
    borderColor: colors.borderColor_A8A8A8,
  },

  input: {
    height: verticalScale(50),
    minHeight: verticalScale(40),
    width: scale(250),
    marginLeft: 9,
    marginTop: Platform.OS === "ios" ? 15 : 0,
    // backgroundColor:"yellow",
  },

  post: {
    fontSize: scale(14),
    alignSelf: "center",
    fontFamily: Fonts.type.JostRegular,
    justifyContent: "flex-end",
    textAlign: "right",
    marginLeft: scale(20),
  },

  emptyData: {
    backgroundColor: "#ecf0f1",
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

  likecomatiner: {
    marginLeft: scale(70),
    flexDirection: "row",
    marginTop: verticalScale(4),
    justifyContent: "space-between",
  },

  usernametouch: {
    width: scale(200),
  },
});
