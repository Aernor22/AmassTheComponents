import React, { Component } from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet, 
    Modal, 
    Dimensions, 
    TouchableWithoutFeedback, 
    TouchableOpacity,
    Button,
    Text
} from 'react-native';
import CardColor from './CardColor';
import CardType from './CardType';
import CardRarity from './CardRarity';
import Carousel from 'react-native-snap-carousel';

class ModalFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries : ['type','color','rarity']
        };
    }

    _renderItem({item}) {
        if(item==='color') return(<CardColor/>);
        if(item==='type') return(<CardType/>);
        if(item==='rarity') return(<CardRarity/>);
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
                                <Text>Filter:</Text>
                                    <Carousel
                                        ref={(c) => { this._carousel = c; }}
                                        data={this.state.entries}
                                        renderItem={item => this._renderItem(item)}
                                        sliderWidth={(Dimensions.get('window').width * 0.9) - 40}
                                        itemWidth={(Dimensions.get('window').width * 0.9) - 50}
                                        slideStyle={{justifyContent: 'center' , width: (Dimensions.get('window').width * 0.9) - 50}}
                                        layout={'default'}
                                    />
                                <View style={styles.btnContainer}>
                                        <Button title="Filter"/>
                                        <Button title="Clean"/>
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
        height: Dimensions.get('window').height * 0.6,
        backgroundColor: '#fff', padding: 20,
        borderRadius: 40,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    }
});


export default ModalFilter;
