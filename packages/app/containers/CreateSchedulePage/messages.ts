/*
 * CreateSchedulePage Messages
 *
 * This contains all the text for the CreateSchedulePage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.CreateSchedulePage";

export default defineMessages({
  createSchedule: {
    id: `${scope}.createSchedule`,
    defaultMessage: "CREATE SCHEDULE"
  },
  individual: {
    id: `${scope}.individual`,
    defaultMessage: "INDIVIDUAL"
  },
  studentGroup: {
    id: `${scope}.studentGroup`,
    defaultMessage: "STUDENT GROUP"
  },
  teacherHome: {
    id: `${scope}.teacherHome`,
    defaultMessage: "TEACHER HOME"
  },
  studentHome: {
    id: `${scope}.studentHome`,
    defaultMessage: "STUDENT HOME"
  },
  done: {
    id: `${scope}.done`,
    defaultMessage: "DONE"
  }
});
