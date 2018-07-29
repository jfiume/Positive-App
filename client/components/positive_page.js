import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import RNShakeEvent from 'react-native-shake-event';

import { connect } from 'react-redux';
import { fetchAllAffirmations } from '../actions/affirmation_actions';
import { fetchUser } from '../actions/user_actions';

class PositivePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state);
  }

  componentWillMount() {
    this._retrieveData();
    RNShakeEvent.addEventListener('shake', () => {
      this.props.fetchAllAffirmations();
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  async _retrieveData() {
    try {
      // retrieving the previous user's ID from the AsyncStorage
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        // fetch me the previous user
        this.props.fetchUser(id);
      }
    } catch (error) {
      // erase all previous data from AsyncStorage if no user is found
      AsyncStorage.clear([callback]: ?(error: ?Error) => void)
      // Error retrieving data
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  componentDidMount() {
    this.props.fetchAllAffirmations();
  }

  componentWillUpdate(nextProps) {
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    const { loadingAffirmations } = this.props.loadingStatus.loadingAffirmations;
    if (!loadingUser && !loadingAffirmations && Object.values(this.props.affirmations).length > 0 && Object.keys(nextProps.user).length < 1) {
      this.props.navigation.navigate('WelcomePage');
    }
  }

  render() {
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    const { loadingAffirmations } = this.props.loadingStatus.loadingAffirmations;
    // We have to make sure our asynchronous fetch call has returned data before we can render
    if (!loadingUser && !loadingAffirmations && Object.values(this.props.affirmations).length > 0 && Object.keys(this.props.user).length > 0) {
      const affirmations = this.props.affirmations;
      const user = this.props.user.name;
      // select the random affirmation index from the front end
      const affirmationIndex = this.props.affirmationIndex;
      return (
        <PhoneScreen>
          <BackgroundImg
          source={{uri: 'https://res.cloudinary.com/pancake/image/upload/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
        />
        <Heading>Good Day {user}</Heading>
        <Affirmation>{affirmations[affirmationIndex].body}</Affirmation>
      </PhoneScreen>
      )
    } else {
      return (
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
  }
}

const mapStateToProps = ({ user, affirmations, loadingStatus }) => {
  return {
    user,
    affirmations,
    loadingStatus,
    affirmationIndex: randomIndexSelector(affirmations)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAffirmations: () => dispatch(fetchAllAffirmations()),
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PositivePage);

const randomIndexSelector = (affirmations) => {
  const random = Math.floor(Math.random() * Object.keys(affirmations).length);
  return random;
};

const PhoneScreen = styled.View`
  flex: 1;
  align-items: center;
`;

const Heading = styled.Text`
  color: white;
  top: 12%;
  font-size: 30;
  position: absolute;
`;

const Affirmation = styled.Text`
  color: white;
  font-size: 40;
  position: absolute;
  bottom: 12%;
`;

const BackgroundImg = styled.Image`
  width: 400;
  height: 800;
  position: relative;
`;

AppRegistry.registerComponent('PositiveApp', () => PositivePage);