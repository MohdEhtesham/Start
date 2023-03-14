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
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import styles from "./RankingStyles";
import { CustomText } from "../../../components/CustomText";
import scale, { verticalScale } from "../../../themes/Metrics";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Loader from "../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../../utils/Strings";
import Loader from "../../../components/Loader";
import DefaultProfileImage from "../../../components/DefaultProfileImage";
import { NoDataFound } from "../../../components/NoDataFound";
import colors from "../../../themes/Colors";
class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      perpage: 1,
      RefreshFlatList: false,
      refreshing: false,
      moreloading: true,
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.allTopDebaters();
    });
  }

  async componentWillUnmount() {
    this.unsubscribe.remove();
  }

  allTopDebaters = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState({ loading: true });
          // this.setState({ refreshing: true });
          console.log(
            URLConstants.ALL_TOP_DEBATERS,
            this.state.perpage,
            "=====url"
          );
          axios
            .get(
              URLConstants.ALL_TOP_DEBATERS +
                "?page=" +
                this.state.perpage +
                "&limit=" +
                12,
              {
                headers: {
                  Token: value,
                },
              }
            )
            .then((response) => {
              console.log(response.data.data, "==============ALL_TOP_DEBATERS");
              response.data.data.length <= 11
                ? this.setState({ moreloading: false })
                : this.setState({ moreloading: true });
              this.setState({
                data:
                  this.state.perpage == 1
                    ? response.data.data
                    : [...this.state.data, ...response.data.data],
              });
              console.log(this.state.data, "==============ALL_TOP_DEBATERS");

              this.setState({ loading: false });
              this.setState({ refreshing: false });
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
  };

  userProfileScreenNavigation = (item, index) => {
    AsyncStorage.getItem("USER_ID").then((userid) => {
      console.log(item, userid, "==============");
      item._id == userid
        ? this.props.navigation.navigate("MyProfile", {
            data: item,
            index: index,
          })
        : this.props.navigation.navigate("OtherUserProfile", {
            data: item,
            index: index,
          });
    });
  };

  renderitems = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.cardConatiner}
        onPress={() => this.userProfileScreenNavigation(item, index)}
      >
        <CustomText style={styles.numberstyle} item={`${index}.`} />
        <View style={styles.verticleLine} />
        <DefaultProfileImage
          uri={`${URLConstants.PROFILE_IMAGE_URL}${item.profilePic}`}
          style={styles.imagesstyle}
        />
        {/* <Image
          style={styles.imagesstyle}
          source={{ uri: `https://picsum.photos/${item.key}` }}
        /> */}
        <View style={{ alignSelf: "center" }}>
          <View style={{ width: scale(200) }}>
            <CustomText
              style={styles.namestyle}
              numberOfLines={1}
              item={`${item.firstName} ${item.lastName}`}
            />
          </View>
          <CustomText
            style={styles.textstyle}
            item={`Win: ${item.win} | Loss: ${item.loss}`}
          />
        </View>
      </TouchableOpacity>
    );
  };

  ListEmpty = () => {
    return <NoDataFound />;
  };

  handleRefresh = () => {
    this.setState({ refreshing: false, perpage: 1 }, () => {
      this.allTopDebaters();
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        perpage: this.state.perpage + 1,
      },
      () => this.allTopDebaters()
    );
  };

  renderFooter = () => {
    return (
      <View style={{ marginBottom: verticalScale(20) }}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View>
          {/* <Loader loading={this.state.loading} /> */}
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => this.renderitems(item, index + 1)}
            indicatorStyle={"white"}
            showsVerticalScrollIndicator={true}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReachedThreshold={0.3}
            onEndReached={
              this.state.moreloading && !this.state.loading
                ? this.handleLoadMore
                : null
            }
            ListEmptyComponent={this.ListEmpty}
            ListEmptyComponent={
              this.state.data.length == 0 ? this.ListEmpty : null
            }
            ListFooterComponent={this.renderFooter}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Ranking;
