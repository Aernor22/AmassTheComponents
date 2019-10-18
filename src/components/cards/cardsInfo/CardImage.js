import React, { Component } from 'react'
import { Image, View, Dimensions } from 'react-native'

export default class CardImage extends Component {
    render() {
        return (
            <View>
                <Image
                    style={{height: (Dimensions.get('window').height * 0.5),padding: 20}}
                    resizeMethod='resize'
                    source={{ uri: this.props.card.imageUrl }} />
            </View>
        )
    }
}
