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
const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ '../../routes/Home'),
  loading: LoadingComponent
});

const AsyncRecordVsLeague = Loadable({
  loader: () => import(/* webpackChunkName: "record-vs-league" */ '../../routes/RecordVsLeague'),
  loading: LoadingComponent
});

const AsyncPageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ '../../routes/PageNotFound'),
  loading: LoadingComponent
});

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <CoreLayout exact path='/' component={AsyncHome} />
      <CoreLayout exact path='/teamDetails' component={AsyncRecordVsLeague} />
      <CoreLayout component={AsyncPageNotFound} />
    </Switch>
  </ConnectedRouter>
);

export default App;
