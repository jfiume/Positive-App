import { combineReducers } from 'redux';

import AffirmationReducer from './affirmation_reducer';
import UserReducer from './user_reducer';
import loadingReducer from './loading_reducer';

const RootReducer = combineReducers({
  affirmations: AffirmationReducer,
  user: UserReducer,
  loadingStatus: loadingReducer,
});

export default RootReducer;
