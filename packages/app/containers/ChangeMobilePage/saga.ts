import { take, call, put, select, fork } from 'redux-saga/effects';

import API from '../../utils/api';
import { UPDATE_MOBILE_NUMBER } from './ducks';
import { makeSelectDeviceDetail } from '../DeviceDetail/ducks';
import { makeSelectUserType, SET_OTP, makeSelectUserId } from '../User/ducks';
import * as NavigationService from '../../NavigationService';

/**
 * update changeMobilePage saga
 */
export function* updateChangeMobilePageSaga() {
  while (true) {
    const { data, action } = yield take(UPDATE_MOBILE_NUMBER);

    try {
      const deviceDetails = yield select(makeSelectDeviceDetail());
      const user_type = yield select(makeSelectUserType());
      const userId = yield select(makeSelectUserId());
      const response = yield call(API.sendOtp, {
        ...deviceDetails,
        // "user_id": 4216,

        mobile_no: data.mobile_no,
        user_type: user_type,
        user_id: userId
      });
      if (response && response.status === true) {
        yield put({
          type: SET_OTP,
          payload: { ...response.data, mobile_no: data.mobile_no }
        }); // User is logged in (authorized)
        NavigationService.navigate('Otp');
        // yield put(updateProfileSuccess());
        // yield call(action.setSubmitting, false);
        // yield put(push(ROUTE_SETTINGS));
      }
    } catch (error) {
      // yield call(action.setErrors, { item_name: error.message });
      // yield call(action.setSubmitting, false);
      // yield put(updateProfileError(error.message));
    }
  }
}

// Individual exports for testing
export default function* ChangeMobilePageSaga() {
  yield fork(updateChangeMobilePageSaga);
}
