import { createSelector } from "reselect";

const selectHome = state => state.get("home");
const selectRoute = state => state.get("route");

const makeSelectTopicLists = () =>
  createSelector(selectHome, homeState => homeState.get("topic_lists"));

const makeSelectError = () =>
  createSelector(selectHome, homeState => homeState.get("error"));
const makeSelectRoute = () =>
  createSelector(selectRoute, routeState => routeState.get("location"));

export { selectHome, makeSelectTopicLists, makeSelectError,makeSelectRoute };
