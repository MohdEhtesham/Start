import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Featuregrid from "../../../components/Featuregrid";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Loader from "../../../components/Loader";
import DefaultProfileImage from "../../../components/DefaultProfileImage";
import scale, { verticalScale } from "../../../themes/Metrics";
import { Strings as strings } from "../../../utils/Strings";
import NetInfo from "@react-native-community/netinfo";
import styles from "./FeatureStyles";
import { CustomText } from "../../../components/CustomText";
import { NoDataFound } from "../../../components/NoDataFound";
import colors from "../../../themes/Colors";
class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      skip: 0,
      loadmoredata: true,
      refreshing: false,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.allfeatures();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  allfeatures = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      AsyncStorage.getItem("USER_ID").then((userId) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              skip: this.state.skip,
              limit: 27,
              userId: userId,
            };
            this.setState({ loading: true });
            // this.setState({ refreshing: true });
            let urlFinal = URLConstants.GETALL_FEATURES;
            console.log(urlFinal, dataToSend, "==url");
            axios({
              method: "post",
              url: urlFinal,
              headers: {
                Token: value,
              },
              data: dataToSend,
            })
              .then((response) => {
                this.setState({ refreshing: false });
                console.log(
                  response,
                  this.state.skip,
                  "==============response================="
                );
                // console.log(response.data);
                setTimeout(() => {
                  response.data.data.length <= 26
                    ? this.setState({ loadmoredata: false })
                    : this.setState({ loadmoredata: true });
                  let s = response.data.data;
                  let templist = [];
                  if (s.length < 9) {
                    // templist.push({...s})
                    console.log("less", "data");
                    templist.push([...s.slice(0, 9)]);
                  } else {
                    console.log("less", "data");
                    let num = 9; // change number here
                    for (let i = 0; i <= s.length; i += num) {
                      if (s.slice(i, i + num).length > 1)
                        templist.push([...s.slice(i, i + num)]);
                    }
                  }
                  console.log(templist, "+++++++++++++===================");
                  // this.setState({
                  //   getAlldata:
                  //     this.state.perpage === 1
                  //       ? response.data.data
                  //       : [...this.state.getAlldata, ...response.data.data],
                  // });
                  // this.setState({ data: templist });
                  this.setState({
                    loading: false,
                    data:
                      this.state.skip == 0
                        ? templist
                        : [...this.state.data, ...templist],
                  });
                }, 2000);
                // this.setState({
                //   getAlldata:
                //     this.state.perpage === 1
                //       ? response.data.data
                //       : [...this.state.getAlldata, ...response.data.data],
                // });
                // this.setState({ getAlldata: response.data.data });
                console.log(
                  this.state.data,
                  this.state.skip,
                  "==============data===this.state.skip"
                );
                // this.setState({ skip: response.data.data.length + 1 });
              })
              .catch((error) => {
                console.log(error.response, "==============response====");
                this.setState({
                  loading: false,
                  spinner: false,
                  refreshing: false,
                });
                if (error.response.status == 401) {
                  AsyncStorage.clear().then(() => {
                    this.props.navigation.reset({
                      index: 0,
                      routes: [{ name: "AuthNavigator" }],
                    });
                  });
                  alert("Your session has been expired");
                } else if (
                  error.response.status == 400 ||
                  error.response.status == 404
                ) {
                  this.setState({
                    spinner: false,
                    refreshing: false,
                    loading: false,
                  });
                  alert(error.response.data.message);
                } else {
                  this.setState({
                    spinner: false,
                    refreshing: false,
                    loading: false,
                  });
                  alert("Something went worng");
                }
              });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  // navigateToDeabtes = (data) => {
  //   console.log(data);
  // };

  // test37(index) {
  //   if (index % 7 == 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  navigatetoFeatureDebates = (item) => {
    console.log(item, "===================");
    this.props.navigation.navigate("FeatureDebates", {
      debateIndex: item.debateIndex,
    });
  };
  gredPattern = (item, index) => {
    // console.log(item, index, "=========");
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <>
            {item[0] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[0])}
                style={{
                  // height: 150,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(87),
                    width: scale(60),
                    flex: 1,
                    alignItems: "center",
                  }}
                  uri={
                    item[0]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[0].creator.profilePic}`
                      : "1551"
                  }
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(87),
                    width: scale(60),
                    marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[0]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[0].joiner.profilePic}`
                      : "1551"
                  }
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // height: 150,
                  flex: 1,
                  height: scale(87),
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // backgroundColor: "red",
                  // alignItems: "center",
                }}
              ></View>
            )}
          </>
          <>
            {item[1] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[1])}
                style={{
                  // height: 150,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(87),
                    width: scale(60),
                    flex: 1,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[1]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[1].creator.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/3"}
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(87),
                    width: scale(60),
                    marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[1]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[1].joiner.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/566"}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // height: 150,
                  height: scale(87),
                  // backgroundColor: "red",
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              ></View>
            )}
          </>
          <>
            {item[2] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[2])}
                style={{
                  // height: 150,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(87),
                    width: scale(60),
                    flex: 1,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[2]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[2].creator.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/537"}
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(87),
                    width: scale(60),
                    // marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  uri={
                    item[2]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[2].joiner.profilePic}`
                      : "1551"
                  }

                  // uri={"https://picsum.photos/513"}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // height: 150,
                  height: scale(87),
                  // backgroundColor: "red",
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              ></View>
            )}
          </>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <>
            {item[3] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[3])}
                style={{
                  // height: 150,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(87),
                    width: scale(60),
                    flex: 1,
                    alignItems: "center",
                  }}
                  uri={
                    item[3]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[3].creator.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/53"}
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(87),
                    width: scale(60),
                    marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[3]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[3].joiner.profilePic}`
                      : "1551"
                  }

                  // uri={"https://picsum.photos/54"}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // height: 150,
                  flex: 1,
                  height: scale(87),
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // backgroundColor: "red",
                  // alignItems: "center",
                }}
              ></View>
            )}
          </>
          <>
            {item[4] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[4])}
                style={{
                  // height: 150,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(87),
                    width: scale(60),
                    flex: 1,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[4]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[4].creator.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/3"}
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(87),
                    width: scale(60),
                    marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[4]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[4].joiner.profilePic}`
                      : "1551"
                  }

                  // uri={"https://picsum.photos/566"}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // height: 150,
                  height: scale(87),
                  // backgroundColor: "red",
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              ></View>
            )}
          </>
          <>
            {item[5] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[5])}
                style={{
                  // height: 150,
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // alignItems: "center",
                }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(87),
                    width: scale(60),
                    flex: 1,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[5]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[5].creator.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/537"}
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(87),
                    width: scale(60),
                    // marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  uri={
                    item[5]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[5].joiner.profilePic}`
                      : "1551"
                  }

                  // uri={"https://picsum.photos/513"}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  // height: 150,
                  height: scale(87),
                  flex: 1,
                  flexDirection: "row",
                  marginBottom: 2,
                  marginEnd: 2,
                  // backgroundColor: "red",
                  // alignItems: "center",
                }}
              ></View>
            )}
          </>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <>
            {item[6] ? (
              <TouchableOpacity
                onPress={() => this.navigatetoFeatureDebates(item[6])}
                style={{ flex: 2, flexDirection: "row" }}
              >
                <DefaultProfileImage
                  style={{
                    height: scale(178),
                    width: scale(125),
                    flex: 1,
                    alignItems: "center",
                  }}
                  // uri={"m"}
                  uri={
                    item[6]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[6].creator.profilePic}`
                      : "1551"
                  }
                  // uri={"https://picsum.photos/521"}
                />
                <DefaultProfileImage
                  style={{
                    flex: 1,
                    height: scale(178),
                    width: scale(125),
                    marginEnd: 2,
                    marginBottom: 2,
                    alignItems: "center",
                  }}
                  uri={
                    item[6]
                      ? `${URLConstants.PROFILE_IMAGE_URL}${item[6].joiner.profilePic}`
                      : "1551"
                  }
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: scale(178),
                  // backgroundColor: "red",
                  flex: 2,
                  flexDirection: "row",
                }}
              ></View>
            )}
          </>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <>
              {item[7] ? (
                <TouchableOpacity
                  onPress={() => this.navigatetoFeatureDebates(item[7])}
                  style={{
                    // height: 150,
                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 2,
                    marginEnd: 2,
                    // alignItems: "center",
                  }}
                >
                  <DefaultProfileImage
                    style={{
                      height: scale(87),
                      width: scale(60),
                      flex: 1,
                      alignItems: "center",
                    }}
                    // uri={"m"}
                    uri={
                      item[7]
                        ? `${URLConstants.PROFILE_IMAGE_URL}${item[7].creator.profilePic}`
                        : "1551"
                    }
                    // uri={"https://picsum.photos/537"}
                  />
                  <DefaultProfileImage
                    style={{
                      flex: 1,
                      height: scale(87),
                      width: scale(60),
                      // marginEnd: 2,
                      marginBottom: 2,
                      alignItems: "center",
                    }}
                    // uri={"https://picsum.photos/513"}
                    uri={
                      item[7]
                        ? `${URLConstants.PROFILE_IMAGE_URL}${item[7].joiner.profilePic}`
                        : "1551"
                    }
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    height: scale(87),

                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 2,
                    marginEnd: 2,
                    // backgroundColor: "red",
                    // alignItems: "center",
                  }}
                ></View>
              )}
            </>
            <>
              {item[8] ? (
                <TouchableOpacity
                  onPress={() => this.navigatetoFeatureDebates(item[8])}
                  style={{
                    // height: 150,
                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 2,
                    marginEnd: 2,
                    // alignItems: "center",
                  }}
                >
                  <DefaultProfileImage
                    style={{
                      height: scale(87),
                      width: scale(60),
                      flex: 1,
                      alignItems: "center",
                    }}
                    // uri={"m"}
                    uri={
                      item[8]
                        ? `${URLConstants.PROFILE_IMAGE_URL}${item[8].creator.profilePic}`
                        : "1551"
                    }
                    // uri={"https://picsum.photos/537"}
                  />
                  <DefaultProfileImage
                    style={{
                      flex: 1,
                      height: scale(87),
                      width: scale(60),
                      // marginEnd: 2,
                      marginBottom: 2,
                      alignItems: "center",
                    }}
                    uri={
                      item[8]
                        ? `${URLConstants.PROFILE_IMAGE_URL}${item[8].joiner.profilePic}`
                        : "1551"
                    }

                    // uri={"https://picsum.photos/513"}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 2,
                    marginEnd: 2,
                    height: scale(87),

                    // backgroundColor: "red",
                    // alignItems: "center",
                  }}
                ></View>
              )}
            </>
          </View>
        </View>
      </View>
    );
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  handleRefresh = () => {
    this.setState({ refreshing: false, skip: 0 }, () => {
      this.allfeatures();
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        skip: this.state.skip + 27,
      },
      () => {
        console.log(this.state.skip, "======this.state.skip");
        this.allfeatures();
      }
    );
  };

  renderFooter = () => {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ flex: 1 }}>
          {/* <Loader loading={this.state.loading} /> */}
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => this.gredPattern(item, index)}
            ListEmptyComponent={
              this.state.data.length == 0 ? this.ListEmpty : null
            }
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={0.3}
            onEndReached={
              this.state.loadmoredata && !this.state.loading
                ? this.handleLoadMore
                : null
            }
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Feature;
