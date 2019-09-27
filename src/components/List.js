import React, { Component } from 'react'
import { Text, View, FlatList,Button } from 'react-native'

function Item({ title, qtd }) {
    return (
      <View>
        <Text>{qtd} x {title}</Text>
      </View>
    );
  }

export default class List extends Component {
    render() {
        return (
            <View>
                <FlatList 
                    data = {this.props.list}
                    renderItem={({ item }) => <Item title={item.name} qtd = {item.quantity}/>}
                    keyExtractor={item => item._id}
                    />
                <Button title='Refresh' onPress={()=>{this.props.refresh()}}></Button>
            </View>
        )
    }
}
