import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import NavBarForm from './NavBarForm';

/**
 * Navigation bar for CoreLayout, common across entire site. Allows the user to select different pages in the app
 * and also update the current league ID and season.
 * @param location - Page location data
 * @param navBarData - Data specific to the overall league and season IDs
 * @param navigateToPage - Handler to navigate to another page using redux
 * @param updateLeagueData - Handler to update the league and season IDs site-wide
 * @class
 */
class NavBar extends React.Component {
  /**
   * Handle changing routes when a menu item is clicked
   * @param url - Path of the item
   */
  handleMenuItemClick = url => { this.props.navigateToPage(url); };

  render() {
    const { location, navBarData, updateLeagueData } = this.props;

    return (
      <nav>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={location.pathname === '/'}
            onClick={() => this.handleMenuItemClick('/')}
          />
          <Menu.Item
            name='teamDetails'
            active={location.pathname === '/teamDetails'}
            onClick={() => this.handleMenuItemClick('/teamDetails')}
          />
        </Menu>
        <NavBarForm navBarData={navBarData} updateLeagueData={updateLeagueData} />
      </nav>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string
  }).isRequired,
  navBarData: PropTypes.shape({
    leagueId: PropTypes.string,
    seasonId: PropTypes.number.isRequired
  }).isRequired,
  navigateToPage: PropTypes.func.isRequired,
  updateLeagueData: PropTypes.func.isRequired
};

export default NavBar;
