import {
  RECEIVE_AFFIRMATION
} from '../actions/affirmation_actions';

const AffirmationReducer = (state = {}, action) => {
  Object.freeze(state);
  console.log(action);
  switch (action.type) {
    case RECEIVE_AFFIRMATION:
      const affirmation = {[action.affirmation.id]: action.affirmation};
      return Object.assign({}, affirmation);
    default:
      return state;
  }
};

export default AffirmationReducer;
