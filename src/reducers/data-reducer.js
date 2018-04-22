import { DATA_AVAILABLE } from "../actions/action-types";

let dataState = { data: [], loading:true };

export const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      state = Object.assign({}, state, { data: action.data, loading:false });
      return state;
    default:
      return state;
  }
};
