import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const Firestorevalue = () => {
    const [name, setName]=useState("")
    const [updatename, setUpdateName]=useState("")
    const [email, setEmail]=useState("")
    const [Password, setPassword]=useState("")
    const [ConfirmPassword, setConfirmPassword]=useState("")
    const [phonenumber, setPhonenumber]=useState("")
    // const [uservalue, setUservalue]=useState({})
    const [getdata, setGetdata] =useState([])

// useEffect(()=>{
//   GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '588884424187-1641sifa6e2497eehldnm0fb019ijl9b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     hostedDomain: '', // specifies a hosted domain restriction
//     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//     accountName: '', // [Android] specifies an account name on the device that should be used
//     iosClientId: '588884424187-7jolnkgg19e8sop7mhd5ubr337o9m72k.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//     googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//     openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//     profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
//   });
// },[])

const signIn = async () => {

  try {
    GoogleSignin.configure(
    {
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:'78692524084-11somha1kt9g2e8v1afocfbuatrrrapa.apps.googleusercontent.com',
    // '78692524084-evrqs7bjkuobitp5q0cnc5afg2t10vju.apps.googleusercontent.com',
    
    
    // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '588884424187-7jolnkgg19e8sop7mhd5ubr337o9m72k.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  
    });
    // await GoogleSignin.hasPlayServices();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log("reached google sign in");
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
      console.log(idToken)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
    
    // const userInfo = await GoogleSignin.signIn();
    // console.log(userInfo);
    // this.setState({ userInfo });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("error occured SIGN_IN_CANCELLED");
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("error occured IN_PROGRESS");
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
    } else {
      console.log(error)
      console.log("error occured unknow error");
    }
  }
  // try {
  //   // await GoogleSignin.hasPlayServices();
  //   // const userInfo = await GoogleSignin.signIn();
  //   // console.log({ userInfo });
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // } catch (error) {
  //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     // user cancelled the login flow
  //   } else if (error.code === statusCodes.IN_PROGRESS) {
  //     // operation (e.g. sign in) is in progress already
  //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //     // play services not available or outdated
  //   } else {
  //     // some other error happened
  //   }
  // }
};
    
    const adduser =()=>{
       const setUservalue=({name:name,email:email, phonenumber:phonenumber ,Password:Password, ConfirmPassword:ConfirmPassword })
        firestore()
        .collection("users")
        .add(setUservalue)
        .then(res=>{
            console.log("res", res)
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    useEffect(()=>{
      let userdata =[]
 firestore()
 .collection("users")
 .get()
 .then(querySnapshot=>{
  querySnapshot.forEach(documentSnapshot => {
    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    // setGetdata([...getdata ,documentSnapshot.data()])
    // console.log("getdataaaaaaaaaaaa", getdata)
    userdata.push(documentSnapshot.data())
    // console.log(userdata, "userdatttttttttt")
  setGetdata(userdata)
   
    
  });
 })
    },[])
    const updateuser=()=>{
      firestore()
  .collection('users')
  .doc('BMmy11sRtYXQb1DvYJrp')
  .update({
    name:updatename
  })
  .then(() => {
    console.log('User updated!');
  });
    }

    const deleteuser =()=>{
      firestore()
  .collection('users')
  .doc('EvTL9jYQJcDlp2RPiTKj')
  .delete()
  .then(() => {
    console.log('User deleted!');
  });
    }

  return (
    <SafeAreaView>
        <TextInput  
        placeholder='Name'
        value={name}
        onChangeText={setName}
        style={{borderWidth:1, padding:10}}
         ></TextInput>
         <TextInput  
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={{borderWidth:1, padding:10}}
         ></TextInput>
         
         <TextInput  
        placeholder='phonenumber'
        value={phonenumber}
        onChangeText={setPhonenumber}
        style={{borderWidth:1, padding:10}}
         ></TextInput>
         <TextInput  
        placeholder='Password'
        value={Password}
        onChangeText={setPassword}
        style={{borderWidth:1, padding:10}}
         ></TextInput>
         <TextInput  
        placeholder='Confirm Password'
        value={ConfirmPassword}
        onChangeText={setConfirmPassword}
        style={{borderWidth:1, padding:10}}
         ></TextInput>
      <TouchableOpacity style={{backgroundColor:"blue" ,marginTop:10, padding:10}}
      onPress={adduser}
      >
        <Text>add user</Text>
      </TouchableOpacity>

      <View 
      style={{height:100, width:"100%", backgroundColor:'skyblue', marginTop:10}}
      >
       <FlatList 
       data ={getdata}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({item , index})=>{
        return(
        <Text>{item.name}</Text>

        )

       }}
       
       />
      </View>

      
      <View style={{ marginTop:10, padding:10}}>
      <TextInput  
        placeholder='updateName'
        value={updatename}
        onChangeText={setUpdateName}
        style={{borderWidth:1, padding:10}}
         ></TextInput>
         <TouchableOpacity 
          onPress={updateuser}
         style={{backgroundColor:"blue",marginTop:10, padding:10}}>
          <Text>update</Text>
         </TouchableOpacity>
         <TouchableOpacity 
         style={{backgroundColor:"blue" ,marginTop:10, padding:10}}
      onPress={deleteuser}
      >
        <Text>delete user</Text>
      </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity  onPress={()=> signIn()}
        style={{backgroundColor:"blue" ,marginTop:10, padding:10}}
        >
          <Text>google sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Firestorevalue

const styles = StyleSheet.create({})



