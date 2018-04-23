/*
* presentational component
* Header's potentially going to be a smart component as some functionalities will be added.
*
* @class CustomHeader
* @classDesc Header of the app.
*
* */

import React from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class CustomHeader extends React.Component {
  render() {
    return (
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
          <Title>Volta chatbot</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
    );
  }
}