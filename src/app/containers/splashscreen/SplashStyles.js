import { StyleSheet } from "react-native";
import scale from "../../themes/Metrics";

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appLogo: {
    width: scale(201),
    height: scale(209),
  },
});
