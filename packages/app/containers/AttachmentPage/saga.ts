import { fork, take, call, put } from 'redux-saga/effects';
import {
  LOAD_ATTACHMENTS,
  attachmentsLoaded,
  attachmentsLoadingError,
  UPLOAD_ATTACHMENTS,
  uploadAttachmentSuccess,
  uploadAttachmentError,
  loadAttachments
} from './ducks';
import API from '../../utils/api';
import { ROUTE_SETTINGS } from '../../Router';
import { showSnackbar } from '../Snackbar/ducks';
import { validateSettings } from '../DrawerPage/ducks';

/**
 * Load attachments saga
 */
export function* loadAttachmentsSaga() {
  while (true) {
    yield take(LOAD_ATTACHMENTS);
    try {
      const response = yield call(API.getAllDocumentStatus);
      if (response && response.status === true) {
        yield put(attachmentsLoaded(response.data));
      }
    } catch (error) {
      yield put(attachmentsLoadingError(error.message));
    }
  }
}

/**
 * upload attachments saga
 */
export function* uploadAttachmentSaga() {
  while (true) {
    const { data } = yield take(UPLOAD_ATTACHMENTS);
    try {
      const response = yield call(API.uploadDocument, data);

      if (response && response.status == true) {
        yield put(showSnackbar(response.message));
        yield put(uploadAttachmentSuccess(response.message));
        yield put(loadAttachments());
        yield put(validateSettings());
        // yield call(action.setSubmitting, false);
        // yield put(push(ROUTE_SETTINGS));
      }
    } catch (error) {
      // yield call(action.setErrors, { item_name: error.message });
      // yield call(action.setSubmitting, false);

      yield put(showSnackbar(error.message));
      yield put(uploadAttachmentError(error.message));
    }
  }
}

export default function* attachmentSaga() {
  yield fork(loadAttachmentsSaga);
  yield fork(uploadAttachmentSaga);
}
