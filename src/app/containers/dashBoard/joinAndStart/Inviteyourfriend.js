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
  Button,
  // TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import styles from "./Inviteyourfriendstyle";
import { CustomText } from "../../../components/CustomText";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Star from "../../../images/svg/notification/star.svg";
import Time from "../../../images/svg/notification/time.svg";
import CustomButton from "../../../components/CustomButton";
import colors from "../../../themes/Colors";
import Fonts from "../../../themes/Fonts";
import scale, { verticalScale } from "../../../themes/Metrics";
import images from "../../../themes/Images";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../../utils/Strings";

class Inviteyourfriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
      ruleData: [],
      modalVisible: false,
      modalVisibleRule: false,
      refreshing: false,
      perpage: 1,
      debateTime: 0,
      loading: false,
    };
  }
   componentDidMount() {
    // this.focusListener = this.props.navigation.addListener("focus", () => {
    // your logic will go here
    // console.log("hello----------",this.props.route.params.isJoinedScreen)
    this.allFriends();
    // });
  }

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.allFriends();
    });
  };

  handleLoadMore = () => {
    // this.setState(
    //   {
    //     perpage: this.state.perpage + 1,
    //   },
    //   () => this.allFriends()
    // );
  };

  allFriends = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userId) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            this.setState({ refreshing: true });
            console.log(
              "fna vfvf",
              URLConstants.GET_BY_USER_FRIEND +
                "?userId=" +
                `${userId}` +
                "page=" +
                this.state.perpage +
                "&limit=" +
                20
            );
            // console.log("fnal", value)

            axios({
              method: "get",
              url:
                URLConstants.GET_BY_USER_FRIEND +
                "?userId=" +
                `${userId}` +
                "&page=" +
                this.state.perpage +
                "&limit=" +
                10,
              headers: {
                Token: value,
              },
            }).then((response) => {
              console.log("data", response);
              this.setState({
                friendData:
                  this.state.perpage === 1
                    ? response.data.data
                    : [...this.state.friendData, ...response.data.data],
              });

              this.setState({ loading: false });
              this.setState({ refreshing: false });
            });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  debateExtendTime = () => {
    console.log("hello-------------------", this.state.debateTime);
    if (this.state.debateTime == 0) {
      alert("Please set time");
    } else {
      this.setState({ loading: true });
      AsyncStorage.getItem("USER_TOKEN").then((value) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            const time = this.state.debateTime * 10000;

            var dataToSend = {
              debateId: this.props.route.params.debateId,
              time: time,
            };
            console.log("data-------", dataToSend);
            axios({
              method: "post",
              url: URLConstants.DEBATE_EXTEND_TIME,
              data: dataToSend,

              headers: {
                Token: value,
              },
            })
              .then((response) => {
                console.log("response", response);
                this.getActiveRule();

                // this.props.navigation.navigate("SubscriptionPlan", {
                //   debateId:response.data.data.debateId,
                // });
              })
              .catch((err) => {
                console.log("erro", err.response.data.message);
                this.setState({ loading: false });
                alert(err.response.data.message);
                // alert(error.response);
              });
          }
        });
      });
    }
  };

  getActiveRule = () => {
    this.setState({ loading: true });
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          axios({
            method: "get",
            url: URLConstants.GET_ACTIVE_RULE,

            headers: {
              Token: value,
            },
          })
            .then((response) => {
              console.log("response", response);
              this.setState({
                modalVisible: false,
                modalVisibleRule: true,
                loading: false,
                ruleData: response.data.data,
              });
              // this.props.navigation.navigate("SubscriptionPlan", {
              //   debateId:response.data.data.debateId,
              // });
            })
            .catch((err) => {
              console.log("erro", err.response.data.message);
              this.setState({ loading: false });
              alert(err.response.data.message);
              // alert(error.response);
            });
        }
      });
    });
  };

  inviteFriend = (item) => {
    console.log(this.props.route.params, "========================");
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userId) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            this.setState({ loading: true });
            var dataToSend = {
              debateId: this.props.route.params.debateId,
              userId: userId,
              friendId: item.friend._id,
              question: this.props.route.params.debateQuestion,
            };
            console.log(
              "data=============================================",
              dataToSend,
              URLConstants.DEBATE_INVITE
            );
            axios({
              method: "post",
              url: URLConstants.DEBATE_INVITE,
              data: dataToSend,
              headers: {
                Token: value,
              },
            })
              .then((response) => {
                // console.log(
                //   "responsr---------=======",
                //   response.data.data.message
                // );
                this.setState({ modalVisible: false, loading: false });
                Alert.alert("Success", response.data.message);
                // this.props.navigation.navigate("SubscriptionPlan", {
                //   debateId:response.data.data.debateId,
                // });
              })
              .catch((err) => {
                //  console.log("erro",err.response.data.message);
                this.setState({ loading: false });
                alert(err.response.data.message);
                // alert(error.response);
              });
          }
        });
      });
    });
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
          onPress={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View
            style={{
              backgroundColor: colors.whiteText,
              width: scale(345),
              alignSelf: "center",
            }}
          >
            <View style={styles.headerStyles}>
              <CustomText item={"Set Debate Time"} style={styles.headerTitle} />
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  marginRight: scale(15),
                  alignSelf: "center",
                }}
                onPress={() => this.debateExtendTime()}
              >
                <Image source={images.close} style={styles.cancelstyle} />
              </TouchableOpacity>
            </View>
            <CustomText
              item={"Set Debate Time (Minutes)"}
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
                color: colors.black,
                textAlign: "left",
              }}
              placeholderTextColor={colors.textblack_555555}
              // editable
              maxLength={10}
              // numberOfLines={4}
              placeholder={""}
              //value={description}
              // onChangeText={(text) => setdescription(text)}
              onChangeText={(text) => this.setState({ debateTime: text })}
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

  renderRules = (item) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisibleRule}
        onRequestClose={() => {
          // alert("Modal has been closed.");
          this.setState({ modalVisibleRule: false });
        }}
      >
        <Pressable
          style={styles.modelBackgroud}
          onPress={() => {
            this.setState({ modalVisibleRule: false });
          }}
        >
          <View
            style={{
              backgroundColor: colors.whiteText,
              width: scale(345),
              alignSelf: "center",
            }}
          >
            <View style={styles.headerStyles}>
              <CustomText item={"Rules of Debate"} style={styles.headerTitle} />
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  marginRight: scale(15),
                  alignSelf: "center",
                }}
                onPress={() => {
                  this.setState({ modalVisibleRule: false });
                }}
              >
                <Image source={images.close} style={styles.cancelstyle} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.ruleData}
              renderItem={({ item, index }) => this.ruleItem(item, index)}
              indicatorStyle={"white"}
              showsVerticalScrollIndicator={true}
            />
            <CustomButton
              // onPress={() => addReport(item)}
              title={"Start Debate"}
              buttonStyles={{
                width: scale(114),
                height: verticalScale(44),
                marginTop: verticalScale(10),
                marginBottom: verticalScale(25),
                marginLeft: scale(15),
              }}
              onPress={() => this.props.navigation.navigate("")}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  Inviteyourfriendcard = (item) => {
    console.log("item", item);
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri: `${URLConstants.PROFILE_IMAGE_URL}${item.friend.profilePic}`,
            }}
            style={styles.profileImages}
          />
          <View style={styles.TextContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomText
                item={item.friend.firstName + " " + item.friend.lastName}
                numberOfLines={1}
                style={styles.name}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.inviteFriend(item)}
              >
                <CustomText item={"Invite"} style={styles.buttontext} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  ruleItem = (item, index) => {
    console.log("item", index);
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <CustomText
            item={index + 1 + ".  " + item.name}
            style={styles.rules}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <KeyboardAwareScrollView>
            <ScrollView style={styles.Container}>
              {this.renderDebateTimeExtend()}
              {this.renderRules()}
              <Loader loading={this.state.loading} />
              <FlatList
                data={this.state.friendData}
                renderItem={({ item, index }) =>
                  this.Inviteyourfriendcard(item)
                }
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
                onEndReachedThreshold={0.1}
                onEndReached={this.handleLoadMore}
                indicatorStyle={"white"}
                showsVerticalScrollIndicator={true}
                ItemSeparatorComponent={(item) => (
                  <View style={styles.sepration}></View>
                )}
              />
            </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default Inviteyourfriend;
