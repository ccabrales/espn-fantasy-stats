import { UPDATE_LEAGUE_AND_SEASON_ID, actions } from '../navBarActions';

describe('(Actions) navBar', () => {
  describe('Constants', () => {
    it('Should export a constant UPDATE_LEAGUE_AND_SEASON_ID', () => {
      expect(UPDATE_LEAGUE_AND_SEASON_ID).toEqual('UPDATE_LEAGUE_AND_SEASON_ID');
    });
  });

  describe('Action Creators', () => {
    describe('updateLeagueAndSeasonId', () => {
      it('Should export updateLeagueAndSeasonId as a function', () => {
        expect(typeof actions.updateLeagueAndSeasonId).toBe('function');
      });

      it('Should create an action with type UPDATE_LEAGUE_AND_SEASON_ID and necessary data', () => {
        const leagueId = 12345;
        const seasonId = 2016;
        const action = actions.updateLeagueAndSeasonId(leagueId, seasonId);

        expect(action).toHaveProperty('type', UPDATE_LEAGUE_AND_SEASON_ID);
        expect(action).toHaveProperty('leagueId', leagueId);
        expect(action).toHaveProperty('seasonId', seasonId);
      });
    });
  });
});
