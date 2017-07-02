const express = require('express');
const path = require('path');
const debug = require('debug')('app:api server');
const request = require('request');
const helmet = require('helmet');

const app = express();

const apiPrefix = 'http://games.espn.com/ffl/api/v2';

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  debug('Server is being run in production, meaning it will only serve static assets');
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// TODO: maybe look into transforming the response for error cases myself. Then can update fetchService
app.get('/api/leagueInfo', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  request({
    uri: `${apiPrefix}/leagueSettings?leagueId=${leagueId}&seasonId=${seasonId}`
  })
    .pipe(res);
});

app.get('/api/teamDetails', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  request({
    uri: `${apiPrefix}/teams?leagueId=${leagueId}&seasonId=${seasonId}`
  })
    .pipe(res);
});

app.get('/api/recentActivity', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  request({
    uri: `${apiPrefix}/recentActivity?leagueId=${leagueId}&seasonId=${seasonId}`
  })
    .pipe(res);
});

app.get('/api/rosterInfo', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  request({
    uri: `${apiPrefix}/rosterInfo?leagueId=${leagueId}&seasonId=${seasonId}`
  })
    .pipe(res);
});

app.get('/api/scores', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  const scoringPeriod = req.query.scoringPeriod || 1;
  request({
    uri: `${apiPrefix}scoreboard?leagueId=${leagueId}&seasonId=${seasonId}&scoringPeriodId=${scoringPeriod}`
  })
    .pipe(res);
});

app.get('/api/standings', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  request({
    uri: `http://games.espn.com/ffl/api/v2/standings?leagueId=${leagueId}&seasonId=${seasonId}`
  })
    .pipe(res);
});

app.get('/api/schedule', (req, res) => {
  const leagueId = req.query.leagueId;
  const seasonId = req.query.seasonId;
  const teamId = req.query.teamId;
  request({
    uri: `http://games.espn.com/ffl/api/v2/schedule?leagueId=${leagueId}&seasonId=${seasonId}&teamId=${teamId}`
  })
    .pipe(res);
});

// TODO
// app.get('/api/allScores', (req, res) => {
//
// })

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  debug(`Server is now running on port ${port}`);
});
