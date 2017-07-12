import React from 'react';
import PropTypes from 'prop-types';
import { Header, Loader, Message, Segment } from 'semantic-ui-react';
import TeamsList from '../../components/TeamsList';
import ErrorMessage from '../../components/ErrorMessage';
import { isEmpty } from '../../services/utility';

/**
 * Renders all the information about the current league
 * @param {Object} leagueInfo
 * @param {Object} navData
 * @param {func} fetchLeagueInfo
 */
class LeagueInfo extends React.Component {
  componentDidMount() {
    const { navData, fetchLeagueInfo } = this.props;
    const { leagueId, seasonId } = navData;
    fetchLeagueInfo(leagueId, seasonId);
  }

  componentWillUpdate(nextProps) {
    const { navData, fetchLeagueInfo } = this.props;
    const { navData: nextNavData } = nextProps;

    if (navData.leagueId !== nextNavData.leagueId || navData.seasonId !== nextNavData.seasonId) {
      fetchLeagueInfo(nextNavData.leagueId, nextNavData.seasonId);
    }
  }

  getRosterDetails() {
    const { leagueData } = this.props;
    const { leaguesettings } = leagueData.data;
    const { rosterSettings } = leaguesettings;

    return rosterSettings.filter(item => (
      item.num > 0
    ))
      .map(item => (
        <Segment key={item.name}>{item.name}: {item.num}</Segment>
      ));
  }

  render() {
    const { leagueData, teamData } = this.props;

    if (leagueData && leagueData.isFetching) { // Data is loading
      return <Loader active inline='centered' />;
    } else if (!leagueData || isEmpty(leagueData)) { // Need to input a league ID
      return (
        <Message warning>
          <Message.Header>Please input a valid League ID and/or season from the dropdown above.</Message.Header>
        </Message>
      );
    } else if (!leagueData || leagueData.data.errorMessage) { // Error retrieving the data
      const { data } = leagueData;
      return <ErrorMessage errorMessage={data ? data.errorMessage : ''} />;
    }
    // Valid data returned
    const { data } = leagueData;
    const { leaguesettings, metadata } = data;

    return (
      <div className='league-info'>
        <Header as='h1' textAlign='center'>
          {leaguesettings.name}
          <Header.Subheader>{metadata.status}</Header.Subheader>
        </Header>
        {teamData && !isEmpty(teamData) &&
        <TeamsList teamData={teamData} />
        }
        <div className='roster-settings'>
          <Header as='h2'>Roster Settings</Header>
          <Segment.Group size='tiny' className='roster-info'>{this.getRosterDetails()}</Segment.Group>
        </div>
      </div>
    );
  }
}

LeagueInfo.propTypes = {
  leagueData: PropTypes.object,
  teamData: PropTypes.object,
  navData: PropTypes.shape({
    leagueId: PropTypes.string,
    seasonId: PropTypes.number.isRequired
  }).isRequired,
  fetchLeagueInfo: PropTypes.func.isRequired
};

LeagueInfo.defaultProps = {
  leagueData: {},
  teamData: {}
};

export default LeagueInfo;
