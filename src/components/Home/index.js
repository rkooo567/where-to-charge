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
} from 'react-native';

import Header from '../Header/index';
import Main from '../Main/index';

class Home extends React.Component {

  render() {
    return (
      <View>
        <Header />
        <Main />
      </View>
    );
  }
}
