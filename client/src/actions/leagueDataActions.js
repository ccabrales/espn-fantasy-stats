import fetchService from '../services/fetchService';
import { actions as teamDetailsActions, formatTeamDetails } from './teamDetailsActions';

export const REQUEST_LEAGUE_DATA = 'REQUEST_LEAGUE_DATA';
export const RECEIVE_LEAGUE_DATA = 'RECEIVE_LEAGUE_DATA';

/**
 * Request league data with the leagueId and seasonId given
 * @param leagueId
 * @param seasonId
 */
const requestLeagueData = (leagueId, seasonId) => ({
  type: REQUEST_LEAGUE_DATA,
  leagueId,
  seasonId
});

/**
 * Receive the league data
 * @param payload
 * @param leagueId
 * @param seasonId
 */
const receiveLeagueData = (payload, leagueId, seasonId) => ({
  type: RECEIVE_LEAGUE_DATA,
  payload,
  leagueId,
  seasonId
});

/**
 * League data actions
 * @type {Object}
 */
export const actions = {
  requestLeagueData,
  receiveLeagueData
};

/**
 * Since league data contains a lot of the same data other pages need, add the already fetched data to the store
 * on the proper state properties.
 * @param {function} dispatch
 * @param {Object} leagueData
 * @param leagueId
 * @param seasonId
 */
const dispatchSharedData = (dispatch, leagueData, leagueId, seasonId) => {
  const { metadata, leaguesettings: leagueSettings } = leagueData;

  const teams = formatTeamDetails(Object.values(leagueSettings.teams));
  dispatch(teamDetailsActions.receiveTeamDetails({ teams, metadata }, leagueId, seasonId));
};

/**
 * Return the leagueData object
 * @param leagueData
 * @returns {Object} leagueData with keys omitted so data is not duplicated
 */
const omitKeys = leagueData => {
  const { leaguesettings, metadata } = leagueData;
  const { teams, slotCategoryItems, ...rest } = leaguesettings;
  return { leaguesettings: rest, metadata };
};

/**
 * Mapping from index to position
 * @type {Object}
 */
const rosterMap = {
  0: 'QB',
  1: 'TQB',
  2: 'RB',
  3: 'RB/WR',
  4: 'WR',
  5: 'WR/TE',
  6: 'TE',
  7: 'OP',
  8: 'DT',
  9: 'DE',
  10: 'LB',
  11: 'DL',
  12: 'CB',
  13: 'S',
  14: 'DB',
  15: 'DP',
  16: 'D/ST',
  17: 'K',
  18: 'P',
  19: 'HC',
  20: 'BE',
  21: 'IR',
  22: '',
  23: 'RB/WR/TE'
};

/**
 * Get roster settings for the league
 * @param leagueSettings
 */
const getRosterSettings = leagueSettings => {
  const { slotCategoryItems } = leagueSettings;

  return slotCategoryItems.map((item, index) => ({ name: rosterMap[index], num: item.num }));
};

/**
 * Format the league data
 * @param leagueData
 */
const formatData = leagueData => {
  const { leaguesettings } = leagueData;
  const rosterSettings = getRosterSettings(leaguesettings);

  const league = Object.assign({}, leaguesettings, { rosterSettings });

  const formattedData = Object.assign({}, leagueData, { leaguesettings: league });
  return omitKeys(formattedData);
};

/**
 * Fetch league details for the provided league and season IDs
 * @param leagueId
 * @param seasonId
 */
export const fetchLeagueData = (leagueId, seasonId) => (
  dispatch => {
    dispatch(requestLeagueData(leagueId, seasonId));

    return fetchService(`/api/leagueInfo?leagueId=${leagueId}&seasonId=${seasonId}`)
      .then(leagueData => {
        const formattedData = formatData(leagueData);
        dispatch(receiveLeagueData(formattedData, leagueId, seasonId));
        dispatchSharedData(dispatch, leagueData, leagueId, seasonId);
      })
      .catch(ex => {
        dispatch(receiveLeagueData({ errorMessage: ex }, leagueId, seasonId));
        throw ex;
      });
  }
);

/**
 * Determine whether or not to fetch the league data for the provided league and season
 * @param state
 * @param leagueId
 * @param seasonId
 * @returns {boolean}
 */
const shouldFetchLeagueData = (state, leagueId, seasonId) => {
  const detailsByLeague = state.leagueData[leagueId];
  const details = detailsByLeague ? detailsByLeague[seasonId] : null;
  if (!details) {
    return true;
  } else if (details.isFetching) {
    return false;
  } else if (details.data.errorMessage) { // Retry if there was an error before
    return true;
  }
  return false;
};

/**
 * Only fetch the league data if not already in the store
 * @param leagueId
 * @param seasonId
 */
export const fetchLeagueDataIfNeeded = (leagueId, seasonId) => (
  (dispatch, getState) => {
    if (leagueId && seasonId) {
      if (shouldFetchLeagueData(getState(), leagueId, seasonId)) {
        return dispatch(fetchLeagueData(leagueId, seasonId));
      }
      return Promise.resolve();
    }
    // If the above if statement is not executed, one of the required params are undefined and no call should be made
    const errorMessage = 'League ID and/or Season ID is invalid';
    // dispatch(receiveLeagueData({ errorMessage }, leagueId, seasonId));
    return Promise.reject(errorMessage);
  }
);
