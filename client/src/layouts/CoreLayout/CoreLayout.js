import React from 'react';
import { Route } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/index';

/**
 * Main layout component and route wrapper. Check out
 * {@link https://simonsmith.io/reusing-layouts-in-react-router-4/|this blog} for specific information.
 * @param Component - Component to render on the given route
 * @param navigateToPage - Handler to route to another page in the app
 * @param navBarData - Data specific to the current league and season IDs
 * @param updateLeagueData - Handler for updating the league and season IDs
 * @param rest - Every prop passed to CoreLayout, excluding the component so we can forward to the underlying route
 * @example
 * <CoreLayout exact path='/' component={SomeComponentToRender} />
 * @constructor
 */
const CoreLayout = ({ component: Component, navigateToPage, navBarData, updateLeagueData, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <div>
        <NavBar
          location={rest.location}
          navBarData={navBarData}
          navigateToPage={navigateToPage}
          updateLeagueData={updateLeagueData}
        />

        <Divider />

        <main>
          <Component {...matchProps} />
        </main>
      </div>
    )}
  />
);

export default CoreLayout;
