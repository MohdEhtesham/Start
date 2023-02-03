import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import *as Screens from '../Screens'


const Stack = createNativeStackNavigator();

export default function Stacknavi() {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ Routes.Home} component={Screens.Home} />
        <Stack.Screen name={ Routes.Profile} component={Screens.Profile} />

        
    </Stack.Navigator>
    
  )
}

const styles = StyleSheet.create({})