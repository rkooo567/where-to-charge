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
import {
  Button,
  Text,
} from 'native-base';
import Expo from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import actions
import {
  getGeoLocation
} from '../../actions/index';

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

  shouldComponentUpdate(nextProps, nextState) {
    // updated only when intent or responseType of bot is changed.
    const botResponseChanged = this.state.botResponse !== nextState.botResponse;
    const responseTypeChanged = this.state.responseType !== nextState.responseType;
    // this value is toggled every time user asks a question. By this,
    //   we can use botRespondTo function whenever user asks a question.
    //   without this, this component is not rerendered if intent is not changed, which means
    //   we cannot ask the same questions in a row.
    // You can make this part more straightforward by making
    //   this.botRespondsTo() the redux action.
    const questionAsked = this.props.questionAsked !== nextProps.questionAsked;

    return botResponseChanged || responseTypeChanged || questionAsked;
  }

  componentDidUpdate() {
    // whenever question is asked by users.
    this.botRespondsTo(this.props.intent);
  }

  botRespondsTo(intent) {
    /* trigger actions for a given intent */
    if (intent === intentType.CLOSEST_STATION) {
      console.log("closest location required");
      this.actionForClosestStationIntent();
    } else if (intent === intentType.FALLBACK) {
      console.log("fall back required");
      this.actionForFallBackIntent();
    } else {
      // intent is default (empty string)
      console.log("default required");
      this.actionForDefaultIntent();
    }
  }

  actionForClosestStationIntent() {
    /* find the closest volta station based on the current location */

    // ask location permission.
    Expo.Permissions.askAsync(Expo.Permissions.LOCATION)
      .then(result => {
        const status = result.status;
        if (status === 'granted') {
          // if geo location is permitted
          console.log("geo location permitted");
          this.sendOpenMapMessage();
        } else {
          // if geo location is not permitted
          console.log("geo location not permitted");
          this.send_Location_Permission_Required_Message();
        }
      })
      .catch(err => console.error(err));
  }

  sendOpenMapMessage() {
    // get the current location
    this.props.getGeoLocation();
    console.log("geo location updated");
    console.log(this.props.geoLocationInformation);
    // todo set the lon and lat of the closest volta station
    const currentCoordinate = Expo.Location.getCurrentPositionAsync({enableHighAccuracy: true});


    // change the state (send the message)
    let botText = "Click the button to open the map";
    let botResponseType = responseType.OPEN_MAP;
    this.setState({
      botResponse: botText,
      responseType: botResponseType
    });
  }

  send_Location_Permission_Required_Message() {
    /* send a bot message that we need a permission to open a map */
    let botText = "Please enable the geo location";
    let botResponseType = responseType.TEXT;
    // change the state (send the message)
    this.setState({
      botResponse: botText,
      responseType: botResponseType
    });
  }

  actionForFallBackIntent() {
    this.setState({
      botResponse: "I don't understand what you said",
      responseType: responseType.TEXT
    });
  }

  actionForDefaultIntent() {
    this.setState({
      botResponse: "Hi! Ask me questions about Volta",
      responseType: responseType.TEXT
    });
  }

  mapOpenButtonHandler() {
    console.log("map will open!");
  }

  render() {
    if (this.props.error) {
      return <Error />;
    } else if (this.props.isLoading) {
      return <Loading />;
    } else if (this.state.responseType === responseType.OPEN_MAP) {
      return (
        <View>
          <BotTextCard text={this.state.botResponse}/>
          <Button rounded onPress={() => this.mapOpenButtonHandler()}>
            <Text>Open the map</Text>
          </Button>
        </View>
      );
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
    userGeoLocationInformation: state.userGeoLocationInformation,
    // this value is toggeld whenever the user asks a question
    questionAsked: state.dialogFlowInformation.questionAsked
  }
}

function mapDispatchToProps(dispatch) {
  // bring actions you need here
  return bindActionCreators(
    {
      getGeoLocation,
    },
    dispatch);
}

// connect redux actions, states and the component
export default connect(mapStateToProps, mapDispatchToProps)(BotResponse);
