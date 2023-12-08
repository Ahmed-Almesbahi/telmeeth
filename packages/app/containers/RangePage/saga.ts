import { take, call, put, fork } from 'redux-saga/effects';
import {
  LOAD_RANGE,
  loadRangeError,
  loadRangeSuccess,
  UPDATE_RANGE,
  updateRangeError,
  updateRangeSuccess
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { ROUTE_SETTINGS } from '../../Router';
import * as NavigationService from '../../NavigationService';
import { validateSettings } from '../DrawerPage/ducks';

/**
 * Load range saga
 */
export function* rootRangeSaga() {
  while (true) {
    yield take(LOAD_RANGE);
    try {
      const response = yield call(API.getUserLocation);
      if (response && response.status === true) {
        yield put(loadRangeSuccess(response.data));
      }
    } catch (error) {
      yield put(loadRangeError(error.message));
    }
  }
}

/**
 * Update range saga
 */
export function* updateRangeSaga() {
  while (true) {
    const { user_km_range } = yield take(UPDATE_RANGE);
    try {
      const response = yield call(API.saveUserLocationRange, user_km_range);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(updateRangeSuccess());
        yield put(validateSettings());
        NavigationService.navigate('Settings');
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(updateRangeError(error.message));
    }
  }
}

// Individual exports for testing
export default function* RangePageSaga() {
  yield fork(rootRangeSaga);
  yield fork(updateRangeSaga);
}

//signup/user-range
//user_km_range=9
//{"status":true,"message":"Record updated successfully","data":{"register_step":10}}
