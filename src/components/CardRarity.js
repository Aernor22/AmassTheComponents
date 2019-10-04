import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-material-ui';


class CardRarity extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Rarity:</Text>
                <View  style={styles.categoria}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.column}>
                        <ScrollView>
                            <Checkbox label='Mythic Rare' value='Mythic Rare' onCheck={() => { }} />
                            <Checkbox label='Rare' onCheck={() => { }} value='Rare' />
                        </ScrollView>
                    </View>
                    <View style={styles.column}>
                        <ScrollView>
                            <Checkbox label='Uncommon' onCheck={() => { }} value='Uncommon' />
                            <Checkbox label='Common' onCheck={() => { }} value='Common' />
                        </ScrollView>
                    </View>
                </View>
                </View>
            </View >
        );
    }
}

export default CardRarity;
const styles = StyleSheet.create({
    categoria: {
        height: Dimensions.get('window').height * 0.3,
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