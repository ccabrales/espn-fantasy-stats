import reducer, { initialState } from '../leagueData';
import { REQUEST_LEAGUE_DATA, RECEIVE_LEAGUE_DATA } from '../../actions/leagueDataActions';

describe('(Reducers) leagueData', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('REQUEST_LEAGUE_DATA handler', () => {
    const leagueId = 12345;
    const seasonId = 2017;

    it('Should correctly add data to store when it begins empty', () => {
      const newState = reducer({}, {
        type: REQUEST_LEAGUE_DATA,
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

    it('Should correctly add data to store when it contains existing data', () => {
      const firstState = {
        12345: {
          2016: {
            isFetching: false,
            data: {
              leaguesettings: {}
            }
          }
        }
      };
      const newState = reducer(firstState,
        {
          type: REQUEST_LEAGUE_DATA,
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

  describe('RECEIVE_LEAGUE_DATA handler', () => {
    const leagueId = 12345;
    const seasonId = 2017;

    it('Should correctly add data to store when it begins empty', () => {
      const payload = {
        leaguesettings: {
          size: 10
        }
      };
      const newState = reducer({}, {
        type: RECEIVE_LEAGUE_DATA,
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
        leaguesettings: {
          size: 10
        }
      };
      const newState = reducer(firstState,
        {
          type: RECEIVE_LEAGUE_DATA,
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

  describe('Default handler', () => {
    it('Should return the same state back with unrecognized action type', () => {
      const firstState = {
        12345: {
          2017: {
            isFetching: true,
            data: {}
          }
        }
      };

      const newState = reducer(firstState,
        {
          type: 'RANDOM_OTHER_TYPE',
          payload: 'Text'
        }
      );

      expect(newState).toEqual(firstState);
    });
  });
});
