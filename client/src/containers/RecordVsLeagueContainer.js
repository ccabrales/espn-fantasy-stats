import { connect } from 'react-redux';
import { fetchTeamDetailsIfNeeded } from '../actions/teamDetailsActions';
import RecordVsLeague from '../components/RecordVsLeague';

const mapStateToProps = state => ({
  teamDetails: state.teamDetails,
  navData: state.navBar
});

const mapDispatchToProps = dispatch => ({
  fetchDetails: (leagueId, seasonId) => {
    dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
      .catch(ex => {
        console.error(ex);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordVsLeague);
