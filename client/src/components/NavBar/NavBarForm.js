import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select } from 'semantic-ui-react';

/**
 * Form for the nav bar to allow the user to update the League ID and season
 * @class NavBarForm
 */
class NavBarForm extends React.Component {
  /**
   * Initial state to keep track of the form field values prior to submission
   * @type {Object}
   */
  state = {
    leagueId: {
      value: this.props.navBarData.leagueId,
      error: false
    },
    season: {
      value: this.props.navBarData.seasonId,
      error: false
    }
  };

  /**
   * Season options starting from 2000 and going to the current year (descending order)
   * @returns {Array}
   */
  seasonOptions = () => {
    const originalYear = 2000;
    const currYear = new Date().getFullYear();
    const range = currYear - originalYear;

    return Array.from(new Array(range), (val, index) => ({
      key: currYear - index,
      value: currYear - index,
      text: currYear - index
    }));
  };

  /**
   * Handle form submission
   * @param e - Event
   */
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.updateLeagueData(this.state.leagueId.value, this.state.season.value);
  };

  /**
   * Update the value for the given field in local state, and validate it
   * @param e - Event
   * @param name - Field name
   * @param value - Field value
   */
  handleFieldChange = (e, { name, value }) => {
    const nameProperty = { ...this.state[name] };
    nameProperty.value = value;
    if (typeof value === 'string') {
      nameProperty.error = !(this.isNumber(value) && this.isWithinMaxLength(10)(value));
    } else {
      nameProperty.error = !this.isNumber(value);
    }
    this.setState({ [name]: nameProperty });
  };

  /**
   * Validates that the given input is a number. Returns true if value is a number
   * @param value
   * @returns {*|boolean}
   */
  isNumber = value => { // eslint-disable-line arrow-body-style
    return value && !isNaN(Number(value));
  };

  /**
   * Validates that the given input is no longer than len characters. Returns true if value is within max length
   * @param len
   */
  isWithinMaxLength = len => value => { // eslint-disable-line arrow-body-style
    return value && value.length <= len;
  };

  render() {
    const seasonYears = this.seasonOptions();
    const { navBarData } = this.props;

    return (
      <Form size='tiny' onSubmit={this.handleFormSubmit}>
        <Form.Group inline>
          <Form.Field
            required
            control={Input}
            name='leagueId'
            label='League ID'
            placeholder='League ID'
            error={this.state.leagueId.error}
            onChange={this.handleFieldChange}
            defaultValue={this.state.leagueId.value}
          />
          <Form.Field
            required
            control={Select}
            name='season'
            label='Season ID'
            placeholder='Season'
            options={seasonYears}
            defaultValue={navBarData.seasonId}
            error={this.state.season.error}
            onChange={this.handleFieldChange}
          />
          <Form.Field
            primary
            control={Button}
            disabled={!this.state.leagueId.value || this.state.leagueId.error || this.state.season.error}
          >
            Update
          </Form.Field>
          {/*
          TODO: show success message when the form has been submitted?
          https://react.semantic-ui.com/collections/form#form-example-success
          */}
        </Form.Group>
      </Form>
    );
  }
}

NavBarForm.propTypes = {
  navBarData: PropTypes.shape({
    leagueId: PropTypes.string,
    seasonId: PropTypes.number.isRequired
  }).isRequired,
  updateLeagueData: PropTypes.func.isRequired
};

export default NavBarForm;
