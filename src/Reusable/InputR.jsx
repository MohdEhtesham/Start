// import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useState } from 'react'

// const InputR= () => {

//   return (

//   )
// }

// export default InputR

// const styles = StyleSheet.create({
//   txt: {
//     justifyContent: 'center',
//     orderWidth: 1,
//     width: "50%",
//     height: 24,
//     marginTop: 20,
//     alignSelf: 'center'

//   }

// })
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputR = ({ label, value ,placeholder,secureTextEntry,onChangeText, keyboardType}) => {
    return (

            <SafeAreaView>
                <Text style={styles.txt}>{label}:</Text>
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    style={styles.Inputvalue}

                />
            </SafeAreaView>

    )
}

export default InputR

const styles = StyleSheet.create({
    Inputvalue: {
        justifyContent: 'center',
        borderWidth: 1,
        width: "90%",
        alignItems: 'center',
        padding:10,
        alignSelf:'center',
        borderRadius:8, 
        backgroundColor:'lightgrey'
    },
    txt: {
        fontSize: 17,
        paddingLeft:'6%'
    }
})