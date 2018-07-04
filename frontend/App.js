import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from './reducers/root_reducer';
import PositivePage from './components/positive_page';

const store = createStore(RootReducer, applyMiddleware(thunk, logger));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PositivePage/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
