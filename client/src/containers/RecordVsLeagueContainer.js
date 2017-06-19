import { connect } from 'react-redux';
import { fetchTeamDetailsIfNeeded } from '../actions/teamDetails';
import RecordVsLeague from '../components/RecordVsLeague';

const mapStateToProps = (state) => ({
  teamDetails: state.teamDetails
});

const mapDispatchToProps = (dispatch) => ({
  fetchDetails: (leagueId, seasonId) => {
    dispatch(fetchTeamDetailsIfNeeded(leagueId, seasonId))
      .catch(ex => {
        console.error(ex);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordVsLeague);
