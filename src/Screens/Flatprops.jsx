import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Flatprops({ item }) {


    return (
        <View>
            <Text>{item.Type}</Text>
            <Text>{item.key}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})