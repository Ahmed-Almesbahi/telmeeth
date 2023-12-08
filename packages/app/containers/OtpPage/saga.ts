import { call, put, select, fork, take } from 'redux-saga/effects';

import { OTP_REQUEST } from './actions';
import {
  ROUTE_HOME_TEACHER,
  ROUTE_HOME_STUDENT,
  ROUTE_OTP
} from '../../Router';
import { TEACHER_TYPE } from '../../utils/constants';

import { makeSelectUser, SET_USER, makeSelectUserType } from '../User/ducks';

import { _post } from '../../utils/request';
import API from '../../utils/api';
import * as NavigationService from '../../NavigationService';

/**
 * Effect to handle verify
 * @param  {number} username             The mobile of the user
 * @param  {number} password             The OTP code
 * @param  {number} user_type            The type of the user, 1 = Teacher or 2 = student
 */
export function* verify({ username, password, user_type }: any, actions: any) {
  try {
    const response = yield call(API.verifyOtp, username, password, user_type);

    return response;
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    yield call(actions.setErrors, { passCode4: error.message });
    yield call(actions.setSubmitting, false);

    return false;
  }
}

/**
 * Verify OTP in saga
 */
export function* verifyOtpFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `OTP_REQUEST` actions and destructuring its payload
    // Our OTP_REQUEST action passes along the form values as the payload and form actions as
    // meta data. This allows us to not only use the values to do whatever API calls and such
    // we need, but also to maintain control flow here in our saga.
    const { payload: values, meta: actions } = yield take(OTP_REQUEST);

    const user_type = yield select(makeSelectUserType());
    const user = yield select(makeSelectUser());

    const response = yield call(
      verify,
      {
        username: user.mobile_no,
        password:
          values.passCode1 +
          values.passCode2 +
          values.passCode3 +
          values.passCode4,
        user_type: user_type
      },
      actions
    );

    if (response && response.status === true) {
      // ...we send Redux appropiate actions
      yield put({
        type: SET_USER,
        payload: { ...response.data, mobile: values.mobile }
      }); // User is logged in (authorized)

      if (user_type === TEACHER_TYPE) {
        // yield put(push(ROUTE_HOME_TEACHER)); // Go to Teacher Home page
        // NavigationService.navigate('HomeTeacher');
      } else {
        // yield put(push(ROUTE_HOME_STUDENT)); // Go to Studnet Home Page
        // NavigationService.navigate('HomeStudent');
      }
    }
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* root() {
  yield fork(verifyOtpFlow);
}
