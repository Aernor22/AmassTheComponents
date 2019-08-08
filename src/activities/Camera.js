/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import RNTesseractOcr from "react-native-tesseract-ocr";
import { View } from "react-native";

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
};
const tessOptions = {
  whitelist: null,
  blacklist: null,
};

export default class Camera extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: [],
  };

  render() {
    return (
      <View>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />{" "}
      </View>
    );
  }

  reset(error = "OTHER") {
    this.setState(
      {
        loading: false,
        image: null,
        error,
      },
      () => {
        // setTimeout(() => this.camera.startPreview(), 500);
      }
    );
  }

  takePicture = async camera => {
    this.setState({
      loading: true,
    });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw "OTHER";
      }
      this.setState(
        {
          image: data.uri,
        },
        () => {
          console.log(data.uri);
          this.processImageMagic(data.uri);
        }
      );
    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };

  processImageMagic = async uri => {
    RNTesseractOcr.recognize(uri, "LANG_CUSTOM", tessOptions)
      .then(result => {
        this.setState({
          isLoading: false,
          extractedText: result,
        });
      })
      .catch(err => {
        this.setState({
          hasErrored: true,
          errorMessage: err.message,
        });
        throw "FAILED TO DETECT";
      });
  };
}
