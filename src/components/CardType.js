import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.categoria}>
                <Text style={styles.categoriaTexto}>By Type:</Text>
                <View style={styles.checks}>
                    <Checkbox label='Land' onCheck={() => { }} />
                    <Checkbox label='Creature' onCheck={() => { }} />
                    <Checkbox label='Artifact' onCheck={() => { }} />
                    <Checkbox label='Enchantment' onCheck={() => { }} />
                    <Checkbox label='Planeswalker' onCheck={() => { }} />
                </View>
            </View>
        );
    }
}

export default CardType;
const styles = StyleSheet.create({
    categoria: {
        height: Dimensions.get('window').height * 0.6,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 20,
    },
    categoriaTexto:{
        paddingTop: 10,
        paddingLeft: 20
    },
    checks: {
        margin: 20,
    }
});