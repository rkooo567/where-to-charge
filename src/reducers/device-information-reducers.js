/*
* Reducers for the information of the device.
*
* */

import {
  getUserLocation
} from '../actions/action-types';

// initial state is the lat and lon of uc berkeley.
const userLocationInitialState = {
  lat: "37.8716",
  lon: "122.2727",
};

export const getUserLocationReducer = (state = userLocationInitialState, action) => {
  let newState = null;

  switch (action.type) {
    case getUserLocation:
      // get the current location of the user
      newState = Object.assign({}, state, {
        lat: action.payload.lat,
        lon: action.payload.lon
      });
      return newState;
    default:
      return state;
  }
};
