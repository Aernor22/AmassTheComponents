import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-material-ui';

class CardColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                colorless: false,
                white: false,
                black: false,
                blue: false,
                red: false,
                green: false
            },
            colorDisable: false,
            colorlessDisable: false,
        };
    }

    onCheck(qual, value) {
        var holder = { ...this.state.colors };
        var colorDisable = false;
        var colorlessDisable = false;
        switch (qual) {
            case 'Colorless':
                if (value) {
                    holder.colorless = true;

                    holder.white = false;
                    holder.black = false;
                    holder.blue = false;
                    holder.red = false;
                    holder.green = false;

                    colorDisable = true;
                } else {
                    holder.colorless = false;
                    colorDisable = false;
                }
                break;

            case 'White':
                if (value) {
                    holder.colorless = false;
                    holder.white = true;
                    colorlessDisable = true;
                } else {
                    holder.white = false;
                    if(holder.black || holder.blue || holder.red || holder.green){
                        colorlessDisable = true;
                    }else{
                        colorlessDisable = false;
                    }
                }
                break;
            case 'Black':
                if (value) {
                    holder.colorless = false;
                    holder.black = true;
                    colorlessDisable = true;
                } else {
                    holder.black = false;
                    if(holder.white || holder.blue || holder.red || holder.green){
                        colorlessDisable = true;
                    }else{
                        colorlessDisable = false;
                    }
                }
                break;
            case 'Blue':
                if (value) {
                    holder.colorless = false;
                    holder.blue = true;
                    colorlessDisable = true;
                } else {
                    holder.blue = false;
                    if(holder.white || holder.black || holder.red || holder.green){
                        colorlessDisable = true;
                    }else{
                        colorlessDisable = false;
                    }
                }
                break;
            case 'Red':
                if (value) {
                    holder.colorless = false;
                    holder.red = true;
                    colorlessDisable = true;
                } else {
                    holder.red = false;
                    if(holder.white || holder.black || holder.blue|| holder.green){
                        colorlessDisable = true;
                    }else{
                        colorlessDisable = false;
                    }
                }
                break;
            case 'Green':
                if (value) {
                    holder.colorless = false;
                    holder.green = true;
                    colorlessDisable = true;
                } else {
                    holder.green = false;

                    if(holder.white || holder.black || holder.blue || holder.red){
                        colorlessDisable = true;
                    }else{
                        colorlessDisable = false;
                    }
                }
                break;
        }

        this.setState({ colorDisable, colorlessDisable, colors: holder });
        this.props.changeColors(qual,!value);
    }

    render() {
        return (
            <View>
                <Text style={styles.categoriaTexto}>By Color:</Text>
                <View style={styles.categoria}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.column}>
                            <ScrollView>
                                <Checkbox label='Colorless' onCheck={(checked) => { this.onCheck('Colorless', checked) }} disabled={this.state.colorlessDisable} checked={this.state.colors.colorless} value='Colorless'/>
                                <Checkbox label='White' onCheck={(checked) => { this.onCheck('White', checked) }} disabled={this.state.colorDisable} checked={this.state.colors.white} value='White'/>
                                <Checkbox label='Black' onCheck={(checked) => { this.onCheck('Black', checked) }} disabled={this.state.colorDisable} checked={this.state.colors.black} value='Black'/>
                            </ScrollView>
                        </View>
                        <View style={styles.column}>
                            <ScrollView>
                                <Checkbox label='Blue' onCheck={(checked) => { this.onCheck('Blue', checked) }} disabled={this.state.colorDisable} checked={this.state.colors.blue} value='Blue'/>
                                <Checkbox label='Red' onCheck={(checked) => { this.onCheck('Red', checked) }} disabled={this.state.colorDisable} checked={this.state.colors.red} value='Red'/>
                                <Checkbox label='Green' onCheck={(checked) => { this.onCheck('Green', checked) }} disabled={this.state.colorDisable} checked={this.state.colors.green} value='Greem'/>
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
    column: {
        flexDirection: 'column',
        width: 150,
        marginTop: 20,
    }
});