/*
* presentational component
* Header's potentially going to be a smart component as some functionalities will be added.
*
* @class CustomHeader
* @classDesc Header of the app.
*
* */

import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class CustomHeader extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
          <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}