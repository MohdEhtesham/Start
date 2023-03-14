import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  NativeModules,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  AppState,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  BackHandler,
} from "react-native";
// import JanusClient from '../lib/JanusClient'
import JanusClient from "../../../../lib/JanusClient";
//import {Icon} from "react-native-elements";
// import Spinner from 'react-native-loading-spinner-overlay';
import InCallManager from "react-native-incall-manager";
import Loader from "../../../components/Loader";
import images from "../../../themes/Images";
import CustomButton from "../../../components/CustomButton";
import CountDown from "react-native-countdown-component";
// const { WebRTCModule } = NativeModules;
import WebRTC, { RTCView } from "react-native-webrtc";
import { HeaderRight } from "../../../components/HeaderRight";
import TimeExtend from "../../../images/svg/joins-start/timeExtend.svg";
import scale, { verticalScale } from "../../../themes/Metrics";
import { CustomText } from "../../../components/CustomText";

import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../../utils/Strings";
import io from "socket.io-client";
import DefaultProfileImage from "../../../components/DefaultProfileImage";
import BackIcon from "../../../images/svg/back.svg";
import { request, PERMISSIONS } from "react-native-permissions";
import DeviceInfo from "react-native-device-info";

const socket = io(URLConstants.SOCKET_URL);
const BluetoothHeadsetDetectModule = NativeModules.RNBluetoothHeadsetDetect;
const bluetoothHeadsetDetectEmitter = new NativeEventEmitter(
  BluetoothHeadsetDetectModule
);
class VideoRoomScreen extends PureComponent {
  setStream(stream, reset) {
    if (reset) {
      this.setState({ stream: null });
    } else {
      this.setState({ stream: stream.toURL() });
    }
    // let myStreams = this.state.stream;
    // if (reset) {
    //   delete myStreams[stream];
    // } else myStreams[stream.toURL()] = stream.toURL();
    // this.setState({ stream: myStreams });
  }

  constructor(props) {
    super(props);
    this.liked = false;
    this.state = {
      videoMute: false,
      audioMute: false,
      speakerOn: true,
      visible: true,
      stream: "",
      modalVisible: false,
      isStart: false,
      activeDebate: [],
      isActiveDebate: false,
      debateCount: 0,
      timerCount: 15,
      tapCounter: 15,
      id: 0,
      isTap: false,
      isJoined: false,
      newParticipants: [],
      participantCount: 0,
      isButtonDisabled: false,
      isConfirmJoiner: false,
      isConfirmCreator: false,
      debateTime: 0,
      roomIDVideo: "",
      idJoined: 0,
      timerJoinedCount: 60,
      creatorName: "",
      joinerName: "",
      isDeny: false,
      isExtended: true,
      timeValue: null,
      currentUserId: "",
      callInprogress: "",
      debateIdforcancel: "",
      isjoinbutton: false,
      appState: AppState.currentState,
      debatesBackgroudmode: false,
      istimeIncrease: false,
      progressStatus: 0,
      bluetoothConnected: false,
      wireEarphone: false,
      buttonOn: "",
      loading: false,
    };
  }
  anim = new Animated.Value(0);

  videocall = () => {
    let self = this;
    // let state = this.props.getState();
    let params = this.props.route.params;
    //  console.log("roomid ", params);
    console.log("JanusClient==========JanusClient no2=============----->");
    JanusClient.connect(params.janusURL, parseInt(params.roomId), {
      username: this.props.route.params.username,
      success: () => {
        // if (params.isParticipant) {
        //   self.setState({ visible: false });
        // } else {
        // console.log("done", JanusClient.state.localStream.toURL());
        // self.setState({
        //   visible: false,
        //   selfViewSrc: JanusClient.state.localStream.toURL(),
        // });
        // }
      },
      onaddstream: (stream) => {
        // this.setStream(stream);
      },
      onremovestream: (stream) => {
        // this.setStream(stream, true);
        // console.log(
        //   this.state.callInprogress,
        //   "===============onremovestream=========================================="
        // );
        this.state.callInprogress < 2 && !this.state.janusDiscoonected
          ? this.debateUncomplete()
          : null;
        console.log("janus videos stops", this.state.janusDiscoonected);
      },
      ondisconnect: () => {
        this.onLogout();
      },
    });
    // this.animatedValue = new Animated.Value(0);
  };

  videoJoinedcall = (roomId) => {
    // this.setStream = this.setStream;
    let self = this;
    // JanusClient;
    // let state = this.props.getState();
    let params = this.props.route.params;
    //  console.log("roomid ", roomId);
    console.log("JanusClient==========JanusClient no 1=============");
    JanusClient.connect(params.janusURL, parseInt(roomId), {
      username: this.props.route.params.username,
      success: () => {
        // if (params.isParticipant) {
        //   self.setState({ visible: false });
        // } else {
        // console.log("done------", JanusClient.state.localStream.toURL());
        // self.setState({
        //   visible: false,
        //   selfViewSrc: JanusClient.state.localStream.toURL(),
        // });
        // }
      },
      onaddstream: (stream) => {
        this.setStream(stream);
      },
      onremovestream: (stream) => {
        this.setStream(stream, true);
        // console.log(
        //   this.state.callInprogress,
        //   "===============onremovestream=========================="
        // );
        this.state.callInprogress < 2 && !this.state.janusDiscoonected
          ? this.debateUncomplete()
          : null;
      },
      ondisconnect: () => {
        this.onLogout();
      },
    });
  };

  creatorInvite = () => {
    return (
      <>
        {this.props.route.params.isJoinedScreen ? null : (
          <ScrollView style={{ flex: 1, width: "100%" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
            <CustomText
              item={this.props.route.params.debateQuestion}
              // item={"hfbjfb frgbrgbtg tgntgnt gtgntg"}
              style={styles.questions}
            />
            <CustomButton
              // onPress={() => addReport(item)}
              title={"Invite Your Friend"}
              buttonStyles={{
                width: "100%",
                height: verticalScale(44),
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
              onPress={() => this.inviteFriend()}
            />
          </ScrollView>
        )}
      </>
    );
  };

  VideoJoinView = () => {
    return (
      <>
        {this.state.isJoined ? (
          <View style={styles.containerSecond}>
            {JanusClient.state.remoteStream ? (
              <RTCView
                mirror={true}
                objectFit="cover"
                // key={Math.floor(Math.random() * 1000)}
                streamURL={JanusClient.state.remoteStream.toURL()}
                style={styles.remoteView}
              />
            ) : null}
            <Text
              style={{
                position: "absolute",
                marginVertical: 10,
                marginLeft: 20,
                color: colors.whiteText,
                fontFamily: Fonts.type.JostBold,
                fontSize: 20,
              }}
            >
              {this.state.isJoinedScreen
                ? this.state.creatorName
                : this.state.joinerName}
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  joinerVideoDebate = () => {
    return (
      <>
        {JanusClient.state.localStream ?
          (<RTCView
            mirror={true}
            objectFit="cover"
            // key={this.state.selfViewSrcKey}
            streamURL={JanusClient.state.localStream.toURL()}
            style={styles.selfView}
          />
        ): (
          <View style={{flex:1,width:Dimensions.get('window').width}}>
                  <Image
                    style={styles.videoProfile}
                    source={ require('../../../images/png/video_placeholder.png')}
                  />
          </View>
        )}
        <Text
          style={{
            flex: 1,
            color: colors.whiteText,
            fontFamily: Fonts.type.JostBold,
            position: "absolute",
            marginVertical: 10,
            marginLeft: 20,
            // fontSize: 15,
          }}
        >
          {"You"}
        </Text>
        { this.state.isJoined && this.state.isExtended ? (
          <View
            style={{
              marginTop: 22,
              position: "absolute",
              marginLeft: 15,
              flexDirection: "row",
            }}
          >
            <CountDown
              id={this.state.idJoined.toString()}
              size={10}
              until={this.state.timerJoinedCount}
              onChange={(value) => this.setState({ callInprogress: value })}
              onFinish={() => this.endCall()}
              digitStyle={{
                color: colors.whiteText,
                fontFamily: Fonts.type.JostBold,
                fontSize: scale(16),
                fontWeight: "normal",
              }}
              digitTxtStyle={{
                color:colors.whiteText,
                fontFamily: Fonts.type.JostBold,
                fontSize: scale(16),
                fontWeight: "normal",
              }}
              //  timeLabelStyle={{color: '#555555',fontFamily: Fonts.type.JostRegular,fontSize: scale(16),fontWeight:'normal'}}
              separatorStyle={{
                color:colors.whiteText,
                fontFamily: Fonts.type.JostBold,
                fontSize: scale(16),
                fontWeight: "normal",
              }}
              timeToShow={["M", "S"]}
              timeLabels={{ m: null, s: null }}
              showSeparator
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: colors.whiteText,
                fontFamily: Fonts.type.JostBold,
                fontSize: scale(16),
                marginRight: 7,
              }}
            >
              {" Sec"}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            position: "absolute",
            flexDirection: "column-reverse",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
          }}
        >
          {/* <Icon
            size={15}
            reverse
            name="call-end"
            type="SimpleLineIcons"
            color="red"
            onPress={() => this.endCall()}
          /> */}

          {this.state.bluetoothConnected ? (
            <TouchableOpacity onPress={()=> {
              //this.toggleSpeaker();
              }}>
              <Image source={require('../../../images/png/headset.png')}
              style={styles.iconStyle}/>
            </TouchableOpacity>
            // <Icon
            //   size={15}
            //   reverse
            //   name="headset"
            //   type="Ionicons"
            //   color="black"
            //   // onPress={() => this.toggleSpeaker()}
            // />
          ) : (
            <TouchableOpacity onPress={()=> {
              if(JanusClient.state.localStream) this.toggleSpeaker();
              }}>
              <Image source={require('../../../images/png/volume-up.png')}
              style={styles.iconStyle}/>
            </TouchableOpacity>
            // <Icon
            //   size={15}
            //   reverse
            //   name="volume-up"
            //   type="FontAwesome"
            //   color="black"
            //   // onPress={() => this.toggleSpeaker()}
            // />
          )}
          {this.state.videoMute ? (
            <TouchableOpacity onPress={()=> { if(JanusClient.state.localStream) this.toggleVideo();}}>
            <Image source={require('../../../images/png/video-off.png')}
            style={styles.iconStyle}/>
          </TouchableOpacity>
            // <Icon
            //   size={15}
            //   reverse
            //   name="videocam-o"
            //   type="Feather"
            //   color="black"
            //   onPress={() => this.toggleVideo()}
            // />
          ) : (
            <TouchableOpacity onPress={()=> { if(JanusClient.state.localStream) this.toggleVideo();}}>
              <Image source={require('../../../images/png/video.png')}
              style={styles.iconStyle}/>
            </TouchableOpacity>
            // <Icon
            //   size={15}
            //   reverse
            //   name="videocam"
            //   type="Feather"
            //   color="black"
            //   onPress={() => this.toggleVideo()}
            // />
          )}
          {!this.state.audioMute ? (
            <TouchableOpacity onPress={()=> { if(JanusClient.state.localStream) this.toggleAudio();}}>
            <Image source={require('../../../images/png/mic.png')}
            style={styles.iconStyle}/>
          </TouchableOpacity>
            // <Icon
            //   size={15}
            //   reverse
            //   name="mic"
            //   type="Feather"
            //   color="black"
            //   onPress={() => this.toggleAudio()}
            // />
          ) : (
            <TouchableOpacity onPress={()=> {if(JanusClient.state.localStream) this.toggleAudio();}}>
              <Image source={require('../../../images/png/mic-off.png')}
              style={styles.iconStyle}/>
            </TouchableOpacity>
            // <Icon
            //   size={15}
            //   reverse
            //   name="mic-off"
            //   type="Feather"
            //   color="black"
            //   onPress={() => this.toggleAudio()}
            // />
          )}
        </View>
      </>
    );
  };

  TimeDone = () => {
    this.setState({
      participantCount: this.state.participantCount + 1,
      id: this.state.id + 1,
    });
    this.setState({ isjoinbutton: true });
  };

  confirmDebate = () => {
    return (
      <>
        {this.props.route.params.isJoinedScreen ? (
          <View
            style={{
              flex: 2,
              height: "50%",
              width: "100%",
              marginBottom: 10,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.isActiveDebate &&
            this.state.activeDebate.length > this.state.debateCount && this.state.isExtended ? (
              <View style={{ flex: 1 }}>
                <View style={{ height: verticalScale(20) }}>
                  {this.state.isTap ? null : (
                    <View
                      style={{
                        marginTop: 5,
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      <CountDown
                        id={this.state.id.toString()}
                        size={10}
                        until={this.state.timerCount}
                        onChange={(value) =>
                          this.setState({ callInprogress: value })
                        }
                        onFinish={() =>
                          this.setState({
                            debateCount: this.state.debateCount + 1,
                            id: this.state.id + 1,
                          })
                        }
                        digitStyle={{
                          color: colors.whiteText,
                          fontFamily: Fonts.type.JostBold,
                          fontSize: scale(16),
                          fontWeight: "normal",
                        }}
                        digitTxtStyle={{
                          color: colors.whiteText,
                          fontFamily: Fonts.type.JostBold,
                          fontSize: scale(16),
                          fontWeight: "normal",
                        }}
                        //  timeLabelStyle={{color: '#555555',fontFamily: Fonts.type.JostRegular,fontSize: scale(16),fontWeight:'normal'}}
                        separatorStyle={{
                          color: colors.whiteText,
                          fontFamily: Fonts.type.JostBold,
                          fontSize: scale(16),
                          fontWeight: "normal",
                        }}
                        timeToShow={["M", "S"]}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                        style={{
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      />
                      <Text
                        style={{
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          color: colors.whiteText,
                          fontFamily: Fonts.type.JostBold,
                          fontSize: scale(16),
                          marginRight: 7,
                        }}
                      >
                        {" Sec"}
                      </Text>
                    </View>
                  )}
                </View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={styles.imageconatiner}>
                    {/* <Image style={styles.imageprofile} uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.profiledata.profilePic}`}
                  /> */}
                    <Image
                      style={styles.imageprofile}
                      source={{
                        uri: `${URLConstants.PROFILE_IMAGE_URL}${
                          this.state.activeDebate[this.state.debateCount]
                            .creator.profilePic
                        }`,
                      }}
                    />
                  </View>
                  <CustomText
                    style={styles.txtName}
                    item={
                      this.state.activeDebate[this.state.debateCount].creator
                        .firstName +
                      " " +
                      this.state.activeDebate[this.state.debateCount].creator
                        .lastName
                    }
                  />
                  <CustomText
                    style={styles.txtAddress}
                    item={
                      this.state.activeDebate[this.state.debateCount].creator
                        .city +
                      " " +
                      this.state.activeDebate[this.state.debateCount].creator
                        .state
                    }
                  />
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <CustomText
                      item={
                        this.state.activeDebate[this.state.debateCount].question
                      }
                      // item={"hfbjfb frgbrgbtg tgntgnt gtgntg"}
                      style={styles.questionsJoin}
                    />
                  </ScrollView>
                  {this.state.isjoinbutton ? (
                    <CustomButton
                      // onPress={() => addReport(item)}
                      title={"Cancel"}
                      buttonStyles={{
                        // marginLeft: 15,
                        // marginRight: 20,
                        alignItems: "center",
                        width: "100%",
                        height: verticalScale(44),
                        marginBottom: 30,
                        // opacity: 0.1,
                      }}
                      onPress={() => this.onCancelDebate()}
                    />
                  ) : (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <CustomButton
                        // onPress={() => addReport(item)}
                        title={"Join"}
                        buttonStyles={{
                          // marginLeft: 15,
                          marginRight: 20,
                          width: "42%",
                          height: verticalScale(44),
                          marginBottom: 30,
                          // opacity: 0.1,
                        }}
                        onPress={() => this.onServerSentEvent()}
                      />
                      {this.state.isButtonDisabled ? (
                        <CustomButton
                          title={"Skip"}
                          buttonStyles={{
                            width: "42%",
                            height: verticalScale(44),

                            marginBottom: 30,
                          }}
                        />
                      ) : (
                        <CustomButton
                          title={"Skip"}
                          buttonStyles={{
                            width: "42%",
                            height: verticalScale(44),

                            marginBottom: 30,
                          }}
                          onPress={() =>
                            // this.setState({debateCount:this.state.debateCount+1})
                            this.getReset()
                          }
                        />
                      )}
                    </View>
                  )}
                </ScrollView>
              </View>
            ) : (
              <CustomText
                style={styles.nodata}
                item={"Please wait, we are looking for active debates."}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 3,
              height: "50%",
              width: "100%",
              marginBottom: 10,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.newParticipants &&
            this.state.newParticipants.length > this.state.participantCount && this.state.isExtended ? (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    marginTop: 5,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <CountDown
                    id={this.state.id.toString()}
                    size={10}
                    until={this.state.timerCount}
                    onFinish={() => this.TimeDone()}
                    digitStyle={{
                      color: "#555555",
                      fontFamily: Fonts.type.JostRegular,
                      fontSize: scale(16),
                      fontWeight: "normal",
                    }}
                    digitTxtStyle={{
                      color: "#555555",
                      fontFamily: Fonts.type.JostRegular,
                      fontSize: scale(16),
                      fontWeight: "normal",
                    }}
                    //  timeLabelStyle={{color: '#555555',fontFamily: Fonts.type.JostRegular,fontSize: scale(16),fontWeight:'normal'}}
                    separatorStyle={{
                      color: "#555555",
                      fontFamily: Fonts.type.JostRegular,
                      fontSize: scale(16),
                      fontWeight: "normal",
                    }}
                    timeToShow={["M", "S"]}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      color: "#555555",
                      fontFamily: Fonts.type.JostRegular,
                      fontSize: scale(16),
                      marginRight: 7,
                    }}
                  >
                    {" Sec"}
                  </Text>
                </View>

                <View style={styles.imageconatiner}>
                  {/* <Image style={styles.imageprofile} uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.profiledata.profilePic}`}
                /> */}
                  {/* {console.log(
                    `${URLConstants.PROFILE_IMAGE_URL}${
                      this.state.newParticipants[this.state.participantCount]
                        .profilePic
                    }`,
                    "========================image------------------------>>>"
                  )} */}
                  <Image
                    style={styles.imageprofile}
                    source={{
                      uri: `${URLConstants.PROFILE_IMAGE_URL}${
                        this.state.newParticipants[this.state.participantCount]
                          .joinerImage
                      }`,
                    }}
                  />
                </View>
                {/* <CustomText
                  style={styles.txtName}
                  item={
                    this.state.newParticipants[this.state.participantCount]
                      .firstName +
                    " " +
                    this.state.newParticipants[this.state.participantCount]
                      .lastName
                  }
                /> */}
                {this.state.currentUserId ==
                this.state.newParticipants[this.state.participantCount]
                  .creatorId ? (
                  <CustomText
                    style={styles.txtName}
                    item={
                      this.state.newParticipants[this.state.participantCount]
                        .joinerFullName
                    }
                  />
                ) : (
                  <CustomText
                    style={styles.txtName}
                    item={
                      this.state.newParticipants[this.state.participantCount]
                        .creatorFullName
                    }
                  />
                )}
                <CustomText
                  style={styles.txtAddress}
                  item={
                    this.state.newParticipants[this.state.debateCount].city +
                    " " +
                    this.state.newParticipants[this.state.participantCount]
                      .state
                  }
                />
                <View
                //showsVerticalScrollIndicator={false}
                //</View>showsHorizontalScrollIndicator={false}
                >
                  <CustomText
                    item={
                      this.state.newParticipants[this.state.participantCount]
                        .question
                    }
                    // item={"hfbjfb frgbrgbtg tgntgnt gtgntg"}
                    style={styles.questionsJoin}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <CustomButton
                    title={"Start Debate "}
                    buttonStyles={{
                      // marginLeft: 15,
                      marginRight: 20,
                      width: "42%",
                      height: verticalScale(44),
                      marginBottom: 30,
                    }}
                    onPress={() => this.participantJoined()}
                  />

                  <CustomButton
                    // onPress={() => addReport(item)}
                    title={"Deny"}
                    buttonStyles={{
                      width: "42%",
                      height: verticalScale(44),

                      marginBottom: 30,
                    }}
                    onPress={() =>
                      // this.setState({debateCount:this.state.debateCount+1})

                      this.denyDebate()
                    }
                  />
                </View>
              </View>
            ) : (
              <CustomText
                style={styles.nodata}
                item={"Please wait, we are looking for participants."}
              />
            )}
          </View>
        )}
      </>
    );
  };

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getActiveDebate();
    });
    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    
    this.props.navigation.dangerouslyGetParent().setOptions({
      tabBarVisible: false,
    });

    this.setNavigationHeaderConfiguration();
    this.props.route.params.isJoinedScreen ? null : this.videocall();
   await  InCallManager.checkRecordPermission()
    InCallManager.start({ media: "audio" });
    InCallManager.setForceSpeakerphoneOn(true);
    InCallManager.setKeepScreenOn(true);

    AsyncStorage.getItem("USER_ID").then((userid) => {
      this.socketData(userid);
    });
    AsyncStorage.getItem("USER_ID").then((userid) => {
      this.setState({ currentUserId: userid });
    });
    AppState.addEventListener("change", this._handleAppStateChange);
    this._handleBluetoothSpeakerMode();
    //AppState.addEventListener("focus", this._handleBluetoothSpeakerMode);
  }

  backPressed = () => {
    if (this.props.navigation.isFocused()) {
      if(this.state.isJoined) alert('Cannot go back, debate in progress')
      this.goNext();
      return true;
    } else {
      return false;
    }
  };

  _handleBluetoothSpeakerMode = () => {
    DeviceInfo.isHeadphonesConnected().then((enabled) => {
      // console.log("++++++++++++++++::::::::::::", enabled)
      if (enabled) {
        this.setState({ bluetoothConnected: true });
        InCallManager.setForceSpeakerphoneOn(false);
        this.setState({ speakerOn: false });
      } else {
        this.setState({ bluetoothConnected: false });
        InCallManager.setForceSpeakerphoneOn(true);
        this.setState({ speakerOn: true });
      }
    });
    DeviceEventEmitter.addListener("WiredHeadset", (data) => {
      if (data.isPlugged) {
        this.setState({ bluetoothConnected: true });
        InCallManager.setForceSpeakerphoneOn(false);
        this.setState({ speakerOn: false });
      } else {
        this.setState({ bluetoothConnected: false });
      }
    });
    bluetoothHeadsetDetectEmitter.addListener("onChange", ({ devices }) => {
      if (devices.length) {
        this.setState({ bluetoothConnected: true });
        InCallManager.setForceSpeakerphoneOn(false);
        this.setState({ speakerOn: false });
        console.log("Connected device:", devices[0]);
      } else {
        this.setState({ bluetoothConnected: false });
        InCallManager.setForceSpeakerphoneOn(true);
        this.setState({ speakerOn: true });
        console.log("No devices connected");
      }
    });
  }
  

  onAnimate = () => {
    console.log("heelo");
    if(this.state.istimeIncrease){
      this.anim.setValue(50);
      this.setState({ istimeIncrease: false });
    }
    this.anim.addListener(({ value }) => {
      this.setState({ progressStatus: parseInt(value, 0) });
    });
    Animated.timing(this.anim, {
      toValue: 100,
      duration: this.state.timerJoinedCount * 1000,
    }).start();
  };

  goNext = () => {
    this.onLogout();
    if (this.state.isJoined == true) {
      //JanusClient.disconnect();
      this.setState({
        activeDebate: [],
        isActiveDebate: true,
        debateCount: 0,
        participantCount: 0,
        isJoined: false,
        isConfirmCreator: false,
        timerCount: 0,
        tapCounter: 0,
        id: 0,
        isTap: false,
        isJoined: false,
        newParticipants: [],
        participantCount: 0,
        isButtonDisabled: false,
        isConfirmJoiner: false,
        isConfirmCreator: false,
        debateTime: 0,
        roomIDVideo: "",
        idJoined: 0,
        timerJoinedCount: 0,
        creatorName: "",
        joinerName: "",
        isDeny: false,
        timeValue: null,
        isjoinbutton: false,
      });
      this.props.navigation.goBack();
      this.debateUncomplete();
    } else {
      this.setState({
        audioMute: false,
        videoMute: false,
        activeDebate: [],
        isActiveDebate: false,
        debateCount: 0,
        participantCount: 0,
        isJoined: false,
        isConfirmCreator: false,
        timerCount: 0,
        tapCounter: 0,
        id: 0,
        isTap: false,
        isJoined: false,
        newParticipants: [],
        participantCount: 0,
        isButtonDisabled: false,
        isConfirmJoiner: false,
        isConfirmCreator: false,
        debateTime: 0,
        roomIDVideo: "",
        idJoined: 0,
        timerJoinedCount: 0,
        creatorName: "",
        joinerName: "",
        isDeny: false,
        isExtended: true,
        timeValue: null,
        isjoinbutton: false,
      });
      this.props.navigation.goBack();
      this.debateUncomplete();
    }
  };
  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerTitle: () => (
        <CustomText
          style={{
            color: colors.whiteText,
            fontSize: scale(15),
            alignSelf: "center",
            fontFamily: Fonts.type.JostRegular,
          }}
          item={"Sports Talk"}
        />
      ),

      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          if(this.state.isJoined) alert('Cannot go back, debate in progress');
          else this.goNext()
          }}>
          <BackIcon style={{ height: 20, width: 20, marginLeft: scale(15) }} />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.joinedNavCode()}
            style={{ top: 20, bottom: 5, left: 10, right: 20 }}
          >
            {this.props.route.params.isJoinedScreen ? null : (
              <TimeExtend
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  height: 16,
                  width: 16,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              />
            )}
          </TouchableOpacity>
          <HeaderRight
            onPressNotifications={() => this.onNotificationScreen()}
          />
        </View>
      ),
    });
  };
  joinedNavCode() {
    if (this.props.route.params.isJoinedScreen) {
    } else {
      this.setState({ modalVisible: true });
    }
  }
  timeExtend() {
    this.setState({ modalVisible: true });
  }
  onNotificationScreen() {
    if (this.state.isJoined == true) {
      // Alert.alert(
      //   "Alert",
      //   "Are you sure you want to complete this debate?",
      //   [
      //     {
      //       text: "No",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel",
      //     },
      //     {
      //       text: "Yes",
      //       onPress: () => {
      //         JanusClient.disconnect();
      //         this.debateCompleted();
      //         this.props.navigation.navigate("Notifications");
      //       },
      //     },
      //   ],
      //   { cancelable: false }
      // );
    } else {
      this.setState({
        activeDebate: [],
        isActiveDebate: false,
        debateCount: 0,
        participantCount: 0,
        isJoined: false,
        isConfirmCreator: false,
        timerCount: 0,
        tapCounter: 0,
        id: 0,
        isTap: false,
        isJoined: false,
        newParticipants: [],
        participantCount: 0,
        isButtonDisabled: false,
        isConfirmJoiner: false,
        isConfirmCreator: false,
        debateTime: 0,
        roomIDVideo: "",
        idJoined: 0,
        timerJoinedCount: 0,
        creatorName: "",
        joinerName: "",
        isDeny: false,
        isExtended: true,
        timeValue: null,
      });
      this.props.navigation.navigate("Notifications");
    }
  }

  componentWillUnmount() {
    console.log('unMounting VideoRoom');
    InCallManager.stop();
    // InCallManager.setKeepScreenOn(false);
    // InCallManager.setForceSpeakerphoneOn(false);
    // this.setState({ speakerOn: false });
    AppState.removeEventListener("change", this._handleAppStateChange);
    // WebRTCModule.stopAudioManager();
    // KeepAwake.deactivate();
  }

  _handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
    if (nextAppState === "background") {
      this.setState({ debatesBackgroudmode: true });
      {
        this.state.isJoined
          ? JanusClient.disconnect() &&
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "MainNavigator" }],
            })
          : null;
      }
      // Do something here on app background.
      console.log("App is in Background Mode.=============");
    }
    if (nextAppState === "active") {
      this.state.debatesBackgroudmode ? this.debateUncomplete() : null;
      // Do something here on app active foreground mode.
      console.log("App is in Active Foreground Mode.=============");
    }
    if (nextAppState === "inactive") {
      // this.setState({ debatesBackgroudmode: true });
      {
        this.state.isJoined
          ? JanusClient.disconnect() &&
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "MainNavigator" }],
            })
          : null;
      }
      // Do something here on app inactive mode.
      console.log("App is in inactive Mode.==============");
    }
    // this.debateUncomplete();
  };

  hangup() {
    JanusClient.closeCall();
  }

  onLogout() {
    JanusClient.disconnect();
  }

  toggleAudio() {
    JanusClient.muteAudio(!this.state.audioMute);
    this.setState({ audioMute: !this.state.audioMute });
  }

  toggleVideo() {
    JanusClient.muteVideo(!this.state.videoMute);
    this.setState({ videoMute: !this.state.videoMute });
  }

  toggleSpeaker() {
    if (this.state.speakerOn) {
      this.setState({ speakerOn: false });
      InCallManager.setForceSpeakerphoneOn(false);
    } else {
      this.setState({ speakerOn: true });
      InCallManager.setForceSpeakerphoneOn(true);
    }
  }

  endCall() {
    JanusClient.disconnect();
    this.debateCompleted();
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: "MainNavigator" }],
    });
  }

  toggleLike = () => {
    this.liked = !this.liked;
    Animated.sequence([
      Animated.spring(this.animatedValue, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.spring(this.animatedValue, {
        toValue: 0,
        userNativeDriver: false,
      }),
    ]).start();
  };
  renderDebateTimeExtend = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          this.setState({ modalVisible: false });
        }}
      >
        <Pressable
          style={styles.modelBackgroud}
          // onPress={() => {
          //   this.setState({ modalVisible: false });
          // }}
        >
          <View
            style={{
              backgroundColor: colors.whiteText,
              width: scale(345),
              alignSelf: "center",
            }}
          >
            <View style={styles.headerStyles}>
              <CustomText item={"Add More Time"} style={styles.headerTitle} />
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  marginRight: scale(15),
                  alignSelf: "center",
                }}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image source={images.close} style={styles.cancelstyle} />
              </TouchableOpacity>
            </View>
            <CustomText
              item={"Increase Debate Time (Minutes)"}
              style={styles.heading}
            />
            <TextInput
              style={{
                width: scale(313),
                height: verticalScale(40),
                marginTop: verticalScale(10),
                alignSelf: "center",
                borderWidth: 0.5,
                borderRadius: 5,
                padding: 10,
                color: colors.black, //textAlign:"center"
              }}
              placeholderTextColor={colors.textblack_555555}
              // editable
              maxLength={10}
              // numberOfLines={4}
              placeholder={""}
              //value={description}
              // onChangeText={(text) => setdescription(text)}
              onChangeText={(text) => this.setState({ timeValue: text })}
              multiline={true}
              keyboardType={"numeric"}
              underlineColorAndroid="transparent"
            />
            <CustomButton
              // onPress={() => addReport(item)}
              title={"Submit"}
              buttonStyles={{
                width: scale(114),
                height: verticalScale(44),
                marginTop: verticalScale(10),
                marginBottom: verticalScale(25),
                marginLeft: scale(15),
              }}
              onPress={() => this.debateExtendTime()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };
  debateExtendTime = () => {
    // console.log("hello-------------------", this.state.debateTime);
    if (!this.state.timeValue) {
      alert("Please set time");
      return;
    }
    if (this.state.timeValue > 3 || this.state.timeValue <= 0) {
      alert("Maximum time limit is 3");
      return;
    }
    if (this.state.timeValue === 0) {
      alert("Please set time");
    } else {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            const time = this.state.timeValue * 60 * 1000;

            var dataToSend = {
              debateId: this.props.route.params.debateId,
              time: time,
              creatorId: this.props.route.params.creatorId,
            };
            console.log(
              "data-------",
              URLConstants.DEBATE_EXTEND_TIME,
              dataToSend
            );
            this.setState({ loading: true });
            axios({
              method: "post",
              url: URLConstants.DEBATE_EXTEND_TIME,
              data: dataToSend,

              headers: {
                Token: value,
              },
            })
              .then((response) => {
                console.log('add time--->',response.data);
                var time = this.state.timeValue * 60 + this.state.timerJoinedCount;
                this.setState({ modalVisible: false, timeValue: 0, timerJoinedCount: time });
                this.setState({ loading: false });
                this.onAnimate();

                // this.props.navigation.navigate("SubscriptionPlan", {
                //   debateId:response.data.data.debateId,
                // });
              })
              .catch((err) => {
                // console.log("erro", err.response.data.message);
                this.setState({ loading: false });
                alert(err.response.data.message);
                // alert(error.response);
              });
          }
        });
      });
    }
  };
  debateUncomplete = () => {
    this.setState({ janusDiscoonected: true });
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          var dataToSend = {
            debateId: this.props.route.params.debateId,
          };
          console.log("dataToSend-------=====================", dataToSend);
          axios({
            method: "post",
            url: URLConstants.DEBATE_DISCARD,
            data: dataToSend,
            headers: {
              Token: value,
            },
          })
            .then((response) => {
              this.props.navigation.reset({
                index: 0,
                routes: [{ name: "MainNavigator" }],
              });
              this.state.isJoined ? JanusClient.disconnect() : null;
              console.log(
                "final response========================debateUncomplete============================================",
                response
              );
            })
            .catch((error) => {
              this.setState({ loading: false });
              if (error.response.status === 404) {
                // alert("Participant left the debate.");
                this.props.navigation.replace("MainNavigator");
                // this.props.navigation.reset({
                //   index: 0,
                //   routes: [{ name: "MainNavigator" }],
                // });
                this.state.isJoined ? JanusClient.disconnect() : null;
              }

              // console.log(
              //   "error=====debateUncomplete============================================",
              //   err.response
              // );
            });
        } else {
          alert(strings.Please_check_Internet);
        }
      });
    });
  };
  debateCompleted = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          var roomId = this.state.roomIDVideo;
          var dataToSend = {
            debateId: this.props.route.params.debateId,
            video:
              "https://janus.sportstalkapp.co/recordings/final/" +
              roomId +
              ".mp4",
          };
          console.log("data vvv-------", dataToSend);
          axios({
            method: "post",
            url: URLConstants.DEBATE_COMPLETED,
            data: dataToSend,

            headers: {
              Token: value,
            },
          })
            .then((response) => {
              // alert("deabtes done");
              console.log("final response", response);
              this.setState({
                activeDebate: [],
                isActiveDebate: false,
                debateCount: 0,
                participantCount: 0,
                isJoined: false,
                isConfirmCreator: false,
                timerCount: 15,
                tapCounter: 15,
                id: 0,
                isTap: false,
                isJoined: false,
                newParticipants: [],
                participantCount: 0,
                isButtonDisabled: false,
                isConfirmJoiner: false,
                isConfirmCreator: false,
                debateTime: 0,
                roomIDVideo: "",
                idJoined: 0,
                timerJoinedCount: 60,
                creatorName: "",
                joinerName: "",
                isDeny: false,
                isExtended: true,
                timeValue: null,
              });
            })
            .catch((err) => {
              console.log("error", err.response);
              // console.log("erro",response.data.message);
              this.setState({ loading: false });
              // alert("Debates not done");
              // alert(response.data.message);
              // alert(error.response);
            });
        }
      });
    });
  };

  getActiveDebate = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userId) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            //this.setState({ loading: true });
            var dataToSend = {
              categories: this.props.route.params.userCategory,
              userId: this.props.route.params.creatorId,
            };
            // console.log("dhbhdbhjdf", dataToSend);
            axios({
              method: "post",
              url: URLConstants.GET_ACTIVE_DEBATE,
              data: dataToSend,

              headers: {
                Token: value,
              },
            }).then((response) => {
              console.log(
                "-------data------------------------=======activeDebate",
                response.data.data
              );
              this.setState({
                activeDebate: response.data.data,
                isActiveDebate: true,
                debateCount: 0,
                participantCount: 0,
                isJoined: false,
                isConfirmCreator: false,
                timerCount: 15,
                tapCounter: 15,
                id: 0,
                isTap: false,
                isJoined: false,
                newParticipants: [],
                participantCount: 0,
                isButtonDisabled: false,
                isConfirmJoiner: false,
                isConfirmCreator: false,
                debateTime: 0,
                roomIDVideo: "",
                idJoined: 0,
                timerJoinedCount: 60,
                creatorName: "",
                joinerName: "",
                isDeny: false,
                isExtended: true,
                timeValue: null,
              });

              this.setState({ loading: false });
            });
          } else {
            this.setState({ loading: false });

            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };
  getReset = () => {
    console.log("called skip");
    this.setState({
      debateCount: this.state.debateCount + 1,
      id: this.state.id + 1,
      isTap: false,
      isButtonDisabled: true,
      isjoinbutton: false,
    });
    setTimeout(() => {
      this.setState({ isButtonDisabled: false });
    }, 1500);
  };

  onServerSentEvent = () => {
    this.setState({ isTap: true, isjoinbutton: true });
    const socketData = {
      debateId: this.state.activeDebate[this.state.debateCount]._id,
      userData: this.state.activeDebate[this.state.debateCount],
      joinerId: this.props.route.params.creatorId,
      creatorId: this.state.activeDebate[this.state.debateCount].creator._id,
      roomId: this.state.activeDebate[this.state.debateCount].roomId,
      debateTime: this.state.activeDebate[this.state.debateCount].debateTime,
      fullName: this.props.route.params.fullName,
      creatorFullName:
        this.state.activeDebate[this.state.debateCount].creator.firstName +
        " " +
        this.state.activeDebate[this.state.debateCount].creator.lastName,
      joinerFullName: this.props.route.params.fullName,
      creatorImage:
        this.state.activeDebate[this.state.debateCount].creator.profilePic,
      joinerImage: this.props.route.params.profilePic,
    };
    // socket.on("connect", function () {
    socket.emit("join_debate", socketData);
    // });
  };

  onCancelDebate = () => {
    this.setState({ isjoinbutton: false });
    const socketData = {
      debateId: this.state.activeDebate[this.state.debateCount]._id,
      joinerId: this.props.route.params.creatorId,
      creatorId: this.state.activeDebate[this.state.debateCount].creator._id,
    };
    // socket.on("connect", function () {
    socket.emit("cancel_debate", socketData);
    // });
  };

  participantJoined() {
    this.setState({ isTap: true });
    const socketData = {
      debateId:
        this.state.newParticipants[this.state.participantCount].debateId,
      joinerId:
        this.state.newParticipants[this.state.participantCount].joinerId,
      creatorId: this.props.route.params.creatorId,
      roomId: this.state.newParticipants[this.state.participantCount].roomId,
      debateTime:
        this.state.newParticipants[this.state.participantCount].roomId,
      fullName:
        this.state.newParticipants[this.state.participantCount].firstName +
        " " +
        this.state.newParticipants[this.state.participantCount].lastName,
      creatorFullName:
        this.state.newParticipants[this.state.participantCount].creatorFullName,
      joinerFullName:
        this.state.newParticipants[this.state.participantCount].joinerFullName,
      remainingParticipants: this.state.newParticipants,
    };
    console.log("final----------joined", socketData);
    socket.emit("add_joiner", socketData);
  }

  denyDebate() {
    if (this.state.isDeny === true) {
    } else {
      this.setState({ isTap: true });
      const socketData = {
        debateId:
          this.state.newParticipants[this.state.participantCount].debateId,
        joinerId:
          this.state.newParticipants[this.state.participantCount].joinerId,
        creatorId: this.props.route.params.creatorId,
        roomId: this.state.newParticipants[this.state.participantCount].roomId,
      };
      socket.emit("deny_joiner", socketData);
      console.log(this.state.newParticipants, "this.state.newParticipants");
      let filterdata = this.state.newParticipants.filter(
        (item) =>
          item.joinerId !=
          this.state.newParticipants[this.state.participantCount].joinerId
      );
      // let filterdata = array.filter((item) => {
      //   if (item.joinerId != 2) return item;
      // });
      console.log(filterdata, "this.state.newParticipants");

      this.setState({ newParticipants: filterdata });
    }
  }

  inviteFriend() {
    this.props.navigation.navigate("Inviteyourfriend", {
      debateId: this.props.route.params.debateId,
      debateQuestion: this.props.route.params.debateQuestion,
    });
  }

  socketData = (userid) => {
    const socketData = {
      userId: userid,
      debateId: this.props.route.params.debateId,
      // friendId: this.props.route.params.friendId,
      type: this.props.route.params.isJoinedScreen ? "debate" : "debateCreator",
    };
    console.log("================hdshhshfdhfhdhfhdhfdhfdhfhdh", socketData);
    // alert("connected")
    socket.emit("user_connection", socketData);
    socket.on("user_connected", (msg) => {
      console.log("user_connected========", msg);
    });

    socket.on("confirm_joiner", (msg) => {
      console.log("joiner", msg);
      if (this.props.route.params.isJoinedScreen == true) {
        console.log(
          "sct--------",
          this.state.activeDebate[this.state.debateCount]
        );
        if (msg.data.joinerId === this.props.route.params.creatorId) {
          if (msg.error == false) {
            var time = msg.data.debateTime / 1000;
            console.log("msg time", time);
            console.log("msg ------ joiner", msg);

            this.setState({
              isConfirmCreator: true,
              isJoined: true,
              roomIDVideo: msg.data.roomId,
              timerJoinedCount: time,
              creatorName: msg.data.joinerFullName,
              joinerName: msg.data.creatorFullName,
              debateIdforcancel: msg.data.debateId,
              participantCount: this.state.participantCount + 1,
              // id: this.state.id + 1,
            });

            this.videoJoinedcall(msg.data.roomId);
            this.onAnimate();
          } else if (msg.error == true) {
            alert("Something went wrong");
          }
        } else {
          // alert("This debate has been already joined by someone.");
        }
      } else {
        if (
          msg.data.creatorId === this.props.route.params.creatorId &&
          msg.data.debateId === this.props.route.params.debateId
        ) {
          if (msg.error == false) {
            // alert(msg.data.message);
            var time = msg.data.debateTime / 1000;
            console.log("time", time);
            console.log("msg ------ joiner", msg);

            this.setState({
              isConfirmCreator: true,
              isJoined: true,
              roomIDVideo: msg.data.roomId,
              timerJoinedCount: time,
              creatorName: msg.data.creatorFullName,
              joinerName: msg.data.joinerFullName,
              debateIdforcancel: msg.data.debateId,
            });
            this.onAnimate();
          } else if (msg.error == true) {
            alert("Something went wrong");
          }
        }
      }
    });
    socket.on("time_extended", (msg) => {
      if (this.props.route.params.isJoinedScreen == true) {
        if (msg.joinerId === this.props.route.params.creatorId) {
          if (msg.error == false) {
            var time = msg.debateTime / 1000 + this.state.callInprogress;

            console.log("msg ------ time creator========", time);
            this.setState({ isExtended: false });
            this.setState({
              timerJoinedCount: time,
              idJoined: this.state.idJoined + 1,
              isExtended: true,
              istimeIncrease: true,
            });
            alert(msg.message);
            this.onAnimate();
          } else if (msg.error == true) {
            alert("Something went wrong");
          }
        }
      } else {
        if (
          msg.creatorId === this.props.route.params.creatorId &&
          msg.debateId === this.props.route.params.debateId
        ) {
          if (msg.error == false) {
            var time = msg.debateTime / 1000 + this.state.callInprogress;

            console.log("msg ------ final creator======", time);

            // this.setState({ isExtended: false });
            this.setState({
              timerJoinedCount: time,
              idJoined: this.state.idJoined + 1,
              isExtended: true,
              istimeIncrease: true,
            });
            alert(msg.message);

            // ToastMessage(msg.message)

            this.onAnimate();
          } else if (msg.error == true) {
            alert("Something went wrong");
          }
        }
      }
    });
    socket.on("deny_joiner", (msg) => {
      {
        this.state.newParticipants.length > this.state.participantCount
          ? this.setState({
              participantCount: this.state.participantCount + 1,
              id: this.state.id + 1,
            })
          : null;
      }
      if (this.props.route.params.isJoinedScreen == true) {
        // if (msg.data.joinerId === this.props.route.params.creatorId && msg.data.debateId === this.state.activeDebate[this.state.debateCount].debateId) {
        if (msg.joinerId === this.props.route.params.creatorId) {
          if (msg.error == false) {
            alert(msg.message);
            this.setState({ isjoinbutton: false });
          } else if (msg.error == true) {
            alert("Something went wrong");
          }
        }
      } else {
        if (
          msg.creatorId === this.props.route.params.creatorId &&
          msg.debateId === this.props.route.params.debateId
        ) {
          if (msg.error == false) {
          } else if (msg.error == true) {
            alert("Something went wrong");
          }
        }
      }
    });
    socket.on("new_participant", (msg) => {
      if (
        msg.data.creatorId === this.props.route.params.creatorId &&
        msg.data.debateId === this.props.route.params.debateId
      ) {
        const obj = {
          debateId: msg.data.debateId,
          joinerId: msg.data.joinerId,
          creatorId: msg.data.creatorId,
          city: msg.data.userData.creator.city,
          state: msg.data.userData.creator.state,
          firstName: msg.data.userData.creator.firstName,
          lastName: msg.data.userData.creator.lastName,
          // profilePic: msg.data.userData.creator.profilePic,
          question: msg.data.userData.question,
          roomId: msg.data.roomId,
          debateTime: msg.data.debateTime,
          creatorFullName: msg.data.creatorFullName,
          joinerFullName: msg.data.joinerFullName,
          joinerImage: msg.data.joinerImage,
          creatorImage: msg.data.creatorImage,
        };
        var arrMsg = [];
        arrMsg.push(obj);

        // console.log("hello", obj)
        this.setState({
          newParticipants: [...this.state.newParticipants, ...arrMsg],
        });
      }
    });

    socket.on("debate_cancelled", (msg) => {
      console.log("debate_cancelled======================",msg);
      if (
        msg.data.creatorId === this.props.route.params.creatorId &&
        msg.data.debateId === this.props.route.params.debateId
      ) {
        console.log(this.state.newParticipants, "this.state.newParticipants");
        let filterdata = this.state.newParticipants.filter(
          (item) => item.joinerId != msg.data.joinerId
        );
        // let filterdata = array.filter((item) => {
        //   if (item.joinerId != 2) return item;
        // });
        console.log(filterdata, "this.state.newParticipants");

        this.setState({ newParticipants: filterdata });
        // const obj = {
        //   debateId: msg.data.debateId,
        //   joinerId: msg.data.joinerId,
        //   creatorId: msg.data.creatorId,
        //   city: msg.data.userData.creator.city,
        //   state: msg.data.userData.creator.state,
        //   firstName: msg.data.userData.creator.firstName,
        //   lastName: msg.data.userData.creator.lastName,
        //   // profilePic: msg.data.userData.creator.profilePic,
        //   question: msg.data.userData.question,
        //   roomId: msg.data.roomId,
        //   debateTime: msg.data.debateTime,
        //   creatorFullName: msg.data.creatorFullName,
        //   joinerFullName: msg.data.joinerFullName,
        //   joinerImage: msg.data.joinerImage,
        //   creatorImage: msg.data.creatorImage,
        // };
        // var arrMsg = [];
        // arrMsg.push(obj);

        // // console.log("hello", obj)
        // this.setState({
        //   newParticipants: [...this.state.newParticipants, ...arrMsg],
        // });
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        {this.state.isConfirmCreator ? null : this.confirmDebate()}
        <View style={styles.container}>
          {this.state.isJoined ? this.renderDebateTimeExtend() : null}
          {/* {this.joinerVideoDebate()} */}
          {!this.props.route.params.isJoinedScreen ? (
            this.joinerVideoDebate()
          ) : (
            <>
              {!this.state.isJoined ? (
                <>
                  {this.props.route.params.profilePic == "" ? (
                    <Image
                      style={styles.profileImagesmessage}
                      source={images.blankProfile}
                    />
                  ) : (
                    <DefaultProfileImage
                      style={styles.profileImagesmessage}
                      uri={`${URLConstants.PROFILE_IMAGE_URL}${this.props.route.params.profilePic}`}
                    />
                  )}
                </>
              ) : (
                this.joinerVideoDebate()
              )}
            </>
          )}
        </View>
        {this.state.isJoined ? (
          <>
            <TouchableOpacity
              style={{
                position: "absolute",
                flex: 1,
                zIndex: 999,
                bottom: -10,
                top: Dimensions.get("window").height / 2.4,
                width: "100%",
                height: "5%",
              }}
              onPress={() => this.joinedNavCode()}
            >
              <Image
                style={{
                  flex: 1,
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  marginLeft: this.state.progressStatus + "%",
                }}
                source={images.football_status}
              />
            </TouchableOpacity>
            <View style={styles.stausbarcolor}>
              <Animated.View
                style={[
                  styles.inner,
                  { width: this.state.progressStatus + "%" },
                ]}
              ></Animated.View>
            </View>
          </>
        ) : null}
        {this.VideoJoinView()}
        {this.state.isConfirmCreator ? null : this.creatorInvite()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  selfView: {
    flex: 2,
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height / 2.5,
    // height: 300,
  },
  remoteView: {
    marginTop: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,

    // marginBottom:2,
  },
  container: {
    // flex: 1,
    // justifyContent: "center",
    flex: 2,
    height: Dimensions.get("window").height / 2.5,
    backgroundColor: "#F5FCFF",
    // height: Dimensions.get("window").height / 2.5,
    // height:200,
    // backgroundColor:'red',
  },
  containerSecond: {
    // flex: 1,
    // justifyContent: "center",
    // flex:2,
    height: Dimensions.get("window").height / 2.5,
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  listViewContainer: {
    height: 150,
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    left: 0,
    right: 0,
    top: Dimensions.get("window").height / 2.5,
    bottom: 0,
  },
  overlayHeart: {
    zIndex: 1,
    tintColor: "red",
  },

  modelBackgroud: {
    justifyContent: "center",
    backgroundColor: colors.color_00000080,
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },

  headerStyles: {
    width: scale(345),
    height: verticalScale(54),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10.0,
    elevation: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },

  headerTitle: {
    marginLeft: scale(15),
    alignSelf: "center",
    fontSize: scale(18),
    fontFamily: Fonts.type.JostMedium,
    color: colors.namecolor_333333,
  },
  cancelstyle: {
    width: scale(22),
    height: scale(24),
    alignSelf: "center",
  },

  heading: {
    marginLeft: scale(15),
    alignSelf: "flex-start",
    fontSize: scale(14),
    fontFamily: Fonts.type.JostRegular,
    color: colors.namecolor_333333,
    marginTop: scale(15),
  },
  nodata: {
    textAlign: "center",
    //  marginTop: verticalScale(100),
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(25),
    color: "#333333",
  },
  questions: {
    marginLeft: scale(15),
    // alignSelf: "center",
    // justifyContent:'center',
    // alignItems:'center',
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: "#555555",
    marginBottom: 10,
    marginTop: 10,
  },
  questionsJoin: {
    textAlign: "center",
    // alignSelf: "center",
    // justifyContent:'center',
    // alignItems:'center',
    fontSize: scale(16),
    fontFamily: Fonts.type.JostRegular,
    color: "#555555",
    marginBottom: 10,
    // marginTop: 10,
  },
  imageconatiner: {
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    // marginTop: verticalScale(2),
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  videoProfile: {
    width: Dimensions.get("window").width,
    height: '100%',
  },
  imageprofile: {
    // marginTop: 30,
    width: scale(100),
    height: scale(100),
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: colors.whiteText,
  },
  txtName: {
    marginTop: 5,
    textAlign: "center",
    fontFamily: Fonts.type.JostSemiBold,
    fontSize: scale(20),
    color: "#333333",
  },
  txtAddress: {
    textAlign: "center",
    fontFamily: Fonts.type.JostRegular,
    fontSize: scale(14),
    color: "#555555",
    marginBottom: 10,
  },
  profileImagesmessage: {
    flex: 1,
  },
  stausbarcolor: {
    width: "100%",
    height: 10,
    backgroundColor: "green",
    justifyContent: "center",
  },
  inner: {
    width: "100%",
    height: 10,
    backgroundColor: colors.RedHeader,
  },
  label: {
    fontSize: 23,
    color: "black",
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  },

  iconStyle:{
    width: scale(35),
    height: scale(35),
    marginVertical: 10,
    marginEnd: 10,
    alignSelf: "center",
  },
});

export default VideoRoomScreen;
