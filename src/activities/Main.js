import ActionButton from 'react-native-action-button';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View
  } from 'react-native';

class Main extends Component {
    state = { 

     }
    render() {
        return (
            <View>
                <ActionButton style={styles.actionButtonIcon} icon={<Icon name="export2"/>}/>
                <ActionButton style={styles.actionButtonIcon} icon={<Icon name="camerao"/>} offsetY={30}/>
                <ActionButton style={styles.actionButtonIcon} icon={<Icon name="eyeo"/>}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

export default Main;