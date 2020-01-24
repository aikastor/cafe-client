import React, {Component} from 'react';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Provider} from "react-redux";
import { View, StyleSheet } from 'react-native';
import Menu from "./containers/Menu/Menu";

import menuReducer from "./store/reducers/menuReducer/menuReducer";
import cartReducer from "./store/reducers/cartReducer/cartReducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  menu: menuReducer,
  order: cartReducer,
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

class App extends Component {
  state = {
    isReady: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
        <Provider store={store}>
          <Container style={styles.container}>
            <Menu/>
          </Container>
        </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'transparent'
  },
});

export default App;
