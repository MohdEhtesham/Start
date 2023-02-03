import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Custom() {
  const [data, setdata] = useState([])
  const [user, setuser] = useState({})
  const [data1, setdata1] = useState([])
  // console.log("user=====>", user)


  useEffect(() => {
    getApi();
   
  }, [])


  function getApi() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        // console.log(res.data);
        setuser(res.data)
        setdata(res.data[0].name)

      }).catch(err => {
        console.log("error====>", err)
      });

    axios.post('https://jsonplaceholder.typicode.com/posts',
      {
        method: 'post',
        data: {
          firstName: 'Mohd',
          lastName: 'Ehtesham'
        }
      }
    ).then(res => { setdata1(res.data.data) })
      .catch(err => { console.log("errorrrrrrr====>", err) })
  }



  return (
    <SafeAreaView>
      <Text>Custom</Text>
      <Text>{data.length > 0 ? data : "N/A"}</Text>
      <Text>{data1.firstName}</Text>
      <Text>{data1.lastName}</Text>
      <View>
        <Text>{user.length>0?user.map((i)=>console.log(i.name)):"nothhing"}</Text>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})