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
  ScrollView,
  SafeAreaView,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import styles from "./ChangeCatgeoryStyles";
import { CustomText } from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import CheckIcon from "../../images/svg/onborarding/check.svg";
//import StartTheDebate from '../../../images/svg/joins-start/start.svg';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { URLConstants } from "../../utils/URLConstants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/Loader";
import NetInfo from "@react-native-community/netinfo";
import { Strings as strings } from "../../utils/Strings";
import colors from "../../themes/Colors";
class ChangeCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: "",
      RefreshFlatList: false,
      SportsCategoryData: [],
      loading: false,
      cat_array_Id: [],
      refreshing: false,
      perpage: 1,
    };
  }

  handleRefresh = () => {
    this.setState({ refreshing: false, perpage: 1 }, () => {
      this.allCategory();
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        perpage: this.state.perpage + 1,
      },
      () => this.allCategory()
    );
  };

  async componentDidMount() {
    const { cat_array_Id } = this.state;
    var Catdata = this.props.route.params.selectedCategory;
    console.log(Catdata, "=======================catdata");
    Catdata.forEach((element) => {
      cat_array_Id.push(element.category._id);
    });
    console.log(
      this.state.cat_array_Id,
      "============================cat_array_Id"
    );
    this.allCategory();
  }

  allCategory = () => {
    AsyncStorage.getItem("USER_TOKEN").then((value) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState({ loading: true });
          this.setState({ refreshing: true });
          axios
            .get(
              URLConstants.GET_ALL_CATEGORY +
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
              this.setState({ loading: false });
              this.setState({ refreshing: false });
              this.setState({
                SportsCategoryData:
                  this.state.perpage === 1
                    ? response.data.data
                    : [...this.state.SportsCategoryData, ...response.data.data],
              });

              console.log(
                this.state.SportsCategoryData,
                "==============SportsCategoryData"
              );
            });
        } else {
          // Ideally load from local storage
          alert(strings.Please_check_Internet);
        }
      });
    });
  };

  onCategoryPress = (data) => {
    const newList = [...this.state.cat_array_Id];
    const itemIndex = newList.findIndex((item) => item === data._id);
    if (itemIndex > -1) {
      newList.splice(itemIndex, 1);
    } else {
      newList.push(data._id);
    }
    console.log(newList, "==========newlist");
    this.setState({ cat_array_Id: newList });
    this.addUserCategory(newList);
  };

  categoryValidation = () => {
    return this.state.cat_array_Id.length === 0
      ? alert("Please select at least one Category")
      : true;
  };

  addUserCategory = (newList) => {
    // debugger;
    console.log(this.props);
    let userId = AsyncStorage.getItem("USER_ID");
    console.log(userId, "==================userId");
    // let UserID = this.props.route.params.UserID;
    // console.log(UserId, "UserIDUserIDUserIDUserIDUserID");
    console.log(newList, "cat_array================");
    AsyncStorage.getItem("USER_ID").then((value) => {
      var dataToSend = {
        userId: value,
        category: newList,
      };
      console.log(URLConstants.ADD_USER_CATEGORY, dataToSend, "==============");
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          this.setState({ loading: true });
          axios({
            method: "post",
            url: URLConstants.ADD_USER_CATEGORY,
            data: dataToSend,
          })
            .then((response) => {
              this.setState({ loading: false });
              if (response.data.status == 200) {
                AsyncStorage.setItem("CATEGORY_ADDED", "true");
              }
              // handle success
              console.log(response, "=========responece");
              // alert(JSON.stringify(response));
            })
            .catch((error) => {
              console.log(error, "error=========");
              this.setState({ loading: false });
              alert(error.response.data.message);
              // alert(error.response);
            });
        } else {
          // Ideally load from local storage
          alert(strings.Please_check_Internet);
        }
      });
    });
  };

  renderCardData = (item) => {
    return (
      <TouchableOpacity
        style={styles.cardConatiner}
        onPress={() => this.onCategoryPress(item)}
      >
        {this.state.cat_array_Id.map((data) => {
          return (
            <View>
              {data === item._id ? (
                <CheckIcon style={styles.checkIocn} />
              ) : (
                <View />
              )}
            </View>
          );
        })}

        <Image
          source={{
            uri: `${URLConstants.IMAGE_URL}${item.image}`,
          }}
          style={styles.imagesstyle}
        />
        <CustomText item={item.name} style={styles.categoryTitle} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Loader loading={this.state.loading} />
          <FlatList
            data={this.state.SportsCategoryData}
            ListHeaderComponent={() => (
              <CustomText
                item={"Please Select Your Favorite Sports Categories"}
                style={styles.titlestyle}
              />
            )}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={this.handleLoadMore}
            //style={{marginTop: 2, marginStart: 2}}
            renderItem={({ item, index }) => this.renderCardData(item)}
            numColumns={2}
            indicatorStyle={"white"}
            // extraData={this.state.RefreshFlatList}
            showsVerticalScrollIndicator={true}
            ListFooterComponent={() => (
              <View style={styles.flatlistconatiner} />
            )}
          />
          <View
            style={{
              bottom: Platform.OS === "ios" ? 20 : 0,
              position: "absolute",
            }}
          >
            <CustomButton
              title={"Continue"}
              onPress={() =>
                this.categoryValidation() &&
                this.props.navigation.navigate("MyProfile")
              }
              buttonStyles={styles.butttonStyles}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default ChangeCategory;
