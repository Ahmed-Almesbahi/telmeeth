import { fork, take, call, put } from 'redux-saga/effects';
import { LOAD_SETTINGS, settingsLoaded, settingLoadingError } from './ducks';
import API from '../../utils/api';

/**
 * Load settings saga
 */
export function* loadCertificatesSaga() {
  while (true) {
    yield take(LOAD_SETTINGS);
    try {
      const response = yield call(API.getSettingStatus);
      if (response && response.status === true) {
        yield put(settingsLoaded(response.data));
      }
    } catch (error) {
      yield put(settingLoadingError(error.message));
    }
  }
}

export default function* settingSaga() {
  yield fork(loadCertificatesSaga);
}
