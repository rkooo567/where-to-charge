import { combineReducers } from 'redux';
import { dataReducer } from './data-reducer';

const rootReducer = combineReducers({
  dataReducer: dataReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;