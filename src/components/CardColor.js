import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,ScrollView } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Color:</Text>
                <View style={styles.categoria}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.column}>
                        <ScrollView>
                            <Checkbox label='Colorless' onCheck={() => { }} />
                            <Checkbox label='White' onCheck={() => { }} />
                            <Checkbox label='Black' onCheck={() => { }} />
                        </ScrollView>
                    </View>
                    <View style={styles.column}>
                        <ScrollView>
                            <Checkbox label='Blue' onCheck={() => { }} />
                            <Checkbox label='Red' onCheck={() => { }} />
                            <Checkbox label='Green' onCheck={() => { }} />
                        </ScrollView>
                    </View>
                </View>
                </View>
            </View>
        );
    }
}

export default CardColor;

const styles = StyleSheet.create({
    categoria: {
        height: Dimensions.get('window').height * 0.3,
        flexDirection: 'column',
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
    },
    column:{
        flexDirection: 'column', 
        width: 150,
        marginTop: 20,
    }
});