import merge from 'lodash/merge';

import { SET_CURRENT_USER } from '../util/session_api_util';

import { RECEIVE_REVIEW, RECEIVE_BENCH } from '../actions/bench_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case SET_CURRENT_USER:
      return merge({}, state, { [action.payload.handle]: action.payload });
    case RECEIVE_REVIEW:
      return merge({}, state, { [action.author.id]: action.author });
    case RECEIVE_BENCH:
      return merge({}, state, action.authors);
    default:
      return state;
  }
};

export default usersReducer;
