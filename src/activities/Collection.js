import React, { Component } from 'react'
import {View, StyleSheet } from 'react-native'
import List from "../components/List"
import { retrieveAll, addCard } from "../layers/CRUDLayer"
import { AndroidBackHandler } from 'react-navigation-backhandler'
import ModalInfo from '../components/ModalInfo';
import Filter from '../components/Filter'

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
        console.log("refresh");
        console.log(list);
        this.setState({ list });
    }

    async componentDidMount() {
        this.refresh(await retrieveAll());
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
                <View  styles={styles.container}>
                    <Filter styles={styles.filter}/>
                    <ModalInfo visible={this.state.modalVisible} closeModal={this.closeModal} cardId={this.state.cardId} refresh={this.refresh} />
                    <List list={this.state.list} openModal={this.openModal} />
                </View>
            </AndroidBackHandler>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    filter: {
        color: 'black',
        backgroundColor: "black",
        height: 60,
    }
});