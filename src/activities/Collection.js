import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import List from "../components/List"
import { retrieveAll, addCard } from "../layers/CRUDLayer"
import { AndroidBackHandler } from 'react-navigation-backhandler'
import ModalInfo from '../components/ModalInfo';

export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            list: [],
            cardId: '',
            modalVisible: false
        };

        this.refresh = this.refresh.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    handleAdd(text) {
        addCard({ name: text });
    }

    refresh(list) {
        console.log(list);
        this.setState({ list });
    }

    async componentDidMount() {
        await retrieveAll().then((response) => this.refresh(response))
          .catch(function (error) {
            console.log(error);
          });
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    openModal(cardId) {
        this.setState({ cardId, modalVisible: true });
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
    }


    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <View>
                    <Text> Insert </Text>
                    <TextInput onChangeText={(text) => this.setState({ text })}></TextInput>
                    <Button title='Save' onPress={() => this.handleAdd(this.state.text)}></Button>
                    <ModalInfo visible={this.state.modalVisible} closeModal={this.closeModal} cardId={this.state.cardId} refresh={this.refresh} />
                    <List list={this.state.list} openModal={this.openModal} />
                </View>
            </AndroidBackHandler>
        )
    }
}
