import { RECEIVE_AFFIRMATIONS, START_LOADING_ALL_AFFIRMATIONS } from '../actions/affirmation_actions';
import { RECIEVE_USER, START_LOADING_USER } from '../actions/affirmation_actions';

const initialState = {
  loading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AFFIRMATIONS:
      return Object.assign({}, state, { loading: false });
    case RECIEVE_USER:
      return Object.assign({}, state, { loading: false });
    case START_LOADING_ALL_AFFIRMATIONS:
      return Object.assign({}, state, { loading: true });
    case START_LOADING_USER:
      return Object.assign({}, state, { loading: true });
    default:
      return state;
  }
};

export default loadingReducer;
