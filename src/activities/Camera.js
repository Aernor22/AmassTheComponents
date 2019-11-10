/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, ActivityIndicator,ToastAndroid } from "react-native";
import { AndroidBackHandler } from 'react-navigation-backhandler';
import ModalLanguage from "../components/ModalLanguage";
import ModalAddedCard from "../components/ModalAddedCard";
import mtgApi from "../layers/MtgApiLayer";
import ocrApi from "../layers/OCRLayer";
import {addCard} from "../layers/CRUDLayer";
import RNFetchBlob from 'react-native-fetch-blob';

export default class Camera extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    hasError: false,
    errorMessage: null,
    extractedText: null,
    loadingVisible: false,
    modalVisible: false,
    modalAddVisible: false,
    cardName: "",
    language: "",
    message: "Recognizing Text"
  };

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };


  render() {
    const { height, width } = Dimensions.get('window');
    const maskRowHeight = Math.round((height - 570) / 20);
    const maskColWidth = (width - 250) / 2;
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
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
                <Text style={{ color: 'white' }}>{this.state.message}</Text>
              </View>
            }
            <ModalLanguage
              visible={this.state.modalVisible}
              cardName={this.state.cardName}
              processImage={this.processImage}
              closeModal={this.closeModal}/>

            <ModalAddedCard
              visible={this.state.modalAddVisible}
              cardName={this.state.cardName}
              closeModal = {this.closeAdd}
              navigation = {this.props.navigation}
            />

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
      </AndroidBackHandler>
    );
  }

  buildFile = (data) => {
    return{
      uri: data.uri,
	    name: 'name.jpg',
	    type: 'image/jpg'
    };
  }

  takePicture = async () => {
    //this.setState({cardName: "Damnation", modalVisible: true});
    this.setState({ loadingVisible: true });
    if (this.camera) {
      const options = { quality: 0.4, base64: true};
      const data = await this.camera.takePictureAsync(options);
      var bodyFormData = new FormData();
      bodyFormData.append('base64Image', 'data:image/png;base64,' + data.base64);
      //var imageFile = await RNFS.readFile(data.uri, 'base64');
      console.log(data.uri);
      bodyFormData.append('image', this.buildFile(data));
      bodyFormData.append('isOverlayRequired', true);
      bodyFormData.append('OCREngine', 2);
      bodyFormData.append('scale', true);
      //bodyFormData.append('filetype','image/jpg');
      var response = await ocrApi.post('/image', bodyFormData);
      console.log(response);
      if(response.data.OCRExitCode == "1"||response.data.OCRExitCode == "2"){
        console.log(response.data.ParsedResults[0].TextOverlay.Lines[0].LineText);
        this.setState({cardName: response.data.ParsedResults[0].TextOverlay.Lines[0].LineText});
        this.setState({modalVisible:true});
      }else{
        ToastAndroid.show('Could not recognize text!', ToastAndroid.SHORT);
      }
      RNFetchBlob.fs.unlink(data.uri); // Remove image from cache
      this.setState({ loadingVisible: false });
    } 
  }

  processImage = async (lg) => {
    console.log("process");
    console.log(lg);
    this.setState({ modalVisible: false, loadingVisible: true, message: "Retrieving card information" });
    console.log('/cards?name=' + this.state.cardName + '&language=' + lg);
    url = '/cards?name=' + this.state.cardName;
    if(lg !== 'English'){
      url = url + '&language=' + lg;
    }
    await mtgApi.get(url).then(function (response) {
      addCard(response.data.cards[0]);
    })
    .catch(function (error) {
      console.log(error);
      ToastAndroid.show('Could not retrieve card information!', ToastAndroid.SHORT);
    });

    this.setState({ loadingVisible: false });
    this.setState({modalAddVisible: true });    
  }

  closeModal = () => {
    this.setState({ modalVisible: false, loadingVisible: false });
  }

  closeAdd = () => {
    this.setState({ modalAddVisible: false});
  }

  getCardInformation = async (cardName, lg) => {
    await mtgApi.get('/cards?name=' + cardName + '&language=' + lg)
      .then(function (response) { return response.data })
      .catch(function (error) {
        return 'aaaaa';
      });
  }
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
