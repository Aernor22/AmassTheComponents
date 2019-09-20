/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';



export default class ModalLanguage extends Component {
    state = {
        entries: [
            {name: "English", value: "English"},
            {name: "Portuguese", value: "Portuguese (Brazil)"},
            {name: "Chinese Simplified", value: "Chinese Simplified"},
            {name: "Chinese Traditional", value: "Chinese Traditional"},
            {name: "French", value: "French"},
            {name: "German", value: "German"},
            {name: "Italian", value: "Italian"},
            {name: "Japanese", value: "Japanese"},
            {name: "Korean", value: "Korean"},
            {name: "Russian", value: "Russian"},
            {name: "Spanish", value: "Spanish"}]
    }

    _renderItem({ item}) {
        return (
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: ((Dimensions.get('window').height * 0.1)) }}
                onPress={()=>this.handleOnClick(item.value)}>
                <Text style={{ textAlign: 'center' }}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    handleOnClick=(item)=>{
        console.log(item);
        this.props.processImage(item);
    }

    render() {
        return (
            
            <View style={{ marginTop: 22, marginBottom: 5 }}>
                <Modal
                    visible={this.props.visible}     
                    animationType="slide"
                    transparent={true}>
                        <TouchableOpacity key="overlay" testID="overlay" style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000080'                            
                        }} onPress={this.props.closeModal}>
                             <TouchableWithoutFeedback>
                            <View style={{
                                width: Dimensions.get('window').width * 0.6,
                                height: Dimensions.get('window').height * 0.35,
                                backgroundColor: '#fff', padding: 20,
                                borderRadius: 40
                            }}>
                                <Text style={{ textAlign: 'center', paddingBottom: 15 }}> {this.props.cardName} recognized! Please select what language this is: </Text>
                                <View style={{ paddingTop: 10 }}>
                                    <Carousel
                                        ref={(c) => { this._carousel = c; }}
                                        data={this.state.entries}
                                        renderItem={item => this._renderItem(item)}
                                        sliderWidth={(Dimensions.get('window').width * 0.6) - 40}
                                        itemWidth={(Dimensions.get('window').width * 0.6) - 50}
                                        slideStyle={{ borderRadius: 40, backgroundColor: '#e0e0e0', width: (Dimensions.get('window').width * 0.6) - 50 }}
                                        layout={'default'}
                                    />
                                </View>
                                <Text style={{ textAlign: 'center', paddingTop: 15 }}> (Slide to choose) </Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}
