import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

class RecordVsLeague extends React.Component {
  componentDidMount() {
    this.props.fetchDetails(12345, 2016); // TODO: remove hard coded values moving forward
  }

  render() {
    // TODO: use teamDetails to display
    const { teamDetails } = this.props;

    // TODO: remove hard coded values
    const leagueId = 12345;
    const seasonId = 2016;

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
  teamDetails: PropTypes.object.isRequired
};

export default RecordVsLeague;
