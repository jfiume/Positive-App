import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json


import RootReducer from './reducers/root_reducer';
import PositivePage from './components/positive_page';
import WelcomePage from './components/welcome_page';

const store = createStore(RootReducer, applyMiddleware(thunk, logger));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Splash: {
      screen: WelcomePage,
    },
    PositivePage: {
      screen: PositivePage,
    },
  },
  {
    initialRouteName: 'Splash',
  }
);
