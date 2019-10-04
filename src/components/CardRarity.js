import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-material-ui';


class CardRarity extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            < View style={styles.categoria} >
                <Text style={styles.categoriaTexto}>By Rarity:</Text>
                <View style={styles.checks}>
                    <Checkbox label='Mythic Rare' value='Mythic Rare' onCheck={() => { }} />
                    <Checkbox label='Rare' onCheck={() => { }} value='Rare' />
                    <Checkbox label='Uncommon' onCheck={() => { }} value='Uncommon' />
                    <Checkbox label='Common' onCheck={() => { }} value='Common' />
                </View>
            </View >
        );
    }
}

export default CardRarity;
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