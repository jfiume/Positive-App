import * as affirmationUtil from '../util/affirmation_util';

export const RECEIVE_AFFIRMATION = 'RECEIVE_AFFIRMATION';
export const START_LOADING_RANDOM_AFFIRMATION = 'START_LOADING_RANDOM_AFFIRMATION';

export const receiveAffirmation = affirmation => ({
  type: RECEIVE_AFFIRMATION,
  affirmation
});

export const startLoadingRandomAffirmation = () => ({
  type: START_LOADING_RANDOM_AFFIRMATION
});

export const fetchRandom = () => dispatch => {
  // Signal that we are starting our async call
  dispatch(startLoadingRandomAffirmation());
  return (
    affirmationUtil.fetchRandom().then(affirmation => (
      dispatch(receiveAffirmation(affirmation))
    ))
  );
};
