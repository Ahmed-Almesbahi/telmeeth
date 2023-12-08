import { fork, take, call, put, select } from 'redux-saga/effects';
import {
  timeDiffereceLoaded,
  timeDiffereceLoadingError,
  LOAD_TIME_DIFF,
  acceptLessonSuccess,
  acceptLessonError,
  ACCEPT_LESSON
} from './ducks';
import API from '../../utils/api';
import { ROUTE_HOME_TEACHER } from '../../Router';
import { showSnackbar } from '../Snackbar/ducks';
// import { ROUTE_SETTINGS } from '../../Router';
// import { makeSelectUserType } from '../User/ducks';
// import { TEACHER_TYPE } from '../../utils/constants';
import * as NavigationService from '../../NavigationService';

/**
 * Load Time Different to check if timer is end or still saga
 */
export function* loadTimeDiffSaga() {
  while (true) {
    const { datetime, notification_id } = yield take(LOAD_TIME_DIFF);
    try {
      // const userType = yield select(makeSelectUserType());
      const response = yield call(
        API.getRemainingTime,
        datetime,
        notification_id
      );

      if (response && response.status === true) {
        yield put(timeDiffereceLoaded(response.data));
      }
    } catch (error) {
      yield put(timeDiffereceLoadingError(error.message));
    }
  }
}

/**
 * Accept Lesson saga
 */
export function* acceptLessonSaga() {
  while (true) {
    const { data } = yield take(ACCEPT_LESSON);
    try {
      // const userType = yield select(makeSelectUserType());
      const response = yield call(API.acceptLesson, data);

      if (response && response.status === true) {
        yield put(acceptLessonSuccess());
        yield put(showSnackbar(response.message));

        NavigationService.navigate('HomeTeacher');
      }
    } catch (error) {
      yield put(acceptLessonError(error.message));
    }
  }
}

export default function* profileSaga() {
  yield fork(loadTimeDiffSaga);
  yield fork(acceptLessonSaga);
}

//common/get-time-diff?datetime=2019-07-05%2006:49:21&notification_id=6723
//{"status":true,"message":"listed successfully","data":{"time_diff":22}}

//lessons/accept-lesson
// params =  {"notification_id":"6723","is_teacher_home":"0","is_student_home":"0","subject_id":"75","student_count":"1","student_id":"1195"}
// {"status":true,"message":"Request accepted successfully"}
