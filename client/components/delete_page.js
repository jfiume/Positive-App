import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ActivityIndicator, Text, View, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { deleteUser } from '../actions/user_actions';

class DeletePage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.navigation.state);
    this.deleteUse = this.deleteUser.bind(this);
  }

  deleteUser(id, e) {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {text: 'Yes', onPress: () => {
          this.props.deleteUser(id);
          AsyncStorage.clear();
          this.props.navigation.navigate('WelcomePage');
        }},
        {text: 'No', onPress: () => this.props.navigation.navigate('PositivePage')},
      ],
      { cancelable: false }
    )
  }

  render() {
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    if (!loadingUser && Object.keys(this.props.user).length > 0) {
      const user = this.props.user.name;
      return (
        <PhoneScreen>
          <DeleteWarning>Are you sure you want to permenently delete your profile?</DeleteWarning>
          <DeleteButton onPress={(e) => this.deleteUser(this.props.user._id ,e)}>
            <DeleteButtonBackground>
              <DeleteButtonText>Delete</DeleteButtonText>
            </DeleteButtonBackground>
          </DeleteButton>
        </PhoneScreen>
      )
    } else {
      return (
        <ActivityIndicator size="large" color="#0000ff" />
      )
    }
  }
}

const mapStateToProps = ({ user, loadingStatus }) => {
  return {
    user,
    loadingStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePage);

const PhoneScreen = styled.View`
  flex: 1;
  align-items: center;
  background-color: lightskyblue;
`;

const DeleteWarning = styled.Text`
  color: black;
  font-size: 20px;
  top: 30%;
  position: absolute;
`;

const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  position: absolute;
  top: 40%;
  flex: 1;
`;

const DeleteButtonBackground = styled.View`
  align-items: center;
  background-color: firebrick;
  position: relative;
  margin: 10px;
  width: 300px;
  height: 80px;
`;

const DeleteButtonText = styled.Text`
  font-size: 20px;
  padding: 30px;
  color: white;
  font-weight: bold;
`;

AppRegistry.registerComponent('PositiveApp', () => DeletePage);
