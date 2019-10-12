import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: {
                enchantment: false,
                instant: false,
                sorcery: false,
                planeswalker: false,
                creature: false,
                land: false,
                artifact: false,
            }
        };
    }

    onCheck(qual, value) {
        var holder = { ...this.state.types };
        switch (qual) {
            case 'Enchantment':
                holder.enchantment = value;
                break;
            case 'Instant':
                holder.instant = value;
                break;
            case 'Sorcery':
                holder.sorcery = value;
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

        this.setState({ types: holder });
        this.props.changeTypes(qual, !value);
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Type:</Text>
                <View style={styles.categoria}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: 'column', width: 160,marginTop: 20, marginBottom: 20, height: '70%', paddingRight: 2, justifyContent: 'space-between'}}>
                                <Checkbox label='Enchantment' onCheck={(checked) => { this.onCheck('Enchantment', checked) }} checked={this.state.types.enchantment} value='Enchantment'/>
                                <Checkbox label='Instant' onCheck={(checked) => { this.onCheck('Instant', checked) }} checked={this.state.types.instant} value='Instant' />
                                <Checkbox label='Sorcery' onCheck={(checked) => { this.onCheck('Sorcery', checked) }} checked={this.state.types.sorcery} value='Sorcery' />
                                <Checkbox label='Planeswalker' onCheck={(checked) => { this.onCheck('Planeswalker', checked) }} checked={this.state.types.planeswalker} value='Planeswalker' />
                        </View>
                        <View style={styles.column}>
                                <Checkbox label='Creature' onCheck={(checked) => { this.onCheck('Creature', checked) }} checked={this.state.types.creature} value='Creature' />
                                <Checkbox label='Land' onCheck={(checked) => { this.onCheck('Land', checked) }} checked={this.state.types.land} value='Land' />
                                <Checkbox label='Artifact' onCheck={(checked) => { this.onCheck('Artifact', checked) }} checked={this.state.types.artifact} value='Artifact' />
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
        height: '70%',
        marginTop: 20,
        justifyContent: 'space-between'
    }
});