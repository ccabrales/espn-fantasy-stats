export const UPDATE_LEAGUE_AND_SEASON_ID = 'UPDATE_LEAGUE_AND_SEASON_ID';

const updateLeagueAndSeasonId = (leagueId, seasonId) => ({
  type: UPDATE_LEAGUE_AND_SEASON_ID,
  leagueId,
  seasonId
});

export const actions = {
  updateLeagueAndSeasonId
};
