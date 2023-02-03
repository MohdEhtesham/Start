import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
  mediaType: "photo"
}

export default function Selectimage() {

const[ selectphoto, setSelectphoto]=useState([])
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    console.log("result====>",selectphoto)
    selectphoto.push(result.assets[0].uri)
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View>

      <TouchableOpacity onPress={() => openGallery()} >
        <Text>Selectimage</Text>
        
       
      </TouchableOpacity>
     
         {/* <View >
          <Image 
          source={{uri:(selectphoto)}}
          style={{height:50, width:100}}
          />
        </View> */}
        </View>
        <View >
     {selectphoto.length>0? <FlatList
      style={{height:50,width:200}}
        data={selectphoto}
        renderItem={({item, imdex})=>(
          
            <Image
            source={{uri:item}}
            style={{height:100, width:100}}/>
          
  )}
        />:null }</View>
    </View>

  )
}

const styles = StyleSheet.create({})