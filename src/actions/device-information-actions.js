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
  /* get geo location of the device. user's permission is required. */
  const locationInfo = Expo.Location.getCurrentPositionAsync({enableHighAccuracy: true});
  // extract the lat, lon from location information of the device
  const coordinate = {
    lat: locationInfo.latitude,
    lon: locationInfo.longitude
  };

  return {
    type: getUserLocation,
    payload: coordinate
  }
}
