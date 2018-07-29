import * as affirmationUtil from '../util/affirmation_util';

export const RECEIVE_AFFIRMATIONS = 'RECEIVE_AFFIRMATIONS';
export const START_LOADING_ALL_AFFIRMATIONS = 'START_LOADING_ALL_AFFIRMATIONS';

export const receiveAffirmations = affirmations => ({
  type: RECEIVE_AFFIRMATIONS,
  affirmations
});

export const startLoadingAllAffirmations = () => ({
  type: START_LOADING_ALL_AFFIRMATIONS
});

export const fetchAllAffirmations = () => dispatch => {
  // Signal that we are starting our async call
  dispatch(startLoadingAllAffirmations());
  return (
    affirmationUtil.fetchAllAffirmations().then(affirmations => (
      dispatch(receiveAffirmations(affirmations))
    ))
  );
};
