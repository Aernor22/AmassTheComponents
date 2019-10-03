import React, { Component } from 'react'
import {View, StyleSheet } from 'react-native'
import List from "../components/List"
import { retrieveAll, addCard } from "../layers/CRUDLayer"
import { AndroidBackHandler } from 'react-navigation-backhandler'
import ModalInfo from '../components/ModalInfo';
import ModalFilter from '../components/ModalFilter';
import Filter from '../components/Filter'

export default class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            listHolder: [],
            list: [],
            cardId: '',
            modalInfoVisible: false,
            modalFilterVisible: false
        };

        this.refresh = this.refresh.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.openFilterModal = this.openFilterModal.bind(this);
    }

    handleAdd(text) {
        addCard({ name: text });
    }

    refresh(list) {
        console.log("refresh");
        console.log(list);
        this.setState({ list });
    }

    searchFilterFunction = async (text) => {
        console.log("screech "+ text);
        if(text){
            const newData = this.state.list.filter(item => {
                if(item.name.toUpperCase().includes(text.toUpperCase())){
                    return item;
                }
            });

            this.refresh(newData);
        }else{
            this.refresh(await retrieveAll());    
        }
    };

    async componentDidMount() {
        this.refresh(await retrieveAll());
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    openInfoModal(cardId) {
        this.setState({ cardId, modalInfoVisible: true });
    }

    openFilterModal(cardId) {
        this.setState({ cardId, modalFilterVisible: true });
    }

    closeInfoModal = () => {
        this.setState({ modalInfoVisible: false });
    }

    closeFilterModal = () => {
        this.setState({ modalFilterVisible: false });
    }

    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <View  styles={styles.container}> 
                    <Filter styles={styles.filter} searchFilterFunction={this.searchFilterFunction} openModal={this.openFilterModal}/>
                    <ModalFilter visible={this.state.modalFilterVisible} closeModal={this.closeFilterModal} refresh={this.refresh}/>
                    <ModalInfo visible={this.state.modalInfoVisible} closeModal={this.closeInfoModal} cardId={this.state.cardId} refresh={this.refresh} />
                    <List list={this.state.list} openModal={this.openInfoModal} />
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