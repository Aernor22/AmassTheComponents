import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { removeAllCopies, removeCard, retrieveAll } from "../layers/CRUDLayer";
import { Button } from 'react-native-material-ui';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export default class ModalInfo extends Component {
    state ={
        card: this.props.card
    }

    async delete() {
        await removeCard(this.props.cardId).then(
            setTimeout(async ()=>{this.props.refresh(await retrieveAll())}, 0.5)
        ).then(
            setTimeout(async ()=>{this.props.refreshCard(this.props.cardId)}, 0.5)
        );
    }

    async deleteAll(){
        await removeAllCopies(this.props.cardId).then(setTimeout(async ()=>this.props.refresh(await retrieveAll(),true), 0.5));
    }

    render() {
        
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={()=>{this.props.closeModal()}}>
                    <TouchableOpacity key="overlay" style={styles.overlay} onPress={this.props.closeModal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                            <View style={{ marginTop: 5, marginBottom: 5 }}>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text>Quantity: {this.props.card.quantity}</Text>
                                </View>
                                <View>
                                    <Image
                                        style={{width: 300, height: 400}}
                                        source={{uri:this.props.card.imageUrl}}/>
                                </View>
                                    <Pagination
                                        dotStyle={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            marginHorizontal: 8,
                                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                                        }}
                                        inactiveDotOpacity={0.4}
                                        inactiveDotScale={0.6}
                                    />
                                </View>
                                <View style={{alignSelf:'flex-end',flexDirection:'row', alignItems:'center',justifyContent: 'space-evenly', width: '100%'}}>
                                    <Button accent icon="delete" onPress={async ()=> await this.delete()} text="Remove 1" />
                                    <Button accent icon="delete-forever" onPress={async ()=> await this.deleteAll()} text="Remove All" />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlay:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },
    modal:{
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#fff', padding: 20,
        borderRadius: 40,
        flexDirection: 'column'
    },
});

