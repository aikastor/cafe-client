import {fetchMenu} from "../../store/actions/menuActions/menuActions";
import {connect} from "react-redux";
import {Image, Modal, StyleSheet, TouchableHighlight, View} from 'react-native';
import { Container,Title, Header, Content, Card, CardItem, Footer,FooterTab,Thumbnail, Text, Button, Icon, Left, Body, Right,List, ListItem, } from 'native-base';
import React, {Component} from "react";
import {addItem, decreaseQnt} from "../../store/actions/cartActions/cartActions";
import CartModal from "../CartModal/CartModal";
import {Alert, ScrollView} from "react-native";

class Menu extends Component {

  state = {ordering: false};

  componentDidMount() {
    this.props.loadMenu();
  }
  setModalVisible =()=> {
    this.setState({ordering: true})
  };
  render() {

    return (
        <Container>
          <Header>
            <Body>
              <Title>Menu</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='refresh' />
              </Button>
            </Right>
          </Header>
          <Content>
            {Object.keys(this.props.menu).map( item =>(
                <Card key={item}>
                  <CardItem>
                    <Left>
                      <Body>
                        <Text style={styles.title}>{this.props.menu[item].name}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={{uri:this.props.menu[item].image }} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                  <CardItem>
                    <Left>
                        <Text style={styles.price}>{this.props.menu[item].price} KGS</Text>
                    </Left>
                    <Right style={styles.btnContainer}>
                        <Button danger  onPress={()=>this.props.addItem(item, this.props.menu[item].price)} rounded>
                          <Icon active name="add"/>
                        </Button>
                        <Text>
                          {this.props.order[item] ? this.props.order[item].qnt : 0}
                        </Text>
                        <Button danger  onPress={()=>this.props.deleteItem(item, this.props.menu[item].price)} rounded>
                          <Icon active={this.props.order[item] ? this.props.order[item].qnt > 0 ? true : false: false} name="remove"/>
                        </Button>
                    </Right>
                  </CardItem>
                </Card>
            ))}
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.ordering}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
              <ScrollView style={{marginTop: 22}}>
                <View>
                  <Text>Your Order:</Text>
                  <List>
                    {(Object.keys(this.props.order).map(item=> (
                        this.props.order[item].qnt > 0 &&
                          <ListItem key={item}>
                            <Left>
                              <Text>
                                {this.props.menu[item].name}
                              </Text>
                            </Left>
                            <Body>
                              <Button transparent rounded onPress={()=>this.props.addItem(item, this.props.menu[item].price)}>
                                <Icon active name="add" />
                              </Button>
                              <Text>
                                {this.props.order[item].qnt}
                              </Text>
                              <Button transparent rounded onPress={()=>this.props.deleteItem(item, this.props.menu[item].price)}>
                                <Icon active name="remove" />
                              </Button>
                            </Body>
                            <Right>
                              <Text>
                                {this.props.order[item].totalPrice} KGS
                              </Text>
                            </Right>
                          </ListItem>
                      )))
                    }
                    <ListItem>
                      <Left>
                        <Text>Delivery: </Text>
                      </Left>
                      <Body/>
                      <Right><Text>150</Text></Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text>Total </Text>
                      </Left>
                      <Body/>
                      <Right><Text>{this.props.totalPrice > 0 ? this.props.totalPrice + 150 : 0}</Text></Right>
                    </ListItem>
                  </List>
                </View>
              </ScrollView>
            </Modal>
          </Content>
          <Footer>
            <FooterTab>
              <Text>Order total:{this.props.totalPrice} </Text>
              <Button active={this.props.totalPrice > 0}
                      disabled={!this.props.totalPrice > 0}
                      onPress={this.setModalVisible} >
                <Text>Checkout</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}


const mapStateToProps = state => ({
  menu: state.menu.menu,
  loading: state.menu.loading,
  order: state.order.order,
  totalPrice: state.order.totalPrice,
});
const mapDispatchToProps = dispatch => ({
  loadMenu: ()=> dispatch(fetchMenu()),
  addItem : (itemID, price) => dispatch(addItem(itemID, price)),
  deleteItem : (itemID, price)=>dispatch(decreaseQnt(itemID, price)),

});
const styles = StyleSheet.create({
  price: {
   fontSize: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  btnContainer : {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-around'
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
