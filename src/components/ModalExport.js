import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Button } from 'react-native-material-ui';
import {buildAndWrite,shareAndDelete} from "../layers/CVSLayer";
import {retrieveAll} from "../layers/CRUDLayer";


class ModalExport extends Component {
  async export(){
    buildAndWrite(await retrieveAll());
  }

  async share(){
    shareAndDelete(await retrieveAll());
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.props.visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => { this.props.closeModal() }}>
          <TouchableOpacity key="overlay" style={styles.overlay} onPress={() => this.props.closeModal()}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View style={{ marginTop: 5, marginBottom: 5 }}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                    <Button primary icon="file-download" onPress={async ()=> await this.export()} text="Export" />
                    <Button primary icon="share" onPress={async ()=> await this.share()} text="Share" />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
import { from } from 'rxjs';

export default ModalExport;

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
    backgroundColor: '#fff', padding: 20,
    borderRadius: 40,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
});