/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import HandleBack from "../components/HandleBack";
import RNTesseractOcr from "react-native-tesseract-ocr";
import { View,StyleSheet,TouchableOpacity,Text } from "react-native";

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
  quality: 0.5, base64: true
};
const tessOptions = {
  whitelist: null,
  blacklist: null
};

export default class Camera extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: []
  };

  render() {
    return (
      <HandleBack>
        <View style={{ flex: 1 }}>
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
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
              <Text style={styles.buttonText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      </HandleBack>
    );
  }

  takePicture = async () => {
    this.setState({
      loading: true
    });
    if (this.camera) {
      const data = await this.camera.takePictureAsync(PICTURE_OPTIONS);
      try {
        if (!data.uri) {
          throw "OTHER";
        }
        this.setState(
          {
            image: data.uri
          },
          () => {
            console.log(data.uri);
            alert(data.uri);
            //this.processImageMagic(data.uri);
          }
        );
      } catch (e) {
        console.warn(e);
        this.reset(e);
      }
    }
  };

  reset(error = "OTHER") {
    this.setState(
      {
        loading: false,
        image: null,
        error
      },
      () => {
        // setTimeout(() => this.camera.startPreview(), 500);
      }
    );
  }

  processImageMagic = async uri => {
    RNTesseractOcr.recognize(uri, "LANG_CUSTOM", tessOptions)
      .then(result => {
        this.setState({
          isLoading: false,
          extractedText: result
        });
      })
      .catch(err => {
        this.setState({
          hasErrored: true,
          errorMessage: err.message
        });
        throw "FAILED TO DETECT";
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  buttonText: {
    fontSize: 14
  }
});
