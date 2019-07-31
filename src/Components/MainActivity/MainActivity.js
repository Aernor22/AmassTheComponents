import React, { Component } from "react";
import { Text, View } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

export class MainActivity extends Component {
  render() {
    return (
      <View>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            console.log("hi");
          }}
        >
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton>
        <Text> textInComponent </Text>
      </View>
    );;
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});

export default MainActivity;
