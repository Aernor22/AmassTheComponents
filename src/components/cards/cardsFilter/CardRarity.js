import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-material-ui';


class CardRarity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {
                any: true,
                mRare: false,
                rare: false,
                ucommon: false,
                common: false,
            }
        };
    }


    setSelected(qual, value) {
        var selected = this.state.selected;

        switch (qual) {
            case 'Any':
                if (value) {
                    selected.any = value;
                    selected.mRare = !value;
                    selected.rare = !value;
                    selected.ucommon = !value;
                    selected.common = !value;
                }
                break;
            case 'Mythic Rare':
                if (value) {
                    selected.mRare = value;

                    selected.any = !value;
                    selected.rare = !value;
                    selected.ucommon = !value;
                    selected.common = !value;
                }
                break;
            case 'Rare':
                if (value) {
                    selected.rare = value;

                    selected.mRare = !value;
                    selected.any = !value;
                    selected.ucommon = !value;
                    selected.common = !value;
                }
                break;
            case 'Uncommon':
                if (value) {
                    selected.ucommon = value;


                    selected.mRare = !value;
                    selected.rare = !value;
                    selected.any = !value;
                    selected.common = !value;
                }
                break;
            case 'Common':
                if (value) {
                    selected.common = value;


                    selected.mRare = !value;
                    selected.rare = !value;
                    selected.ucommon = !value;
                    selected.any = !value;
                }
                break;
        }

        this.setState({ selected });
        this.props.changeRarity(qual);
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Rarity:</Text>
                <View style={styles.categoria}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.column}>
                            <ScrollView>
                                <RadioButton
                                    checked={this.state.selected.any} label='Any'
                                    onCheck={(checked) => { this.setSelected('Any', checked) }}
                                    onSelect={() => { }}
                                    value='Any' />
                                <RadioButton
                                    checked={this.state.selected.mRare} label='Mythic Rare'
                                    onCheck={(checked) => { this.setSelected('Mythic Rare', checked) }}
                                    onSelect={() => { }}
                                    value='Mythic Rare' />
                                <RadioButton
                                    checked={this.state.selected.rare} label='Rare'
                                    onCheck={(checked) => { this.setSelected('Rare', checked) }}
                                    onSelect={() => { }}
                                    value='Rare' />
                            </ScrollView>
                        </View>
                        <View style={styles.column}>
                            <ScrollView>
                                <RadioButton
                                    checked={this.state.selected.ucommon} label='Uncommon'
                                    onCheck={(checked) => { this.setSelected('Uncommon', checked) }}
                                    onSelect={() => { }}
                                    value='Uncommon' />
                                <RadioButton
                                    checked={this.state.selected.common} label='Common'
                                    onCheck={(checked) => { this.setSelected('Common', checked) }}
                                    onSelect={() => { }}
                                    value='Common' />
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
        width: '50%',
        minWidth: 130,
        marginTop: 20,
    }
});