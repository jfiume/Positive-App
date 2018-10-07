import {
  RECIEVE_USER
} from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECIEVE_USER:
      let newUser;
      // create a dummy user to trigger logic to wipe AsyncStorage and bring us back to the Welcome Page
      if (!action.user) {
        newUser = { _id: false, name: "Not In Database", _v: false };
      } else {
        newUser = action.user;
      }
      return Object.assign({}, newUser);
    default:
      return state;
  }
};

export default UserReducer;
