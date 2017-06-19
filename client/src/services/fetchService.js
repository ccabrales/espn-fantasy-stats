import 'whatwg-fetch';

const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: new Headers(),
  cache: 'default'
};

/**
 * Service to handle all AJAX calls
 * @param {String} url URL of the API
 * @param {Object} [options] custom options for the fetch call to be combined with defaults
 * @returns {Promise} fetch API call
 */
const fetchService = (url, options = {}) => (
  fetch(url, Object.assign({}, DEFAULT_OPTIONS, options))
    // Always resolve the body, since we get error codes in the response as well
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw response.error[0].message;
      }

      return response;
    })
    .catch(ex => {
      throw ex;
    })
);

export default fetchService;
