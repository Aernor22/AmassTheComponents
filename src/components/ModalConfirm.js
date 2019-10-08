import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addCard } from '../layers/CRUDLayer';

class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleAdd(text) {
    var obj = JSON.parse(text);
    addCard(obj);
  }

  render() {
    return (
      <View>
        <Text> ModalConfirm </Text>
        <TextInput onChangeText={(text) => this.setState({ text })} />
        <Button title="add" onPress={() => this.handleAdd(this.state.text)}></Button>
        
      </View>
    );
  }
}

export default ModalConfirm;
