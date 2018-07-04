import {
  RECEIVE_AFFIRMATION
} from '../actions/affirmation_actions';

const AffirmationReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_AFFIRMATION:
      return Object.assign({}, action.affirmation);
    default:
      return state;
  }
};

export default AffirmationReducer;
