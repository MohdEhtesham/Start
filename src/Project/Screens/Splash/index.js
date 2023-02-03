import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {  useNavigation } from '@react-navigation/native';

export default function Splash() {
    const navigation =useNavigation
    useEffect(()=>{
        setTimeout(() => {
            navigation.replace()
        }, timeout);
    },[])
  return (
    <View>
      <Text>Splash</Text>
    </View>
  )
}