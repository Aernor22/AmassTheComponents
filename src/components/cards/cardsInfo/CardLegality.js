import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export class CardLegality extends Component {
    render() {
        return (
            <View style={{ height: (Dimensions.get('window').height * 0.5), padding: 20 }}>
                <Text style={styles.categoriaTexto}> Legalities: </Text>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <FlatList
                        data={this.props.card.legalities}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.format}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default CardLegality;

function getColor(legality) {
    switch (legality) {
        case 'Legal':
            return 'green';
        case 'Banned':
            return '#8a2b31';
        case 'Restricted':
            return '#a4a825';
        default:
            return 'black';
    }
}

function Item({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.format}>{item.format}:</Text>
            <Text style={{ color: getColor(item.legality) }}>{item.legality}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    categoriaTexto: {
        paddingBottom: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },
    item: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        width: '100%'
    },
    format: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        paddingRight: 20
    }
});
