import { combineReducers } from 'redux';

import AffirmationReducer from './affirmation_reducer';
import UserReducer from './user_reducer';

const RootReducer = combineReducers({
  affirmation: AffirmationReducer,
  user: UserReducer
});

export default RootReducer;
