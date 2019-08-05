import ActionButton from 'react-native-action-button';
import React, { Component } from 'react';
import {
    View
  } from 'react-native';

class Main extends Component {
    state = { 

     }
    render() {
        return (
            <View>
                <ActionButton></ActionButton>
                <ActionButton></ActionButton>
                <ActionButton></ActionButton>
            </View>
        );
    }
}

export default Main;