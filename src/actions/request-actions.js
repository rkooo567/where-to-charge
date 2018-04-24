/*
* Actions for requesting data to API
*
* consists of:
*   dialogFlowAPI,
*   Volta API
*
* */

import {
  dialogFlowIntentRequested,
  dialogFlowIntentLoading,
  closestStationRequested,
} from './action-types';

// Volta API
const voltaBaseURL = "https://api.voltaapi.com/v1";

export function closestVoltaSitesRequest(currentLat, currentLon) {
  /*
  * Return the closest lon & lat based on the current user's lon & lat
  *
  * @params currentLat: current latitude of the user
  * @params currentLon: current longitude of the user
  * @returns type: closestStationRequested
  *          payload: the longitude and latitude of the closest station
  *
  * */
  return (dispatch) => {
    const requestURL = `${voltaBaseURL}/public-sites`;
    fetch(requestURL)
      .then(jsonData => jsonData.json())
      .then(publicSites => {
        console.log(publicSites);
      })
      .catch(err => console.error(err));
  }
}

// dialogFlow API
const dialogFlowBaseURL = "https://api.dialogflow.com/v1/";
const clientAccessTokenDialogFlow = "ee9872740f854c928ac17d2c720d0f29";

export function dialogIntentRequest(text) {
  /*
  * Query the intent of a given text using dialogFlow API
  *
  * @params text: string that we want to figure out the intent
  * @returns type: dialogFlowIntentRequested
  *          payload: the intent returned by dialogFlow
  *
  * */
  return (dispatch) => {
    // api request parameters
    const languageCode = 'en';
    const versionProtocol = '20150910';
    const sessionId = '12345';
    const timeZone = 'America/New_York';
    const intentRequestOption = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${clientAccessTokenDialogFlow}`,
        'content-type': 'application/json'
      }
    };
    // api request url
    const intentRequestURL =
      `${dialogFlowBaseURL}query?lang=${languageCode}v=${versionProtocol}&query=${text}&sessionId=${sessionId}&timezone=${timeZone}`;

    // fetch the data
    fetch(intentRequestURL, intentRequestOption)
      .then(res => res.json())
      .then(data => {
        // call loading first
        dispatch({
          type: dialogFlowIntentLoading,
          payload: {
            isLoading: true
          }
        });

        // if the request fails, that's error intent
        let intent = "errorIntent";
        if (data.status.code === 200) {
          intent = data.result.metadata.intentName;
        }

        // fetch the data and finish loading
        dispatch({
          type: dialogFlowIntentRequested,
          payload: {
            intent,
            isLoading: false
          }
        });
      })
      .catch(err => console.error(err));
  }
}
