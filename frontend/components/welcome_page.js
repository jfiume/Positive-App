import React, { Component } from 'react';
import { AppRegistry, Text, View, Image } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createUser } from '../actions/user_actions';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>Welcome</Text>
    )
  }

}

const mapStateToProps = ({ user, affirmation }) => {
  return {
    user,
    // affirmation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
    // fetchRandom: () => dispatch(fetchRandom())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);

AppRegistry.registerComponent('PositiveApp', () => WelcomePage);
