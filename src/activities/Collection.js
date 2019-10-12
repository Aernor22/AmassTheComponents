import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import List from "../components/List"
import { retrieveAll, addCard,retrieveCard } from "../layers/CRUDLayer"
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
            card:{},
            modalInfoVisible: false,
            modalFilterVisible: false,
        };

        this.refresh = this.refresh.bind(this);
        this.refreshCard = this.refreshCard.bind(this)
        this.openInfoModal = this.openInfoModal.bind(this);
        this.openFilterModal = this.openFilterModal.bind(this);
    }

    handleAdd(text) {
        addCard({ name: text });
    }

    async refresh(list) {
        console.log("refresh");
        console.log(list);
        this.setState({ list });
    }

    async refreshCard(cardId){
        this.setState({card: await retrieveCard(cardId)});
        console.log('substituindo');
    }

    searchFilterFunction = async (text) => {
        console.log("screech " + text);
        if (text) {
            
            var newData = this.state.listHolder.filter(item => {
                if (item.name.toUpperCase().includes(text.toUpperCase())) {
                    return item;
                }
            });
            
            await this.refresh(newData);
        } else {
            this.refresh(await retrieveAll());
        }
    };

    async componentDidMount() {
        this.refresh(await retrieveAll());
        this.setState({listHolder: this.state.list});
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    openInfoModal(cardId,card) {
        this.setState({ cardId, card, modalInfoVisible: true });
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
                <View styles={styles.container}>
                    <Filter
                        styles={styles.filter}
                        searchFilterFunction={this.searchFilterFunction}
                        openModal={this.openFilterModal} />
                    <ModalFilter
                        visible={this.state.modalFilterVisible}
                        closeModal={this.closeFilterModal}
                        refresh={this.refresh}/>
                    <ModalInfo
                        visible={this.state.modalInfoVisible}
                        closeModal={this.closeInfoModal}
                        cardId={this.state.cardId}
                        card={this.state.card}
                        refresh={this.refresh} 
                        refreshCard={this.refreshCard}/>
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