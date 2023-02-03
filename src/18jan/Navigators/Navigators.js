import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import * as Screens from '../Screens'



const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (

    <Stack.Navigator 
    screenOptions={{
     headerShown:false
    }} >
      <Stack.Screen name={Routes.Splash} component={Screens.Splash} />
      <Stack.Screen name={Routes.Signup} component={Screens.Signup} />
      <Stack.Screen name={Routes.Signin} component={Screens.Signin} />

    </Stack.Navigator>

  )
}



const styles = StyleSheet.create({})