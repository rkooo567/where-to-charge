/*
* presentational component
* 
* @class Main
* @classDesc The main part of the page.
* 
* consists of:
*   BotResponse: chatbot's dialog will be here
*   ChatForm : For interacting with a chatbot
* 
* */

import React from 'react';
import {
  Content
} from 'native-base';

import ChatForm from '../ChatForm/index';
import BotResponse from '../BotResponse/index';

class Main extends React.Component {

  render() {
    return (
      <Content>
        <BotResponse />
        <ChatForm />
      </Content>
    );
  }
}

export default Main;