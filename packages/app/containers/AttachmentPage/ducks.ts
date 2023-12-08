import { createSelector } from 'reselect';
import produce from 'immer';
import {
  AttachmentActionTypes,
  AttachmentType,
  initialStateAttachmentType
} from './types';

/*
 *
 * AttachmentPage constants
 *
 */
export const LOAD_ATTACHMENTS = 'app/AttachmentPage/LOAD_ATTACHMENTS';
export const LOAD_ATTACHMENTS_SUCCESS =
  'app/AttachmentPage/LOAD_ATTACHMENTS_SUCCESS';
export const LOAD_ATTACHMENTS_ERROR =
  'app/AttachmentPage/LOAD_ATTACHMENTS_ERROR';
export const UPLOAD_ATTACHMENTS = 'app/AttachmentPage/UPLOAD_ATTACHMENTS';
export const UPLOAD_ATTACHMENTS_SUCCESS =
  'app/AttachmentPage/UPLOAD_ATTACHMENTS_SUCCESS';
export const UPLOAD_ATTACHMENTS_ERROR =
  'app/AttachmentPage/UPLOAD_ATTACHMENTS_ERROR';

/*
 *
 * AttachmentPage reducer
 *
 */
const initialData = {
  attachement_id: 0,
  attachement_name: 'string',
  attachement_type: '',
  user_id: 0
};
export const initialState: initialStateAttachmentType = {
  data: [],
  id: { ...initialData, attachement_type: '2' },
  personal: { ...initialData, attachement_type: '1' },
  certificate: { ...initialData, attachement_type: '3' },
  other: { ...initialData, attachement_type: '4' },
  loading: true,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: AttachmentActionTypes
): initialStateAttachmentType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ATTACHMENTS:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_ATTACHMENTS_SUCCESS:
        if (action.data.length > 0) {
          action.data.map(data => {
            switch (parseFloat(data.attachement_type)) {
              case 1:
                draft.personal = data;
                break;
              case 2:
                draft.id = data;
                break;
              case 3:
                draft.certificate = data;
                break;
              case 4:
                draft.other = data;
                break;
            }
          });
        }
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_ATTACHMENTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case UPLOAD_ATTACHMENTS:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case UPLOAD_ATTACHMENTS_SUCCESS:
        // switch (parseFloat(action.data.attachement_type)) {
        //   case 1:
        //     draft.personal = action.data;
        //     break;
        //   case 2:
        //     draft.id = action.data;
        //     break;
        //   case 3:
        //     draft.certificate = action.data;
        //     break;
        //   case 4:
        //     draft.other = action.data;
        //     break;
        // }

        draft.loading = false;
        draft.loaded = true;
        break;

      case UPLOAD_ATTACHMENTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the AttachmentPage state domain
 */

const selectAttachmentPageDomain = (state: any) =>
  state.attachments || initialState;

/**
 * Default selector used by AttachmentPage
 */

export const makeSelectAttachments = () =>
  createSelector(
    selectAttachmentPageDomain,
    substate => substate
  );

/**
 * Load the attachment, this action starts the request saga
 * @return {object} An action object with a type of LOAD_ATTACHMENTS
 */
export function loadAttachments(): AttachmentActionTypes {
  return {
    type: LOAD_ATTACHMENTS
  };
}

/**
 * Dispatched when the attachment are loaded by the request saga
 *
 * @param  {array} repos The attachment data
 *
 * @return {object}      An action object with a type of LOAD_ATTACHMENTS_SUCCESS passing the repos
 */
export function attachmentsLoaded(
  data: Array<AttachmentType>
): AttachmentActionTypes {
  return {
    type: LOAD_ATTACHMENTS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the attachment fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ATTACHMENTS_ERROR passing the error
 */
export function attachmentsLoadingError(error: string): AttachmentActionTypes {
  return {
    type: LOAD_ATTACHMENTS_ERROR,
    error
  };
}

/**
 * Delete the attachment, this action starts the request saga
 * @param  {number} data The attachment id to upload
 * @return {object} An action object with a type of UPLOAD_ATTACHMENTS
 */
export function uploadAttachment(data: any): AttachmentActionTypes {
  return {
    type: UPLOAD_ATTACHMENTS,
    data
  };
}

/**
 * Dispatched when the attachment are uploadd by the request saga
 *
 * @param  {number} attachment_id The attachment id to upload
 *
 * @return {object}      An action object with a type of UPLOAD_ATTACHMENTS_SUCCESS passing the repos
 */
export function uploadAttachmentSuccess(
  message: string
): AttachmentActionTypes {
  return {
    type: UPLOAD_ATTACHMENTS_SUCCESS,
    message
  };
}

/**
 * Dispatched when upload the attachment fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of UPLOAD_ATTACHMENTS_ERROR passing the error
 */
export function uploadAttachmentError(error: string): AttachmentActionTypes {
  return {
    type: UPLOAD_ATTACHMENTS_ERROR,
    error
  };
}
