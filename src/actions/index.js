//Import the sample data
import Data from '../instruction.json';
import { DATA_AVAILABLE } from './constants';

export function getData(){
  return (dispatch) => {

    //Make API Call
    //For this example, I will be using the sample data in the json file
    //delay the retrieval [Sample reasons only]
    setTimeout(() => {
      const data  = Data.instructions;
      dispatch({type: DATA_AVAILABLE, data:data});
    }, 2000);

  };
}