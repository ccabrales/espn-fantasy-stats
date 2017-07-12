import { connect } from 'react-redux';
import { fetchLeagueDataIfNeeded } from '../../actions/leagueDataActions';
import { getValue } from '../../services/utility';
import LeagueInfo from './LeagueInfo';

const mapStateToProps = state => {
  const { navBar, leagueData, teamDetails } = state;
  const { leagueId, seasonId } = navBar;

  const leagueDataBySeason = getValue(`${leagueId}.${seasonId}`, leagueData, {});
  const teamDetailsBySeason = getValue(`${leagueId}.${seasonId}`, teamDetails, {});

  return {
    leagueData: leagueDataBySeason,
    teamData: teamDetailsBySeason,
    navData: navBar
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLeagueInfo: (leagueId, seasonId) => {
    dispatch(fetchLeagueDataIfNeeded(leagueId, seasonId))
      .catch(ex => {
        console.error(ex);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueInfo);
