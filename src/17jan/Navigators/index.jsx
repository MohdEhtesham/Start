import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Routes } from './Routes';
import *as Screens from '../Screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomTab from './CustomTab';

const Stack = createNativeStackNavigator();

const RootHome = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={Routes.Home} component={Screens.Home} />
        </Stack.Navigator>
    )

}

const Tab = createBottomTabNavigator();
export default function Navigators() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTab {...props} />}
            screenOptions={{headerShown:false}}
        >
            <Tab.Screen name={Routes.Home} component={RootHome }  />
            <Tab.Screen name={Routes.Profile} component={Screens.Profile} />
            <Tab.Screen name={Routes.Settings} component={Screens.Settings} />
        </Tab.Navigator>
    )
}

