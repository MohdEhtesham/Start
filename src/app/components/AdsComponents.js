import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,

} from "react-native";
import {
  TestIds,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from "@react-native-firebase/admob";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-6649447227642695/9472327070";


// const adUnitId = TestIds.BANNER;
class AdsComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showInterstitialAd = () => {
    // Create a new instance
    const interstitialAd = InterstitialAd.createForAdRequest(
      TestIds.INTERSTITIAL
    );
    // Add event handlers
    interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
        interstitialAd.show();
      }
    });

    // Load a new advert
    interstitialAd.load();
  };

  showRewardAd = () => {
    // Create a new instance
    const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
    // Add event handlers
    rewardAd.onAdEvent((type, error) => {
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log("User earned reward of 5 lives");
        Alert.alert(
          "Reward Ad",
          "You just earned a reward of 5 lives",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      }
    });
    // Load a new advert
    rewardAd.load();
  };

  render() {
    return (
      <View
        style={{
          marginTop: 10,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <BannerAd
          // unitId={adUnitId}
          unitId= {Platform.OS === "android"? "ca-app-pub-6649447227642695/9472327070":"ca-app-pub-6649447227642695/5687691391"}

          //   size={BannerAdSize.SMART_BANNER}
          size="345x288"
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => console.log("Advert loaded")}
          onAdFailedToLoad={(error) => {
            console.error("Advert failed to load: ", error);
          }}
        />
      </View>
    );
  }
}

export default AdsComponents;
