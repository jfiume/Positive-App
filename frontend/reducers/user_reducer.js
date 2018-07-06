import {
  RECIEVE_USER
} from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECIEVE_USER:
      const newUser = action.user;
      return Object.assign({}, newUser);
    default:
      return state;
  }
};

export default UserReducer;
