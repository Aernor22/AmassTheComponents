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
                    transparent={true}>
                    <TouchableOpacity key="overlay" style={styles.overlay} onPress={this.props.closeModal}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <Button onPress={async ()=> await this.delete()} title="Remove 1" />
                                <Button onPress={async () => await this.deleteAll()} title="Remove All" />
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
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: '#fff', padding: 20,
        borderRadius: 40,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    categoria: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.1,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 40,
    }
});

