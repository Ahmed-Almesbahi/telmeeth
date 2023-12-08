/*
 * CertificatePage Messages
 *
 * This contains all the text for the CertificatePage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SelectPicker';

export default defineMessages({
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filter...'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel'
  },
  noMatch: {
    id: `${scope}.noMatch`,
    defaultMessage: 'No matches'
  }
});
