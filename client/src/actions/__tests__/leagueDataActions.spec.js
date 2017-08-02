/* eslint-disable global-require, no-underscore-dangle */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  REQUEST_LEAGUE_DATA,
  RECEIVE_LEAGUE_DATA,
  actions,
  fetchLeagueData,
  fetchLeagueDataIfNeeded,
  formatLeagueData
} from '../leagueDataActions';
import { RECEIVE_TEAM_DETAILS } from '../teamDetailsActions';
import mockLeagueData from '../../__mockData__/leagueData/leagueData.json';
import mockLeagueDataFormatted from '../../__mockData__/leagueData/leagueDataFormatted.json';
import mockTeamDetailsFormatted from '../../__mockData__/teamDetails/teamDetailsFormatted.json';

jest.mock('../../services/fetchService');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('(Actions) leagueData', () => {
  describe('Constants', () => {
    it('Should export a constant REQUEST_TEAM_DETAILS', () => {
      expect(REQUEST_LEAGUE_DATA).toEqual('REQUEST_LEAGUE_DATA');
    });

    it('Should export a constant RECEIVE_TEAM_DETAILS', () => {
      expect(RECEIVE_LEAGUE_DATA).toEqual('RECEIVE_LEAGUE_DATA');
    });
  });

  describe('Action Creators', () => {
    describe('requestLeagueData', () => {
      it('Should export requestLeagueData as a function', () => {
        expect(typeof actions.requestLeagueData).toBe('function');
      });

      it('Should create an action with type REQUEST_LEAGUE_DATA and necessary data', () => {
        const leagueId = 12345;
        const seasonId = 2016;
        const action = actions.requestLeagueData(leagueId, seasonId);

        expect(action).toHaveProperty('type', REQUEST_LEAGUE_DATA);
        expect(action).toHaveProperty('leagueId', leagueId);
        expect(action).toHaveProperty('seasonId', seasonId);
      });
    });

    describe('receiveLeagueData', () => {
      it('Should export receiveLeagueData as a function', () => {
        expect(typeof actions.receiveLeagueData).toBe('function');
      });

      it('Should create an action with type RECEIVE_LEAGUE_DATA and necessary data', () => {
        const sampleResponse = {
          leaguesettings: {
            size: 2,
            teams: {
              1: { overallStanding: 2 },
              2: { overallStanding: 1 }
            }
          },
          metadata: {}
        };
        const leagueId = 12345;
        const seasonId = 2016;
        const action = actions.receiveLeagueData(sampleResponse, leagueId, seasonId);

        expect(action).toHaveProperty('type', RECEIVE_LEAGUE_DATA);
        expect(action).toHaveProperty('payload', sampleResponse);
        expect(action).toHaveProperty('leagueId', leagueId);
        expect(action).toHaveProperty('seasonId', seasonId);
      });
    });
  });

  describe('Helpers', () => {
    describe('fetchLeagueData', () => {
      it('Should correctly add response data to store on successful API call', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({ leagueData: {} });
        const leagueId = 12345;
        const seasonId = 2017;
        fetchService.__setMockResponse(mockLeagueData);

        const expectedActions = [
          {
            type: REQUEST_LEAGUE_DATA,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_LEAGUE_DATA,
            payload: mockLeagueDataFormatted,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: mockTeamDetailsFormatted,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchLeagueData(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should correctly add error response data to the store on failed API call', () => {
        const fetchService = require('../../services/fetchService');
        const response = 'Error retrieving data';
        fetchService.__setMockResponse(response, true);

        const store = mockStore({ leagueData: {} });
        const leagueId = 12345;
        const seasonId = 2017;

        const expectedActions = [
          {
            type: REQUEST_LEAGUE_DATA,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_LEAGUE_DATA,
            payload: { errorMessage: response },
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchLeagueData(leagueId, seasonId))
          .catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('fetchLeagueDataIfNeeded', () => {
      it('Should not call the API if leagueId and/or seasonId are not defined - error', () => {
        const store = mockStore({ leagueData: {} });
        const errorMessage = 'League ID and/or Season ID is invalid';

        return store.dispatch(fetchLeagueDataIfNeeded())
          .catch(ex => {
            expect(store.getActions()).toHaveLength(0);
            expect(ex).toEqual(errorMessage);
          });
      });

      it('Should call the API if league details are not defined', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          leagueData: {
            12345: {
              2016: {
                isFetching: false,
                data: {}
              }
            }
          }
        });
        const leagueId = 1234;
        const seasonId = 2016;

        fetchService.__setMockResponse(mockLeagueData);

        const expectedActions = [
          {
            type: REQUEST_LEAGUE_DATA,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_LEAGUE_DATA,
            payload: mockLeagueDataFormatted,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: mockTeamDetailsFormatted,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchLeagueDataIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should call the API to fetch details if there was an error in a previous call', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          leagueData: {
            12345: {
              2016: {
                isFetching: false,
                data: {
                  errorMessage: 'error message'
                }
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2016;

        fetchService.__setMockResponse(mockLeagueData);

        const expectedActions = [
          {
            type: REQUEST_LEAGUE_DATA,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_LEAGUE_DATA,
            payload: mockLeagueDataFormatted,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: mockTeamDetailsFormatted,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchLeagueDataIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should call the API to fetch details when league data is present but season is not', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          leagueData: {
            12345: {
              2016: {
                isFetching: false,
                teams: [ { teamId: 1 } ]
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2017;

        fetchService.__setMockResponse(mockLeagueData);

        const expectedActions = [
          {
            type: REQUEST_LEAGUE_DATA,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_LEAGUE_DATA,
            payload: mockLeagueDataFormatted,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: mockTeamDetailsFormatted,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchLeagueDataIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should not call the API to fetch details if data is currently fetching', () => {
        const store = mockStore({
          leagueData: {
            12345: {
              2016: {
                isFetching: true,
                data: {}
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2016;

        return store.dispatch(fetchLeagueDataIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toHaveLength(0);
          });
      });

      it('Should not call the API to fetch details if data is still valid', () => {
        const store = mockStore({
          leagueData: {
            12345: {
              2016: {
                isFetching: false,
                data: {
                  leaguesettings: {},
                  metadata: {}
                }
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2016;

        return store.dispatch(fetchLeagueDataIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toHaveLength(0);
          });
      });
    });

    describe('formatLeagueData', () => {
      it('Should correctly add rosterSettings and omit teams and slotCategoryItems properties', () => {
        expect(formatLeagueData(mockLeagueData)).toEqual(mockLeagueDataFormatted);
      });
    });
  });
});
