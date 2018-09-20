import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';

class LoadingPage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.navigation.state);
  }

  componentWillMount() {
    this._retrieveUserId();
  }

  async _retrieveUserId() {
    try {
      // if we have the previous user id, then we execute the conditional
      const id = await AsyncStorage.getItem('userId');
      console.log(id);
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
      <LoadingCircle />
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

const LoadingCircle = styled.ActivityIndicator`
`;


AppRegistry.registerComponent('PositiveApp', () => LoadingPage);
