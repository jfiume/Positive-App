import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, TextInput, Alert, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createUser } from '../actions/user_actions';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    console.log(this.props.navigation.state);
    this.createUserFun = this.createUserFun.bind(this);
  }

  async _storeData(user) {
    // Saving the current user's ID in the AsyncStorage for the next time they open the app
    const userId = user.user._id
    try {
      await AsyncStorage.setItem('userId', userId);
    } catch (error) {
      // Error saving data
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  createUserFun() {
   const { name } = this.state;
   // prevents adding a blank name
   if (!name) {
     return;
   }
   const user = { name: name };
   this.props.createUser(user).then((user) => this._storeData(user));
   this.props.navigation.navigate('PositivePage');
  }

  render() {
    return (
      <PhoneScreen>
        <WelcomeGreeting>Welcome to the PositiveApp</WelcomeGreeting>
        <SubmitButton onPress={this.createUserFun}>
          <NameInput
            placeholder="Please enter your name here"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            autoCapitalize="words"
            keyboardAppearance="default"
            keyboardType='default'
            autoCorrect={false}
            autoFocus={true}
          />
          <SubmitButtonBackground>
            <SubmitButtonText>Submit</SubmitButtonText>
          </SubmitButtonBackground>
        </SubmitButton>
      </PhoneScreen>
    )
  }
}

const mapStateToProps = ({ user, affirmations, loadingStatus }) => {
  return {
    user,
    affirmations,
    loadingStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);


const PhoneScreen = styled.View`
  flex: 1;
  align-items: center;
  background-color: skyblue;
`;

const WelcomeGreeting = styled.Text`
  color: black;
  font-size: 30;
  top: 15%;
  position: absolute;
`;

const NameInput = styled.TextInput`
  position: relative;
  margin: 10px;
  color: white;
  top: 10%;
  font-size: 24px;
  width: 300px;
  height: 60px;
  text-align: center;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  position: absolute;
  top: 30%;
  flex: 1;
`;

const SubmitButtonBackground = styled.View`
  align-items: center;
  background-color: #2196F3;
  position: relative;
  margin: 10px;
  width: 300px;
`;

const SubmitButtonText = styled.Text`
  padding: 20px;
  color: white;
  font-size: 20px;
`;


AppRegistry.registerComponent('PositiveApp', () => WelcomePage);
