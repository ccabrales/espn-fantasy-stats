/* eslint-disable global-require, no-underscore-dangle */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  REQUEST_TEAM_DETAILS,
  RECEIVE_TEAM_DETAILS,
  actions,
  fetchTeamDetails,
  fetchTeamDetailsIfNeeded,
  formatTeamDetails
} from '../teamDetailsActions';
import teamDetails from '../../__mockData__/teamDetails/teamDetails';
import formattedTeamDetails from '../../__mockData__/teamDetails/teamDetailsFormatted';

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
        fetchService.__setMockResponse(teamDetails);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: formattedTeamDetails,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetails(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should correctly add error response data to the store on failed API call', () => {
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
            payload: { errorMessage: response },
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetails(leagueId, seasonId))
          .catch(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });
    });

    describe('fetchTeamDetailsIfNeeded', () => {
      it('Should not call the API if leagueId and/or seasonId are not defined - error', () => {
        const store = mockStore({ teamDetails: {} });
        const errorMessage = 'League ID and/or Season ID is invalid';

        return store.dispatch(fetchTeamDetailsIfNeeded())
          .catch(ex => {
            expect(store.getActions()).toHaveLength(0);
            expect(ex).toEqual(errorMessage);
          });
      });

      it('Should call the API if league details are not defined', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          teamDetails: {
            12345: {
              2016: {
                isFetching: false,
                data: {}
              }
            }
          }
        });
        const leagueId = 1234;
        const seasonId = 2017;

        fetchService.__setMockResponse(teamDetails);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: formattedTeamDetails,
            leagueId,
            seasonId
          }
        ];

        return store.dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      });

      it('Should call the API to fetch details if there was an error in a previous call', () => {
        const fetchService = require('../../services/fetchService');

        const store = mockStore({
          teamDetails: {
            12345: {
              2017: {
                isFetching: false,
                data: {
                  errorMessage: 'error message'
                }
              }
            }
          }
        });
        const leagueId = 12345;
        const seasonId = 2017;

        fetchService.__setMockResponse(teamDetails);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: formattedTeamDetails,
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

        fetchService.__setMockResponse(teamDetails);

        const expectedActions = [
          {
            type: REQUEST_TEAM_DETAILS,
            leagueId,
            seasonId
          },
          {
            type: RECEIVE_TEAM_DETAILS,
            payload: formattedTeamDetails,
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
                isFetching: false,
                data: {
                  teams: [],
                  metadata: {}
                }
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

    describe('formatTeamDetails', () => {
      it('Should return an empty array if the input is empty', () => {
        expect(formatTeamDetails([])).toEqual([]);
      });

      it('Should correctly add fields to each team', () => {
        const inputTeams = [
          {
            teamLocation: 'First',
            teamNickname: 'Team',
            record: {
              overallWins: 3,
              overallLosses: 10,
              overallTies: 1,
              pointsFor: 1109,
              pointsAgainst: 1288
            }
          },
          {
            teamLocation: 'Second',
            teamNickname: 'Team',
            record: {
              overallWins: 6,
              overallLosses: 8,
              overallTies: 0,
              pointsFor: 1328,
              pointsAgainst: 1235
            }
          },
          {
            teamLocation: 'Third',
            teamNickname: 'Team',
            record: {
              overallWins: 4,
              overallLosses: 9,
              overallTies: 1,
              pointsFor: 988,
              pointsAgainst: 1023
            }
          }
        ];
        const expectedOutput = [
          {
            teamLocation: 'First',
            teamNickname: 'Team',
            record: {
              overallWins: 3,
              overallLosses: 10,
              overallTies: 1,
              pointsFor: 1109,
              pointsAgainst: 1288
            },
            teamName: 'First Team',
            teamRecord: '3-10-1',
            pointsFor: 1109,
            pointsAgainst: 1288
          },
          {
            teamLocation: 'Second',
            teamNickname: 'Team',
            record: {
              overallWins: 6,
              overallLosses: 8,
              overallTies: 0,
              pointsFor: 1328,
              pointsAgainst: 1235
            },
            teamName: 'Second Team',
            teamRecord: '6-8-0',
            pointsFor: 1328,
            pointsAgainst: 1235
          },
          {
            teamLocation: 'Third',
            teamNickname: 'Team',
            record: {
              overallWins: 4,
              overallLosses: 9,
              overallTies: 1,
              pointsFor: 988,
              pointsAgainst: 1023
            },
            teamName: 'Third Team',
            teamRecord: '4-9-1',
            pointsFor: 988,
            pointsAgainst: 1023
          }
        ];

        expect(formatTeamDetails(inputTeams)).toEqual(expectedOutput);
      });
    });
  });
});
