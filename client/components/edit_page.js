import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { connect } from 'react-redux';

class EditPage extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.navigation.state);
  }

  render() {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);


AppRegistry.registerComponent('PositiveApp', () => EditPage);
