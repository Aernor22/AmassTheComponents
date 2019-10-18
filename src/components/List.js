import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from "./ListItem";

export default class List extends Component {
    render() {
        return (
            <View>
                <FlatList 
                    data = {this.props.list}
                    renderItem={({ item }) => <ListItem item = {item} openModal = {this.props.openModal}/>}
                    keyExtractor={item => item._id}
                    />
            </View>
        )
    }
}
