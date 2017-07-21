import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from 'semantic-ui-react';
import LoadingComponent from '../';

describe('LoadingComponent', () => {
  describe('Currently loading', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <LoadingComponent isLoading />
      );
    });

    it('Should render the Loader', () => {
      expect(wrapper.find(Loader)).toBePresent();
    });
  });

  describe('Finished loading with success', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <LoadingComponent isLoading={false} />
      );
    });

    it('Should return null', () => {
      expect(wrapper.type()).toEqual(null);
    });
  });

  describe('Finished loading with error', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <LoadingComponent isLoading={false} error />
      );
    });

    it('Should render the error message', () => {
      expect(wrapper.find(Loader)).not.toBePresent();
      expect(wrapper.is('div.route-load-error')).toBe(true);
      expect(wrapper.text()).toEqual('Sorry, there was a problem loading the page. Please try again.');
    });
  });
});
