/*
 * SchedulePage Messages
 *
 * This contains all the text for the SchedulePage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.SchedulePage";

export default defineMessages({
  schedule: {
    id: `${scope}.schedule`,
    defaultMessage: "SCHEDULE"
  },
  noLessons: {
    id: `${scope}.noLessons`,
    defaultMessage: "No Lessons scheduled for this date"
  },
  individual: {
    id: `${scope}.individual`,
    defaultMessage: "INDIVIDUAL"
  },
  studentGroup: {
    id: `${scope}.studentGroup`,
    defaultMessage: "STUDENT GROUP"
  },
  studentHome: {
    id: `${scope}.studentHome`,
    defaultMessage: "STUDENT HOME"
  },
  teacherHome: {
    id: `${scope}.teacherHome`,
    defaultMessage: "TEACHER HOME"
  }
});
