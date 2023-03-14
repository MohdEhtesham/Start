import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
// import R from '../../../R';
import styles from "./JoinAndStartStyles";
import JoinTheDebates from "../../../images/svg/joins-start/join.svg";
import StartTheDebate from "../../../images/svg/joins-start/start.svg";
import { CustomText } from "../../../components/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import Colors from "../../../themes/Colors";
import { verticalScale } from "../../../themes/Metrics";
import { request, PERMISSIONS } from "react-native-permissions";

class JoinAndStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullName: "",
      profilePic: "",
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getMyProfile();

      request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.MICROPHONE
      );
      request(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA
      );
    });
  }

  getMyProfile = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                console.log("response??", response);
                setTimeout(() => {
                  this.setState({
                    loading: false,
                    username:
                      response.data.data.username +
                      Math.floor(1000 + Math.random() * 9000),
                    fullName:
                      response.data.data.firstName +
                      " " +
                      response.data.data.lastName,
                    profilePic: response.data.data.profilePic,
                    userID: "",
                  });
                }, 200);

                console.log("before ========connection ==== video");
                const socket = io(URLConstants.SOCKET_URL);
                socket.on("connect", function () {
                  console.log("connection done ==== Video");
                });
                console.log(" after  connection ==== video");
              });
          } else {
            alert(strings.Please_check_Internet);
            setTimeout(() => {
              this.setState({ loading: false });
            }, 200);
          }
        });
      });
    });
  };

  // onLoginJoin = (asParticipant) => {
  //   console.log("called");
  //   this.props.navigation.navigate("VideoRoomScreen", {
  //     janusURL: "ws://18.216.120.188/wss",
  //     roomId: "1234",
  //     username: "suv",
  //     isParticipant: asParticipant,
  //   });
  // };
  onJoin = () => {
    const { username, fullName, profilePic } = this.state;
    this.props.navigation.navigate("ChooseCategory", {
      isJoinedScreen: true,
      userInfo: {
        username: username,
        fullName: fullName,
        profilePic: profilePic,
      },
    });
  };

  onStart = () => {
    const { username, fullName, profilePic } = this.state;
    this.props.navigation.navigate("CategoryAllChoose", {
      isJoinedScreen: false,
      userInfo: {
        username: username,
        fullName: fullName,
        profilePic: profilePic,
      },
    });
  };
  onLoginStart = (asParticipant) => {
    console.log("called");
    this.props.navigation.navigate("VideoRoomScreen", {
      janusURL: "ws://18.216.120.188/wss",
      roomId: "1234",
      username: "ashish",
      isParticipant: asParticipant,
    });
  };
  joinDebate = () => {
    return (
      <TouchableOpacity
        style={styles.debateContainer}
        onPress={() => this.onJoin()}
      >
        <JoinTheDebates style={styles.joinimage} />
        <CustomText style={styles.jointextStyle} item={"Join Debate"} />
      </TouchableOpacity>
    );
  };

  startDebate = () => {
    return (
      <TouchableOpacity
        style={styles.debateContainer}
        onPress={() => this.onStart()}
      >
        <StartTheDebate style={styles.joinimage} />
        <CustomText style={styles.jointextStyle} item={"Start Debate"} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.loading ? (
            <View style={{ marginVertical: verticalScale(50) }}>
              <ActivityIndicator size="large" color={Colors.RedHeader} />
            </View>
          ) : (
            <>
              {this.joinDebate()}
              {this.startDebate()}
            </>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default JoinAndStart;

// import {mediaDevices, MediaStream, RTCIceCandidate, RTCPeerConnection, RTCSessionDescription, RTCView} from 'react-native-webrtc';
// import React from 'react';
// import {Dimensions, FlatList, StatusBar, View} from 'react-native';
// import {Theme} from '../../../../services/theme';
// import {Janus, JanusVideoRoomPlugin} from '../../../../node_modules/react-native-janus';

// Janus.setDependencies({
//     RTCPeerConnection,
//     RTCSessionDescription,
//     RTCIceCandidate,
//     MediaStream,
// });

// class JanusVideoRoomScreen extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             stream: null,
//             publishers: [],
//         };
//     }

//     async receivePublisher(publisher) {
//         try {
//             let videoRoom = new JanusVideoRoomPlugin(this.janus);
//             videoRoom.setRoomID(1234);
//             videoRoom.setOnStreamListener((stream) => {
//                 this.setState(state => ({
//                     publishers: [
//                         ...state.publishers,
//                         {
//                             publisher: publisher,
//                             stream: stream,
//                         },
//                     ],
//                 }));
//             });

//             await videoRoom.createPeer();
//             await videoRoom.connect();
//             await videoRoom.receive(this.videoRoom.getUserPrivateID(), publisher);
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     async removePublisher(publisherID) {
//         try {
//             this.setState(state => ({
//                 publishers: state.publishers.filter(pub => pub.publisher == null || pub.publisher.id !== publisherID),
//             }));
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     async initJanus(stream) {
//         try {
//             this.setState(state => ({
//                 publishers: [
//                     {
//                         publisher: null,
//                         stream: stream,
//                     },
//                 ],
//             }));

//             this.janus = new Janus('ws://${YOUR_JANUS_ADDRESS]:8188');
//             this.janus.setApiSecret('janusrocks');
//             await this.janus.init();

//             this.videoRoom = new JanusVideoRoomPlugin(this.janus);
//             this.videoRoom.setRoomID(1234);
//             this.videoRoom.setDisplayName('can');
//             this.videoRoom.setOnPublishersListener((publishers) => {
//                 for (let i = 0; i < publishers.length; i++) {
//                     this.receivePublisher(publishers[i]);
//                 }
//             });
//             this.videoRoom.setOnPublisherJoinedListener((publisher) => {
//                 this.receivePublisher(publisher);
//             });
//             this.videoRoom.setOnPublisherLeftListener((publisherID) => {
//                 this.removePublisher(publisherID);
//             });
//             this.videoRoom.setOnWebRTCUpListener(async () => {

//             });

//             await this.videoRoom.createPeer();
//             await this.videoRoom.connect();
//             await this.videoRoom.join();
//             await this.videoRoom.publish(stream);

//         } catch (e) {
//             console.error('main', JSON.stringify(e));
//         }
//     }

//     getMediaStream = async () => {
//         let isFront = true;
//         let sourceInfos = await mediaDevices.enumerateDevices();
//         let videoSourceId;
//         for (let i = 0; i < sourceInfos.length; i++) {
//             const sourceInfo = sourceInfos[i];
//             console.log(sourceInfo);
//             if (sourceInfo.kind == 'videoinput' && sourceInfo.facing == (isFront ? 'front' : 'environment')) {
//                 videoSourceId = sourceInfo.deviceId;
//             }
//         }

//         let stream = await mediaDevices.getUserMedia({
//             audio: true,
//             video: {
//                 facingMode: (isFront ? 'user' : 'environment'),
//             },
//         });
//         await this.initJanus(stream);
//     };

//     async componentDidMount() {
//         this.getMediaStream();
//     }

//     componentWillUnmount = async () => {
//         if (this.janus) {
//             await this.janus.destroy();
//         }
//     };

//     renderView() {
//     }

//     render() {
//         return (
//             <View style={{flex: 1, width: '100%', height: '100%', backgroundColor: Theme.dark, flexDirection: 'row'}}>
//                 <StatusBar translucent={true} barStyle={'light-content'}/>
//                 <FlatList
//                     data={this.state.publishers}
//                     numColumns={2}
//                     keyExtractor={(item, index) => {
//                         if (item.publisher === null) {
//                             return `rtc-default`;
//                         }
//                         return `rtc-${item.publisher.id}`;
//                     }}
//                     renderItem={({item}) => (
//                         <RTCView style={{
//                             flex: 1,
//                             height: (Dimensions.get('window').height / 2),
//                         }} objectFit={'cover'} streamURL={item.stream.toURL()}/>
//                     )}
//                 />
//             </View>
//         );
//     }
// }

// export default JanusVideoRoomScreen;
