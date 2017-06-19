import fetchService from '../services/fetchService';

export const REQUEST_TEAM_DETAILS = 'REQUEST_TEAM_DETAILS';
export const RECEIVE_TEAM_DETAILS = 'RECEIVE_TEAM_DETAILS';

const requestTeamDetails = (leagueId, seasonId) => ({
  type: REQUEST_TEAM_DETAILS,
  leagueId,
  seasonId
});

const receiveTeamDetails = (payload, leagueId, seasonId) => ({
  type: RECEIVE_TEAM_DETAILS,
  payload,
  leagueId,
  seasonId
});

export const actions = {
  requestTeamDetails,
  receiveTeamDetails
};

/**
 * Fetch the details for the provided league and season
 * @param leagueId
 * @param seasonId
 * @returns {function}
 */
export const fetchTeamDetails = (leagueId, seasonId) => (
  dispatch => {
    dispatch(requestTeamDetails(leagueId, seasonId));

    return fetchService(`/api/teamDetails?leagueId=${leagueId}&seasonId=${seasonId}`)
      .then(response => {
        dispatch(receiveTeamDetails(response, leagueId, seasonId));
      })
      .catch(() => {
        // TODO: track the error through other means
        dispatch(receiveTeamDetails({}, leagueId, seasonId));
      });
  }
);

/**
 * Determine whether or not to fetch the details for the provided league and season
 * @param {Object} state Current redux state
 * @param {number} leagueId
 * @param {number} seasonId
 * @returns {boolean}
 */
const shouldFetchTeamDetails = (state, leagueId, seasonId) => {
  const detailsByLeague = state.teamDetails[leagueId];
  const details = detailsByLeague ? detailsByLeague[seasonId] : null;
  if (!details) {
    return true;
  } else if (details.isFetching) {
    return false;
  }
  return false;
};

/**
 * Only fetch the team details if they are not already in the store
 * @param {number} leagueId
 * @param {number} seasonId
 * @returns {function}
 */
export const fetchTeamDetailsIfNeeded = (leagueId, seasonId) => (
  (dispatch, getState) => { // eslint-disable-line consistent-return
    if (leagueId && seasonId) {
      if (shouldFetchTeamDetails(getState(), leagueId, seasonId)) {
        return dispatch(fetchTeamDetails(leagueId, seasonId));
      }

      return Promise.resolve();
    }
    // If the above if statement is not executed, one of the required params are undefined and no call should be made
    return Promise.reject('League ID and/or Season ID is invalid');
  }
);
