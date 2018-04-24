/*
* Presentational component
*
* @class BotMapButtonCard
* @classDesc map button that opens the map with given lon and lat.
*
* @props closestSiteCoordinate: {lat, lon} contains the closest site's coordinate.
*
* */

import React from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Button
} from 'native-base';
import PropTypes from 'prop-types';
import openMap from 'react-native-open-maps';

class BotMapButtonCard extends React.Component {
  static propTypes = {
    closestSiteCoordinate: PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number
    }),
  };

  mapOpenButtonHandler() {
    // todo open the map with this.props.closestSiteCoordinate
    const latitude = this.props.closestSiteCoordinate.lat;
    const longitude = this.props.closestSiteCoordinate.lon;
    // open the map with given props' lat and lon
    openMap({ latitude, longitude});
  }

  render() {
    return (
      <View>
        <Button rounded onPress={() => this.mapOpenButtonHandler()}>
          <Text>Open the map</Text>
        </Button>
      </View>
    );
  }
}

export default BotMapButtonCard;
