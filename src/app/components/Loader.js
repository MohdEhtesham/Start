//Import React and Hook we needed
import React, { useEffect, useRef, useState } from "react";

//Import all required component
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Image,
  Animated,
  Easing,
} from "react-native";
import images from "../themes/Images";

const Loader = (props) => {
  const { ...attributes } = props;
  let [myloading, setLoading] = useState(true);
  const timerToClearSomewhere = useRef(null); //now you can pass timer to another component
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  React.useEffect(() => {
    setLoading(props.loading);
    // timerToClearSomewhere.current = setTimeout(() => {
    // setLoading(false);
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 3,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    // }, 3000);
    // return () => {
    //   clearInterval(timerToClearSomewhere.current);
    // };
  }, [props.loading]);
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={myloading}
      onRequestClose={() => {
        clearInterval(timerToClearSomewhere.current);
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          {/* <ActivityIndicator animating={myloading} /> */}
          <Animated.Image
            style={{ height: 100, width: 100, transform: [{ rotate: spin }] }}
            source={images.splashLogo}
          />
        </View>
      </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    // backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
