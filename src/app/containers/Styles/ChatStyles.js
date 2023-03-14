import { StyleSheet } from "react-native";
import R from "../../../R";
// import scale, {verticalScale} from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent:'center',
    margin: 10,
  },

  box: {
    height: "15%",
    width: "90%",
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },

  img: {
    height: 70,
    width: 70,
    margin: 5,
  },

  number: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    margin: 8,
  },

  image: {
    height: 33,
    width: 30,
    marginLeft: 8,
    marginTop: 15,
  },

  searchbar: {
    width: "75%",
    marginLeft: 5,
    backgroundColor: "white",
  },
});
