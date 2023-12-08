/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EducationInformation';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ContactPage container!'
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username'
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit'
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'please enter username'
  },
  educationInformation: {
    id: `${scope}.educationInformation`,
    defaultMessage: 'EDUCATION INFORMATION'
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'DELETE'
  },
  sureToDelete: {
    id: `${scope}.sureToDelete`,
    defaultMessage: 'Are you sure you want to delete ?'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'CANCEL'
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'CONFIRM'
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add'
  },
  Class: {
    id: `${scope}.Class`,
    defaultMessage: 'Class'
  },
  Subject: {
    id: `${scope}.Subject`,
    defaultMessage: 'Subject'
  },
  TypeOfEducation: {
    id: `${scope}.TypeOfEducation`,
    defaultMessage: 'Type Of Education'
  },
  Major: {
    id: `${scope}.Major`,
    defaultMessage: 'Major'
  },
  Level: {
    id: `${scope}.Level`,
    defaultMessage: 'Level'
  },
  University: {
    id: `${scope}.University`,
    defaultMessage: 'University'
  },
  College: {
    id: `${scope}.College`,
    defaultMessage: 'College'
  }
});
