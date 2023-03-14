import {StyleSheet} from 'react-native';
import scale, {verticalScale} from '../../themes/Metrics';
import colors from '../../themes/Colors'
import Fonts from '../../themes/Fonts';

export default StyleSheet.create({
  buttonTouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: verticalScale(60),
    width: scale(345),
    backgroundColor: colors.yellowButton,
  },
  buttonText: {
    fontSize: scale(16),
    color: colors.whiteText,
    fontFamily: Fonts.type.JostRegular,
  },
});
