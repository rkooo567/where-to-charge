/*
* Reducers for changing the bot response
*
* */

import {
  botResponseChanged,
} from '../actions/action-types';

// bot response's types.
const responseType = {
  TEXT: 'TEXT',
  OPEN_MAP: 'OPEN_MAP',
};

const botResponseInitialState = {
  botResponseText: "Hi! Ask me questions about Volta",
  responseType: responseType.TEXT,
};

export const botResponseReducers = (state = botResponseInitialState, action) => {
  let newState = null;

  switch (action.type) {
    case botResponseChanged:
      // get the current location of the user
      newState = Object.assign({}, state, {
        botResponseText: action.payload.botResponse,
        responseType: action.payload.responseType,
      });
      return newState;
    default:
      return state;
  }
};
