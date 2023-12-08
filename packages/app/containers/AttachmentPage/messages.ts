/*
 * AttachmentPage Messages
 *
 * This contains all the text for the AttachmentPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AttachmentPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AttachmentPage container!'
  },
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'PREVIEW'
  },
  Attachments: {
    id: `${scope}.Attachments`,
    defaultMessage: 'Attachments'
  },
  sizeMustBeLess: {
    id: `${scope}.sizeMustBeLess`,
    defaultMessage: 'Size must be less than 5 MB'
  },
  certificate: {
    id: `${scope}.certificate`,
    defaultMessage: 'CERTIFICATE'
  },
  personalPicture: {
    id: `${scope}.personalPicture`,
    defaultMessage: 'PERSONAL PICTURE'
  },
  ID: {
    id: `${scope}.ID`,
    defaultMessage: 'ID'
  },
  other: {
    id: `${scope}.other`,
    defaultMessage: 'OTHER'
  },
  size: {
    id: `${scope}.size`,
    defaultMessage: 'Size must be less than 5 MB'
  },
  change: {
    id: `${scope}.change`,
    defaultMessage: 'CHANGE'
  },
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'UPLOAD'
  },
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Attachments'
  }
});
