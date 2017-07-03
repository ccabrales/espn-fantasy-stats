import React from 'react';
import ReactDOM from 'react-dom';
import createStore, { history } from './store/createStore';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './helpers/registerServiceWorker';
import './index.css';

const store = createStore();

const render = () => {
  ReactDOM.render(
    <AppContainer store={store} history={history} />,
    document.getElementById('root')
  );
};

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./containers/AppContainer', () => {
      render();
    });
  }
}

render();
registerServiceWorker();
