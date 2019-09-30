import React, { Component } from 'react';
import { Text, View, Modal, Dimensions, TouchableOpacity } from 'react-native';

export default class ModalAddedCard extends Component {

    constructor(props) {
        super(props);
        this.state = { timer: 5 }
    }

    componentDidMount() {
        this.interval = setInterval(
            () => { if (this.props.visible) { this.setState((prevState) => ({ timer: prevState.timer - 1 })) } },
            1000
        );
    }

    componentDidUpdate() {
        if (this.props.visible) {
            if (this.state.timer === 1) {
                this.setState({ timer: 5 });
                this.props.closeModal();
            }
        }
    }

    componentWillUnmount() {
        this.setState({ timer: 5 });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    transparent={true}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Collection');
                    }} style={{
                        width: Dimensions.get('window').width * 0.7,
                        height: Dimensions.get('window').height * 0.04,
                        backgroundColor: '#339e53', margin: 20,
                        borderRadius: 40, justifyContent: 'center', alignItems: 'center',
                        alignSelf: "flex-end"
                    }}>
                        <Text style={{ color: '#fff' }}>{this.props.cardName} Added!</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

