import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ActivityIndicator, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { updateUser } from '../actions/user_actions';

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    console.log(this.props.navigation.state);
    this.editUser = this.editUser.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          title="Delete User"
          color="black"
          onPress={() => navigation.navigate('DeletePage')}
        /> //
      )
    }
  }

  editUser(id, e) {
    const { name } = this.state;
    // prevents adding a blank name
    if (name === "") {
      return;
    }
    const user = { name: name };
    this.props.updateUser(id, user);
    this.props.navigation.navigate('PositivePage');
  }

  render() {
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    if (!loadingUser && Object.keys(this.props.user).length > 0) {
      const user = this.props.user.name;
      return (
        <View>
          <TextInput
          placeholder="Please enter your new name here"
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          autoCapitalize="words"
          keyboardAppearance="default"
          keyboardType='default'
          autoCorrect={false}
          autoFocus={true}/>
          <TouchableOpacity onPress={(e) => this.editUser(this.props.user._id, e)}>
            <View>
              <Text>Update</Text>
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
    updateUser: (id, name) => dispatch(updateUser(id, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);


AppRegistry.registerComponent('PositiveApp', () => EditPage);
