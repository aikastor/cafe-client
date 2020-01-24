import {fetchMenu} from "../../store/actions/menuActions/menuActions";
import {connect} from "react-redux";
import {Image, Modal, View} from 'react-native';
import { Container,Title, Header, Content, Card, CardItem, Footer,FooterTab, Spinner, Text, Button, Icon, Left, Body, Right,List, ListItem, Form, Item, Input, Label,} from 'native-base';
import React, {Component} from "react";
import {
  addItem,
  createOrder,
  decreaseQnt,
  initCart
} from "../../store/actions/cartActions/cartActions";
import {ScrollView} from "react-native";

import styles from './MenuStyles';

class Menu extends Component {

  state = {
    ordering: false,
    name: '',
    address: '',
    phone: '',
    loading: false,
  };

  placeOrder = async()=> {
    let filteredOrder = {};

    for (let item in this.props.order) {
      if(this.props.order[item].qnt !== 0) {
        filteredOrder[item] = this.props.order[item].qnt
      }
    }
    let order = {
      order: filteredOrder,
      customer: {
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
      }
    };
    await this.props.placeOrder(order);
    this.hideModal();
    this.props.initializeCart();
  };
  componentDidMount() {
    this.props.loadMenu();
  }
  setModalVisible =()=> {
    this.setState({ordering: true})
  };
  hideModal = () => {
    this.setState({ordering: false})
  };
  render() {
    const { name, address, phone } = this.state;
    const enabled =
        name.length > 0 &&
        address.length > 0 &&
        phone.length > 0;
    let spinner = (
        <Spinner />
    );
    return (
        <Container>
          <Header>
            <Body>
              <Title>Menu</Title>
            </Body>
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
                style={styles.modal}
                animationType="slide"
                transparent={false}
                visible={this.state.ordering}
                onRequestClose={this.hideModal}>
              {this.props.ordering  ?
                spinner :
                  <ScrollView >
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
                        <Content>
                          <Form>
                            <Item floatingLabel>
                              <Label>Your name</Label>
                              <Input onChangeText={text=>this.setState({name: text})}
                                     value={this.state.name}/>
                            </Item>
                            <Item floatingLabel last>
                              <Label>Address</Label>
                              <Input onChangeText={text=>this.setState({address: text})}
                                     value={this.state.address}/>
                            </Item>
                            <Item floatingLabel last>
                              <Label>Phone number</Label>
                              <Input
                                  onChangeText={text=>this.setState({phone: text})}
                                  value={this.state.phone}/>
                            </Item>
                          </Form>
                        </Content>
                        <View style={styles.footer}>
                          <Button block danger onPress={this.hideModal}>
                            <Text>CANCEL</Text>
                          </Button>
                          <Button success block onPress={()=>this.placeOrder()}
                                  disabled={!enabled}>
                            <Text>PLACE ORDER</Text>
                          </Button>
                        </View>
                      </List>
                    </View>
                  </ScrollView>
              }

            </Modal>
          </Content>
          <Footer >
            <FooterTab>
              <Text>Order total:{this.props.totalPrice} </Text>
              <Button active={this.props.totalPrice > 0}
                      disabled={!this.props.totalPrice > 0}
                      onPress={this.setModalVisible} >
                <Text>CHECKOUT</Text>
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
  ordering: state.order.ordering,
});
const mapDispatchToProps = dispatch => ({
  loadMenu: ()=> dispatch(fetchMenu()),
  addItem : (itemID, price) => dispatch(addItem(itemID, price)),
  deleteItem : (itemID, price)=>dispatch(decreaseQnt(itemID, price)),
  placeOrder : (order) =>dispatch(createOrder(order)),
  initializeCart: ()=> dispatch(initCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
