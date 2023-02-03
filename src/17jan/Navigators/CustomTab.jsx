import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomTab = (props) => {
    console.log("hello binood ==>", props)


    
    return (
        <View style={{
            flexDirection: 'row',
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                props.state.routes.map((item, i) => {
                    return <TouchableOpacity
                        style={{
                            height: "100%",
                            width: '33%',
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                        onPress={()=>{props.navigation.navigate(item.name)}}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                })




            }
        </View>
    )
}

export default CustomTab

const styles = StyleSheet.create({})






// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// const CustomTab = (props) => {
//     console.log("hello binood ==>", props)

//     const tabNames = [
//         { name: "Home", iconN: ".//src/image" },
//         { name: "Profile", iconN: ".//src/image" },
//         { name: "Settings", iconN: ".//src/image" },
//     ]

//     return (
//         <View style={{
//             flexDirection: 'row',
//             height: 70,
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}>
//             {
//                 tabNames.map((item, i) => {
//                     return <TouchableOpacity
//                         style={{
//                             height: "100%",
//                             width: '33%',
//                             alignItems: 'center',
//                             justifyContent: 'center'
//                         }}
//                         onPress={() => { props.navigation.navigate(item.name) }}
//                     >

//                         <Text>{item.name}</Text>
//                     </TouchableOpacity>
//                 })




//             }
//         </View>
//     )
// }

// export default CustomTab

// const styles = StyleSheet.create({})