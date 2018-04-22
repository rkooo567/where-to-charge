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

import CustomHeader from '../CustomHeader/index';
import Main from '../Main/index';

export default class Home extends React.Component {

  render() {
    return (
      <View>
        <CustomHeader />
        <Main />
      </View>
    );
  }
}
