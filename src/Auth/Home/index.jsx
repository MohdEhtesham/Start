import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home({navigation,route:{params}}) {
  console.log(params)
  return (
    <SafeAreaView>
     {/* <Text>Home</Text> */}
     <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
      {/* <Text>go Back</Text> */}
      <Text>{params.info.email}</Text>
      <Text>{params.info.password}</Text>
     </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})