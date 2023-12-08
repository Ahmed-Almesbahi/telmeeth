/*
 * RequestPage Messages
 *
 * This contains all the text for the RequestPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.RequestPage";

export default defineMessages({
  requesting: {
    id: `${scope}.requesting`,
    defaultMessage: "Requesting ..."
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the RequestPage container!"
  },
  request: {
    id: `${scope}.request`,
    defaultMessage: "REQUEST"
  },
  youCanAccpet: {
    id: `${scope}.youCanAccpet`,
    defaultMessage:
      "YOU CAN NOT ACCPET THIS BOOKING REQUEST BECAUSE YOU HAVE ALEADY ACCEPTED A REQUEST RECENTLY"
  },
  tapToAccept: {
    id: `${scope}.tapToAccept`,
    defaultMessage: "TAP TO ACCEPT"
  }
});
