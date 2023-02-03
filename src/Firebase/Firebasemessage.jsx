import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';

export default function Firebasemessage() {

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
  }
  return (
    <View>
      <Text>firebasemessage</Text>
    </View>
  )
}

const styles = StyleSheet.create({})


// cmo-DGMDmEbihzckNIRC8S:APA91bFf6DAzAU8S2jC6VtFLPRzBIs-WJe14ZOc0yqMC3R7lcW8Rwo7JwGr1_NzEwT-g4UUWZFfNRFeLCpy-2fnwZztEimdRa6V_QXG7CejoUom5IlPKx51Y3otYNX8fkfjIx4VC2ISB
// evpvzTiaRFmccG7BYisoPR:APA91bFWoJEENKxQ5hOmFUH50bvca-eeZI7LHbubx5RD-pksK_g9Xh0SStzUlNy89hOgfEG04Yc6dep083WXRrCqXeSrp3fzOFWMNUVGbZFHVuV51xzIkJbKS1_AkfEHBKF6s0ifZmbN