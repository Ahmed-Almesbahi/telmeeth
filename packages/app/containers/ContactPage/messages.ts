/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.ContactPage";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the ContactPage container!"
  },
  subject: {
    id: `${scope}.subject`,
    defaultMessage: "Subject"
  },
  subjectRequired: {
    id: `${scope}.subjectRequired`,
    defaultMessage: "please select your subject"
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: "Username"
  },
  writeHere: {
    id: `${scope}.writeHere`,
    defaultMessage: "Write here your message"
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: "SUBMIT"
  },
  messageRequired: {
    id: `${scope}.messageRequired`,
    defaultMessage: "please type your message"
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: "please enter username"
  },
  contactUs: {
    id: `${scope}.contactUs`,
    defaultMessage: "CONTACT US"
  },
  suggestion: {
    id: `${scope}.suggestion`,
    defaultMessage: "Suggestion"
  },
  complaints: {
    id: `${scope}.complaints`,
    defaultMessage: "Complaints"
  }
});
