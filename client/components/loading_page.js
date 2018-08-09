import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, TextInput, Alert, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';

class LoadingPage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.navigation.state);
  }

  componentWillMount() {
    this._retrieveData();
  }

  async _retrieveData() {
    try {
      // retrieving the previous user's ID from the AsyncStorage
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        this.setState({userId: id});
        // fetch me the previous user
        this.props.fetchUser(id);
      }
    } catch (error) {
      // erase all previous data from AsyncStorage if no user is found
      AsyncStorage.clear()
      // Error retrieving data
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  render() {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }
}

const mapStateToProps = ({ user, affirmations, loadingStatus }) => {
  return {
    user,
    affirmations,
    loadingStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingPage);

AppRegistry.registerComponent('PositiveApp', () => LoadingPage);
