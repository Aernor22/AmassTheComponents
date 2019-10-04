import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.categoria}>
                <Text style={styles.categoriaTexto}>By Color:</Text>
                <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'column', width: (Dimensions.get('window').height * 0.8)/2}}>
                    <Checkbox label='Colorless' onCheck={() => { }} />
                    <Checkbox label='White' onCheck={() => { }} />
                    <Checkbox label='Black' onCheck={() => { }} />
                </View>
                <View style={{flexDirection:'column',width :(Dimensions.get('window').height * 0.8)/2}}>
                    <Checkbox label='Blue' onCheck={() => { }} />
                    <Checkbox label='Red' onCheck={() => { }} />
                    <Checkbox label='Green' onCheck={() => { }} />
                </View>
                </View>
            </View>
        );
    }
}

export default CardColor;

const styles = StyleSheet.create({
    categoria: {
        height: Dimensions.get('window').height * 0.5,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 20,
    },
    categoriaTexto: {
        paddingTop: 10,
        paddingLeft: 20
    },
    checks: {
        margin: 20,
    }
});