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

    this.createUserFun = this.createUserFun.bind(this);
  }

  async _storeData(user) {
    const userId = user.user._id
    try {
      await AsyncStorage.setItem('userId', userId);
    } catch (error) {
      // Error saving data
      console.log("AsyncStorage request raised an error:", e);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (Object.keys(nextProps.user).length > 0) {
      this.props.navigation.navigate('PositivePage');
      return true;
    }
    return true;
  }

  createUserFun() {
   const { name } = this.state;
   if (name === "") {
     return;
   }
   const user = { name: name };
   this.props.createUser(user).then((user) => this._storeData(user));
   this.props.navigation.navigate('PositivePage');
  }

  render() {
    const { loading } = this.props.loadingStatus;
    if (!loading && Object.values(this.props.affirmation).length > 0) {
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
  top: 20%;
  position: absolute;
`;

const NameInput = styled.TextInput`
  position: relative;
  margin: 10px;
  color: black;
  width: 200px;
  text-align: center;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  position: absolute;
  top: 35%;
  flex: 1;
`;

const SubmitButtonBackground = styled.View`
  alignItems: center;
  backgroundColor: #2196F3;
  position: relative;
  margin: 10px;
  width: 200px;
`;

const SubmitButtonText = styled.Text`
  padding: 20px;
  color: white;
`;


AppRegistry.registerComponent('PositiveApp', () => WelcomePage);
