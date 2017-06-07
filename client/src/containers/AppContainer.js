import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../components/App';

class AppContainer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppContainer.propTypes = {
  store: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default AppContainer;
