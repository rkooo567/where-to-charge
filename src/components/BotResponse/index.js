/*
* smart component
*
* @class BotResponse
* @classDesc chatbot will response through this component
*
* @props intent: intent of dialogflow as a response of user's chat string
* @props isDialogFlowLoading: loading for dialogflow request api
* @props userGeoLocationInformation: user's current geo location object {lon, lat}
* @props questionAsked: toggled value for shouldComponentUpdate
* @props closestSiteCoordinate: closest site' lon and lat
* @props isClosestSitesLoading: loading for getting the closest sites from the current location
* @props botResponse: {botResponse, responseType} bot's response text and type (TEXT & MAP)
*
* */

import React from 'react';
import {
  View,
} from 'react-native';
import Expo from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import actions
import {
  getGeoLocation,
  getClosestVoltaSitesRequest,
  changeBotResponse
} from '../../actions/index';

import Loading from '../Loading/index';
import Error from '../Error/index';
import BotTextCard from './BotTextCard/index';
import BotMapButtonCard from './BotMapButtonCard/index';

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
    isDialogFlowLoading: PropTypes.bool,
    userGeoLocationInformation: PropTypes.shape({
      lon: PropTypes.number,
      lat: PropTypes.number,
    }),
    questionAsked: PropTypes.bool,
    closestSiteCoordinate: PropTypes.shape({
      lon: PropTypes.number,
      lat: PropTypes.number,
    }),
    isClosestSitesLoading: PropTypes.bool,
    botResponse: PropTypes.shape({
      botResponseText: PropTypes.string,
      responseType: PropTypes.string
    }),
  };

  shouldComponentUpdate(nextProps, nextState) {
    // updated when bot response, responseType are changed or an user asks a question
    const botResponseChanged =
      this.props.botResponse.botResponseText !== nextProps.botResponse.botResponseText;
    const responseTypeChanged =
      this.props.botResponse.responseType !== nextProps.botResponse.responseType;
    /* this value is toggled every time user asks a question. By this,
    *   we can use botRespondTo function whenever user asks a question.
    *   without this, this component is not rerendered if intent is not changed, which means
    *   we cannot ask the same questions in a row.
    * You can make this part more straightforward by making
    *   this.botRespondsTo() the redux action.
    */
    const questionAsked = this.props.questionAsked !== nextProps.questionAsked;

    // rerender the component if one of these happens
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
          this.sendOpenMapMessage();
        } else {
          // if geo location is not permitted
          this.send_Location_Permission_Required_Message();
        }
      })
      .catch(err => console.error(err));
  }

  sendOpenMapMessage() {
    // get the current location
    this.props.getGeoLocation();

    const currentLat = this.props.userGeoLocationInformation.lat;
    const currentLon = this.props.userGeoLocationInformation.lon;
    // update the closest site's lon and lat. It will be passed to
    //   BotMapButtonCard to open the map.
    this.props.getClosestVoltaSitesRequest(currentLat, currentLon);
  }

  send_Location_Permission_Required_Message() {
    /* send a bot message that we need a permission to open a map */
    let newBotText = "Please enable the geo location. If you enabled, ask me again!";
    let newBotResponseType = responseType.TEXT;
    // change the state (send the message)
    this.props.changeBotResponse(newBotText, newBotResponseType);
  }

  actionForFallBackIntent() {
    let newBotText = 'I don\'t understand what you said';
    let newBotResponseType = responseType.TEXT;
    this.props.changeBotResponse(newBotText, newBotResponseType);
  }

  actionForDefaultIntent() {
    let newBotText = 'Hi! Ask me questions about Volta';
    let newBotResponseType = responseType.TEXT;
    this.props.changeBotResponse(newBotText, newBotResponseType);
  }

  render() {
    if (this.props.error) {
      return <Error />;
    } else if (this.props.isDialogFlowLoading || this.props.isClosestSitesLoading) {
      // if dialogFlow or volta API is called, render the loading component
      return <Loading />;
    } else if (this.props.botResponse.responseType === responseType.OPEN_MAP) {
      return (
        <View>
          <BotTextCard text={this.props.botResponse.botResponseText}/>
          <BotMapButtonCard
            closestSiteCoordinate={this.props.closestSiteCoordinate}
          />
        </View>
      );
    } else {
      // if the response type is a text
      return (
        <View>
          <BotTextCard text={this.props.botResponse.botResponseText}/>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  // bring redux (global) state here
  return {
    intent: state.dialogFlowInformation.intent,
    isDialogFlowLoading: state.dialogFlowInformation.isLoading,
    // user's geo location {lon, lat}
    userGeoLocationInformation: state.userGeoLocationInformation,
    // this value is toggeld whenever the user asks a question
    questionAsked: state.dialogFlowInformation.questionAsked,
    // closest sites {lon, lat, isLoading}
    closestSiteCoordinate: state.closestSitesInformation.coordinate,
    isClosestSitesLoading: state.closestSitesInformation.isLoading,
    botResponse: state.botResponse,
  }
}

function mapDispatchToProps(dispatch) {
  // bring actions you need here
  return bindActionCreators(
    {
      getGeoLocation,
      getClosestVoltaSitesRequest,
      changeBotResponse
    },
    dispatch);
}

// connect redux actions, states and the component
export default connect(mapStateToProps, mapDispatchToProps)(BotResponse);
