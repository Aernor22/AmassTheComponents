/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class ModalLanguage extends Component {
    state ={
        entries:["English",
         "Chinese Simplified", 
         "Chinese Traditional", 
         "French", 
         "German", 
         "Italian", 
         "Japanese", 
         "Korean", 
         "Portuguese", 
         "Russian",
         "Spanish"]
    }
    _renderItem({ item, index }) {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Text> Text recognized! Please select a language: </Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={60}
                    itemWidth={40}
                    layout={'default'}
                />
            </View>
        )
    }
}
