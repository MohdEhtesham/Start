import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Reducers } from '../../Redux/Reducers/Reducers'

import {  Saveuser } from '../../Redux/Actions'



export default function Home() {
    const {user_name,user_type } = useSelector((state) => ({
        user_name: state.user_name,
        user_type: state.user_type,


    }))
    console.log("datavalue====>",user_name )
    const dispatch = useDispatch();

    const valueset = () => {
        dispatch(Saveuser({name:'ehtesham', type:'react-native'}))

    }
    return (
        <View>
            <TouchableOpacity onPress={()=>valueset()}>
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})