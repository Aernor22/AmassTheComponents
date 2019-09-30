import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class ListItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress = {()=>{console.log(this.props.item._id);this.props.openModal(this.props.item._id)}}>
                    <Text>{this.props.item.quantity} x {this.props.item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10
    }
});

export default ListItem;
