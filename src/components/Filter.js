import Icon from "react-native-vector-icons/AntDesign";
import { Toolbar } from 'react-native-material-ui';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Filter extends Component {
    state = {
        text: '',
        modalVisible: false
    };

    render() {
        return (
            <View styles={styles.container}>
                <Toolbar
                    searchable={{
                        autoFocus: true,
                        placeholder: 'Search',
                    }}
                    rightElement={
                        <TouchableOpacity style={styles.filterStyle} onPress={()=>console.log(" AAA")}>
                            <Icon name="filter" style={styles.actionButtonIcon} />
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
