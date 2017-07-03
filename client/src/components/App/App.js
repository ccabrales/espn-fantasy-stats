import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import CoreLayout from '../../layouts/CoreLayout';
import RecordVsLeagueContainer from '../../containers/RecordVsLeagueContainer';
import PageNotFound from '../../routes/PageNotFound';
import './App.css';

// TODO: add a default handler/view for when seasonID or leagueID is undefined (like when app first loads)
const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <CoreLayout exact path='/' component={RecordVsLeagueContainer} />
      <CoreLayout component={PageNotFound} />
    </Switch>
  </ConnectedRouter>
);

export default App;
