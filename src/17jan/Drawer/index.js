import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Routes } from '../Navigators/Routes';
import *as Screens from "../Screens"
import Navigators from '../Navigators';


const Drawer = createDrawerNavigator();

 export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={Routes.Navigators} component={Navigators} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({})