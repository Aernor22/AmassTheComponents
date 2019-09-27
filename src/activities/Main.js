
import React, { Component } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {removeAll} from "../layers/CRUDLayer"
class Main extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.FloatingButtonStyle,styles.leftFAB]}
          onPress={() => {
            removeAll();
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
