/*
* presentational component
*
* @class Home
* @classDesc The whole skeleton of the app
*
* consists of:
*   Header
*   Main
*
* */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import Header from '../Header/index';
import Main from '../Main/index';

export default class Home extends React.Component {

  render() {
    return (
      <View>
        <Header />
        <Main />
      </View>
    );
  }
}
