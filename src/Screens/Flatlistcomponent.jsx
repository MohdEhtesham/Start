import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Flatprops from './Flatprops'


const keyboardTypevalue = [
    {
        key: 1,
        Type: 'default',
        placeholder: 'default Keyboard'

    },
    {
        key: 2,
        Type: 'number-pad',
        placeholder: 'number-pad'

    },
    {
        key: 3,
        Type: 'decimal-pad',
        placeholder: 'decimal-pad'
    },
    {
        key: 4,
        Type: 'numeric',
        placeholder: 'numeric'

    },
    {
        key: 5,
        Type: 'email-address',
        placeholder: 'email-address'
    },
    {
        key: 6,
        Type: 'phone-pad',
        placeholder: 'phone-pad'
    },
    {
        key: 7,
        Type: 'url',
        placeholder: 'url'
    }


]

const Flatlistcomponent = () => {
    return (
        <View>
            <FlatList
                data={keyboardTypevalue}
                renderItem={({ item, index }) => {
                    return <Flatprops item={item} />
                }}

            />
        </View>
    )
}

export default Flatlistcomponent

const styles = StyleSheet.create({})