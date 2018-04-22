/*
* Actions for requesting data to API
*
* */

import {
  dialogFlowIntentRequested,
  dialogFlowIntentLoading
} from './action-types';

const dialogFlowBaseURL = "https://api.dialogflow.com/v1/";
const clientAccessTokenDialogFlow = "ee9872740f854c928ac17d2c720d0f29";

export function dialogIntentRequest(text) {
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
        })
      })
      .catch(err => console.error(err));
  }
}
