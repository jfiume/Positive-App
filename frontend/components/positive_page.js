import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import RNShakeEvent from 'react-native-shake-event';

import { connect } from 'react-redux';
import { fetchRandom } from '../actions/affirmation_actions';
import { fetchUser } from '../actions/user_actions';

class PositivePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._retrieveData();
    RNShakeEvent.addEventListener('shake', () => {
      this.props.fetchRandom();
    });
    // if (!this.props.user && !loading && Object.values(this.props.affirmation).length > 0) {
    //   this.props.navigation.navigate('WelcomePage');
    // };
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  async _retrieveData() {
    try {
      // Saving the current user's ID in the AsyncStorage for the next time they open the app
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        this.props.fetchUser(id);
      } else {
        AsyncStorage.clear([callback]: ?(error: ?Error) => void)
      }
    } catch (error) {
      // Error retrieving data
      this.props.navigation.navigate('WelcomePage');
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  componentDidMount() {
    this.props.fetchRandom();
    const { loading } = this.props.loadingStatus;
    // if (!this.props.user && !loading && Object.values(this.props.affirmation).length > 0) {
    //   this.props.navigation.navigate('WelcomePage');
    // };
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user !== this.props.user && Object.keys(this.props.user).length < 1) {
  //     this._retrieveData();
  //   }
  // }
  //

  shouldComponentUpdate(nextProps) {
    if (nextProps.user === this.props.user && !this.props.user) {
      this.props.navigation.navigate('WelcomePage');
      return true;
    } else {
      return true;
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user !== this.props.user && Object.keys(this.props.user).length < 1) {
      this.props.navigation.navigate('PositivePage');
    }
  //   if (nextProps.affirmation !== this.props.affirmation && Object.keys(this.props.affirmation).length < 1) {
  //     this.props.fetchRandom();
  //   }
  }

  render() {
    const { loading } = this.props.loadingStatus;
    // We have to make sure our asynchronous fetch call has returned data before we can render
    if (!loading && Object.values(this.props.affirmation).length > 0 && Object.keys(this.props.user).length > 0) {
      const affirmation = this.props.affirmation;
      const user = this.props.user.name;
      // select the random affirmation from the front end
      const affirmationKey = this.props.affirmationKey;
      return (
        <PhoneScreen>
          <BackgroundImg
          source={{uri: 'https://res.cloudinary.com/pancake/image/upload/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
        />
        <Heading>Good Day {user}</Heading>
        <Affirmation>{affirmation[affirmationKey].body}</Affirmation>
      </PhoneScreen>
      )
    } else {
      return (
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
  }
}

const mapStateToProps = ({ user, affirmation, loadingStatus }) => {
  return {
    user,
    affirmation,
    loadingStatus,
    affirmationKey: randomSelector(affirmation)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRandom: () => dispatch(fetchRandom()),
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PositivePage);

const randomSelector = (affirmation) => {
  const random = Math.floor(Math.random() * Object.keys(affirmation).length);
  return random;
};

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
