import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Featuregrid from "../../../components/Featuregrid";
import { URLConstants } from "../../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import DefaultProfileImage from "../../../components/DefaultProfileImage";
import scale, { verticalScale } from "../../../themes/Metrics";
import { Strings as strings } from "../../../utils/Strings";
import NetInfo from "@react-native-community/netinfo";
import DebatesCard from "../../../components/DebatesCard";
import styles from "./FeatureDebatesStyles";
import { CustomText } from "../../../components/CustomText";
import { NoDataFound } from "../../../components/NoDataFound";
import colors from "../../../themes/Colors";

class FeatureDebates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      refreshing: false,
      perpage: 1,
      loadmoredata: true,
      debatesIndex: this.props.route.params.debateIndex,
    };
  }

  componentDidMount() {
    this.allfeatures();
  }

  allfeatures = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      console.log('token-->',value);
      AsyncStorage.getItem("USER_ID").then((userId) => {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            var dataToSend = {
              skip: this.state.debatesIndex,
              limit: 5,
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
            }).then((response) => {
              this.setState({ refreshing: false });
              console.log(response.data, "======data");
              // this.setState({ data: response.data.data });
              this.setState({ loading: false });
              response.data.data.length == 0
                ? this.setState({ loadmoredata: false })
                : this.setState({ loadmoredata: true });
              // console.log(this.state.data, "======data");
              this.setState({
                data:
                  this.state.debatesIndex == this.props.route.params.debateIndex
                    ? response.data.data
                    : [...this.state.data, ...response.data.data],
              });
              // this.setState({ getAlldata: response.data.data });
              console.log(this.state.data, "==============data");
            });
          } else {
            // Ideally load from local storage
            alert(strings.Please_check_Internet);
          }
        });
      });
    });
  };

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.allfeatures();
    });
  };

  handleLoadMore = () => {
    // this.allfeatures();

    this.setState(
      {
        debatesIndex: this.state.debatesIndex + 5,
      },
      () => {
        this.allfeatures();
      }
    );
  };

  likeCallBackfeature = (item) => {
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

  voteCallBackFeature = (item) => {
    // console.log(item,)
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

  renderFooter = () => {
    return (
      <View style={{ marginBottom: 30 }}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color={colors.RedHeader} />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Loader loading={this.state.loading} /> */}
        {/* <Text>FeatureDebates screen</Text> */}
        <FlatList
          data={this.state.data}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.3}
          onEndReached={
            this.state.loadmoredata && !this.state.loading
              ? this.handleLoadMore
              : null
          }
          extraData={this.state.data}
          onRefresh={() => this.handleRefresh()}
          ListEmptyComponent={this.ListEmpty}
          ListFooterComponent={this.renderFooter}
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
              likedebates={() => this.likeCallBackfeature(item)}
              votedebates={(i) => this.voteCallBackFeature(i)}
            />
          )}
          indicatorStyle={"white"}
          showsVerticalScrollIndicator={true}
        />
      </View>
    );
  }
}

export default FeatureDebates;
