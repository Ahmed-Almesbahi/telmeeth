/*
 * SettingPage Messages
 *
 * This contains all the text for the SettingPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingPage';

export default defineMessages({
  setting: {
    id: `${scope}.setting`,
    defaultMessage: 'SETTINGS'
  },
  personalInformation: {
    id: `${scope}.personalInformation`,
    defaultMessage: 'PERSONAL INFORMATION'
  },
  teachingInformation: {
    id: `${scope}.teachingInformation`,
    defaultMessage: 'TEACHING INFORMATION'
  },
  attachments: {
    id: `${scope}.attachments`,
    defaultMessage: 'ATTACHMENTS'
  },
  location: {
    id: `${scope}.location`,
    defaultMessage: 'LOCATION'
  },
  preference: {
    id: `${scope}.preference`,
    defaultMessage: 'PREFERENCE'
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'LANGUAGE'
  },
  range: {
    id: `${scope}.range`,
    defaultMessage: 'RANGE'
  },
  changeMobile: {
    id: `${scope}.changeMobile`,
    defaultMessage: 'CHANGE MOBILE NUMBER'
  },
  signOut: {
    id: `${scope}.signOut`,
    defaultMessage: 'SIGN OUT'
  }
});
