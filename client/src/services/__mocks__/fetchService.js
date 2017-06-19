/* eslint-disable no-underscore-dangle */
const fetchService = jest.genMockFromModule('../fetchService');

let mockResponse = {};
let isError = false;
const __setMockResponse = (response, isResponseError = false) => {
  mockResponse = response;
  isError = isResponseError;
};

const defaultFetchService = () => {
  if (isError) {
    return Promise.reject(mockResponse);
  }

  return Promise.resolve(mockResponse);
};

fetchService.__setMockResponse = __setMockResponse;
fetchService.default = defaultFetchService;

module.exports = fetchService;
