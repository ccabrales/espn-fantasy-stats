import { connect } from 'react-redux';
import { fetchTeamDetailsIfNeeded } from '../../actions/teamDetailsActions';
import { getValue } from '../../services/utility';
import RecordVsLeague from './RecordVsLeague';

const mapStateToProps = state => {
  const { navBar, teamDetails } = state;
  const { leagueId, seasonId } = navBar;

  const teamDetailsBySeason = getValue(`${leagueId}.${seasonId}`, teamDetails, {});

  return {
    teamDetails: teamDetailsBySeason,
    navData: navBar
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDetails: (leagueId, seasonId) => {
    dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
      .catch(ex => {
        console.error(ex);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordVsLeague);
