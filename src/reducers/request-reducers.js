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
  // this is used for shouldComponentUpdate in component/BotResponse/index, line 60.
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
