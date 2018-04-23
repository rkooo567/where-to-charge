/*
* smart component
*
* @class BotResponse
* @classDesc chatbot will response through this component
*
* @props intent: (string) intent of dialogflow as a response of user's chat string
* @props isLoading: (boolean) loading for dialogflow request api
*
* */

import React from 'react';
import {
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../Loading/index';
import Error from '../Error/index';
import BotTextCard from './BotTextCard/index';

// bot response's types.
const responseType = {
  TEXT: 'TEXT',
  OPEN_MAP: 'OPEN_MAP',
};

// intent types that are returned by dialog flow
const intentType = {
  FALLBACK: "Default Fallback Intent",
  CLOSEST_STATION: "closestStation",
  DEFAULT: "",
};

class BotResponse extends React.Component {
  static propTypes = {
    intent: PropTypes.string,
    isLoading: PropTypes.boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      botResponse: "Hi! Ask me questions about Volta",
      responseType: responseType.TEXT,
    };
  }

  componentDidUpdate() {
    this.botRespondsTo(this.props.intent);
  }

  botRespondsTo(intent) {
    /* trigger actions for a given intent */
    if (intent === intentType.CLOSEST_STATION) {
      this.setResponseTypeTo(responseType.OPEN_MAP);
      this.setBotTextTo("Click the button to open the map");
      /* todo create an action that can ask
          1. user's permission for geo location
          2. set user's geo location
          3. call volta api to find a closest station from the geo location
      */
      // todo open the map using the user's geo location
    } else if (intent === intentType.FALLBACK) {
      this.setResponseTypeTo(responseType.TEXT);
      this.setBotTextTo("I don't understand what you said");
    } else {
      // intent is default (empty string)
      this.setResponseTypeTo(responseType.TEXT);
      this.setBotTextTo("Hi! Ask me questions about Volta");
    }
  }

  setBotTextTo(text) {
    this.setState({ botResponse: text });
  }

  setResponseTypeTo(type) {
    this.setState({ responseType: type });
  }

  render() {
    if (this.props.error) {
      return <Error />;
    } else if (this.props.isLoading) {
      return <Loading />;
    } else if (this.state.responseType === responseType.OPEN_MAP) {

    } else {
      // if the response type is a text
      return (
        <View>
          <BotTextCard text={this.state.botResponse}/>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  // bring redux (global) state here
  return {
    intent: state.dialogFlowInformation.intent,
    isLoading: state.dialogFlowInformation.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  // bring actions you need here
  return bindActionCreators(
    {

    },
    dispatch);
}

// connect redux actions, states and the component
export default connect(mapStateToProps, mapDispatchToProps)(BotResponse);
