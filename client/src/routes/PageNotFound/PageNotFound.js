import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const PageNotFound = () => (
  <Header size='huge' textAlign='center' icon>
    <Icon name='warning circle' size='huge' color='red' />
    <Header.Content>Page Not Found</Header.Content>
  </Header>
);

export default PageNotFound;
