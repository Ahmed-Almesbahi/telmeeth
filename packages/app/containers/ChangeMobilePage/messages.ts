/*
 * ContactPage Messages
 *
 * This contains all the text for the ContactPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ChangeMobile';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'CHANGE MOBILE'
  },
  mobile_no: {
    id: `${scope}.mobile_no`,
    defaultMessage: 'Mobile Number'
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login'
  },
  mobile_noRequired: {
    id: `${scope}.mobile_noRequired`,
    defaultMessage: 'please enter your mobile number'
  },
  betweenDigits: {
    id: `${scope}.betweenDigits`,
    defaultMessage: 'You must enter 9 numbers and start with 5 , ex : 500000000'
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'SAVE'
  }
});
