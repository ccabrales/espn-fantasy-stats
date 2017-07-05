import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

class RecordVsLeague extends React.Component {
  componentDidMount() {
    const { fetchDetails, navData } = this.props;
    const { leagueId, seasonId } = navData;
    fetchDetails(leagueId, seasonId);
  }

  render() {
    // TODO: use teamDetails to display
    const { teamDetails, navData } = this.props;
    const { leagueId, seasonId } = navData;

    // TODO: remove hard coded values
    // const leagueId = 12345;
    // const seasonId = 2016;

    if (!teamDetails[leagueId] || !teamDetails[leagueId][seasonId] || teamDetails[leagueId][seasonId].isFetching) {
      return (
        <Loader active inline='centered' />
      );
    }

    return <h1>Loaded Team Details</h1>;
  }
}

RecordVsLeague.propTypes = {
  fetchDetails: PropTypes.func.isRequired,
  teamDetails: PropTypes.object.isRequired,
  navData: PropTypes.shape({
    leagueId: PropTypes.string,
    seasonId: PropTypes.number.isRequired
  }).isRequired
};

export default RecordVsLeague;
