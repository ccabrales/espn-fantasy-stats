import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';

class AppContainer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <App history={history} />
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default AppContainer;
