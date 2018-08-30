import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';

class DeletePage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.navigation.state);
  }

  render() {
    const { loadingUser } = this.props.loadingStatus.loadingUser;
    if (!loadingUser && Object.keys(this.props.user).length > 0) {
      const user = this.props.user.name;
      return (
        <Text>Delete Page</Text>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletePage);


AppRegistry.registerComponent('PositiveApp', () => DeletePage);
