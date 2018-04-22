import {
  dialogFlowIntentRequested,
  dialogFlowIntentLoading
} from '../actions/action-types';

dialogFlowInitialState = {
  intent: "",
  isLoading: false,
};

export const dialogFlowRequestReducer = (state = dialogFlowInitialState, action) => {
  switch (action.type) {
    case dialogFlowIntentRequested:
      state = {
        intent: action.payload.intent,
        loading: action.payload.isLoading
      };
      return state;

    case dialogFlowIntentLoading:
      state.loading = action.payload.isLoading;
      return state;

    default:
      return state;
  }
};
