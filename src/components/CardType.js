import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Type:</Text>
                <View style={styles.categoria}>
                    <View style={{ flexDirection: "row"}}>
                        <View style={{ flexDirection: 'column', width: 160, marginTop: 20, paddingRight: 2 }}>
                            <ScrollView>
                                <Checkbox label='Enchantment' onCheck={() => { }} />
                                <Checkbox label='Planeswalker' onCheck={() => { }} />
                                <Checkbox label='Creature' onCheck={() => { }} />
                            </ScrollView>
                        </View>
                        <View style={styles.column}>
                            <ScrollView>
                                <Checkbox label='Land' onCheck={() => { }} />
                                <Checkbox label='Artifact' onCheck={() => { }} />
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

export default CardType;
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
    column: {
        flexDirection: 'column',
        width: 150,
        marginTop: 20,
    }
});