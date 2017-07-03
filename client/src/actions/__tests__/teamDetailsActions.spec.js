/* eslint-disable global-require, no-underscore-dangle */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  REQUEST_TEAM_DETAILS,
  RECEIVE_TEAM_DETAILS,
  actions,
  fetchTeamDetails,
  fetchTeamDetailsIfNeeded
} from '../teamDetailsActions';

jest.mock('../../services/fetchService');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('(Actions) teamDetails', () => {
  describe('Constants', () => {
    it('Should export a constant REQUEST_TEAM_DETAILS', () => {
      expect(REQUEST_TEAM_DETAILS).toEqual('REQUEST_TEAM_DETAILS');
    });

    it('Should export a constant RECEIVE_TEAM_DETAILS', () => {
      expect(RECEIVE_TEAM_DETAILS).toEqual('RECEIVE_TEAM_DETAILS');
    });
  });

  describe('Action Creators', () => {
    describe('requestTeamDetails', () => {
      it('Should export requestTeamDetails as a function', () => {
        expect(typeof actions.requestTeamDetails).toBe('function');
      });

      it('Should create an action with type REQUEST_TEAM_DETAILS and necessary data', () => {
        const leagueId = 12345;
        const seasonId = 2016;
        const action = actions.requestTeamDetails(leagueId, seasonId);

        expect(action).toHaveProperty('type', REQUEST_TEAM_DETAILS);
        expect(action).toHaveProperty('leagueId', leagueId);
        expect(action).toHaveProperty('seasonId', seasonId);
      });
    });

    describe('receiveTeamDetails', () => {
      it('Should export receiveTeamDetails as a function', () => {
        expect(typeof actions.receiveTeamDetails).toBe('function');
      });

      it('Should create an action with type RECEIVE_TEAM_DETAILS and necessary data', () => {
        const sampleResponse = {
          teams: [
            {
              teamId: 1,
              teamNickname: 'Fantasy Team Name'
            }
          ]
        };
        const leagueId = 12345;
        const seasonId = 2016;
        const action = actions.receiveTeamDetails(sampleResponse, leagueId, seasonId);

        expect(action).toHaveProperty('type', RECEIVE_TEAM_DETAILS);
        expect(action).toHaveProperty('payload', sampleResponse);
        expect(action).toHaveProperty('leagueId', leagueId);
        expect(action).toHaveProperty('seasonId', seasonId);
      });
    });
  });

  describe('Helpers', () => {
    describe('fetchTeamDetails', () => {
      it('Should correctly add response data to store on successful API call', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({ teamDetails: {} });
        const leagueId = 12345;
        const seasonId = 2017;
        const response = {
          teams: [
            {
              teamId: 1,
              teamNickname: 'Fantasy Team Name'
            }
          ]
        };
        fetchService.__setMockResponse(response);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: response,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetails(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should correctly add empty response data to the store on failed API call', () => {
        const fetchService = require('../../services/fetchService');
        const response = 'Error retrieving data';
        fetchService.__setMockResponse(response, true);

        const store = mockStore({ teamDetails: {} });
        const leagueId = 12345;
        const seasonId = 2017;

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: {},
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetails(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('fetchTeamDetailsIfNeeded', () => {
      it('Should not call the API if leagueId and/or seasonId are not defined - error', () => {
        const store = mockStore({ teamDetails: {} });

        const expectedActions = [
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: {},
            leagueId: undefined,
            seasonId: undefined
          }
        ];

        return store.dispatch(fetchTeamDetailsIfNeeded())
          .catch(ex => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(ex).toEqual('League ID and/or Season ID is invalid');
          });
      });

      it('Should call the API if league details are not defined', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          teamDetails: {
            12345: {
              2016: {
                isFetching: false,
                teams: [ { teamId: 1 } ]
              }
            }
          }
        });
        const leagueId = 1234;
        const seasonId = 2017;
        const response = {
          teams: [
            {
              teamId: 1,
              teamNickname: 'Fantasy Team Name'
            }
          ]
        };
        fetchService.__setMockResponse(response);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: response,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should call the API to fetch details when conditions are met', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          teamDetails: {
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
        const response = {
          teams: [
            {
              teamId: 1,
              teamNickname: 'Fantasy Team Name'
            }
          ]
        };
        fetchService.__setMockResponse(response);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: response,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should not call the API to fetch details if data is currently fetching', () => {
        const store = mockStore({
          teamDetails: {
            12345: {
              2017: {
                isFetching: true
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2017;

        return store.dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toHaveLength(0);
          });
      });

      it('Should not call the API to fetch details if data is still valid', () => {
        const store = mockStore({
          teamDetails: {
            12345: {
              2017: {
                isFetching: false
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2017;

        return store.dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toHaveLength(0);
          });
      });
    });
  });
});
