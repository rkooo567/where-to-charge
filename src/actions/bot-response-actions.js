/* change the response text & response type of bot
 * Heavily used in the component botResponse/index
 *
  * */

import {
  botResponseChanged,
} from './action-types';

export const changeBotResponse = (text, type) => {
  return {
    type: botResponseChanged,
    payload: {
      botResponse: text,
      responseType: type
    }
  }
};
