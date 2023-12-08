import { fork, take, call, put } from 'redux-saga/effects';
import {
  LOAD_HOME_TEACHER,
  homeTeacherLoaded,
  homeTeacherLoadingError,
  GO_ONLINE_HOME_TEACHER,
  goOnlineUpdated,
  goOnlineError,
  CANCEL_LESSON,
  cancelLessonSuccess,
  cancelLessonError,
  START_LESSON,
  startLessonSuccess,
  startLessonError,
  END_LESSON,
  endLessonError
} from './ducks';
import API from '../../utils/api';
import { SHOW_SNACKBAR, showSnackbar } from '../Snackbar/ducks';
import { selectInvoice } from '../SingleInvoicePage/ducks';
import { ROUTE_SINGLE_INVOICE } from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * Load homeTeacher saga
 */
export function* loadHomeTeacherSaga() {
  while (true) {
    yield take(LOAD_HOME_TEACHER);
    try {
      const response = yield call(API.todayLesson);
      if (response && response.status === true) {
        yield put(homeTeacherLoaded(response.top_setting, response.data));
      }
      if (response && response.status === false) {
        yield put(
          homeTeacherLoadingError(response.message, response.top_setting)
        );
      }
    } catch (error) {
      yield put(homeTeacherLoadingError(error.message, error.top_setting));
    }
  }
}

/**
 * Go Online or offline saga
 */
export function* goOnlineOrOfflineSaga() {
  while (true) {
    const { is_online } = yield take(GO_ONLINE_HOME_TEACHER);
    try {
      const response = yield call(API.goOnline, is_online);
      if (response && response.status === true) {
        yield put(goOnlineUpdated());
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(goOnlineError(error.message));
    }
  }
}

/**
 * Cancel Lessson saga
 */
export function* cancelLessonSaga() {
  while (true) {
    const { lesson_id } = yield take(CANCEL_LESSON);
    try {
      const response = yield call(API.cancelLesson, lesson_id, null, null);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(cancelLessonSuccess(response.lesson_id));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(cancelLessonError(error.message));
    }
  }
}

/**
 * Cancel Lessson saga
 */
export function* startLessonSaga() {
  while (true) {
    const { lesson_id, actual_number_of_students } = yield take(START_LESSON);
    try {
      const response = yield call(
        API.startLesson,
        lesson_id,
        actual_number_of_students
      );
      //{"status":true,"message":"Record updated successfully","data":{"unique_id":"I000742","order_id":26,"teacher_id":4216,"lesson_id":742,"original_amt":735,"creditearn_discount":0,"total_amount":735,"promocode_discount":0,"total_hours":"08:10","subject_name":"Tawheed","lesson_actual_start_time":"12:51 AM","lesson_actual_end_time":"09:01 AM","actual_number_of_students":1,"lesson_date":"2019-07-24","teaching_type_name":"Individual","teaching_location":"Student Home"}}
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(startLessonSuccess(lesson_id));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(startLessonError(error.message));
    }
  }
}

/**
 * End Lessson saga
 */
export function* endLessonSaga() {
  while (true) {
    const { lesson_id } = yield take(END_LESSON);
    try {
      const response = yield call(API.endLesson, lesson_id);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(selectInvoice(response.data));
        NavigationService.navigate('SingleInvoice');
        // yield put(endLessonSuccess(response.lesson_id));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(endLessonError(error.message));
    }
  }
}

export default function* homeTeacherSaga() {
  yield fork(loadHomeTeacherSaga);
  yield fork(goOnlineOrOfflineSaga);
  yield fork(cancelLessonSaga);
  yield fork(startLessonSaga);
  yield fork(endLessonSaga);
}
