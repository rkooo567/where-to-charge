/*
* get the information of the user from the device.
* Every action might require the permissions.
* Please check permission-actions for permission actions.
*
* */

import {
  getUserLocation,
} from './action-types';
import Expo from 'expo';

export function getGeoLocation() {
  return (dispatch) => {
    /* get geo location of the device. user's permission is required. */
    let coordinate = {
      lat: "",
      lon: ""
    };

    Expo.Location.getCurrentPositionAsync({enableHighAccuracy: true})
      .then(locationData => {
        // extract the lat, lon from location information of the device
        coordinate.lat = locationData.coords.latitude;
        coordinate.lon = locationData.coords.longitude;
        dispatch({
          type: getUserLocation,
          payload: coordinate
        });
      })
      .catch(err => console.error(err));
  }
}
