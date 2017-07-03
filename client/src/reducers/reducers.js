import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import teamDetails from './teamDetails';
import navBar from './navBar';

const rootReducer = combineReducers({
  router: routerReducer,
  teamDetails,
  navBar
});

export default rootReducer;
