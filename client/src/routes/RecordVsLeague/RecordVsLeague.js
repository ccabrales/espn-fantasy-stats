import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ErrorMessage from '../../components/ErrorMessage';
import { getValue } from '../../services/utility';

class RecordVsLeague extends React.Component {
  componentDidMount() {
    const { fetchDetails, navData } = this.props;
    const { leagueId, seasonId } = navData;
    fetchDetails(leagueId, seasonId);
  }

  componentWillUpdate(nextProps) {
    const { navData, fetchDetails } = this.props;
    const { navData: nextNavData } = nextProps;

    if (navData.leagueId !== nextNavData.leagueId || navData.seasonId !== nextNavData.seasonId) {
      fetchDetails(nextNavData.leagueId, nextNavData.seasonId);
    }
  }

  render() {
    // TODO: use teamDetails to display data
    const { teamDetails } = this.props;

    if (teamDetails && teamDetails.isFetching) { // Data is loading
      return <Loader active inline='centered' />;
    } else if (!teamDetails) { // Need to input a league ID
      return <h1>Please input a valid League ID or Season</h1>;
    } else if (getValue('data.errorMessage', teamDetails, false)) { // Error retrieving the data
      return <ErrorMessage errorMessage={getValue('data.errorMessage', teamDetails, false)} />;
    }
    // Valid data returned
    return <h1>Success loading</h1>;
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
