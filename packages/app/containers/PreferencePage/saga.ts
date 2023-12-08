import { fork, take, call, put } from 'redux-saga/effects';
import {
  LOAD_PREFERENCE,
  preferenceLoaded,
  preferenceLoadingError,
  SET_PREFERENCE,
  preferenceUpdated,
  preferenceUpdatingError,
  LOAD_TEACHING_LOCATION,
  teachingLocationLoaded,
  teachingLocationLoadingError,
  SET_TEACHING_LOCATION,
  teachingLocationUpdated,
  teachingLocationUpdatingError
} from './ducks';
import API from '../../utils/api';
import { validateSettings } from '../DrawerPage/ducks';

/**
 * Load teaching types saga
 */
export function* loadTeachingTypesSaga() {
  while (true) {
    yield take(LOAD_PREFERENCE);
    try {
      const response = yield call(API.getTeachingType);
      if (response && response.status === true) {
        yield put(preferenceLoaded(response.data));
      }
    } catch (error) {
      yield put(preferenceLoadingError(error.message));
    }
  }
}

/**
 * Set teaching types saga
 */
export function* setTeachingTypesSaga() {
  while (true) {
    const { is_individual, is_student_group } = yield take(SET_PREFERENCE);
    try {
      const response = yield call(
        API.setTeachingType,
        is_individual,
        is_student_group
      );
      if (response && response.status === true) {
        yield put(preferenceUpdated(response.message));
      }
    } catch (error) {
      yield put(preferenceUpdatingError(error.message));
    }
  }
}

/**
 * Load teaching types saga
 */
export function* loadTeachingLocationsSaga() {
  while (true) {
    yield take(LOAD_TEACHING_LOCATION);
    try {
      const response = yield call(API.getTeachingLocation);
      if (response && response.status === true) {
        yield put(teachingLocationLoaded(response.data));
      }
    } catch (error) {
      yield put(teachingLocationLoadingError(error.message));
    }
  }
}

/**
 * Set teaching types saga
 */
export function* setTeachingLocationsSaga() {
  while (true) {
    const { is_teacher_home, is_student_home } = yield take(
      SET_TEACHING_LOCATION
    );
    try {
      const response = yield call(
        API.setTeachingLocation,
        is_teacher_home,
        is_student_home
      );
      if (response && response.status === true) {
        yield put(teachingLocationUpdated(response.message));
        yield put(validateSettings());
      }
    } catch (error) {
      yield put(teachingLocationUpdatingError(error.message));
    }
  }
}

export default function* preferenceSaga() {
  yield fork(loadTeachingTypesSaga);
  yield fork(setTeachingTypesSaga);
  yield fork(loadTeachingLocationsSaga);
  yield fork(setTeachingLocationsSaga);
}
