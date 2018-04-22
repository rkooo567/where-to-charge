import { combineReducers } from 'redux';
import { dialogFlowRequestReducer } from './request-reducers';

const rootReducer = combineReducers({
  dialogFlowInformation: dialogFlowRequestReducer
});

export default rootReducer;