import React, { Component } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, TouchableOpacity, PermissionsAndroid, ToastAndroid, Image, Animated, Easing, Text} from "react-native";
import ModalExport from "../components/ModalExport";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {        
        modalExportVisible: false,
    };
    this.spinValue = new Animated.Value(0);
    this.spin.bind(this);
  }

  closeModal(){
    this.setState({modalExportVisible: false});
  }

  spin () {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 9000,
        easing: Easing.linear
      }
    ).start(() => this.spin());
  }

  componentDidMount () {
    this.spin();
  }
  
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={{ flex: 1 }}>
        <Text style={{fontFamily: 'Bondie Demo', fontSize: 40, alignSelf: 'center', paddingTop: 50}}>
          amass the components
        </Text>
        <Image style={{position: 'absolute', top: 250, alignSelf: 'center', height: '15%', width: '30%'}}
                    resizeMethod='auto'
                    source={require('../resources/symbol.png')}/>

        <Animated.Image style={{position: 'absolute', top: 150, alignSelf: 'center', height: '45%', width: '90%',
        transform: [{rotate: spin}]}}
                    resizeMethod='auto'
                    source={require('../resources/balls.png')}/>
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
    left: 30,
  },
  centerFAB:{
    bottom: 50,
    alignSelf: 'center',
  },
  rightFAB:{
    bottom: 100,
    left: 300,
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
