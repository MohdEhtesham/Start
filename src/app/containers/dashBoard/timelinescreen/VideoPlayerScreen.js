import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loader from "../../../components/Loader";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import WebView from 'react-native-webview';

class VideoPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      opacity: 0,
    };
  }
  onLoadStart = () => {
    this.setState({opacity: 1});
  }
  
  onLoad = () => {
    this.setState({opacity: 0});
  }
  
  onBuffer = ({isBuffering}) => {
    this.setState({opacity: isBuffering ? 1 : 0});
  }

  videoError = (e) => { console.log("err--->", e)
  alert('Video Not Found') };

  ActivityIndicatorLoadingView = () => {
    //making a view to show to while loading the webpage
    return (
      <View style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        position:'absolute'
      }}>
        <ActivityIndicator size="large" color={'#FFF'} />
      </View>
    );
  };

  render() {
    console.log(this.props.route.params.data.url, "========");
    return (
      <View style={{ flex: 1 }}>
        {/* <VideoPlayer
          source={{
            uri:
              this.props.route.params.data && this.props.route.params.data.url
                ? this.props.route.params.data.url
                : "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          // navigator={this.props.navigation.goBack()}
          // toggleResizeModeOnFullscreen={true}
          tapAnywhereToPause={true}
          disableFullscreen={false}
          disableBack={false}
          onBack={() => this.props.navigation.goBack()}
          style={styles.backgroundVideo}
        // repeat={true}
        // isExternalPlaybackActive={true}
        // paused={true}
        // showOnStart={false}
        /> */}
        <Video
          source={{
            uri:
              this.props.route.params.data && this.props.route.params.data.url
                ? this.props.route.params.data.url
                : "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={{ height: '100%', width: '100%', backgroundColor: 'black',position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,}}
          controls={true}
          rate={1.0} // Rate for video playback
          resizeMode={'cover'}
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onLoadStart={this.onLoadStart} // Callback when remote video start loading
          onLoad={this.onLoad} // Callback when remote video is loaded
          onError={this.videoError} // Callback when video cannot be loaded
          ref={(ref) => {
            this.player = ref
          }} />
        {/* <WebView
          style={{flex:1}}
          source={{ uri: this.props.route.params.data && this.props.route.params.data.url
            ? this.props.route.params.data.url
            : "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", }}
          renderLoading={this.ActivityIndicatorLoadingView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={false}
        /> */}
        {this.state.opacity ?
        <View style={{position:'absolute',height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,justifyContent:'center'}}>
        <ActivityIndicator
          animating
          size="large"
          color={"#FFF"}
          style={{opacity: this.state.opacity}}
        />
        <Text style={{color:'#FFF', fontSize:16,alignSelf:'center', opacity:this.state.opacity}}>{'Loading'}</Text>
        </View>
  : null}
      </View>
    );
  }
}

export default VideoPlayerScreen;
