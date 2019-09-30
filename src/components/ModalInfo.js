import React, { Component } from 'react';
import { View, Button, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { removeCard, removeAllCopies } from "../layers/CRUDLayer";
export default class ModalInfo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    transparent={true}>
                    <TouchableOpacity key="overlay" style={{
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
                                borderRadius: 40, 
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                            }}>
                                <Button onPress={async () => {removeCard(this.props.cardId); await this.props.refresh();}} title="Remove 1" />
                                <Button onPress={async () => {removeAllCopies(this.props.cardId); await this.props.refresh();}} title="Remove All" />
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
    }
});

