import { fork, take, call, put } from 'redux-saga/effects';
import {
  drawerLoaded,
  drawerLoadingError,
  LOAD_DRAWER,
  VALIDATE_SETTINGS_ERROR,
  VALIDATE_SETTINGS,
  validateSettingsLoaded,
  validateSettingsError
} from './ducks';
import API from '../../utils/api';

import { logoutUser } from '../User/ducks';
import { ROUTE_LAUNCHER } from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * Load drawer saga
 */
export function* loadDrawerSaga() {
  while (true) {
    yield take(LOAD_DRAWER);
    try {
      const response = yield call(API.getMenuUserData);
      if (response && response.status === true) {
        if (response.data.latitude) {
          response.data.latitude = parseFloat(response.data.latitude);
        }
        if (response.data.longitude) {
          response.data.longitude = parseFloat(response.data.longitude);
        }
        yield put(drawerLoaded(response.data));
      }
    } catch (error) {
      yield put(drawerLoadingError(error.message));
      if (error.message == 'Your request was made with invalid credentials.') {
        yield put(logoutUser());
        NavigationService.navigate('Launcher');
      }
    }
  }
}

export function* validateSettingsSaga() {
  while (true) {
    yield take(VALIDATE_SETTINGS);
    try {
      const response = yield call(API.getSettingStatus);
      if (response && response.status === true) {
        yield put(validateSettingsLoaded(response.data));
      }
    } catch (error) {
      yield put(validateSettingsError(error.message));
    }
  }
}

export default function* drawerSaga() {
  yield fork(loadDrawerSaga);
  yield fork(validateSettingsSaga);
}
