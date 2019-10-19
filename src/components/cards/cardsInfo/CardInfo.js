import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class CardInfo extends Component {
  render() {
    return (
      <View style={{ height: (Dimensions.get('window').height * 0.5), padding: 20 }}>
        <Text> Mana Cost: </Text>
        <Text> (Card Type)</Text>
        <Text> Card Text</Text>
      </View>
    );
  }
}

export default CardInfo;
