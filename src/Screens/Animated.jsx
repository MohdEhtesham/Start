import { StyleSheet, Text, View, Animated} from 'react-native'
import React, { useEffect } from 'react'

export default function Animated() {

 let movV = new Animated.Value(0);
  useEffect(()=>{
    moveverticaly()
  },[])

  const moveverticaly=()=>{
    Animated.timing(movV,{
      toValue:1,
      duration:3000,
      useNativeDriver: true
    }).start()

  }
  const tranfer=movV.interpolate({
    inputRange:[0,1],
    outputRange:['0deg','360deg']
  })
  
  return (
    <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
    <Animated.View style={{
      height:100,
      width:100, 
      backgroundColor:'red',
      transform:[{rotate: tranfer}]
      // opacity:tranfer
      }}></Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({})