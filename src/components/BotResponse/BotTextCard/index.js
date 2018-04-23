/*
* Presentational component
*
* @class BotTextCard
* @classDesc chatbot's text response
*
* */

import React from 'react';
import {
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

class BotTextCard extends React.Component {
  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    return (
      <View>
        <Text>Bot: {this.props.text}</Text>
      </View>
    );
  }
}

export default BotTextCard;
