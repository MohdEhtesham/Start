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
import colors from "../../../themes/Colors";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
      comments: "",
      loading: false,
      refreshing: false,
      commentsData: [],
      profiledata: [],
    };
  }

  async componentDidMount() {
    // this.textInputRef.focus();
    this.allComments();
    this.getMyProfile();
  }

  allComments = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userid) => {
        var dataToSend = {
          userId: userid,
          debateId: this.state.data._id,
        };
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            this.setState({ refreshing: true });
            finalurl = URLConstants.GET_COMMENTS_BY_DEBATES;
            console.log(finalurl, dataToSend, "=====url");
            axios({
              method: "post",
              url: URLConstants.GET_COMMENTS_BY_DEBATES,
              headers: {
                Token: value,
              },
              data: dataToSend,
            }).then((response) => {
              this.setState({
                commentsData: response.data.data,
              });
              this.setState({ loading: false });
              this.setState({ refreshing: false });
              console.log(this.state.commentsData, "=======");
            });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  getMyProfile = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data, "==============");
                AsyncStorage.setItem(
                  "USER_PROFILE",
                  response.data.data.profilePic
                );
                AsyncStorage.setItem("USER_EMAIL", response.data.data.email);
                this.setState({ profiledata: response.data.data });
                console.log(
                  this.state.profiledata,
                  "==============getMyProfile"
                );
                this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            // alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  addComments = () => {
    if (!this.state.comments) {
      alert(strings.please_enter_comment);
      return;
    }
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userid) => {
        var dataToSend = {
          userId: userid,
          debateId: this.state.data._id,
          message: this.state.comments,
        };
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            this.setState({ refreshing: true });
            console.log(
              URLConstants.ADD_COMMENTS,
              dataToSend,
              "Url========data"
            );
            axios({
              method: "post",
              url: URLConstants.ADD_COMMENTS,
              headers: {
                Token: value,
              },
              data: dataToSend,
            })
              .then((response) => {
                // this.setState({ loading: false });
                this.setState({ refreshing: false });
                console.log(response, "====responce");
                this.allComments();
                this.setState({ comments: null });
              })
              .catch((error) => {
                console.log(error.response.data, "==============response");
                this.setState({ loading: false });
                this.setState({ refreshing: false });
                // alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  likecomments = (item) => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userid) => {
        var dataToSend = {
          userId: userid,
          debateId: this.state.data._id,
          commentId: item._id,
        };
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            this.setState({ refreshing: true });

            let finalUrl = !item.isLiked
              ? URLConstants.GET_COMMENTS_LIKE
              : URLConstants.GET_COMMENTS_UNLIKE;
            console.log(finalUrl, dataToSend, "Url========data");
            axios({
              method: "post",
              url: finalUrl,
              headers: {
                Token: value,
              },
              data: dataToSend,
            })
              .then((response) => {
                // this.setState({ loading: false });
                this.setState({ refreshing: false });
                console.log(response, "====responce");
                this.allComments();
                // alert(response.)
                // this.allComments();
                // this.setState({ comments: null });
              })
              .catch((error) => {
                console.log(error.response.data, "==============response");
                this.setState({ loading: false });
                this.setState({ refreshing: false });
                alert(error.response.data.message);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  userProfileScreenNavigation = (item) => {
    // console.log("item-->", item ,`${URLConstants.PROFILE_IMAGE_URL}${item.user.profilePic}`);
    if(!item.user.deleted
      ){
      AsyncStorage.getItem("USER_ID").then((userid) => {
        // console.log(item, userid, "==============");
  
        item.user._id == userid
          ? this.props.navigation.navigate("MyProfile", {
              data: item.user,
            })
          : this.props.navigation.navigate("OtherUserProfile", {
              data: item.user,
            });
      });
    }
   
  };

  commentcard = (item) => {
    return (
      <View style={styles.commentContainer}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => this.userProfileScreenNavigation(item)}
          >
            {item.user.profilePic == "" || item?.user?.deleted  ? (
              <Image
                style={styles.profileImagesmessage}
                source={images.blankProfile}
              />
            ) : (
              <DefaultProfileImage
                style={styles.profileImagesmessage}
                uri={`${URLConstants.PROFILE_IMAGE_URL}${item.user.profilePic}`}
              />
            )}
          </TouchableOpacity>
          <View style={styles.commentTextContainer}>
            <TouchableOpacity
              style={styles.usernametouch}
              onPress={() => this.userProfileScreenNavigation(item)}
            >
              {
                !item?.user?.deleted ?
              
              <CustomText
                item={`${item.user.firstName} ${item.user.lastName}`}
                style={styles.titlestyles}
              />:
              <CustomText
              item={"Anonymous"}
              style={styles.titlestyles}
            />
            }
            </TouchableOpacity>
            <CustomText
              item={moment.utc(item.createdAt).format("DD-MMM-YYYY")}
              style={styles.date}
            />
            <CustomText style={styles.commentitem} item={item.message} />
          </View>
          {/* <View>
            <Text>hh</Text>
          </View> */}
        </View>
        <View style={styles.likecomatiner}>
          <TouchableOpacity onPress={() => this.likecomments(item)}>
            {!item.isLiked ? <Like /> : <Liked />}
          </TouchableOpacity>
          <CustomText item={`${item.likes} likes`} />
        </View>
      </View>
    );
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  footer = () => {
    return <View style={{ marginTop: verticalScale(20) }}></View>;
  };

  headercomp = () => {
    return <CustomText item={"Comments"} style={styles.titlestyle} />;
  };

  render() {
    return (
      <SafeAreaProvider>
        <Loader loading={this.state.loading} />
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          behavior={Platform.OS == "ios" ? "padding" : ""}
          enabled
          keyboardVerticalOffset={80}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={styles.Container}>
              <FlatList
                data={this.state.commentsData}
                //style={{marginTop: 2, marginStart: 2}}
                renderItem={({ item, index }) => this.commentcard(item)}
                indicatorStyle={"white"}
                ListEmptyComponent={this.ListEmpty()}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={this.headercomp}
                ListFooterComponent={this.footer}
                ItemSeparatorComponent={(item) => (
                  <View style={{ marginTop: verticalScale(20) }}></View>
                )}
              />
            </View>
            <View
              style={{
                // bottom: Platform.OS === "ios" ? 20 : 0,
                flexDirection: "row",
                zIndex: 9999,
                bottom: verticalScale(10),
                // alignSelf: "center",
                backgroundColor: "white",
              }}
            >
              {this.state.profiledata.profilePic == "" ? (
                <Image
                  style={styles.profileImagesmessage}
                  source={images.blankProfile}
                />
              ) : (
                <DefaultProfileImage
                  style={styles.profileImagesmessage}
                  uri={`${URLConstants.PROFILE_IMAGE_URL}${this.state.profiledata.profilePic}`}
                />
              )}
              <TextInput
                style={styles.input}
                autoFocus={true}
                // placeholderTextColor={colors.whiteText}
                placeholder="Your Message"
                value={this.state.comments}
                multiline={true}
                numberOfLines={4}
                autoCorrect={false}
                maxLength={100}
                // autoFocus={true}
                ref={(ref) => (this.textInputRef = ref)}
                onChangeText={(comments) =>
                  this.setState({ comments: comments })
                }
              />
              <TouchableOpacity
                onPress={() => this.addComments()}
                style={{ alignSelf: "center" }}
              >
                <CustomText item={"Post"} style={styles.post} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}

export default Comments;
