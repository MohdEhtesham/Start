/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Modal,
  Alert,
  TextInput,
  Pressable,
  Share,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import colors from "../themes/Colors";
import scale, { verticalScale } from "../themes/Metrics";
import Like from "../images/svg/timeline/like.svg";
import Liked from "../images/svg/timeline/liked.svg";
import Play from "../images/svg/timeline/play.svg";
import Report from "../images/svg/timeline/report.svg";
import ShareIcon from "../images/svg/timeline/share.svg";
import Search from "../images/svg/timeline/search.svg";
import Filter from "../images/svg/timeline/filter.svg";
import images from "../themes/Images";
import { CustomText } from "../components/CustomText";
import Fonts from "../themes/Fonts";
import styles from "./Styles/DebateCardStyle";
import { BASE_URL, URLConstants } from "../utils/URLConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loader from "./Loader";
import CustomButton from "./CustomButton";
import BackIcon from "../images/svg/back.svg";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../utils/Strings";
import DefaultProfileImage from "./DefaultProfileImage";
import LinearGradient from "react-native-linear-gradient";
import Moment from "moment";
import SearchIcon from "../images/svg/timeline/search.svg";
import { NoDataFound } from "./NoDataFound";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import dynamicLinks from '@react-native-firebase/dynamic-links';

const DebatesCard = (props) => {
  const [loading, setloading] = useState(false);
  const [like, setlike] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalShare, setmodalShare] = useState(false);
  const [description, setdescription] = useState("");
  const [vote, setVote] = useState("vote2");
  const [allFriends, setallFriends] = useState([]);
  const [myProfile, setMyProfile] = useState({});
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [message, setmassage] = useState("");
  const [userId, setUserId] = useState("");

  let item = props.item;
  // console.log(item.creator, "===========props");

  useEffect(() => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            setUserId(userID);
            // this.setState({ loading: true });
            let url = URLConstants.USER_BY_FRIEND_LIST + `?userId=${userID}`;
            // console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data.data, "==============response");
                // console.log(response.data, "getFriendsList==============");
                setallFriends(response.data.data);
                // response.data.data.forEach((element) => {
                //   element.isCheck = false;
                // });
                // this.setState({ friendListData: response.data.data });
                // this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });

    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            // this.setState({ loading: true });
            let url = URLConstants.GET_USER_BY_ID + `/${userID}`;
            // console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                // console.log(response.data, "==============");
                setMyProfile(response.data.data);
                AsyncStorage.setItem(
                  "USER_PROFILE",
                  response.data.data.profilePic
                );
                AsyncStorage.setItem("USER_EMAIL", response.data.data.email);
                // this.setState({ profiledata: response.data.data });
                // console.log(response.data.data, "==============getMyProfile");
                // this.setState({ loading: false });
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  }, []); // <-- Have to pass in [] here!

  const likeVideo = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((user_Id) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: user_Id,
              debateId: item._id,
            };
            console.log(dataToSend, URLConstants.LIKE_DEBATES);
            setloading(true);
            // setlike(props.item.isLiked);
            let apiUrl = !props.item.isLiked
              ? URLConstants.LIKE_DEBATES
              : URLConstants.DISLIKE_DEBATES;
            // console.log(apiUrl, dataToSend, "==========Url and data send ");
            axios({
              method: "post",
              url: apiUrl,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // console.log(response.data, "===============response.data");
                // alert(response.data.message);
                if (response.status === 200) {
                  setloading(false);
                  props.likedebates();
                  setTimeout(() => {
                    setloading(false);
                  }, 2000);
                } else {
                  setloading(false);
                  setTimeout(() => alert(response.data.message), 10);
                }
              })
              .catch((error) => {
                // console.log(error.response, "===============");
                setloading(false);
                setTimeout(() => alert(error.response.data.message), 15);
                // handle error
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  const addVote = (item) => {
    // console.log(item, "=============typeofvoter");
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((user_Id) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              userId: user_Id,
              voteTo: item.typeofvoter == "creator" ? "creator" : "joiner",
              debateId: item.item._id,
              debator:
                item.typeofvoter == "creator"
                  ? item.item.creator._id
                  : item.item.joiner._id,
            };
            console.log(dataToSend, URLConstants.LIKE_DEBATES);
            setloading(true);
            // setlike(true);
            let apiUrl = URLConstants.ADD_VOTE;
            // console.log(apiUrl, dataToSend, "==========Url and data send ");
            axios({
              method: "post",
              url: apiUrl,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                setloading(false);
                props.votedebates(item);
                // console.log(response, "===============voteresponce");
                // if (response.status === 200) {
                //   setloading(false);
                //   props.votedebates();
                // } else {
                //   setloading(false);
                //   // alert(response.data.message);
                // }
              })
              .catch((error) => {
                // console.log(error.response, "===============voterERROResponce");
                setloading(false);
                alert(error.response.data.message);
                // setTimeout(() => alert(error.response.data.message), 15);
                // handle error
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  const addReport = (item) => {
    if (!description) {
      Alert.alert("Alert", "Please enter text in the Description");
      // setModalVisible(false);
      return;
    }
    // console.log(item._id);
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        console.log(value, userID);
        var dataToSend = {
          userId: userID,
          debateId: item._id,
          description: description,
        };
        // console.log(URLConstants.REPORT, dataToSend, "==============");
        setloading(true);
        axios({
          method: "post",
          url: URLConstants.REPORT,
          data: dataToSend,
          headers: {
            Token: value,
          },
        })
          .then((response) => {
            setloading(false);
            // if (response.data.status == 200) {
            // }
            // handle success
            Alert.alert("Success", response.data.message);
            // console.log(response, "=========responece");
            // alert(JSON.stringify(response));
            setModalVisible(false);
            setdescription("");
          })
          .catch((error) => {
            // console.log(error.response, "error=========");
            setloading(false);
            setdescription("");
            setModalVisible(false);
            alert(error.response.data.message);
            // alert(error.response);
          });
      });
    });
  };

  const shareOptions = {
    title: "Share via",
    message: "some message",
    url: "some share url",
    // social: Share.Social.WHATSAPP,
    whatsAppNumber: "9199999999", // country code + phone number
    filename: "test", // only for base64 file in Android
  };

  const renderReport = (item) => {
    return (
      <SafeAreaProvider>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <Pressable
            style={styles.modelBackgroud}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
              behavior={Platform.OS == "ios" ? "padding" : ""}
              enabled
              keyboardVerticalOffset={0}
            >
              <View
                style={{
                  backgroundColor: colors.whiteText,
                }}
              >
                <View style={styles.headerStyles}>
                  <CustomText item={"Report"} style={styles.headerTitle} />
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: scale(15),
                      alignSelf: "center",
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Image source={images.close} style={styles.cancelstyle} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={{
                    width: scale(342),
                    height: verticalScale(118),
                    marginTop: verticalScale(15),
                    alignSelf: "center",
                    borderWidth: 0.8,
                    borderColor: colors.borderColor,
                    padding: 10,
                    textAlignVertical: "top",
                  }}
                  // editable
                  // maxLength={45}
                  // numberOfLines={4}
                  placeholder={"Description"}
                  value={description}
                  onChangeText={(text) => setdescription(text)}
                  multiline={true}
                  underlineColorAndroid="transparent"
                />

                <CustomButton
                  onPress={() => addReport(item)}
                  title={"Send"}
                  buttonStyles={{
                    width: scale(72),
                    height: verticalScale(39),
                    marginTop: verticalScale(10),
                    marginBottom: verticalScale(25),
                    marginLeft: scale(17),
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal>
      </SafeAreaProvider>
    );
  };

  const endEditing = () => {
    AsyncStorage.getItem("USER_ID").then((userID) => {
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            setloading(true);
            let url =
              URLConstants.USER_BY_FRIEND_LIST +
              `?userId=${userID}` +
              `&search=` +
              search;
            console.log(url, "==url");
            axios
              .get(url, {
                headers: {
                  Token: value,
                },
              })
              .then((response) => {
                console.log(response.data, "getFriendsList==============");
                setallFriends(response.data.data);
                setloading(false);
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  // const rendersearchbar = () => {
  //   return (

  //   );
  // };

  const sharedebtaes = (item) => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        console.log(value, userID);
        var dataToSend = {
          debateId: props.item._id,
          userId: userID,
          sharerId: item.friend._id,
          message: message,
        };
        console.log(
          URLConstants.SHARE_DEBATES_INTERNAL,
          dataToSend,
          "=============="
        );
        setloading(true);
        axios({
          method: "post",
          url: URLConstants.SHARE_DEBATES_INTERNAL,
          data: dataToSend,
          headers: {
            Token: value,
          },
        })
          .then((response) => {
            setloading(false);
            setmodalShare(false);
            // if (response.data.status == 200) {
            // }
            // handle success
            Alert.alert("Success", response.data.message);
            console.log(response, "=========responece");
            // alert(JSON.stringify(response));
            // setModalVisible(!modalVisible);
          })
          .catch((error) => {
            console.log(error.response, "error=========");
            setloading(false);
            alert(error.response.data.message);
            // alert(error.response);
          });
      });
    });
  };
  const emptyfriends = () => {
    return <NoDataFound />;
  };

  const rendershare = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalShare}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          setmodalShare(false);
        }}
      >
        <Pressable
          style={styles.modelBackgroud}
          // onPress={() => {
          //   setmodalShare(false);
          // }}
        >
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
            behavior={Platform.OS == "ios" ? "padding" : ""}
            enabled
            keyboardVerticalOffset={0}
          >
            <View
              style={{
                backgroundColor: colors.whiteText,
                flex: 1,
                marginTop: verticalScale(200),
                // height: verticalScale(500),
              }}
            >
              <View style={{ marginTop: verticalScale(20), marginBottom: 50 }}>
                {/* <CustomText item={"hjdsfjf"} /> */}
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: scale(20),
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <DefaultProfileImage
                      uri={`${URLConstants.PROFILE_IMAGE_URL}${myProfile.profilePic}`}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginRight: scale(20),
                        borderWidth: 1,
                        //backgroundColor: "red",
                        borderColor: colors.borderColor,
                      }}
                    />
                    <TextInput
                      placeholder={"Write a message..."}
                      placeholderTextColor={colors.textblack_555555}
                      style={{
                        width: scale(220),
                      }}
                      onChangeText={(text) => setmassage(text)}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: scale(15),
                      alignSelf: "center",
                    }}
                    onPress={() => setmodalShare(!modalShare)}
                  >
                    <Image source={images.close} style={styles.cancelstyle} />
                  </TouchableOpacity>
                </View>
                {/* {rendersearchbar()} */}
                <View style={styles.serarchMainContainer}>
                  <View style={styles.searchcontainer}>
                    <TextInput
                      placeholder={"Search"}
                      placeholderTextColor={colors.textblack_555555}
                      style={styles.inputstyle}
                      onChangeText={(text) => setSearch(text)}
                      onEndEditing={endEditing}
                    />
                    <SearchIcon style={styles.searchicon} />
                  </View>
                </View>
                <FlatList
                  data={allFriends}
                  // ListHeaderComponent={rendersearchbar}
                  ListEmptyComponent={emptyfriends}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginTop: verticalScale(10),
                        justifyContent: "space-between",
                        flexDirection: "row",
                        flex: 1,
                        marginHorizontal: scale(20),
                        // margin: 5,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <DefaultProfileImage
                          uri={`${URLConstants.PROFILE_IMAGE_URL}${item.friend.profilePic}`}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            marginRight: scale(20),
                            borderWidth: 1,
                            borderColor: colors.borderColor,
                          }}
                        />
                        <CustomText
                          item={`${item.friend.firstName} ${item.friend.lastName}`}
                          style={{
                            alignSelf: "center",
                            fontSize: scale(15),
                            fontFamily: Fonts.type.JostRegular,
                          }}
                        />
                      </View>
                      <CustomButton
                        title={"Send"}
                        buttonStyles={{
                          width: scale(50),
                          height: scale(35),
                          alignSelf: "center",
                        }}
                        onPress={() => sharedebtaes(item)}
                      />
                    </View>
                  )}
                />
                <View style={{ marginTop: verticalScale(100) }}></View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    );
  };

  const createLink = async () => {
    const slink = await dynamicLinks().buildShortLink({
      link: `${URLConstants.SHARE_DEBATES_EXTERNAL}/api/debate/shareMetaData/${item._id}`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://sportstalk.page.link',
      android: { packageName: 'com.sportstalk' },
      ios: { bundleId: 'com.sportstalk', appStoreId: '12345678' },
      navigation: { forcedRedirectEnabled: true },
    });
    console.log('short link--->', slink);
    share(slink);
  }

  const share = async (link) => {
    console.log(
      `${URLConstants.SHARE_DEBATES_EXTERNAL}/api/debate/shareMetaData/${item._id}`,
      "====================usr${URLConstants.SHARE_DEBATES_EXTERNAL}/api/debate/shareMetaData/${item._id}"
    );
    try {
      const result = await Share.share({
        message: `Hi, Please look this debates on SportsTalk Debates between ${item.creator.firstName} ${item.creator.lastName} and ${item.joiner.firstName} ${item.joiner.lastName}. Please install this app,  AppLink: ${link}`,
        title: "App link",
        //url: `${URLConstants.SHARE_DEBATES_EXTERNAL}/api/debate/shareMetaData/${item._id}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };


   const userProfileScreenNavigation = (item) => {
     //  alert("hhhh");
     AsyncStorage.getItem("USER_ID").then((userid) => {
       console.log(item._id, userid, "==============");
       item._id == userid
         ? props.onPressGotoProfile(item)
         : props.onPressGotoOtherUser(item);
     });
   };

   return (
     <View style={styles.Container}>
       <View style={styles.imageContainer}>
         {/* <Loader loading={loading} /> */}
         <ImageBackground
           source={{
             uri: item.creator.profilePic
               ? `${URLConstants.PROFILE_IMAGE_URL}${item.creator.profilePic}`
               : `${URLConstants.PROFILE_IMAGE_URL}default.png`,
           }}
           style={styles.photostyle}
         >
           <LinearGradient
             start={{ x: 0, y: 0 }}
             end={{ x: 0, y: 1 }}
             colors={["#080808", "transparent"]}
             style={{
               height: verticalScale(80),
             }}
           >
             <View style={styles.textContainer}>
               <CustomText
                 style={styles.textstyle}
                 item={
                   item.creator != null
                     ? `${item.creator.firstName} ${item.creator.lastName}`
                     : null
                 }
               />
               <CustomText
                 style={styles.textstyle}
                 item={
                   item.creatorVote != null ? `${item.creatorVote} Votes` : null
                 }
               />
             </View>
           </LinearGradient>
         </ImageBackground>
         {/* {console.log(
          item.isProcessed,
          "=====================isProcessedisProcessedisProcessedisProcessed"
        )} */}
         {item.video.status=="COMPLETE" ? (
           <TouchableOpacity
             style={styles.touchableopacitystyle}
             onPress={props.videoPlayer}
           >
             <Image source={images.play} style={styles.imagestyle} />
           </TouchableOpacity>
         ) : null}
         {/* <TouchableOpacity
          style={styles.touchableopacitystyle}
          onPress={props.videoPlayer}
        >
          <Image source={images.play} style={styles.imagestyle} />
        </TouchableOpacity> */}
         <ImageBackground
           source={{
             uri: item.joiner.profilePic
               ? `${URLConstants.PROFILE_IMAGE_URL}${item.joiner.profilePic}`
               : `${URLConstants.PROFILE_IMAGE_URL}default.png`,
           }}
           style={styles.photostyle}
         >
           <LinearGradient
             start={{ x: 0, y: 0 }}
             end={{ x: 0, y: 1 }}
             colors={["#080808", "transparent"]}
             style={{
               height: verticalScale(80),
             }}
           >
             <View style={styles.textContainer}>
               <CustomText
                 style={styles.textstyle}
                 item={
                   item.joiner != null
                     ? `${item.joiner.firstName} ${item.joiner.lastName}`
                     : null
                 }
               />
               <CustomText
                 style={styles.textstyle}
                 item={
                   item.joinerVote != null ? `${item.joinerVote} Votes` : null
                 }
               />
             </View>
           </LinearGradient>
         </ImageBackground>
       </View>
       <View style={styles.voteContainer}>
         <View>
           <TouchableOpacity
             onPress={() => userProfileScreenNavigation(item.creator)}
           >
             <CustomText
               numberOfLines={1}
               item={
                 item.creator != null
                   ? `${item.creator.firstName} ${item.creator.lastName}`
                   : null
               }
               style={styles.nametext}
             />
           </TouchableOpacity>
           {!item.voteTimeExpired ? (
             <TouchableOpacity
               style={[
                 item.creator._id == item.votedTo
                   ? styles.voteContainercolor
                   : styles.voteContainer1,
               ]}
               onPress={() => addVote({ item, typeofvoter: "creator" })}
             >
               <CustomText
                 style={[
                   item.creator._id == item.votedTo
                     ? styles.voteheaderTitle
                     : styles.votetext,
                 ]}
                 item={item.creator._id == item.votedTo ? "Voted" : "Vote"}
               />
             </TouchableOpacity>
           ) : null}
         </View>
         <View style={styles.vsCircle}>
           <CustomText style={styles.vstext} item={"Vs"} />
         </View>
         <View>
           <TouchableOpacity
             onPress={() => userProfileScreenNavigation(item.joiner)}
           >
             <CustomText
               numberOfLines={1}
               item={
                 item.joiner != null
                   ? `${item.joiner.firstName} ${item.joiner.lastName}`
                   : null
               }
               style={styles.nametext}
             />
           </TouchableOpacity>
           {!item.voteTimeExpired ? (
             <TouchableOpacity
               style={[
                 item.joiner._id == item.votedTo
                   ? styles.voteContainercolor
                   : styles.voteContainer1,
               ]}
               onPress={() => addVote({ item, typeofvoter: "joiner" })}
             >
               <CustomText
                 style={[
                   item.joiner._id == item.votedTo
                     ? styles.voteheaderTitle
                     : styles.votetext,
                 ]}
                 item={item.joiner._id == item.votedTo ? "Voted" : "Vote"}
               />
             </TouchableOpacity>
           ) : null}
         </View>
       </View>
       <View style={styles.bottomblock} />
       <CustomText
         style={styles.bottomtext}
         item={item.question != null ? `${item.question}` : null}
       />
       <View style={styles.shareblock}>
         <View
           style={{
             flexDirection: "row",
             alignSelf: "center",
           }}
         >
           <TouchableOpacity onPress={() => likeVideo(item)}>
             {/* {console.log(props.item, "===================================")} */}
             {props.item.isLiked ? (
               <Liked style={styles.likestyle} />
             ) : (
               <Like style={styles.likestyle} />
             )}
           </TouchableOpacity>
           <CustomText
             item={item.likes != 0 ? `${item.likes}` : 0}
             style={[
               props.item.isLiked ? styles.fivetextliked : styles.fivetext,
             ]}
           />
         </View>
         <TouchableOpacity
           style={{ flexDirection: "row" }}
           onPress={() => setmodalShare(true)}
         >
           <ShareIcon style={styles.likestyle} />
           <CustomText
             item={item.shares != "" ? `${item.shares} Shares` : "0 Shares"}
             style={styles.fivetext}
           />
         </TouchableOpacity>

         <TouchableOpacity
           style={{ flexDirection: "row" }}
           onPress={() => createLink()}
         >
           {/* <Share style={styles.likestyle} /> */}
           <Image
             source={images.share}
             style={{
               width: 20,
               height: 20,
               opacity: 0.6,
               marginVertical: verticalScale(3),
             }}
           />
           <CustomText item={"Share"} style={styles.fivetext} />
         </TouchableOpacity>
         {userId == item.joiner._id && userId == item.creator._id ? null : (
           <TouchableOpacity
             style={{ flexDirection: "row" }}
             onPress={() => {
              console.log('userId', userId);
              console.log('report pressed',item);
              if(userId == item.creator._id) {Alert.alert('SportsTalk','You cannot report your own debate.');}
              else {setModalVisible(true);}
            }}
           >
             <Report style={styles.likestyle} />
             <CustomText item={"Report"} style={styles.fivetext} />
           </TouchableOpacity>
         )}
       </View>
       <View style={styles.commentContainer} />
       <TouchableOpacity onPress={props.onPressProductListing}>
         <CustomText style={styles.commenttext} item={"View Comments"} />
       </TouchableOpacity>
       {renderReport(item)}
       {rendershare(item)}
     </View>
   );
};

export default DebatesCard;
