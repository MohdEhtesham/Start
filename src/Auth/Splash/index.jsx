import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Signup');
    }, 3000);
  }, []);
  return (
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>


      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEdKh1PhmtktTXKL54H1Hy1NlsH3Z4dgQqQ&usqp=CAU'

        }}
        style={{
          height: "50%",
          width: "100%",
          justifyContent: 'center'
        }}

      />
    </View>
  );
};

export default Splash;


