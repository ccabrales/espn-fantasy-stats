import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'semantic-ui-react';
import NavBarForm from '../NavBarForm';

describe('NavBarForm', () => {
  let wrapper;
  const navBarData = {
    leagueId: '',
    seasonId: 2016
  };
  const updateLeagueData = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NavBarForm
        navBarData={navBarData}
        updateLeagueData={updateLeagueData}
      />
    );
  });

  afterEach(() => {
    updateLeagueData.mockReset();
  });

  it('Should render as a Form', () => {
    expect(wrapper.is(Form)).toBe(true);
  });

  it('Should render a FormGroup with with 3 fields', () => {
    const fieldGroup = wrapper.find(Form.Group);
    expect(fieldGroup).toBePresent();
    expect(fieldGroup.find(Form.Field)).toHaveLength(3);
  });

  it('First field should be for the league ID', () => {
    const field = wrapper.find(Form.Field).at(0);
    expect(field).toBePresent();
    expect(field.prop('name')).toEqual('leagueId');
    expect(field.prop('error')).toBe(false);
  });

  it('Second field should be for the season ID', () => {
    const field = wrapper.find(Form.Field).at(1);
    expect(field).toBePresent();
    expect(field.prop('name')).toEqual('season');
    expect(field.prop('error')).toBe(false);
  });

  it('Third field should be for the submit button', () => {
    const field = wrapper.find(Form.Field).at(2);
    expect(field).toBePresent();
    expect(field.prop('disabled')).toBe(true);
  });

  it('Form submission should call updateLeagueData', () => {
    const preventDefaultMock = jest.fn();
    wrapper.simulate('submit', {
      preventDefault: preventDefaultMock
    });
    expect(updateLeagueData.mock.calls).toHaveLength(1);
    expect(preventDefaultMock.mock.calls).toHaveLength(1);
  });
});
