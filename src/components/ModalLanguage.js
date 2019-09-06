/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Modal, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class ModalLanguage extends Component {
    state = {
        entries: ["English",
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
                <Text>{item}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={true}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000080'
                    }}>
                        <View style={{
                            width: Dimensions.get('window').width * 0.5,
                            height: Dimensions.get('window').height * 0.2,
                            backgroundColor: '#fff', padding: 20,
                            borderRadius: 70
                        }}>
                            <Text> Text recognized! Please select a language: </Text>
                            <View style={{paddingTop:20}}>
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.entries}
                                    renderItem={this._renderItem}
                                    sliderWidth={(Dimensions.get('window').width * 0.5) - 20}
                                    itemWidth={90}
                                    layout={'default'}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
