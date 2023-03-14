import { StyleSheet, Dimensions } from "react-native";
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
  },

  searchicon: {
    alignSelf: "center",
    marginHorizontal: scale(13),
  },
  chatContainer: {
    width: scale(345),
    alignSelf: "center",
    marginTop: verticalScale(16),
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
  chatItem: {
    marginTop: 10,
    marginRight: 20,
    fontSize: scale(13),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    textAlign: "left",
  },
  profileImages: {
    width: scale(36),
    height: scale(36),
    borderRadius: 100,
    // alignItems:'center',
    justifyContent: "center",
    alignSelf: "center",
    // marginBottom: 10,
  },
  nameText: {
    fontFamily: Fonts.type.JostMedium,
    fontSize: scale(15),
    textAlign: "center",
    color: colors.whiteText,
    marginLeft: 5,
  },
  viewContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    //  flex: 1,
    backgroundColor: "white",
  },
  viewTime: {
    flex: 1,
    height: 20,
  },

  titleTime: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "grey",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    fontWeight: "bold",
  },
  userAdminName: {
    flex: 1,
    flexWrap: "wrap",
    flexGrow: 1,
    marginLeft: -50,
    marginRight: 20,
    // marginTop: 40,
    width: 100,
    color: "red",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    alignSelf: "center",
  },
  messageAdminText: {
    width: Dimensions.get("window").width - 75,
    backgroundColor: "white",
    padding: 5,
    color: "#333333",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#AEAEAE",
    borderRadius: 5,
  },
  messageText: {
    padding: 10,
    // flex: 1,
    flexWrap: "wrap",
    flexGrow: 1,
    marginTop: 20,
    marginLeft: 65,
    marginRight: 15,
    width: Dimensions.get("window").width - 70,
    minHeight: 50,
    color: "#FFFFFF",
    backgroundColor: "#ED3751",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    marginBottom: 20,
    // borderWidth:1,
    // borderRadius:10
  },

  userName: {
    flex: 1,
    flexWrap: "wrap",
    flexGrow: 1,
    // marginLeft: 10,
    //  marginTop: 40,
    width: 100,
    color: "red",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    alignSelf: "center",
  },
  menuTextTitle: {
    color: "#555555",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(13),
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
