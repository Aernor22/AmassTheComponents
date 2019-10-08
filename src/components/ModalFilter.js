import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text
} from 'react-native';
import { Button } from 'react-native-material-ui';
import CardColor from './CardColor';
import CardType from './CardType';
import CardRarity from './CardRarity';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {retrieveAll} from '../layers/CRUDLayer';

class ModalFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onEntry: 0,
            entries: ['type', 'color', 'rarity'],
            rarity: 'Any',
            colors: [],
            types: []
        };
    }

    _renderItem({ item }) {
        if (item === 'color') return (<CardColor changeColors={(color, remove) => this.changeColors(color, remove)} />);
        if (item === 'type') return (<CardType changeTypes={(type, remove) => this.changeTypes(type, remove)} />);
        if (item === 'rarity') return (<CardRarity changeRarity={(text) => this.changeRarity(text)} />);
    }

    closeModal() {
        this.setState({ onEntry: 0 });
        this.props.closeModal();
    }

    async cleanAndClose(){
        this.setState({rarity: 'Any', colors: [],types: []});
        this.props.refresh(await retrieveAll());
        this.closeModal();
    }

    changeRarity(rarity) {
        this.setState({ rarity });
    }

    changeColors(color, remove) {
        if (remove) {
            if (this.state.colors.includes(color)) {
                var auxColors = [...this.state.colors];
                for (var i = 0; i < auxColors.length; i++) {
                    if (auxColors[i] === color) {
                        auxColors.splice(i, 1)
                        this.setState({ colors: auxColors });
                    }
                }
            }
        } else {
            if (color === 'Colorless') {
                this.setState({ colors: [color] });
            } else {
                if (!this.state.colors.includes(color)) {
                    this.setState({ colors: [...this.state.colors, color] });
                }
            }
        }
    }

    changeTypes(type, remove) {
        if (remove) {
            if (this.state.types.includes(type)) {
                var auxType = [...this.state.types];
                for (var i = 0; i < auxType.length; i++) {
                    if (auxType[i] === type) {
                        auxType.splice(i, 1);
                        this.setState({ types:auxType});
                    }
                }
            }
        } else {
            if (!this.state.types.includes(type)) {
                this.setState({ types: [...this.state.types, type] });
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.props.visible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => { this.cleanAndClose() }}>
                    <TouchableOpacity key="overlay" style={styles.overlay} onPress={() => this.cleanAndClose()}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modal}>
                                <Text style={styles.actionButtonIcon}>Filter:</Text>
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.entries}
                                    renderItem={(item) => this._renderItem(item)}
                                    sliderWidth={(Dimensions.get('window').width * 0.9) - 40}
                                    itemWidth={(Dimensions.get('window').width * 0.9) - 60}
                                    slideStyle={{ justifyContent: 'center', width: (Dimensions.get('window').width * 0.9) - 60 }}
                                    layout={'default'}
                                    onSnapToItem={(index) => this.setState({ onEntry: index })}
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
                                <View style={styles.btnContainer}>
                                    <Button primary icon="filter-list" text="Filter" onPress={() => console.log(this.state.rarity)} />
                                    <Button accent icon="clear" text="Clean" onPress={async ()=>{this.cleanAndClose()}}/>
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
    overlay: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },
    modal: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#fff', padding: 20, paddingTop: 5,
        borderRadius: 40,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20, paddingTop: 5, paddingBottom: 5
    },
    actionButtonIcon: {
        fontSize: 22,
        color: "black",
        paddingTop: 10
    },
});


export default ModalFilter;
