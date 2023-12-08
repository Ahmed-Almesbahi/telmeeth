/*
 * PaymentPage Messages
 *
 * This contains all the text for the PaymentPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.PaymentPage";

export default defineMessages({
  selectBank: {
    id: `${scope}.selectBank`,
    defaultMessage: "SELECT BANK"
  },
  alAhliBank: {
    id: `${scope}.alAhliBank`,
    defaultMessage: "Al Ahli Bank"
  },
  alRajhiBank: {
    id: `${scope}.alRajhiBank`,
    defaultMessage: "Al rajhi Bank"
  }
});
