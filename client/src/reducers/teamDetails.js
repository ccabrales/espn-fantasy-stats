import {
  REQUEST_TEAM_DETAILS,
  RECEIVE_TEAM_DETAILS
} from '../actions/teamDetailsActions';

export const initialState = {};

const detailsForSeason = (state = {
  isFetching: false,
  data: {}
}, action) => {
  switch (action.type) {
    case REQUEST_TEAM_DETAILS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TEAM_DETAILS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload
      });
    default:
      return state;
  }
};

/**
 * Handler for requesting or receiving details data that will set the state of the correct object
 * @param state
 * @param action
 * @returns {Object}
 */
const teamDetails = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEAM_DETAILS:
      return Object.assign({}, state, {
        [action.seasonId]: detailsForSeason(state[action.seasonId], action)
      });
    case RECEIVE_TEAM_DETAILS:
      return Object.assign({}, state, {
        [action.seasonId]: detailsForSeason(state[action.seasonId], action)
      });
    default:
      return state;
  }
};

/**
 * Reducer for adding team details to state
 * @param state
 * @param action
 * @returns {Object} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TEAM_DETAILS:
    case RECEIVE_TEAM_DETAILS:
      return Object.assign({}, state, {
        [action.leagueId]: teamDetails(state[action.leagueId], action)
      });
    default:
      return state;
  }
};
