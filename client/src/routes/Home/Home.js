import React from 'react';
import { Header } from 'semantic-ui-react';

const Home = () => (
  <div>
    <Header as='h1' size='huge' textAlign='center'>
      Welcome!
      <Header.Subheader textAlign='center'>
        Enter your league ID and select a season from the dropdown above.
        Then navigate to the page with the information you want to view.
      </Header.Subheader>
    </Header>
  </div>
);

export default Home;
