import React, { Component } from 'react';
import { 
  Text,
  View,
  Dimensions, 
  Modal, 
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-material-ui';

export default class ModalConfirm extends Component {
  state = {
    textAll: 'Tem certeza que quer excluir todas as copias deste card?',
    text: 'Tem certeza que quer excluir uma copia deste card?',
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.props.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => { this.props.closeConfirm() }}>
          <TouchableOpacity key="overlay" style={styles.overlay} onPress={() => this.props.closeConfirm()}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  {this.props.action === 'remove' && <Text>{this.state.text}</Text>}
                  {this.props.action === 'removeAll' && <Text>{this.state.textAll}</Text>}
                  <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                    <Button accent icon="check" onPress={async () => await this.props.closeConfirmAction(this.props.action)} text="Confirm" />
                    <Button primary icon="cancel" onPress={() => this.props.closeConfirm()} text="Cancel" />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  modal: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.2,
    minWidth: 230,
    minHeight: 100,
    backgroundColor: '#fff', padding: 20,
    borderRadius: 40,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
});