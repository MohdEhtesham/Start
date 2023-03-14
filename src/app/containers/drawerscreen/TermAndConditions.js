import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { CustomText } from "../../components/CustomText";
import colors from "../../themes/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./TermsAndConditionsStyle";
// import R from '../../R';
class TermAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <KeyboardAwareScrollView>
            <ScrollView style={styles.Container}>
              <CustomText
                item={"Terms and Conditions"}
                style={styles.titlestyle}
              />
              <CustomText
                style={styles.contentstyle}
                item={
                  " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut pellentesque quam. Quisque quis ex congue, suscipit orci in,  iaculis mi. Ut suscipit elit quis tellus vulputate, ac lobortis orci fringilla. Quisque et nunc sed justo placerat volutpat eu ut urna. Mauris blandit placerat erat id porta. Pellentesque elementum tellus vitae lectus commodo feugiat in eu urna. Aliquam eu arcu mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque tincidunt pharetra nulla. Maecenas eget consectetur magna. In dictum felis in sapien viverra vehicula. Vivamus eu efficitur libero, nec fermentum augue. Integer in pellentesque risus, ac pulvinar tortor. Duis eget sagittis justo. Nulla viverra nibh sapien, vitae malesuada magna malesuada vel. Morbi sem ipsum, congue et diam sit amet, aliquam commodo neque. Sed orci enim, vulputate vel arcu at, fringilla blandit magna. Maecenas quis ligula ut enim malesuada vehicula. Aliquam erat volutpat. Donec sodales, nisl et rhoncus congue, lectus nibh elementum justo, tristique porttitor quam urna sed enim. Pellentesque tincidunt pharetra nulla. Maecenas eget consectetur magna."
                }
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default TermAndConditions;
