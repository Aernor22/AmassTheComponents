import React, { Component } from 'react';
import { View, Button, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { removeAllCopies, removeCard, retrieveAll } from "../layers/CRUDLayer";
export default class ModalInfo extends Component {

    async delete() {
        await removeCard(this.props.cardId).then(
            setTimeout(async ()=>this.props.refresh(await retrieveAll()), 1)
        );
    }

    async deleteAll(){
        await removeAllCopies(this.props.cardId).then(
            setTimeout(async ()=>this.props.refresh(await retrieveAll()), 1)
        );
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
                                <View style={{alignSelf:'flex-end',flexDirection:'row', alignItems:'center',justifyContent: 'space-evenly', width: '100%'}}>
                                    <Button onPress={async ()=> await this.delete()} title="Remove 1" />
                                    <Button onPress={async () => await this.deleteAll()} title="Remove All" />
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

