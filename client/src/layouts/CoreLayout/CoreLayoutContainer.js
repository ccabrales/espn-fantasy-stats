import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import CoreLayout from './CoreLayout';
import { actions } from '../../actions/navBarActions';

const mapStateToProps = state => ({
  navBarData: state.navBar
});

const mapDispatchToProps = dispatch => ({
  navigateToPage: (route = '/') => {
    dispatch(push(route));
  },
  updateLeagueData: (leagueId, seasonId) => {
    dispatch(actions.updateLeagueAndSeasonId(leagueId, seasonId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
