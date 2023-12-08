import { fork, take, call, put } from 'redux-saga/effects';
import {
  LOAD_CERTIFICATES,
  certificatesLoaded,
  certificateLoadingError,
  DOWNLOAD_CERTIFICATE,
  downloadCertificateSuccess,
  downloadCertificateError
} from './ducks';
import API from '../../utils/api';

/**
 * Load certificates saga
 */
export function* loadCertificatesSaga() {
  while (true) {
    yield take(LOAD_CERTIFICATES);
    try {
      const response = yield call(API.getTeacherSubjects);
      if (response && response.status === true) {
        yield put(certificatesLoaded(response.data, response.total_data));
      }
    } catch (error) {
      yield put(certificateLoadingError(error.message));
    }
  }
}

/**
 * delete certificates saga
 */
export function* downloadCertificateSaga() {
  while (true) {
    const { subject_ids } = yield take(DOWNLOAD_CERTIFICATE);
    try {
      const response = yield call(API.getDownloadCertificateUrls, subject_ids);
      if (response && response.status === true) {
        yield put(downloadCertificateSuccess(response.data.pdfUrl));
      }
    } catch (error) {
      yield put(downloadCertificateError(error.message));
    }
  }
}

export default function* certificateSaga() {
  yield fork(loadCertificatesSaga);
  yield fork(downloadCertificateSaga);
}
