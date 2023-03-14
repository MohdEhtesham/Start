import { StyleSheet } from 'react-native'
import Fonts from "../../themes/Fonts";
import colors from "../../themes/Colors";

export default StyleSheet.create({
  label_info: {
    flexDirection: 'row',
  },
  label: {
    ...Fonts.style.regular_12,
    color: colors.rgb_000000,
  },
  icon: {
    paddingHorizontal: 9.6,
  },
  textInput: {
    ...Fonts.style.regular_17,
    color: colors.rgb_000000,
    paddingVertical: 10,
    textAlign:'left'
  },
  showHidePassword: {
    ...Fonts.style.regular_14,
    position: 'absolute',
    right: 0,
    bottom: 15,
    padding: 10,
    color: colors.rgb_767676
  },
  errorMessage: {
    ...Fonts.style.regular_12,
    color: colors.rgb_e73536,
    marginHorizontal:10,
    marginTop:-15,
  },
  counterNumber: {
    ...Fonts.style.regular_12,
    color: colors.rgb_e73536,
    letterSpacing: 0.3,
    lineHeight: 14,
    textAlign: 'right',
  },
  doneButtonView: {
    width: '100%',
    height: 40, alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.rgb_F9F8F8,
    paddingRight: 10
  },
  doneButtonText: {
    ...Fonts.style.bold_18,
    color: colors.rgb_ffcd00,
    letterSpacing: 0.3,
    textAlign: 'right',
  }
})
