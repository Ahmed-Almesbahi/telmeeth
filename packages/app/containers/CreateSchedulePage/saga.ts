import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  CREATE_SCHEDULE,
  createSchedulesError,
  createSchedulesSuccess
} from './ducks';
import API from '../../utils/api';
import { ROUTE_SCHEDULE } from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * Load  createSchedulePage saga
 */
export function* rootCreateSchedulePageSaga() {
  while (true) {
    const { data } = yield take(CREATE_SCHEDULE);
    try {
      const response = yield call(API.requestScheduledLesson, data);
      if (response && response.status === true) {
        yield put(createSchedulesSuccess());

        NavigationService.navigate('Schedule');
      }
    } catch (error) {
      yield put(createSchedulesError(error.message));
    }
  }
}

// Individual exports for testing
export default function* CreateSchedulePageSaga() {
  yield fork(rootCreateSchedulePageSaga);
}

//common/schedule-lesson
