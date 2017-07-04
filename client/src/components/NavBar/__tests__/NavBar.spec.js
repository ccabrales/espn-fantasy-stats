import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import NavBar from '../';
import NavBarForm from '../NavBarForm';

describe('NavBar', () => {
  let wrapper;
  const location = {
    pathname: '/'
  };
  const navBarData = {
    leagueId: '',
    seasonId: 2016
  };
  const navigateToPage = jest.fn();
  const updateLeagueData = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NavBar
        location={location}
        navBarData={navBarData}
        navigateToPage={navigateToPage}
        updateLeagueData={updateLeagueData}
      />
    );
  });

  afterEach(() => {
    navigateToPage.mockReset();
    updateLeagueData.mockReset();
  });

  it('Should render as a nav element', () => {
    expect(wrapper.is('nav')).toBe(true);
  });

  it('Should render a Menu with 2 menu items', () => {
    const menu = wrapper.find(Menu);
    expect(menu).toBePresent();
    expect(menu.find(Menu.Item)).toHaveLength(2);
  });

  it('First menu item should be Home', () => {
    const menuItem = wrapper.find(Menu.Item).at(0);
    expect(menuItem).toBePresent();
    expect(menuItem.prop('active')).toBe(true);
  });

  it('Second menu item should be for team details', () => {
    const menuItem = wrapper.find(Menu.Item).at(1);
    expect(menuItem).toBePresent();
    expect(menuItem.prop('active')).toBe(false);
  });

  it('Should render the form to change league and season IDs', () => {
    expect(wrapper.find(NavBarForm)).toBePresent();
  });

  it('Clicking Home menu item should call navigateToPage with proper url', () => {
    wrapper.find(Menu.Item).at(0).simulate('click');
    expect(navigateToPage.mock.calls).toHaveLength(1);
    expect(navigateToPage).toHaveBeenCalledWith('/');
  });

  it('Clicking Team Details menu item should call navigateToPage with proper url', () => {
    wrapper.find(Menu.Item).at(1).simulate('click');
    expect(navigateToPage.mock.calls).toHaveLength(1);
    expect(navigateToPage).toHaveBeenCalledWith('/teamDetails');
  });
});
