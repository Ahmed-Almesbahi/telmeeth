import { fork, take, call, put, select } from 'redux-saga/effects';
import {
  LOAD_PROFILE,
  profileLoaded,
  profileLoadingError,
  UPDATE_PROFILE,
  updateProfileSuccess,
  updateProfileError
} from './ducks';
import API from '../../utils/api';
import { ROUTE_SETTINGS } from '../../Router';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';
import * as NavigationService from '../../NavigationService';
import { showSnackbar } from '../Snackbar/ducks';
import { validateSettings } from '../DrawerPage/ducks';

/**
 * Load profile saga
 */
export function* loadProfileSaga() {
  while (true) {
    yield take(LOAD_PROFILE);
    try {
      const userType = yield select(makeSelectUserType());
      const response =
        userType === TEACHER_TYPE
          ? yield call(API.getTeacherPersonalInfo)
          : yield call(API.getStudentPersonalInfo);

      if (response && response.status === true) {
        yield put(profileLoaded(response.data));
      }
    } catch (error) {
      yield put(profileLoadingError(error.message));
    }
  }
}

/**
 * update profile saga
 */
export function* updateProfileSaga() {
  while (true) {
    const { data, action } = yield take(UPDATE_PROFILE);
    try {
      const userType = yield select(makeSelectUserType());

      if (data.identity_name == '') {
        delete data.identity_name;
      }
      if (data.identity_number == '') {
        delete data.identity_number;
      }
      if (data.job == '') {
        delete data.job;
      }
      if (data.edu_cert_id == '') {
        delete data.edu_cert_id;
      }
      if (data.major_id == '') {
        delete data.major_id;
      }
      const response =
        userType === TEACHER_TYPE
          ? yield call(API.setTeacherPersonalInfo, data)
          : yield call(API.setStudentPersonalInfo, data);
      // const response = yield call(API.setTeacherPersonalInfo, data);
      if (response && response.status === true) {
        yield put(updateProfileSuccess());
        yield put(validateSettings());
        yield call(action.setSubmitting, false);
        NavigationService.navigate('Settings');
      }
    } catch (error) {
      yield call(action.setErrors, { item_name: error.message });
      yield call(action.setSubmitting, false);
      yield put(showSnackbar(error.message));
      yield put(updateProfileError(error.message));
    }
  }
}

export default function* profileSaga() {
  yield fork(loadProfileSaga);
  yield fork(updateProfileSaga);
}

// setTeacherPersonalInfo
