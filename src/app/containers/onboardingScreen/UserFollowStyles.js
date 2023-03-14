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
  },

  butttonStyles: {
    height: verticalScale(44),
    width: scale(375),
    backgroundColor: colors.yellowButton,
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(16),
  },

  cardContainer: {
    width: scale(345),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.whiteText,
    alignSelf: "center",
    marginVertical: verticalScale(10),
  },

  imagesstyle: {
    width: scale(52),
    height: scale(52),
    borderRadius: 100,
    // marginTop: verticalScale(13),
    marginLeft: scale(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  followButton: {
    width: scale(87),
    height: verticalScale(28),
    borderRadius: 5,
    borderWidth: 0.6,
    borderColor: colors.textbox_CCCCCC,
    marginTop: verticalScale(6),
    justifyContent: "center",
    marginBottom: verticalScale(19),
  },

  nameconatiner: {
    marginLeft: scale(16),
    flex: 1,
  },

  titlestyles: {
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    textAlign: "left",
    color: colors.namecolor_333333,
    marginTop: verticalScale(15),
    width: scale(200),
  },

  categorystyles: {
    fontSize: scale(12),
    fontFamily: Fonts.type.JostRegular,
    textAlign: "left",
    color: colors.textLight_777777,
    // margin: 3,
    //ma: 15
  },

  categorystylesName: {
    fontSize: scale(12),
    fontFamily: Fonts.type.JostRegular,
    // textAlign: "right",
    color: colors.textLight_777777,
  },

  bordercategory: {
    // borderRadius: 5,
    // borderWidth: 0.7,
    // borderColor: colors.borderColor,
    flexDirection: "row",
  },

  followtext: {
    alignSelf: "center",
  },

  arrowstyles: {
    // alignSelf: "center",
    marginRight: 5,
    justifyContent: "center",
  },

  serarchMainContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: scale(16),
    marginTop: verticalScale(15),
  },

  searchcontainer: {
    width: scale(250),
    height: verticalScale(41),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.whiteText,
    textAlign: "center",
  },

  buttonStylesInvite: {
    width: scale(86),
    height: verticalScale(40),
  },

  inputstyle: {
    flex: 1,
    marginLeft: scale(15),
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    textAlignVertical: "center",
    padding: scale(4),
  },

  searchicon: {
    alignSelf: "center",
    marginHorizontal: scale(13),
  },

  modalContainer: {
    flex: 1,
  },

  transparentBg: {
    flex: 1,
    backgroundColor: colors.color_00000080,
    opacity: 0.55,
  },

  bottomView: {
    width: scale(375),
    height: scale(300),
    backgroundColor: colors.whiteText,
  },

  crossIcon: {
    width: scale(24),
    height: scale(24),
    alignSelf: "flex-end",
    marginTop: verticalScale(16),
    marginRight: scale(16),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(19),
  },

  headermodel: {
    height: verticalScale(50),
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
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
