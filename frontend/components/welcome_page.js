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
      <View>
        <BackgroundImg
        source={{uri: 'https://res.cloudinary.com/pancake/image/upload/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
      />
      <WelcomeGreeting>Welcome to the PositiveApp</WelcomeGreeting>
      </View>
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

const BackgroundImg = styled.Image`
  width: 400;
  height: 900;
  position: relative;
`;

const WelcomeGreeting = styled.Text`
  color: white;
  top: 20%;
  font-size: 30;
  position: absolute;
`;


AppRegistry.registerComponent('PositiveApp', () => WelcomePage);
