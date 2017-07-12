import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

/**
 * Display an error with optional specific message
 * @param errorMessage
 * @constructor
 */
const ErrorMessage = ({ errorMessage }) => (
  <Message negative>
    <Message.Header>Sorry, the data cannot be displayed.</Message.Header>
    {errorMessage &&
    <Message.Content>{errorMessage}</Message.Content>
    }
  </Message>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string
};

ErrorMessage.defaultProps = {
  errorMessage: ''
};

export default ErrorMessage;
