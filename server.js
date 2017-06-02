const express = require('express');
const path = require('path');
const debug = require('debug')('app:api server');

const app = express();

if (process.env.NODE_ENV === 'production') {
  debug('Server is being run in production, meaning it will only serve static assets');
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  debug(`Server is now running on port ${port}`);
});
