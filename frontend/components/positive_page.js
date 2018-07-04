import React, { Component } from 'react';
import { AppRegistry, Text, View, Image } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { fetchRandom } from '../actions/affirmation_actions';
import { fetchUser } from '../actions/user_actions';

class PositivePage extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      // name: 'Joe',
      // affirmation: 'Today is a good day',
      // name: this.props.user
    // }
  }

  async fetchUsers() {
    try {
      const response = await fetch("http://localhost:5000/user");
      const users = await response.json();
      console.log(users);
      return users;
    } catch (e) {
      console.error("API request raised an error:", e);
    }
  };

  componentDidMount() {
    // this.props.fetchUser(this.props.match.params.id);
    // this.props.fetchRandom();
    this.fetchUsers();
  }

  render() {
    return (
      <PhoneScreen>
        <BackgroundImg
          source={{uri: 'https://res.cloudinary.com/pancake/image/upload/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
        />
        <Heading>Good Day Joe</Heading>
        <Affirmation>Today is a good day</Affirmation>
      </PhoneScreen>
    )
  }
}

const mapStateToProps = ({ user, affirmation }) => {
  return {
    // user,
    // affirmation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchUser: (user) => dispatch(fetchUser(user)),
    // fetchRandom: () => dispatch(fetchRandom())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PositivePage);


const PhoneScreen = styled.View`
  flex: 1;
  align-items: center;
  background-color: skyblue;
`;

const Heading = styled.Text`
  color: white;
  top: 20%;
  font-size: 30;
  position: absolute;
`;

const Affirmation = styled.Text`
  color: white;
  font-size: 40;
  position: absolute;
  top: 75%;
`;

const BackgroundImg = styled.Image`
  width: 400;
  height: 900;
  position: relative;
`;

AppRegistry.registerComponent('PositiveApp', () => PositivePage);
