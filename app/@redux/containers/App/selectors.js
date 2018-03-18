/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);
const makeSelectSignInModal = ()=>createSelector(
  selectGlobal,
  globalState=>globalState.get('signInModalVisible')
)

export {
  selectGlobal,
  selectRoute,
  makeSelectSignInModal,
};
