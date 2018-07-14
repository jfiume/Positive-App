import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, AsyncStorage } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { fetchRandom } from '../actions/affirmation_actions';
import { fetchUser } from '../actions/user_actions';

class PositivePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('userId');
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    if (Object.keys(this.props.user).length < 1) {
      this.props.navigation.navigate('WelcomePage');
    };
    this.props.fetchRandom();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props.loadingStatus;
    if (!loading && Object.keys(this.props.affirmation).length < 1) {
      this.props.fetchRandom();
    }
  }

  render() {
    const { loading } = this.props.loadingStatus;
    // We have to make sure our asynchronous fetch call has returned data before we can render
    if (!loading && Object.values(this.props.affirmation).length > 0) {
      const affirmation = this.props.affirmation;
      const user = this.props.user.name;
      // select the random affirmation from the front end
      const random = Math.floor(Math.random() * Object.keys(this.props.affirmation).length);
      return (
        <PhoneScreen>
          <BackgroundImg
          source={{uri: 'https://res.cloudinary.com/pancake/image/upload/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
        />
        <Heading>Good Day {user}</Heading>
        <Affirmation>{affirmation[random].body}</Affirmation>
      </PhoneScreen>
      )
    } else {
      return (
        <Text>Loading</Text>
      )
    }
  }
}

const mapStateToProps = ({ user, affirmation, loadingStatus }) => {
  return {
    user,
    affirmation,
    loadingStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRandom: () => dispatch(fetchRandom())
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
  bottom: 40;
`;

const BackgroundImg = styled.Image`
  width: 400;
  height: 900;
  position: relative;
`;

AppRegistry.registerComponent('PositiveApp', () => PositivePage);
