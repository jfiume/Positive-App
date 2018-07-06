import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, TextInput, Alert, TouchableOpacity, Keyboard } from 'react-native';
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
   Alert.alert(`You have entered you name as ${name}. Please press OK`)
  }

  // componentDidMount () {
  //   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  //   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  // }
  //
  // componentWillUnmount () {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }
  //
  // _keyboardDidShow () {
  //   alert('Keyboard Shown');
  // }
  //
  // _keyboardDidHide () {
  //   alert('Keyboard Hidden');
  // }

  render() {
    return (
      <PhoneScreen>
        <SubmitButton onPress={this.getNameFun}>
          <SubmitButtonBackground>
              <SubmitButtonText>Submit</SubmitButtonText>
          </SubmitButtonBackground>
        </SubmitButton>
        {/* <BackgroundImg
        source={{uri: 'https://res.cloudinary.com/pancake/image/upload/v1528504474/blue-sky-with-sun-clouds-and-airplane-trail_jgkstb.jpg'}}
      /> */}
      <WelcomeGreeting>Welcome to the PositiveApp</WelcomeGreeting>
      <NameInput
        placeholder="Please enter your name here"
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
        autoCapitalize="words"
        keyboardAppearance="default"
      />
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

const BackgroundImg = styled.Image`
  width: 400;
  height: 900;
  position: relative;
`;

const WelcomeGreeting = styled.Text`
  color: black;
  font-size: 30;
  top: 20%;
  position: absolute;
`;

const NameInput = styled.TextInput`
  position: absolute;
  top: 50%;
  color: black;
`;

const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  top: 20%;
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
