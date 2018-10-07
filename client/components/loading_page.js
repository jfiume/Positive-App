import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { fetchUser } from '../actions/user_actions';

class LoadingPage extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props.navigation.state);
  }

  componentWillMount() {
    this._retrieveUserId();
  }

  async _retrieveUserId() {
    try {
      // if we have the previous user id, then we execute the conditional
      const id = await AsyncStorage.getItem('userId');
      // console.log(id);
      if (id) {
        this.props.navigation.navigate('PositivePage');
      } else {
        this.props.navigation.navigate('WelcomePage');
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
      <Spinner>
        <ActivityIndicator size="large" color="#00ff00" />
      </Spinner>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingPage);

export const Spinner = styled.View`
  flex: 1;
  align-items: center;
  position: relative;
  top: 40%;
`;

export const PhoneScreen = styled.View`
  flex: 1;
  align-items: center;
  background-color: skyblue;
`;

AppRegistry.registerComponent('PositiveApp', () => LoadingPage);
