import ActionButton from "react-native-action-button";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { View, StyleSheet } from "react-native";
class Main extends Component {
  state = {};
  render() {
    return (
      <View>
        <ActionButton
          onPress={() => {
            console.log("hi");
          }}
          position="left"
          icon={<Icon name="export2" style={styles.actionButtonIcon} />}
        />
        <ActionButton
          position="center"
          icon={<Icon name="camerao" style={styles.actionButtonIcon} />}
          offsetY={80}
          onPress={() => {
            console.log("bye");
          }}
        />
        <ActionButton
          position="right"
          icon={<Icon name="eyeo" style={styles.actionButtonIcon} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});

export default Main;
