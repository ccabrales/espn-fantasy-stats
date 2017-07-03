import { UPDATE_LEAGUE_AND_SEASON_ID } from '../actions/navBarActions';

export const initialState = {
  leagueId: '',
  seasonId: new Date().getFullYear()
};

/**
 * Reducer for tracking the overall league ID and season for the site
 * @param state
 * @param action
 * @returns {Object} state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LEAGUE_AND_SEASON_ID:
      return Object.assign({}, state, { leagueId: action.leagueId, seasonId: action.seasonId });
    default:
      return state;
  }
};
