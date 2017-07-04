import reducer, { initialState } from '../navBar';
import { UPDATE_LEAGUE_AND_SEASON_ID } from '../../actions/navBarActions';

describe('(Reducers) navBar', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('UPDATE_LEAGUE_AND_SEASON_ID handler', () => {
    const leagueId = 12345;
    const seasonId = 2017;

    it('Should correctly add details to store when it begins empty', () => {
      const newState = reducer({}, {
        type: UPDATE_LEAGUE_AND_SEASON_ID,
        leagueId,
        seasonId
      });

      expect(newState).toEqual({
        leagueId,
        seasonId
      });
    });

    it('Should correctly add details to store when it contains existing data', () => {
      const firstState = {
        leagueId: '54321',
        seasonId: 2015
      };
      const newState = reducer(firstState,
        {
          type: UPDATE_LEAGUE_AND_SEASON_ID,
          leagueId,
          seasonId
        }
      );

      expect(newState).toEqual({
        leagueId,
        seasonId
      });
    });
  });
});
