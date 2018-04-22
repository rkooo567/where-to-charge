/*
* presentational component
*
* @class Error
* @classDesc shows error message
*
* */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
  static propTypes = {
    text: PropTypes.String,
    nameOfError: PropTypes.String
  };

  render() {
    return (
      <View>
        <Text>{this.props.nameOfError || "Exception"} : {this.props.text || "Error"}</Text>
      </View>
    );
  }
};
