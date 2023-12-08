/*
 * LauncherPage Messages
 *
 * This contains all the text for the LauncherPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.LauncherPage";

export default defineMessages({
  student: {
    id: `${scope}.student`,
    defaultMessage: "Studnet"
  },
  teacher: {
    id: `${scope}.teacher`,
    defaultMessage: "Teacher"
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: "Username"
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: "Password"
  }
});
