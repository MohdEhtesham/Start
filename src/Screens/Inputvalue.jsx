import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function Inputvalue() {
    const [value ,setValue]=useState("");
    const[type ,setType]=useState("");
    const valueset=()=>{
      setType(value)
    }
  return (
    <View>
      <TextInput onChangeText={txt => setValue(txt) }
       style={styles.inputstyle}
      />
      <TouchableOpacity onPress={() => valueset()}>
            <Text style={styles.btn}>confirm</Text>
          </TouchableOpacity>
      <TextInput placeholder={type.toLocaleLowerCase()} 
      keyboardType={type.toLocaleLowerCase()}
      style={styles.inputstyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    inputstyle: {
        borderWidth: 1,
        fontSize: 20,
        padding: 10,
        margin: 10,
        
      },
      btn: {
        margin: 20,
        borderWidth: 1,
        width: '30%',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 5,
        backgroundColor: 'skyblue',
      },
})