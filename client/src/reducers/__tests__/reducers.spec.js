import rootReducer from '../reducers';

describe('(Reducers) rootReducer', () => {
  it('Should export the root reducer as a function', () => {
    expect(typeof rootReducer).toBe('function');
  });
});
