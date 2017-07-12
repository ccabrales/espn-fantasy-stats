import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

/**
 * Component to handle loading of different routes, and error cases in that loading. Used by react-loadable.
 * @param {boolean} isLoading - Is the route loading
 * @param {boolean} error - Is there an error while loading
 * @constructor
 */
const LoadingComponent = ({ isLoading, error }) => {
  if (isLoading) {
    return <Loader active inline='centered' />;
  } else if (error) {
    return <div>Sorry, there was a problem loading the page. Please try again.</div>;
  }

  return null;
};

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool
};

LoadingComponent.defaultProps = {
  error: false
};

export default LoadingComponent;
