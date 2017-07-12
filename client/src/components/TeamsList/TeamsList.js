import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';
import { getValue } from '../../services/utility';

/**
 * Display the teams in a sortable table
 * @param teamData
 */
class TeamsList extends React.Component {
  /**
   * Set the initial state for the table
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      column: null,
      data: getValue('data.teams', props.teamData, []),
      direction: null
    };
  }

  /**
   * Handle the sorting of the teams based on the column clicked
   * @param clickedColumn
   */
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [ clickedColumn ]),
        direction: 'ascending',
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  render() {
    const { column, data, direction } = this.state;

    if (!data || data.length === 0) {
      return null;
    }

    return (
      <Table celled padded sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Logo</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'teamName' ? direction : null}
              onClick={this.handleSort('teamName')}
            >
              Team Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'overallStanding' ? direction : null}
              onClick={this.handleSort('overallStanding')}
            >
              Standing
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'teamRecord' ? direction : null}
              onClick={this.handleSort('teamRecord')}
            >
              Record
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'pointsFor' ? direction : null}
              onClick={this.handleSort('pointsFor')}
            >
              Points For
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'pointsAgainst' ? direction : null}
              onClick={this.handleSort('pointsAgainst')}
            >
              Points Against
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(team => {
            const { logoUrl, teamName, overallStanding, teamRecord, pointsFor, pointsAgainst, teamId } = team;

            return (
              <Table.Row key={teamId}>
                <Table.Cell>
                  {logoUrl &&
                  <Image src={logoUrl} size='small' />
                  }
                </Table.Cell>
                <Table.Cell>
                  {teamName}
                </Table.Cell>
                <Table.Cell>
                  {overallStanding}
                </Table.Cell>
                <Table.Cell>
                  {teamRecord}
                </Table.Cell>
                <Table.Cell>
                  {pointsFor}
                </Table.Cell>
                <Table.Cell>
                  {pointsAgainst}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

TeamsList.propTypes = {
  teamData: PropTypes.object.isRequired
};

export default TeamsList;
