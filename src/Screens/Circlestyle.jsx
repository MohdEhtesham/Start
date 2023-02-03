import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")



export default function    Circlestyle() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <View style={styles.container1}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height / 7,
    width: width / 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: "red",
    borderRadius: 1000

  },
  container1: {
    height: height / 20,
    width: width * .1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: "black",
    position: 'absolute',
    top: 80,
    left: 90


  }
})