import { fork, take, call, put, select } from 'redux-saga/effects';
import {
  LOAD_SCHEDULE,
  schedulesLoaded,
  scheduleLoadingError,
  DELETE_SCHEDULE,
  deleteScheduleSuccess,
  deleteScheduleError
} from './ducks';
import API from '../../utils/api';
import { makeSelectUserId } from '../User/ducks';
import _forIn from 'lodash/forIn';
import { SHOW_SNACKBAR } from '../Snackbar/ducks';
import moment from 'moment';

/**
 * Load schedule saga
 */
export function* loadScheduleSaga() {
  while (true) {
    yield take(LOAD_SCHEDULE);

    try {
      const userId = yield select(makeSelectUserId());
      const response = yield call(API.getTeacherScheduls, userId);

      let data: any = [];
      response.forEach((childSnapshot: any) => {
        let childData = childSnapshot.val();

        var d = new Date();
        var n = d.getTime();

        let later = moment(parseFloat(childSnapshot.key)).format('YYYY-MM-DD');
        let now = moment(n).format('YYYY-MM-DD');

        // if (parseFloat(childSnapshot.key) < n) {
        if (moment(now).isBefore(later, 'year')) {
          return;
        }

        // if (parseFloat(childSnapshot.key) < n) {
        //   return;
        // }

        _forIn(childData.ScheduledLessons, function(value, key) {
          data.push({
            ...value,
            firebase_lesson_id: key,
            firebase_lesson_date: childSnapshot.key
          });
        });

        // let firebase_lesson_date = childSnapshot.key;
        // let firebase_lesson_id = head(keys(childData.ScheduledLessons));
        // let extract = head(values(childData.ScheduledLessons));
        // if (extract !== undefined) {
        //   data.push({ ...extract, firebase_lesson_id, firebase_lesson_date });
        // }
      });
      if (response) {
        yield put(schedulesLoaded(data));
      }
    } catch (error) {
      console.log('errror', error);
      yield put(scheduleLoadingError(error.message));
    }
  }
}

/**
 * Delete schedule saga
 */
export function* deleteScheduleSaga() {
  while (true) {
    const { firebase_lesson_id, firebase_lesson_date } = yield take(
      DELETE_SCHEDULE
    );
    try {
      const response = yield call(
        API.cancelLesson,
        false,
        firebase_lesson_id,
        firebase_lesson_date
      );
      if (response && response.status === true) {
        yield put({
          type: SHOW_SNACKBAR,
          message: response.message
        }); // User is logged in (authorized)
        yield put(deleteScheduleSuccess(response, firebase_lesson_id));
      }
    } catch (error) {
      yield put(deleteScheduleError(error.message));
    }
  }
}

export default function* scheduleSaga() {
  yield fork(loadScheduleSaga);
  yield fork(deleteScheduleSaga);
}

// get data from firebase
//lessons/cancel-lesson
