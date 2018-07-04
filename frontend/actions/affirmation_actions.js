import * as affirmationUtil from '../util/affirmation_util';

export const RECEIVE_AFFIRMATION = 'RECEIVE_AFFIRMATION';

export const receiveAffirmation = affirmation => ({
  type: RECEIVE_AFFIRMATION,
  affirmation
});

export const fetchRandom = () => dispatch => (
  affirmationUtil.fetchRandom().then(affirmation => (
    dispatch(receiveAffirmation(affirmation))
  ))
);
