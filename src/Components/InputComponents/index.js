import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const InputComponents = ({ label, value, keyboardType, placeholder, onChangeText, secureTextEntry }) => {
  const [isFocused, setFocus] = useState(false)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{label}</Text>
      <TextInput style={{
        justifyContent: 'center',
        borderWidth: 1,
        width: "90%",
        height: 24,
        marginTop: 20,
        alignSelf: 'center'
      }}
       
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}

      />
    </SafeAreaView>
  )
}

export default InputComponents

const styles = StyleSheet.create({
  txt: {
    justifyContent: 'center',
    orderWidth: 1,
    width: "50%",
    height: 24,
    marginTop: 20,
    alignSelf: 'center'

  }

})