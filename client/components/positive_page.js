import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, AsyncStorage, ActivityIndicator, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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
    this.longPress = this.longPress.bind(this);
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
        // fetch me the previous user
        this.props.fetchUser(id);
      }
    } catch (error) {
      // erase all previous data from AsyncStorage if no user is found
      AsyncStorage.clear();
      // Error retrieving data
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  componentDidMount() {
    if (Object.values(this.props.affirmations).length < 1) {
      this.props.fetchAllAffirmations();
    }
  }

  componentDidUpdate(prevProps) {
    // if we are unable to fetch the previous user
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    if (!loadingUser && this.props.user.name === "Not In Database") {
      AsyncStorage.clear();
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

  longPress() {
    this.props.fetchAllAffirmations();
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
          source={{uri: 'https://res.cloudinary.com/pancake/image/upload/c_scale,w_2400/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
        />
        <Heading>Good {day} {user}</Heading>
        <Affirmation>
          <TouchableWithoutFeedback onLongPress={this.longPress}>
            <Affirmation_Text>{affirmations[affirmationIndex].body}</Affirmation_Text>
          </TouchableWithoutFeedback>
        </Affirmation>
      </PhoneScreen>
      )
    } else {
      return (
        <Spinner>
          <ActivityIndicator size="large" color="#00BFFF" />
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
  color: #9400D3;
  top: 10%;
  font-size: 40;
  position: absolute;
  text-align: center;
`;

const Affirmation = styled.View`
  position: absolute;
  bottom: 4%;
`;

const Affirmation_Text = styled.Text`
  color: #9400D3;
  font-size: 50;
`;

const BackgroundImg = styled.Image`
  width: 100%;
  height: 100%;
  position: relative;
`;

AppRegistry.registerComponent('PositiveApp', () => PositivePage);
