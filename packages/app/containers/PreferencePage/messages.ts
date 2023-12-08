/*
 * PreferencePage Messages
 *
 * This contains all the text for the PreferencePage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.PreferencePage";

export default defineMessages({
  preference: {
    id: `${scope}.preference`,
    defaultMessage: "PREFERENCE"
  },
  done: {
    id: `${scope}.done`,
    defaultMessage: "DONE"
  },
  teacherHome: {
    id: `${scope}.teacherHome`,
    defaultMessage: "TEACHER HOME"
  },
  studentHome: {
    id: `${scope}.studentHome`,
    defaultMessage: "STUDENT HOME"
  },
  individual: {
    id: `${scope}.individual`,
    defaultMessage: "INDIVIDUAL"
  },
  studentGroup: {
    id: `${scope}.studentGroup`,
    defaultMessage: "STUDENT GROUP"
  }
});
