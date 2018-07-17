import {
  RECEIVE_AFFIRMATIONS
} from '../actions/affirmation_actions';

const AffirmationReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AFFIRMATIONS:
      return Object.assign({}, action.affirmations);
    default:
      return state;
  }
};

export default AffirmationReducer;
