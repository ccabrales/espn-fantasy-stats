import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import LoadingComponent from '../LoadingComponent';
import CoreLayout from '../../layouts/CoreLayout';
import './App.css';

// -------------------------------------
// Asynchronously load route components
// -------------------------------------
const AsyncRecordVsLeagueContainer = Loadable({
  loader: () => import(/* webpackChunkName: "record-vs-league" */'../../containers/RecordVsLeagueContainer'),
  loading: LoadingComponent
});

const AsyncPageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */'../../routes/PageNotFound'),
  loading: LoadingComponent
});

// TODO: add a default handler/view for when seasonID or leagueID is undefined (like when app first loads)
const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <CoreLayout exact path='/' component={AsyncRecordVsLeagueContainer} />
      <CoreLayout component={AsyncPageNotFound} />
    </Switch>
  </ConnectedRouter>
);

export default App;
