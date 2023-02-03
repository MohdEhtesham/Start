import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import *as Auth from '../Auth';
import {Routes}  from '../Navigator/Routes';
import MyDrawer from '../17jan/Drawer';


const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (

    <Stack.Navigator 
    screenOptions={{
     headerShown:false
    }} >
      <Stack.Screen name={Routes.Splash} component={Auth.Splash} />
      <Stack.Screen name={Routes.Signup} component={Auth.Signup} />
      <Stack.Screen name={Routes.Login} component={Auth.Login} />
      <Stack.Screen name={Routes.Home} component={Auth.Home} />

    </Stack.Navigator>

  )
}



const styles = StyleSheet.create({})