import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import teamDetails from './teamDetails';
import navBar from './navBar';
import leagueData from './leagueData';

const rootReducer = combineReducers({
  router: routerReducer,
  teamDetails,
  navBar,
  leagueData
});

export default rootReducer;
