/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SHOW_SIGN_IN_MODAL,
  HIDE_SIGN_IN_MODAL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  signInModalVisible:false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_SIGN_IN_MODAL:
      return state.set('signInModalVisible',true)
    case HIDE_SIGN_IN_MODAL:
      return state.set('signInModalVisible',false)
    default:
      return state;
  }
}

export default appReducer;
