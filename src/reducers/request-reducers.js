/*
* Reducers for requesting API.
*
* */

import {
  dialogFlowIntentRequested,
  dialogFlowIntentLoading
} from '../actions/action-types';

const dialogFlowInitialState = {
  intent: "",
  isLoading: false,
};

export const dialogFlowRequestReducer = (state = dialogFlowInitialState, action) => {
  let newState = null;
  switch (action.type) {
    case dialogFlowIntentRequested:
      newState = Object.assign({}, state,
          {
            intent: action.payload.intent,
            isLoading: action.payload.isLoading
          }
        );
      return newState;

    case dialogFlowIntentLoading:
      newState = Object.assign({}, state,
        {
          intent: state.intent,
          isLoading: action.payload.isLoading
        }
      );
      return newState;

    default:
      return state;
  }
};
