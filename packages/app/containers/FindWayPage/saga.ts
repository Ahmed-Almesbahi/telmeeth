import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  ON_MY_WAY,
  updateOnMyWaySuccess,
  UPDATE_USER_LOCATION,
  updateUserLocationSuccess
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';

/**
 * update findWayPage saga
 */
export function* onMyWaySaga() {
  while (true) {
    const { recipient_id, lesson_id } = yield take(ON_MY_WAY);
    try {
      const response = yield call(API.setOnMyWay, recipient_id, lesson_id);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(updateOnMyWaySuccess(response.data));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  }
}

export function* updateLocationSaga() {
  while (true) {
    const { current_latitude, current_longitude } = yield take(
      UPDATE_USER_LOCATION
    );
    try {
      const response = yield call(
        API.updateLocation,
        current_latitude,
        current_longitude
      );
      if (response && response.status === true) {
        // yield put(showSnackbar(response.message));
        yield put(
          updateUserLocationSuccess(current_latitude, current_longitude)
        );
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
    }
  }
}

// Individual exports for testing
export default function* FindWayPageSaga() {
  yield fork(onMyWaySaga);
  yield fork(updateLocationSaga);
}

//updateLocation

///notification/on-my-way
// params = recipient_id=1195&lesson_id=730
//  {"multicast_id":9170232347929119550,"success":0,"failure":1,"canonical_ids":0,"results":[{"error":"MismatchSenderId"}]}
