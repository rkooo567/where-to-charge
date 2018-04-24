/*
* Reducers for requesting API.
*
* */

import {
  dialogFlowIntentRequested,
  dialogFlowIntentLoading,
  closestSitesRequested,
  closestSitesLoading,
} from '../actions/action-types';

const dialogFlowInitialState = {
  intent: "",
  isLoading: false,
  // this is used for shouldComponentUpdate in component/BotResponse/index.
  // the value is toggled every time the action is triggered.
  // By doing this, we can update the component BotResponse
  //  whenever dialogFlowRequest action is triggered.
  questionAsked: false,
};

export const dialogFlowRequestReducer = (state = dialogFlowInitialState, action) => {
  let newState = null;

  switch (action.type) {
    case dialogFlowIntentRequested:
      // update the returned intent from dialogFlow API
      newState = Object.assign({}, state,
          {
            intent: action.payload.intent,
            isLoading: action.payload.isLoading,
            // toggle the value. If you don't know what it is, check line 14.
            questionAsked: !state.questionAsked
          });
      return newState;

    case dialogFlowIntentLoading:
      // change the loading status
      newState = Object.assign({}, state,
        {
          intent: state.intent,
          isLoading: action.payload.isLoading,
          questionAsked: state.questionAsked
        }
      );
      return newState;

    default:
      return state;
  }
};

const closestLocationInitialStates = {
  coordinate: {
    lat: 37.8716,
    lon: 122.2727,
  },
  isLoading: false,
};

export const closestSitesReducers = (state = closestLocationInitialStates, action) => {
  let newState = null;

  switch (action.type) {
    case closestSitesRequested:
      // update the closest sites' lon and lat.
      newState = Object.assign({}, state,
        {
          coordinate: {
            lat: action.payload.coordinate.lat,
            lon: action.payload.coordinate.lon,
          },
          isLoading: action.payload.isLoading,
        });

      return newState;

    case closestSitesLoading:
      // change the loading status
      newState = Object.assign({}, state,
        {
          coordinate: {
            lat: state.coordinate.lat,
            lon: state.coordinate.lon,
          },
          isLoading: action.payload.isLoading,
        }
      );
      return newState;

    default:
      return state;
  }
};