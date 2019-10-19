import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class CardInfo extends Component {
    getPowerDefense() {
        return (
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={styles.pd}>Power: </Text>
                    <Text style={[styles.categoriaTexto, { alignSelf: 'flex-end' }]}>{this.props.card.power}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.pd}>Toughness: </Text>
                    <Text style={[styles.categoriaTexto, { alignSelf: 'flex-end' }]}>{this.props.card.toughness}</Text>
                </View>
            </View>
        );
    }

    getLoyality() {
        return (
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <Text style={styles.pd}>Loyalty: </Text>
                <Text style={[styles.categoriaTexto, { alignSelf: 'flex-end' }]}>{this.props.card.loyalty}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', height: (Dimensions.get('window').height * 0.5), padding: 20 }}>
                <Text style={styles.categoriaTexto}> Mana Cost: {this.props.card.manaCost}</Text>
                <Text style={styles.categoriaTexto}> {this.props.card.type}</Text>
                <Text style={styles.categoriaTexto}> {this.props.card.text}</Text>
                {this.props.card.types.includes('Creature') && this.getPowerDefense()}
                {this.props.card.types.includes('Planeswalker') && this.getLoyality()}
            </View>
        );
    }
}

export default CardInfo;

const styles = StyleSheet.create({
    categoriaTexto: {
        paddingBottom: 20,
        fontWeight: 'bold'
    },
    pd: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        paddingBottom: 20,
        color: '#8a2b31'
    }
});