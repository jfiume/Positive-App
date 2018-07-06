import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createUser } from '../actions/user_actions';

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.getNameFun = this.getNameFun.bind(this);
  }

  getNameFun() {
   const { name } = this.state;
   const user = { name: name };
   this.props.createUser(user);
   Alert.alert(`You have entered your name as ${name}. If you would like to edit your name, please hit the 'EDIT' button on the next screen. Please press OK`)
  }

  render() {
    return (
      <PhoneScreen>
      <WelcomeGreeting>Welcome to the PositiveApp</WelcomeGreeting>
      <SubmitButton onPress={this.getNameFun}>
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
  top: 250px;
  color: black;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  position: absolute;
  top: 10%;
  flex: 1;
`;

const SubmitButtonBackground = styled.View`
  margin-bottom: 30;
  width: 260px;
  alignItems: center;
  backgroundColor: #2196F3;
  top: 270px;
`;

const SubmitButtonText = styled.Text`
  padding: 20px;
  color: white;
`;


AppRegistry.registerComponent('PositiveApp', () => WelcomePage);
