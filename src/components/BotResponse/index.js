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
}
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

  componentDidUpdate() {
    // whenever intent is updated
    this.botRespondsTo(this.props.intent);
  }

  botRespondsTo(intent) {
    /* trigger actions for a given intent */
    if (intent === intentType.CLOSEST_STATION) {
      this.actionForClosestStationIntent();
    } else if (intent === intentType.FALLBACK) {
      this.actionForFallBackIntent();
    } else {
      // intent is default (empty string)
      this.actionForDefaultIntent();
    }
  }

  actionForClosestStationIntent() {
    /* find the closest volta station based on the current location */
    const isGeoLocationPermitted = this.isGeoLocationPermitted();
    let botText = "";
    let botResponseType = "";

    // ask permission if geo location is not permitted yet.
    if (!isGeoLocationPermitted) {
      this.askGeoLocationPermission();

      // change the state
      botText = "Please enable the geo location";
      botResponseType = responseType.TEXT;

    } else {
      // if geo location is permitted
      // get the current location
      this.props.getGeoLocation();
      // todo set the lon and lat of the closest volta station

      // change the state
      botText = "Click the button to open the map";
      botResponseType = responseType.OPEN_MAP;
    }

    // set the state based on the result
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

  // helper functions for actionForClosestStationIntent function
  isGeoLocationPermitted() {
    const { Permissions } = Expo;
    Permissions.getAsync(Permissions.Location)
      .then(status => {
        return status === 'granted';
      })
  }

  askGeoLocationPermission() {
    const { Permissions } = Expo;
    Permissions.askAsync(Permissions.LOCATION)
      .then(status => {
        if (status !== 'granted') {
          alert("You should allow this app to enable your location.");
        } else {
          // now the location permission is allowed.
          this.props.locationPermissionAllowed(true);
        }
      })
      .catch(err => console.error(err));
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
    geoLocationInformation: state.geoLocationInformation,
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
