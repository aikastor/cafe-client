import React, {Component,useEffect, useState} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

class CartModal extends Component{
  state = {modal: this.props.ordering};
  constructor(props) {
    super(props);
  }
  render (){
    const { ordering } = this.props;

    return (
        ordering &&
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
    );
  }
}

export default CartModal;