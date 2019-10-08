import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: {
                enchantment: false,
                planeswalker: false,
                creature: false,
                land: false,
                artifact: false
            }
        };
    }

    onCheck(qual, value) {
        var holder = { ...this.state.types };
        switch (qual) {
            case 'Enchantment':
                holder.enchantment = value;
                break;
            case 'Planeswalker':
                holder.planeswalker = value;
                break;
            case 'Creature':
                holder.creature = value;
                break;
            case 'Land':
                holder.land = value;
                break;
            case 'Artifact':
                holder.artifact = value;
                break;
        }

        this.setState({types:holder});
        this.props.changeTypes(qual,!value);
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Type:</Text>
                <View style={styles.categoria}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: 'column', width: 160, marginTop: 20, paddingRight: 2 }}>
                            <ScrollView>
                                <Checkbox label='Enchantment' onCheck={(checked) => { this.onCheck('Enchantment', checked) }} checked={this.state.types.enchantment} value='Enchantment'/>
                                <Checkbox label='Planeswalker' onCheck={(checked) => { this.onCheck('Planeswalker', checked) }} checked={this.state.types.planeswalker} value='Planeswalker'/>
                                <Checkbox label='Creature' onCheck={(checked) => { this.onCheck('Creature', checked) }} checked={this.state.types.creature} value='Creature'/>
                            </ScrollView>
                        </View>
                        <View style={styles.column}>
                            <ScrollView>
                                <Checkbox label='Land' onCheck={(checked) => { this.onCheck('Land', checked) }} checked={this.state.types.land} value='Land'/>
                                <Checkbox label='Artifact' onCheck={(checked) => { this.onCheck('Artifact', checked) }} checked={this.state.types.artifact} value='Artifact'/>
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