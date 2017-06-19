import fetchService from '../fetchService';

describe('(Services) fetchService', () => {
  describe('Success response', () => {
    afterEach(() => {
      fetch.resetMocks();
    });

    it('Should correctly forward response if no error property present', () => {
      const response = {
        field: 'Successful'
      };
      fetch.mockResponse(JSON.stringify(response));

      return fetchService('/test', {})
        .then(data => {
          expect(data).toEqual(response);
        });
    });
  });

  describe('Handled errors by API with error object in response', () => {
    afterEach(() => {
      fetch.resetMocks();
    });

    it('Should throw the first error message in the response as error', () => {
      const response = {
        error: [
          {
            code: 'functional',
            message: 'First error in the response'
          },
          {
            code: 'functional',
            message: 'Second error in the response'
          }
        ]
      };
      fetch.mockResponse(JSON.stringify(response), { status: 400 });

      return fetchService('/test')
        .catch(ex => {
          expect(ex).toEqual(response.error[0].message);
        });
    });
  });

  describe('Unhandled errors', () => {

  });
});
