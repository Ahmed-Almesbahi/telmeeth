/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfilePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ContactPage container!'
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username'
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login'
  },
  first_name: {
    id: `${scope}.first_name`,
    defaultMessage: 'First Name'
  },
  last_name: {
    id: `${scope}.last_name`,
    defaultMessage: 'Last Name'
  },
  gender: {
    id: `${scope}.gender`,
    defaultMessage: 'Gender'
  },
  dob: {
    id: `${scope}.dob`,
    defaultMessage: 'DOB'
  },
  id_type: {
    id: `${scope}.id_type`,
    defaultMessage: 'ID Type'
  },
  id_number: {
    id: `${scope}.id_number`,
    defaultMessage: 'ID Number'
  },
  edu_cert: {
    id: `${scope}.edu_cert`,
    defaultMessage: 'Educational Certification'
  },
  major: {
    id: `${scope}.major`,
    defaultMessage: 'Major'
  },
  job: {
    id: `${scope}.job`,
    defaultMessage: 'Job'
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'SAVE'
  },
  usernameRequired: {
    id: `${scope}.usernameRequired`,
    defaultMessage: 'please enter username'
  },
  personalProfile: {
    id: `${scope}.personalProfile`,
    defaultMessage: 'PERSONAL PROFILE'
  },
  passportId: {
    id: `${scope}.passportId`,
    defaultMessage: 'Passport ID'
  },
  nationalId: {
    id: `${scope}.nationalId`,
    defaultMessage: 'National ID'
  },
  male: {
    id: `${scope}.male`,
    defaultMessage: 'male'
  },
  female: {
    id: `${scope}.female`,
    defaultMessage: 'female'
  },
  betweenDigits: {
    id: `${scope}.betweenDigits`,
    defaultMessage: 'You must enter 9 numbers and start with 5 , ex : 500000000'
  },
  mobile_no: {
    id: `${scope}.mobile_no`,
    defaultMessage: 'Mobile Number'
  }
});
