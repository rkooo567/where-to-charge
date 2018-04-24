import { combineReducers } from 'redux';
import {
  dialogFlowRequestReducer,
  closestSitesReducers
} from './request-reducers';
import { getUserLocationReducer } from './device-information-reducers';
import { botResponseReducers } from './bot-response-reducers';

const rootReducer = combineReducers({
  dialogFlowInformation: dialogFlowRequestReducer,
  userGeoLocationInformation: getUserLocationReducer,
  closestSitesInformation: closestSitesReducers,
  botResponse: botResponseReducers,
});

export default rootReducer;