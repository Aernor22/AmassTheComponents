import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class CardRulings extends Component {
    render() {
        return (
            <View style={{ height: (Dimensions.get('window').height * 0.5), padding: 20 }}>
                <Text style={styles.categoriaTexto}> Rullings: </Text>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <FlatList
                        data={this.props.card.rulings}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.text}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default CardRulings;

function Item({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={{ height: '100%' }}>{item.text}</Text>
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
        width: '100%'
    },
    date: {
        fontWeight: "bold",
        alignSelf: "flex-end",
        paddingBottom: 20,
        color:'#8a2b31'
    }
});