import { take, call, put, select, fork } from 'redux-saga/effects';
import { SEND_CONTACT_US } from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';
import { ROUTE_HOME_TEACHER, ROUTE_HOME_STUDENT } from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * update contactPage saga
 */
export function* updateContactPageSaga() {
  while (true) {
    const { data, action } = yield take(SEND_CONTACT_US);
    try {
      const userType = yield select(makeSelectUserType());
      const response = yield call(
        API.callContactUs,
        data.contact_type,
        data.contact_description
      );
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield call(action.setSubmitting, false);
        // yield put(
        //   push(
        //     userType === TEACHER_TYPE ? ROUTE_HOME_TEACHER : ROUTE_HOME_STUDENT
        //   )
        // );
        NavigationService.navigate(
          userType === TEACHER_TYPE ? 'HomeTeacher' : 'HomeStudent'
        );
      }
    } catch (error) {
      // yield call(action.setErrors, { item_name: error.message });
      yield call(action.setSubmitting, false);
      // yield put(updateProfileError(error.message));
    }
  }
}

// Individual exports for testing
export default function* ContactPageSaga() {
  yield fork(updateContactPageSaga);
}

//
