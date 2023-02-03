import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/Navigator/StackNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Navigators from './src/18jan/Navigators/Navigators'
import MyDrawer from './src/17jan/Drawer'
import Custom from './src/18jan/Custom'
import Selectimage from './src/Screens/Selectimage'
import Stacknavi from './src/20jan/Stacknavigators/Stacknavi'
import { Provider } from 'react-redux'
import { store } from './src/20jan/Redux/Store'
import Firebasemessage from './src/Firebase/Firebasemessage'
import GiftedChatcom  from './src/Firebase/GiftedChatcom'
import Firestorevalue from './src/Firebase/Firestorevalue'
import Modals from './src/Screens/Modals'
import InputR from './src/Reusable/InputR'




export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
    {/* <Navigators /> */}
    {/* <MyDrawer /> */}
    {/* <StackNavigator /> */}
    <Navigators />
    {/* <Custom /> */}
    {/* <Selectimage /> */}
    {/* <Stacknavi /> */}
    {/* <Firestorevalue/> */}
{/* <GiftedChatcom /> */}
{/* <Modals /> */}
{/* <InputR label="Email"/> */}

  </NavigationContainer>
  </Provider>

  )

}

const styles = StyleSheet.create({})



