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

import { Header } from 'react-native-elements';
import Main from '../Main/index';

export default class Home extends React.Component {

  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Main />
      </View>
    );
  }
}
