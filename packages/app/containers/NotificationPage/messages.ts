/*
 * NotificationPage Messages
 *
 * This contains all the text for the NotificationPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.NotificationPage";

export default defineMessages({
  hide: {
    id: `${scope}.hide`,
    defaultMessage: "Hide"
  },
  sureToDelete: {
    id: `${scope}.sureToDelete`,
    defaultMessage: "Are you sure you want to delete ?"
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: "CANCEL"
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: "CONFIRM"
  },
  notifications: {
    id: `${scope}.notifications`,
    defaultMessage: "NOTIFICATIONS"
  }
});
