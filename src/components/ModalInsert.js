import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addCard } from '../layers/CRUDLayer';

class ModalInsert extends Component {

  handleAdd(text) {
    var obj = JSON.parse(text);
    addCard(obj);
  }

  render() {
    return (
      <View>
        <Text> ModalExport </Text>
        <TextInput onChangeText={(text) => this.setState({ text })} />
        <Button title="add" onPress={() => this.handleAdd(this.state.text)}></Button>
        
      </View>
    );
  }
}

export default ModalInsert;
