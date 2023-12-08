/*
 * PushNotification Messages
 *
 * This contains all the text for the PushNotification container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PushNotification';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PushNotification container!',
  },
});
