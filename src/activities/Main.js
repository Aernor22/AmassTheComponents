import React, { Component } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, TouchableOpacity, PermissionsAndroid, ToastAndroid} from "react-native";
import ModalExport from "../components/ModalExport";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {        
        modalExportVisible: false,
    };
  }

  closeModal(){
    this.setState({modalExportVisible: false});
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.FloatingButtonStyle,styles.leftFAB]}
          onPress={async () => {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Amass the Components',
                message:
                  'Amass the Components needs permission to write ' +
                  'in your internal storage to save your cards.',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              const grantedRead = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                  title: 'Amass the Components',
                  message:
                    'Amass the Components needs permission to read ' +
                    'from your internal storage to share your cards.',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );

              if (grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({modalExportVisible: true});
              } else {
                ToastAndroid.show('Storage permission denied');
              }
            } else {
              ToastAndroid.show('Storage permission denied');
            }
          }}
        >
          <Icon name="export2" style={styles.actionButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.FloatingButtonStyle,styles.centerFAB]}
          onPress={() => {
            this.props.navigation.navigate('Camera');
          }}
        >
          <Icon name="camerao" style={styles.actionButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.FloatingButtonStyle,styles.rightFAB]}
          onPress={() => {
            this.props.navigation.navigate('Collection');
          }}
        >
          <Icon name="eyeo" style={styles.actionButtonIcon} />
        </TouchableOpacity>
        <ModalExport visible={this.state.modalExportVisible} closeModal={()=>{this.closeModal()}} navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  },
  leftFAB:{
    bottom: 100,
    left: 45,
  },
  centerFAB:{
    bottom: 50,
    left: 145,
  },
  rightFAB:{
    bottom: 100,
    left: 245,
  },
  FloatingButtonStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 70
  }
});

export default Main;
