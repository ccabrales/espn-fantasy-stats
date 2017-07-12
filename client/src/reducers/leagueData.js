import {
  REQUEST_LEAGUE_DATA,
  RECEIVE_LEAGUE_DATA
} from '../actions/leagueDataActions';

export const initialState = {};

const dataForSeason = (state = {
  isFetching: false,
  data: {}
}, action) => {
  switch (action.type) {
    case REQUEST_LEAGUE_DATA:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_LEAGUE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload
      });
    default:
      return state;
  }
};

/**
 * Handler for requesting or receiving data that will set the state of the correct object
 * @param state
 * @param action
 * @returns {Object}
 */
const leagueData = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LEAGUE_DATA:
      return Object.assign({}, state, {
        [action.seasonId]: dataForSeason(state[action.seasonId], action)
      });
    case RECEIVE_LEAGUE_DATA:
      return Object.assign({}, state, {
        [action.seasonId]: dataForSeason(state[action.seasonId], action)
      });
    default:
      return state;
  }
};

/**
 * Reducer for adding league data to state
 * @param state
 * @param action
 * @returns {Object} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LEAGUE_DATA:
    case RECEIVE_LEAGUE_DATA:
      return Object.assign({}, state, {
        [action.leagueId]: leagueData(state[action.leagueId], action)
      });
    default:
      return state;
  }
};
