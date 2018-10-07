import { RECEIVE_AFFIRMATIONS, START_LOADING_ALL_AFFIRMATIONS } from '../actions/affirmation_actions';
import { RECIEVE_USER, START_LOADING_USER } from '../actions/user_actions';

const initialState = {
  loadingUser: false,
  loadingAffirmations: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AFFIRMATIONS:
      return Object.assign({}, state, { loadingAffirmations: false });
    case RECIEVE_USER:
      return Object.assign({}, state, { loadingUser: false });
    case START_LOADING_ALL_AFFIRMATIONS:
      return Object.assign({}, state, { loadingAffirmations: true });
    case START_LOADING_USER:
      return Object.assign({}, state, { loadingUser: true });
    default:
      return state;
  }
};

export default loadingReducer;
