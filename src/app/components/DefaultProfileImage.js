import React, { Component } from "react";
import { Image, ImageBackground } from "react-native";
import images from "../themes/Images";

export default class DefaultProfileImage extends Component {
  state = { isLoading: false, showDefault: false };
  state = { image: { uri: this.props.uri } };

  render() {
    var image =
      this.props.uri == null
        ? images.loadingImage
        : this.props.uri == ""
        ? images.blankProfile
        : { uri: this.props.uri };

    return (
      //   <ImageBackground style={[this.props.style]} source={images.photo}>
      <Image style={this.props.style} source={image} />
      //   </ImageBackground>
    );
  }
}
