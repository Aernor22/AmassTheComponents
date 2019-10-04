import Icon from "react-native-vector-icons/MaterialIcons";
import { Toolbar } from 'react-native-material-ui';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';

export default class Filter extends Component {
    state = {
        text: '',
        modalVisible: false
    };

    render() {
        return (
            <View styles={styles.container}>
                <Toolbar
                    leftElement={<Text style={styles.actionButtonIcon}>Collection</Text>}
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                        autoCorrect: false ,
                        onChangeText: (text) => this.props.searchFilterFunction(text),
                        onSearchClosed: ()=> this.props.searchFilterFunction()
                    }}
                    rightElement={
                        <TouchableOpacity style={styles.filterStyle} onPress={() => this.props.openModal()}>
                            <Icon name="filter-list" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    actionButtonIcon: {
        fontSize: 22,
        color: "white"
    },
    filterStyle: {
        alignItems: "center",
        justifyContent: "center",
    }
});
