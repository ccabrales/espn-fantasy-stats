import reducer, { initialState } from '../teamDetails';
import { REQUEST_TEAM_DETAILS, RECEIVE_TEAM_DETAILS } from '../../actions/teamDetails';

describe('(Reducers) teamDetails', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('REQUEST_TEAM_DETAILS handler', () => {
    const leagueId = 12345;
    const seasonId = 2017;

    it('Should correctly add details to store when it begins empty', () => {
      const newState = reducer({}, {
        type: REQUEST_TEAM_DETAILS,
        leagueId,
        seasonId
      });
      expect(newState).toEqual({
        12345: {
          2017: {
            isFetching: true,
            data: {}
          }
        }
      });
    });

    it('Should correctly add details to store when it contains existing data', () => {
      const firstState = {
        12345: {
          2016: {
            isFetching: false,
            data: {
              teams: [ { teamId: 1 } ]
            }
          }
        }
      };
      const newState = reducer(firstState,
        {
          type: REQUEST_TEAM_DETAILS,
          leagueId,
          seasonId
        }
      );

      expect(newState).toEqual({
        12345: {
          2016: firstState[leagueId][2016],
          2017: {
            isFetching: true,
            data: {}
          }
        }
      });
    });
  });

  describe('RECEIVE_TEAM_DETAILS handler', () => {
    const leagueId = 12345;
    const seasonId = 2017;

    it('Should correctly add details to store when it begins empty', () => {
      const payload = {
        teams: [
          { teamId: 1 }, { teamId: 2 }
        ]
      };
      const newState = reducer({}, {
        type: RECEIVE_TEAM_DETAILS,
        payload,
        leagueId,
        seasonId
      });
      expect(newState).toEqual({
        12345: {
          2017: {
            isFetching: false,
            data: payload
          }
        }
      });
    });

    it('Should correctly change isFetching from false to true', () => {
      const firstState = {
        12345: {
          2017: {
            isFetching: true,
            data: {}
          }
        }
      };
      const payload = {
        teams: [
          { teamId: 1 }, { teamId: 2 }
        ]
      };
      const newState = reducer(firstState,
        {
          type: RECEIVE_TEAM_DETAILS,
          payload,
          leagueId,
          seasonId
        }
      );

      expect(newState).toEqual({
        12345: {
          2017: {
            isFetching: false,
            data: payload
          }
        }
      });
    });
  });
});
