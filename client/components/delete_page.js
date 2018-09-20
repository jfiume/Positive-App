import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
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
    console.log(id);
    this.props.deleteUser(id);
    AsyncStorage.clear();
    this.props.navigation.navigate('WelcomePage');
  }

  render() {
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    if (!loadingUser && Object.keys(this.props.user).length > 0) {
      const user = this.props.user.name;
      return (
        <View>
          <Text>Are you sure you want to permenently delete your profile?</Text>
          <TouchableOpacity onPress={(e) => this.deleteUser(this.props.user._id ,e)}>
            <View>
              <Text>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    // fetchUser: id => dispatch(fetchUser(id))
    deleteUser: (id) => dispatch(deleteUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePage);


AppRegistry.registerComponent('PositiveApp', () => DeletePage);
