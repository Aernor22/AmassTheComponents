import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import List from "../components/List"
import { removeAll, retrieveAll, addCard } from "../layers/CRUDLayer"
import { AndroidBackHandler } from 'react-navigation-backhandler'

export default class Collection extends Component {
    state = {
        text: '',
        list: []
    }

    async handleAdd(text) {
        await addCard({ name: text });
    }

    async refresh() {
        this.setState({ list: await retrieveAll() });
    }

    componentDidMount() {
        this.refresh();
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <View>
                    <Text> Insert </Text>
                    <TextInput onChangeText={(text) => this.setState({ text })}></TextInput>
                    <Button title='Save' onPress={async () => await this.handleAdd(this.state.text)}></Button>
                    <List list={this.state.list} refresh={this.refresh.bind(this)}></List>
                </View>
            </AndroidBackHandler>
        )
    }
}
