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

/**
 * Actions
 * @type {Object}
 */
export const actions = {
  requestTeamDetails,
  receiveTeamDetails
};

/**
 * Calculate margin of victory for each team at each week
 * @param {Array} teams
 */
const marginOfVictory = teams => (
  teams.map(team => {
    const marginOfVictory = [];
    team.schedule.forEach((matchup, week) => {
      const mov = team.scores[week] - matchup.scores[week];
      marginOfVictory.push(mov);
    });
    return Object.assign({}, team, { marginOfVictory });
  })
);

/**
 * Create the schedule for each team. Add scores and schedule properties to the team.
 * @param {Object} team
 */
const createSchedule = team => {
  const resultTeam = Object.assign({}, team, { scores: [], schedule: [] });

  resultTeam.scheduleItems.forEach(matchup => {
    const matchupItem = matchup.matchups[0];
    let score;
    let opponentId;

    if (matchupItem.isBye) { // Bye week
      score = matchupItem.homeTeamScores[0];
      opponentId = matchupItem.homeTeamId;
    } else if (matchupItem.awayTeamId === resultTeam.teamId) { // Regular matchup when current team is away
      score = matchupItem.awayTeamScores[0];
      opponentId = matchupItem.homeTeamId;
    } else { // Regular matchup when current team is home
      score = matchupItem.homeTeamScores[0];
      opponentId = matchupItem.awayTeamId;
    }

    resultTeam.scores.push(score);
    resultTeam.schedule.push(opponentId);
  });

  // Remove scheduleItems property from the team object
  const { scheduleItems, ...teamProps } = resultTeam;

  return teamProps;
};

/**
 * Add some additional properties to team details.
 * @param {Array} teams Array of teams
 * @returns {Array}
 */
export const formatTeamDetails = teams => {
  // Add properties, and turn into es6 Map for future step
  const teamMap = new Map(teams.map(team => {
    const teamName = `${team.teamLocation} ${team.teamNickname}`;
    const teamRecord = `${team.record.overallWins}-${team.record.overallLosses}-${team.record.overallTies}`;
    const pointsFor = team.record.pointsFor;
    const pointsAgainst = team.record.pointsAgainst;
    const teamWithSchedule = createSchedule(team);

    return [ team.teamId, { ...teamWithSchedule, teamName, teamRecord, pointsFor, pointsAgainst } ];
  }));

  // Change schedule items to be the opponent scores array and ID
  teamMap.forEach(team => {
    const newSchedule = team.schedule.map(opponentId => {
      const opponent = teamMap.get(opponentId);
      return { scores: opponent.scores, teamId: opponent.teamId };
    });
    const modifiedTeam = Object.assign({}, team, { schedule: newSchedule });
    teamMap.set(team.teamId, modifiedTeam);
  });

  return marginOfVictory([ ...teamMap.values() ]);
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
        const formattedTeams = formatTeamDetails(response.teams);
        dispatch(receiveTeamDetails({ teams: formattedTeams, metadata: response.metadata }, leagueId, seasonId));
      })
      .catch(ex => {
        dispatch(receiveTeamDetails({ errorMessage: ex }, leagueId, seasonId));
        throw ex;
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
  } else if (details.data.errorMessage) { // Retry if there was an error before
    return true;
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
