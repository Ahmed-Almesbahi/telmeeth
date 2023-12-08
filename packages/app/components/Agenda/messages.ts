/*
 * HomeStudentPage Messages
 *
 * This contains all the text for the HomeStudentPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Agenda';

export default defineMessages({
  noRecords: {
    id: `${scope}.noRecords`,
    defaultMessage: 'No Lessons scheduled for this date'
  }
});
