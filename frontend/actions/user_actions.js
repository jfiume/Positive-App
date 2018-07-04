import * as userUtil from '../util/user_util';

export const RECIEVE_USER = 'RECIEVE_USER';

export const receiveUser = user => ({
  type: RECIEVE_USER,
  user
});

export const fetchUser = () => dispatch => (
  userUtil.fetchUser().then(user => (
    dispatch(receiveUser(user))
  ))
);

export const createUser = (name) => dispatch => (
  userUtil.createUser(name).then(user => (
    dispatch(receiveUser(user))
  ))
);

export const updateUser = (name) => dispatch => (
  userUtil.updateUser(name).then(user => (
    dispatch(receiveUser(user))
  ))
);
