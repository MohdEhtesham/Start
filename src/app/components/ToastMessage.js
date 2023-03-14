// import Toast from 'react-native-root-toast';
// import {ToastAndroid, Platform} from 'react-native';

// const ToastMessage = (message) => {
//   if (Platform.OS === 'ios') {
//     let toast = Toast.show(message, {
//       duration: Toast.durations.LONG,
//       position: Toast.positions.CENTER,
//       shadow: true,
//       animation: true,
//       hideOnPress: true,
//       delay: 0,
//       containerStyle: {
//         padding: 15,
//       },
//     });
//     setTimeout(function () {
//       Toast.hide(toast);
//     }, 5000);
//   } else {
//     ToastAndroid.show(message, ToastAndroid.SHORT, Toast.positions.CENTER);
//   }
// };
// export default ToastMessage;