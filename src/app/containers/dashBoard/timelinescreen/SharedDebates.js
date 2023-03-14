import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "./CommentStyles";
import { CustomText } from "../../../components/CustomText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { verticalScale } from "../../../themes/Metrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { URLConstants } from "../../../utils/URLConstants";
import moment from "moment";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import images from "../../../themes/Images";
// import scale, { verticalScale } from "../../../themes/Metrics";
// import R from '../../../R';
import { Strings as strings } from "../../../utils/Strings";
import NetInfo from "@react-native-community/netinfo";
import Like from "../../../images/svg/timeline/like.svg";
import Liked from "../../../images/svg/timeline/liked.svg";
import DefaultProfileImage from "../../../components/DefaultProfileImage";
import { NoDataFound } from "../../../components/NoDataFound";
import DebatesCard from "../../../components/DebatesCard";
import colors from "../../../themes/Colors";

class   SharedDebates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      data: [],
      profiledata: [],
    };
  }

  async componentDidMount() {
    this.getMyProfile();
  }

  getMyProfile = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            let url =
              URLConstants.SHARE_DEBATES_GET_BY_ID +
              `/${this.props.route.params.debateid}` +
              `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data, "==============");
                console.log(response.data.data, "==================");
                this.setState({ data: response.data.data });
                this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  likeCallBack = (item) => {
    let localdata = this.state.data;
    localdata.forEach((element) => {
      if (item.isLiked == false) {
        if (element._id == item._id) {
          element.likes += 1;
          element.isLiked = true;
        }
      } else {
        if (element._id == item._id) {
          element.likes -= 1;
          element.isLiked = false;
        }
      }
    });
    this.setState({ data: localdata });
  };

  voteCallBack = (item) => {
    let localdata = this.state.data;
    localdata.forEach((element) => {
      if (item.item.isVoted == false) {
        if (element._id == item.item._id) {
          if (item.typeofvoter == "creator") {
            element.isVoted = true;
            element.votedTo = item.item.creator._id;
            element.creatorVote += 1;
          } else {
            element.isVoted = true;
            element.votedTo = item.item.joiner._id;
            element.joinerVote += 1;
          }
        }
      } else {
        if (element._id == item.item._id) {
          if (item.typeofvoter == "creator") {
            element.isVoted = true;
            element.votedTo = item.item.creator._id;
            element.creatorVote += 1;
            element.joinerVote -= 1;
          } else {
            element.isVoted = true;
            element.votedTo = item.item.joiner._id;
            element.joinerVote += 1;
            element.creatorVote -= 1;
          }
        }
      }
    });
    this.setState({ data: localdata });
  };
  ListEmpty = () => {
    return <NoDataFound />;
  };
  ActivityIndicatorLoadingView = () => {
    //making a view to show to while loading the webpage
    return (
      <View style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        position:'absolute'
      }}>
        <ActivityIndicator size="large" color={colors.RedHeader} />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        {/* <Loader loading={this.state.loading} /> */}
        {this.state.loading ? this.ActivityIndicatorLoadingView() : null}
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          behavior={Platform.OS == "ios" ? "padding" : ""}
          enabled
          keyboardVerticalOffset={80}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={this.state.data}
              extraData={this.state.data}
              ListEmptyComponent={this.ListEmpty()}
              renderItem={({ item, index }) => (
                <DebatesCard
                  onPressProductListing={() =>
                    this.props.navigation.navigate("Comments", { data: item })
                  }
                  videoPlayer={() =>
                    this.props.navigation.navigate("VideoPlayerScreen", {
                      data: item.video,
                    })
                  }
                  item={item}
                  likedebates={() => this.likeCallBack(item)}
                  votedebates={(i) => this.voteCallBack(i)}
                />
              )}
              indicatorStyle={"white"}
              showsVerticalScrollIndicator={true}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}

export default SharedDebates;
