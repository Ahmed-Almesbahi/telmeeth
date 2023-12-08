import { fork, take, call, put } from 'redux-saga/effects';
import {
  LOAD_TEACHING_INFORMATION,
  DELETE_TEACHING_INFORMATION,
  teachingLoaded,
  teachingLoadingError,
  deleteTeachingInformationSuccess,
  deleteTeachingInformationError
} from './ducks';
import API from '../../utils/api';

/**
 * Load teaching saga
 */
export function* loadTeachingSaga() {
  while (true) {
    const { page } = yield take(LOAD_TEACHING_INFORMATION);
    try {
      const response = yield call(API.getNewEducationList);
      if (response && response.status === true) {
        yield put(teachingLoaded(response.data));
      }
    } catch (error) {
      yield put(teachingLoadingError(error.message));
    }
  }
}

/**
 * delete teaching saga
 */
export function* deleteTeachingSaga() {
  while (true) {
    const { teaching_id } = yield take(DELETE_TEACHING_INFORMATION);
    try {
      // FIXME: I belive this is not working
      // const response = yield call(API.deleteTeaching, teaching_id);
      // if (response && response.status === true) {
      //   yield put(deleteTeachingInformationSuccess(teaching_id));
      // }
    } catch (error) {
      yield put(deleteTeachingInformationError(error.message));
    }
  }
}

export default function* notificationSaga() {
  yield fork(loadTeachingSaga);
  yield fork(deleteTeachingSaga);
}
