import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, AsyncStorage, ActivityIndicator, Button } from 'react-native';
import styled from 'styled-components';
import RNShakeEvent from 'react-native-shake-event';

import { connect } from 'react-redux';
import { fetchAllAffirmations } from '../actions/affirmation_actions';
import { fetchUser } from '../actions/user_actions';
import { Spinner, PhoneScreen } from './loading_page';

class PositivePage extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props.navigation.state);
    this.dayTime = this.dayTime.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          title="Edit User"
          color="black"
          onPress={() => navigation.navigate('EditPage')}
        /> //
      )
    }
  }

  componentWillMount() {
    this._retrieveData();
    RNShakeEvent.addEventListener('shake', () => {
      console.log('Device shake!');
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
        this.setState({userId: id});
        // fetch me the previous user
        this.props.fetchUser(id);
        // if we are unable to fetch the previous user
        const { loadingUser } = this.props.loadingStatus.loadingUser;
        if (!loadingUser && Object.keys(this.props.user).length === 0) {
          AsyncStorage.clear();
          this.props.navigation.navigate('WelcomePage');
        }
      }
    } catch (error) {
      // erase all previous data from AsyncStorage if no user is found
      AsyncStorage.clear();
      // Error retrieving data
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  componentDidMount() {
    this.props.fetchAllAffirmations();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.user) {
      this.props.navigation.navigate('WelcomePage');
    }
  }

  dayTime() {
    const now = new Date();
    const time = now.getHours();
    if (time < 12) {
      return "Morning"
    } else if (time >= 12 && time < 17) {
      return "Afternoon"
    } else {
      return "Evening"
    }
  }

  render() {
    const day = this.dayTime();
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
          source={{uri: 'https://res.cloudinary.com/pancake/image/upload/c_scale,w_400/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
        />

        <Heading>Good {day} {user}</Heading>
        <Affirmation>{affirmations[affirmationIndex].body}</Affirmation>
      </PhoneScreen>
      )
    } else {
      return (
        <Spinner>
          <ActivityIndicator size="large" color="#00ff00" />
        </Spinner>
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

const Heading = styled.Text`
  color: white;
  top: 10%;
  font-size: 40;
  position: absolute;
  text-align: center;
`;

const Affirmation = styled.Text`
  color: white;
  font-size: 50;
  position: absolute;
  bottom: 4%;
`;

const BackgroundImg = styled.Image`
  width: 100%;
  height: 100%;
  position: relative;
`;

AppRegistry.registerComponent('PositiveApp', () => PositivePage);
