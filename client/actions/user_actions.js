import * as userUtil from '../util/user_util';

export const RECIEVE_USER = 'RECIEVE_USER';
export const START_LOADING_USER = 'START_LOADING_USER';

export const receiveUser = user => ({
  type: RECIEVE_USER,
  user
});

export const startLoadingUser = () => ({
  type: START_LOADING_USER
});

export const fetchUser = (id) => dispatch => {
  // Signal that we are starting our async call
  dispatch(startLoadingUser());
  return (
    userUtil.fetchUser(id).then(user => (
      dispatch(receiveUser(user))
    ))
  );
};

export const createUser = (name) => dispatch => (
  userUtil.createUser(name).then(user => (
    dispatch(receiveUser(user))
  ))
);

export const updateUser = (id, name) => dispatch => (
  userUtil.updateUser(id, name).then(user => (
    dispatch(fetchUser(user._id))
  ))
);

export const deleteUser = (id) => dispatch => (
  userUtil.deleteUser(id)
);
