/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  GiftedChat,
  Send,
  InputToolbar,
  Bubble,
  Time,
  Day,
} from "react-native-gifted-chat";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  AppState,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import io from "socket.io-client";
import Moment from "moment";

import styles from "./ChatDetailsStyles";
import scale, { verticalScale } from "../../../themes/Metrics";
import { CustomText } from "../../../components/CustomText";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import SearchIcon from "../../../images/svg/timeline/search.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLConstants } from "../../../utils/URLConstants";
import Loader from "../../../components/Loader";
import BackIcon from "../../../images/svg/back.svg";
import MoreIcon from "../../../images/svg/my-profile/moreWhite.svg";
import SendIcon from "../../../images/svg/chat/send.svg";
const socket = io(URLConstants.SOCKET_URL);
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

// Recieve messages

class ChatDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
      loading: false,
      messages: [],
      tempArray: [],
      tempSocketArray: [],
      userId: "",
      userFirstName: "",
      isLoadingEarlier: false,
      page: 1,
      limit: 20,
      appState: AppState.currentState,
      isblockChat: false,
      userBlocked: "",
      socketError: false,
    };
  }
  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };
  showMenu = () => {
    console.log("block-------", this.state.isblockChat);

    this._menu.show();
  };
  hideMenu = () => {
    // const { navigation } = this.props;
    // navigation.navigate('Files')
    this._menu.hide();
  };

  async componentDidMount() {
    // const msg = {
    //   userId: this.props.route.params.userId,
    //   friendId: this.props.route.params.friendId,
    // };
    // console.log("user_connection----------", msg);
    // socket.emit("user_connection", msg);
    this.setState({
      isblockChat: this.props.route.params.isBlock,
    });
    this.setNavigationHeaderConfiguration();
    this.getFriendData();

    const socketData = {
      userId: this.props.route.params.userId,
      friendId: this.props.route.params.friendId,
      type:"chat"
    };

    console.log("================hdshhshfdhfhdhfhdhfdhfdhfhdh", socketData);
    // alert("connected")
    socket.emit("user_connection", socketData);
    console.log("tapped called");
    socket.on("user_connected", (socketData) => {
      console.log("socket new data------=============", socketData);
    });
    this.socketData();

    this.focusListener = this.props.navigation.addListener("focus", () => {
      // your logic will go here
      // console.log("class version",socket);
    });
  }

  // componentWillMount() {
  //   this.setState({
  //     messages: [],
  //     userId: this.props.route.params.userId,
  //   });
  // }
  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }))
  // }

  onSend = async (messages) => {
    const msg = {
      message: messages[0].text,
      userId: this.props.route.params.userId,
      friendId: this.props.route.params.friendId,
    };
    console.log("message----------", msg);
    socket.emit("message", msg);

    const obj = {
      _id: messages[0]._id,
      // text: myData.data.message,
      // createdAt: myData.data.createdAt,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
      user: {
        _id: messages[0]._id,
        // name: msg.from.firstName + ' ' + msg.from.lastName,
        userId: this.props.route.params.userId,
      },
      image: "",
    };
    console.log("final ", obj);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, obj),
    }));
  };

  setNavigationHeaderConfiguration = () => {
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View>
          <CustomText />
        </View>
      ),

      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <BackIcon
              style={{
                height: 20,
                width: 20,
                marginLeft: scale(15),
                marginRight: scale(15),
              }}
            />
          </TouchableOpacity>
          <Image
            style={styles.profileImages}
            source={{
              uri: `${URLConstants.PROFILE_IMAGE_URL}${this.props.route.params.imageName}`,
            }}
          />
          <CustomText
            style={styles.nameText}
            item={this.props.route.params.name}
          />
        </View>
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => this.showMenu()}
          hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        >
          <MoreIcon style={{ height: 20, width: 20, marginRight: scale(15) }} />
        </TouchableOpacity>
      ),
    });
  };

  getFriendData = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        var dataToSend = {
          userId: this.props.route.params.userId,
          friendId: this.props.route.params.friendId,
          page: this.state.page,
          limit: this.state.limit,
        };
        // console.log("hello",dataToSend)
        axios({
          method: "post",
          url: URLConstants.CHAT_BY_FRIEND_LIST,
          data: dataToSend,
          headers: {
            Token: value,
          },
        })
          .then((response) => {
            // this.setState({ loading: false, friendData: response.data.data });

            if (response.data.status === 200) {
              var arrMsg = [];
              // console.log("jel messages ------", response.data.data);
              var myArray = response.data.data;
              // console.log("myarray length",myArray[0])
              for (let i = 0; i < myArray.length; i++) {
                // console.log("jel messages hello",myArray[i].message);
                //debugger

                // var id = data.From._id

                // if (data.To.id == UserID) {
                //     id = this.state.userID
                // }

                const obj = {
                  _id: myArray[i]._id,
                  text: myArray[i].message,
                  createdAt: myArray[i].createdAt,
                  user: {
                    _id: myArray[i]._id,
                    userId: myArray[i].user._id,
                  },
                  image: myArray[i].thumbnail,
                };
                arrMsg.push(obj);
              }

              var newArray = [];
              this.setState((previousState) => ({
                tempArray: GiftedChat.append(arrMsg, previousState.messages),
              }));

              this.state.tempArray.forEach((obj) => {
                if (!newArray.some((o) => o.user._id === obj.user._id)) {
                  newArray.push({ ...obj });
                }
              });

              this.setState((previousState) => ({
                loading: false,
                messages: newArray,
              }));
            } else {
              //  console.log('message=    456=======')
              this.setState({ loading: false });
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error.response, "error=========");
            this.setState({ loading: false });
            alert(error.response.data.message);
            // alert(error.response);
          });
      });
    });
  };

  deleteFriendData = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        "Alert",
        "Are you sure you want to Clear Chat data?",
        [
          {
            text: "No",
            onPress: () => this.hideMenu(),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              this.setState({ loading: true });
              this.hideMenu();

              AsyncStorage.getItem("USER_TOKEN").then((value) => {
                AsyncStorage.getItem("USER_ID").then((userID) => {
                  var dataToSend = {
                    userId: this.props.route.params.userId,
                    friendId: this.props.route.params.friendId,
                  };
                  // console.log("hello",dataToSend)
                  axios({
                    method: "delete",
                    url: URLConstants.DELETE_CHAT_BY_FRIEND,
                    data: dataToSend,
                    headers: {
                      Token: value,
                    },
                  })
                    .then((response) => {
                      this.setState({
                        loading: false,
                        messages: [],
                        friendData: [],
                      });

                      if (response.data.status === 200) {
                        alert(response.data.message);
                      }
                    })
                    .catch((error) => {
                      console.log(error.response, "error=========");
                      this.setState({ loading: false });
                      alert(error.response.data.message);
                      // alert(error.response);
                    });
                });
              });
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    } else {
      return false;
    }
  };
  blockFriendData = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        "Alert",
        `Are you sure you want to Block?`,
        [
          {
            text: "No",
            onPress: () => this.hideMenu(),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              this.hideMenu();
              AsyncStorage.getItem("USER_TOKEN").then((value) => {
                AsyncStorage.getItem("USER_ID").then((userID) => {
                  this.setState({ loading: true });
                  var dataToSend = {
                    userId: userID,
                    blockingUserId: this.props.route.params.friendId,
                  };
                  console.log("hello", dataToSend, URLConstants.USER_BLOCK);
                  axios({
                    method: "post",
                    url: URLConstants.USER_BLOCK,
                    data: dataToSend,
                    headers: {
                      Token: value,
                    },
                  })
                    .then((response) => {
                      console.log(response, "================");
                      this.setState({
                        loading: false,
                        messages: [],
                        friendData: [],
                        isblockChat: true,
                      });

                      if (response.data.status === 200) {
                        // alert(response.data.message);
                        this.props.navigation.goBack();
                      }
                    })
                    .catch((error) => {
                      console.log(error.response, "error=========");
                      this.setState({ loading: false });
                      alert(error.response.data.message);
                      // alert(error.response);
                    });
                });
              });
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    } else {
      return false;
    }
  };

  unblockFriendData = () => {
    this.hideMenu();
    this.setState({ loading: true });
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userID) => {
        var dataToSend = {
          userId: this.props.route.params.userId,
          unBlockingUserId: this.props.route.params.friendId,
        };
        // console.log("hello",dataToSend)
        axios({
          method: "post",
          url: URLConstants.UNBLOCK_FRIEND,
          data: dataToSend,
          headers: {
            Token: value,
          },
        })
          .then((response) => {
            this.setState({
              loading: false,
              messages: [],
              friendData: [],
              isblockChat: false,
            });

            if (response.data.status === 200) {
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error.response, "error=========");
            this.setState({ loading: false });
            alert(error.response.data.message);
            // alert(error.response);
          });
      });
    });
  };

  handleLoadMore = async () => {
    // console.log("hello")
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.getFriendData();
      }
    );
  };

  //  socketConnectionData = () => {
  //   socket.on('user_connected', (data) => {
  //     console.log(data)
  //     });

  // };
  socketData = () => {
    console.log("122222================hdshhshfdhfhdhfhdhfdhfdhfhdh");

    socket.on("new_message", (msg) => {
      console.log("new_message==========================", msg);
      console.log("new_message==========================", msg.data, msg.image);

      var arrMsg = [];
      if (
        msg.data.friend == this.props.route.params.userId &&
        msg.data.user == this.props.route.params.friendId
      ) {
        // console.log("friendo",msg.data.friend)

        const obj = {
          _id: msg.data.id,
          // text: myData.data.message,
          // createdAt: myData.data.createdAt,
          text: msg.data.message,
          createdAt: msg.data.createdAt,
          user: {
            _id: msg.data.id,
            userId: msg.data.user,

            // name: msg.from.firstName + ' ' + msg.from.lastName,
            // fromUserId: msg.from.id,
          },
          image: msg.data.thumbnail,
        };
        arrMsg.push(obj);
        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, obj),
        // }))
        var newArray = [];
        console.log("obj", obj);
        this.setState((previousState) => ({
          tempSocketArray: GiftedChat.append(previousState.messages, arrMsg),
        }));

        this.state.tempSocketArray.forEach((obj) => {
          if (!newArray.some((o) => o.user._id === obj.user._id)) {
            newArray.push({ ...obj });
          }
        });

        this.setState((previousState) => ({
          loading: false,
          messages: newArray,
        }));
      }
    });
  };

  chatcard = (item) => {
    console.log("item", item.friend);
    return (
      <TouchableOpacity style={styles.chatContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.profileImages}
            source={{ uri: "https://picsum.photos/512" }}
          />
          <View style={styles.chatTextContainer}>
            <View style={styles.chatNameContainer}>
              <CustomText
                item={item.friend.firstName + " " + item.friend.lastName}
                style={styles.titlestyles}
              />
              <CustomText item={"9:30AM"} style={styles.time} />
            </View>
            <CustomText
              style={styles.chatitem}
              item={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum orci.."
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderDay(props) {
    return (
      <Day
        {...props}
        textStyle={{
          color: "#222222",
          fontFamily: Fonts.type.JostRegular,
          fontSize: scale(15),
          padding: 10,
          borderWidth: 1,
          borderColor: "#D5D5D5",
          borderRadius: 5,
        }}
      />
    );
  }
  renderBubble(props) {
    var message_sender_id = props.currentMessage.user.userId;
    var userId = this.props.route.params.userId;
    return (
      <Bubble
        {...props}
        position={userId === message_sender_id ? "right" : "left"}
        timeTextStyle={{
          left: {
            color: "#757575",
            fontFamily: Fonts.type.JostRegular,
            fontSize: scale(12),
          },
          right: {
            color: "#FFFFFF",
            fontFamily: Fonts.type.JostRegular,
            fontSize: scale(12),
          },
        }}
        wrapperStyle={{
          left: {
            marginLeft: 10,
            marginVertical: 10,
            width: Dimensions.get("window").width - 75,
            backgroundColor: "white",
            padding: 5,
            color: "#333333",
            fontFamily: Fonts.type.JostRegular,
            fontSize: scale(14),
            borderWidth: 1,
            borderColor: "#AEAEAE",
            borderRadius: 5,
          },
          right: {
            marginRight: 25,
            marginVertical: 10,
            width: Dimensions.get("window").width - 80,
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            minHeight: 20,
            color: "#FFFFFF",
            borderColor: "#ED3751",
            backgroundColor: "#ED3751",
            fontFamily: Fonts.type.JostRegular,
            fontSize: scale(14),
          },
        }}
      />
    );
  }
  isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToTop = 0;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  }
  renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{ marginRight: 20 }}>
          <SendIcon
            style={{ width: 25, height: 27, marginBottom: 6 }}
            resizeMode={"center"}
          />
        </View>
      </Send>
    );
  }
  getDateData = (data) => {
    Moment.locale("en");
    var dateValue = Moment(data).format("DD MMMM YYYY");
    return dateValue;
  };
  getTimeData = (data) => {
    Moment.locale("en");
    var timeValue = Moment(data).format("HHmm");
    return timeValue;
  };
  renderCustomView(props) {
    console.log("hello", props);
    return (
      <View style={{ width: Dimensions.get("window").width, minHeight: 40 }}>
        {/* 
        <View style={styles.viewTime}>
          <Text style={[styles.titleTime]}>{this.getDateData(props.currentMessage.chatDate)}</Text>

        </View> */}
        {/* {props.currentMessage.user.fromUserId === this.state.userId ? */}
        {props.currentMessage.user._id === 2 ? (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ marginTop: 0, marginHorizontal: 0 }}>
              <View style={{}}>
                {/* <Text style={[styles.messageAdminText]}>{props.currentMessage.chatText}</Text> */}
                <CustomText
                  style={[styles.messageAdminText]}
                  item={
                    "Friend User name is for testing data and another data to be checked"
                  }
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* <Text style={styles.userName}>{props.currentMessage.user.name}</Text> */}
            <View style={{ marginTop: 0, marginHorizontal: 0 }}>
              <View style={{}}>
                {/* <Text style={[styles.messageText]}>{props.currentMessage.chatText}</Text> */}
                <CustomText
                  style={[styles.messageText]}
                  item={
                    "Login User name is for testing data and another data to be checked"
                  }
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }

  onPressHashtag = (item) => {
    // alert("press");
    console.log(item, "=======this.state.messages");
    const lastSegment = item.split("/").pop();
    console.log(lastSegment.length, "===");
    if (lastSegment.length > 20) {
      this.props.navigation.navigate("SharedDebates", {
        debateid: lastSegment,
      });
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View
          style={{ alignSelf: "flex-end", marginTop: -10, marginRight: 20 }}
        >
          <Menu
            style={{
              borderColor: "white",
              color: "#555555",
              borderWidth: 1,
              borderRadius: 5,
              width: 85,
            }}
            ref={this.setMenuRef}
          >
            {/* {this.state.isblockChat === true ? (
              <MenuItem onPress={this.unblockFriendData}>
                <Text style={styles.menuTextTitle}>UnBlock</Text>{" "}
              </MenuItem>
            ) : (
              <MenuItem
                style={{ height: 40, width: 100 }}
                onPress={this.blockFriendData}
              >
                <Text style={styles.menuTextTitle}>Block</Text>{" "}
              </MenuItem>
            )} */}

            <MenuItem
              style={{ height: 40, width: 100 }}
              onPress={this.blockFriendData}
            >
              <Text style={styles.menuTextTitle}>Block</Text>{" "}
            </MenuItem>

            <MenuItem
              style={{ height: 40, width: 100 }}
              onPress={this.deleteFriendData}
            >
              <Text style={styles.menuTextTitle}>Clear Chat</Text>
            </MenuItem>

            <MenuDivider />
          </Menu>
        </View>
        <GiftedChat
          placeholder={"Type a message"}
          placeholderTextColor={colors.namecolor_333333}
          textInputStyle={styles.chatItem}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderInputToolbar={this.props.route.params.isDeleted ? ()=>{ return null }:  this.renderInputToolbar}
          renderSend={this.renderSend}
          renderBubble={this.renderBubble.bind(this)}
          renderDay={this.renderDay}
          parsePatterns={(linkStyle) => [
            {
              type: "url",
              style: linkStyle,
              onPress: this.onPressHashtag,
            },
            // {
            //   typoe: "image",
            //   style: { ...linkStyle },
            //   onPress: this.onPressHashtag1,
            // },
          ]}
          //  renderTime={this.renderTime.bind(this)}
          // renderDay={this.renderDay.bind(this)}
          // renderCustomView={this.renderCustomView.bind(this)}
          renderAvatar={() => null}
          showUserAvatar
          // loadEarlier={true} // this was missing
          // onLoadEarlier={this.handleLoadMore}
          // isLoadingEarlier={this.state.isLoadingEarlier}

          listViewProps={{
            scrollEventThrottle: 400,
            onScroll: ({ nativeEvent }) => {
              if (this.isCloseToTop(nativeEvent)) {
                this.handleLoadMore();
              }
            },
          }}
          // listViewProps={{
          //   onEndReached: this.handleLoadMore,
          //   onEndReachedThreshold: 0.8,
          // }}
          user={{
            _id: 1,
          }}
        />
        <Loader loading={this.state.loading} />
      </View>
    );
  }
}

export default ChatDetails;
