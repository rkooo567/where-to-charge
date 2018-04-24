import { combineReducers } from 'redux';
import { dialogFlowRequestReducer } from './request-reducers';
import { getUserLocationReducer } from './device-information-reducers';

const rootReducer = combineReducers({
  dialogFlowInformation: dialogFlowRequestReducer,
  userGeoLocationInformation: getUserLocationReducer,
});

export default rootReducer;