/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import HandleBack from "../components/HandleBack";
import api from "../layers/OCRLayer"
import { View,StyleSheet,TouchableOpacity,Text } from "react-native";

export default class Camera extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    hasError:false,
    errorMessage: null,
    extractedText: null
  };

  render() {
    return (
      <HandleBack>
        <View style={styles.container}>
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
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //var path = data.uri.replace('file://', '');
      var bodyFormData = new FormData();
      bodyFormData.append('base64Image','data:image/png;base64,'+data.base64);
      bodyFormData.append('OCREngine',2);
      bodyFormData.append('scale',true);
      var response = await api.post('/image', {data:bodyFormData});
      
      console.log(response.data);
      alert(response);
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
