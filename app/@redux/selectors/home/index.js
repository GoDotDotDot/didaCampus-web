import { createSelector } from "reselect";

const selectHome = state => state.get("home");
// const selectGlobal = state => state.get('global')

const makeSelectTopicLists = () =>
  createSelector(selectHome, homeState => homeState.get("topic_lists"));

const makeSelectError = () =>
  createSelector(selectHome, homeState => homeState.get("error"));
export { selectHome, makeSelectTopicLists, makeSelectError };
