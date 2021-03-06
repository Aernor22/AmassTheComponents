/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity,StyleSheet } from 'react-native';
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
            <TouchableOpacity style={styles.itemView}
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
                        <TouchableOpacity key="overlay" testID="overlay" style={styles.overlay} onPress={this.props.closeModal}>
                             <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <Text style={{ textAlign: 'center', paddingBottom: 15 }}> {this.props.cardName} recognized! Please select what language this is: </Text>
                                <View style={{ paddingTop: 10 }}>
                                    <Carousel
                                        ref={(c) => { this._carousel = c; }}
                                        data={this.state.entries}
                                        renderItem={item => this._renderItem(item)}
                                        sliderWidth={(Dimensions.get('window').width * 0.6) - 0}
                                        itemWidth={(Dimensions.get('window').width * 0.6) - 50}
                                        slideStyle={{ borderRadius: 40, backgroundColor: '#e0e0e0', width: (Dimensions.get('window').width * 0.6)-50}}
                                        layout={'default'}
                                        enableMomentum={true}
                                        decelerationRate={0.9}
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemView:{
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 50,
        height: (Dimensions.get('window').height * 0.1)
    },
    overlay:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },
    modal:{
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.35,
        minWidth:250,
        minHeight:200,
        backgroundColor: '#fff', padding: 20,
        borderRadius: 40,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});
