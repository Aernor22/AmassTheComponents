import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { removeAllCopies, removeCard, retrieveAll } from "../layers/CRUDLayer";
import { Button } from 'react-native-material-ui';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CardImage from "./cards/cardsInfo/CardImage";
import CardLegality from './cards/cardsInfo/CardLegality';
import CardRulings from './cards/cardsInfo/CardRulings';
import CardInfo from './cards/cardsInfo/CardInfo';
import ModalConfirm from './ModalConfirm';

export default class ModalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card,
            onEntry: 0,
            entries: ['image', 'info', 'rulings', 'legality'],
            isConfirmVisible: false,
            isRemove: false,
            isRemoveAll: false
        };
    }

    closeModal() {
        this.setState({ onEntry: 0 });
        this.props.closeModal();
    }

    closeConfirm(){
        this.setState({isConfirmVisible: false});
    }

    closeConfirmAction(action){
        switch(action){
            case 'remove':
                this.closeConfirm();
                this.delete();
            return;

            case 'removeAll':
                this.closeConfirm();
                this.deleteAll();
                this.closeModal();
            return;
        }
    }

    async delete() {
        await removeCard(this.props.cardId).then(
            setTimeout(async () => { this.props.refresh(await retrieveAll()) }, 0.5)
        ).then(
            setTimeout(async () => { this.props.refreshCard(this.props.cardId) }, 0.5)
        );
    }

    async deleteAll() {
        await removeAllCopies(this.props.cardId).then(setTimeout(async () => this.props.refresh(await retrieveAll(), true), 0.5));
    }

    _renderItem({ item }) {
        if (item === 'image') return (<CardImage card={this.props.card} />);
        if (item === 'info') return (<CardInfo card={this.props.card}/>);
        if (item === 'rulings') return (<CardRulings card={this.props.card} />);
        if (item === 'legality') return (<CardLegality card={this.props.card} />);
    }

    render() {
        console.log('on mInfo' + this.state.card);
        console.log(this.state.card);
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => { this.closeModal() }}>
                    <TouchableOpacity key="overlay" style={styles.overlay} onPress={() => this.closeModal()}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <View style={{ marginTop: 5, marginBottom: 5 }}>
                                    <View style={{ flex: 1, paddingBottom: 40 }}>
                                        <View style={{ alignSelf: 'flex-start' }}>
                                            <Text style={{ alignSelf: 'flex-start', fontWeight: "bold" }}>{this.props.card.name}</Text>
                                        </View>
                                        <View style={{ alignSelf: 'flex-end' }}>
                                            <Text style={{ alignSelf: 'flex-end' }}>Quantity: {this.props.card.quantity}</Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Carousel
                                            ref={(c) => { this._carousel = c; }}
                                            data={this.state.entries}
                                            renderItem={(item) => this._renderItem(item)}
                                            sliderWidth={(Dimensions.get('window').width * 0.6) + 20}
                                            itemWidth={(Dimensions.get('window').width * 0.6)}
                                            slideStyle={{ justifyContent: 'center', width: (Dimensions.get('window').width * 0.6) }}
                                            layout={'default'}
                                            enableMomentum={true}
                                            decelerationRate={0.9}
                                            onSnapToItem={(index) => this.setState({ onEntry: index })}
                                            style={{ alignSelf: 'center' }}
                                        />
                                        <View style={{ marginTop: 5, marginBottom: 5 }}>
                                            <Pagination
                                                dotsLength={this.state.entries.length}
                                                activeDotIndex={this.state.onEntry}
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
                                    </View>
                                </View>
                                <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                                    <Button accent icon="delete" onPress={()=> this.setState({action: 'remove', isConfirmVisible: true})} text="Remove 1" />
                                    <Button accent icon="delete-forever" onPress={()=> {this.setState({action: 'removeAll', isConfirmVisible: true})}} text="Remove All" />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                <ModalConfirm 
                    visible={this.state.isConfirmVisible}
                    closeConfirm={()=>this.closeConfirm()} 
                    closeConfirmAction={(action)=>{this.closeConfirmAction(action)}}
                    action = {this.state.action}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlay: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },
    modal: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.8,
        backgroundColor: '#fff', padding: 20,
        borderRadius: 40,
        flexDirection: 'column'
    },
});

