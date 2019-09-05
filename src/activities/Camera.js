/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import api from "../layers/OCRLayer";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator } from "react-native";
import ModalLanguage from "../components/ModalLanguage";

export default class Camera extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    hasError: false,
    errorMessage: null,
    extractedText: null,
    loadingVisible: false,
  };

  render() {
    const { height, width } = Dimensions.get('window');
    const maskRowHeight = Math.round((height - 570) / 20);
    const maskColWidth = (width - 250) / 2;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          clearWindowBackground={true}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {this.state.loadingVisible &&
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" animating={this.state.loadingVisible} />
            </View>
          }
          <ModalLanguage style={styles.loading}/>
          <View style={styles.maskOutter}>
            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
            <View style={[{ flex: 30 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
          </View>
        </RNCamera>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture} disabled={this.state.loadingVisible}>
            <Text style={styles.buttonText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    this.setState({ loadingVisible: true });
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //var path = data.uri.replace('file://', '');
      var bodyFormData = new FormData();
      bodyFormData.append('base64Image', 'data:image/png;base64,' + data.base64);
      bodyFormData.append('isOverlayRequired', true);
      bodyFormData.append('OCREngine', 2);
      bodyFormData.append('scale', true);
      var response = await api.post('/image', bodyFormData);
      this.setState({ loadingVisible: false });
      console.log(response.data);
      alert(response.data.ParsedResults[0].ParsedText);
      //.then(()=>{console.log(response.data);alert(response.data);});
    }
  }



  // takePicture = async () => {
  //   this.setState({
  //     loading: true
  //   });
  //   if (this.camera) {
  //     const data = await this.camera.takePictureAsync(PICTURE_OPTIONS);
  //     try {
  //       if (!data.uri) {
  //         throw "OTHER";
  //       }
  //       this.setState(
  //         {
  //           image: data.uri
  //         },
  //         () => {
  //           alert(data.uri);
  //           path = data.uri.replace('file://', '')
  //          // this.processImageMagic(path);
  //         }
  //       );
  //     } catch (e) {
  //       console.warn(e);
  //       this.reset(e);
  //     }
  //   }
  // };

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

  // processImageMagic = async uri => {
  //   console.log("processing");
  //   RNTesseractOcr.recognize(uri, "LANG_CUSTOM", tessOptions)
  //     .then(result => {
  //       console.log("on result");
  //       this.setState({
  //         isLoading: false,
  //         extractedText: result
  //       });
  //       console.log(this.state.extractedText);
  //       alert(this.state.extractedText);
  //     })
  //     .catch(err => {
  //       console.log("On error");
  //       this.setState({
  //         hasErrored: true,
  //         errorMessage: err.message
  //       });
  //       console.log(this.state.errorMessage);
  //       alert(this.state.errorMessage);
  //     });
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
