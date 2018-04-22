/*
* presentational component
*
* @class Loading
* @classDesc shows a loading spinner
*
* */

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import {styles} from "./style";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true}/>
        <Text>Loading . . .</Text>
      </View>
    );
  }
};
