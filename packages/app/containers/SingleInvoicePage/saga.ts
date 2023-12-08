import { take, call, put, select, fork } from 'redux-saga/effects';
import {
  RECEIVED_PAYMENT,
  LIKE_TEACHER,
  likeTeacherUpdated,
  likeTeacherError,
  RATE_TEACHER,
  rateTeacherError,
  rateTeacherUpdated,
  LOAD_LESSON_DETAILS,
  selectInvoice
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';
import {
  ROUTE_HOME_TEACHER,
  ROUTE_HOME_STUDENT,
  ROUTE_SINGLE_INVOICE
} from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * Receive Payment  saga
 */
export function* rootReceivedPaymentPageSaga() {
  while (true) {
    const { lesson_id } = yield take(RECEIVED_PAYMENT);
    try {
      const response = yield call(API.acceptPayment, lesson_id);
      if (response && response.status === true) {
        const userType = yield select(makeSelectUserType());

        NavigationService.navigate(
          userType === TEACHER_TYPE ? 'HomeTeacher' : 'HomeStudent'
        );
        yield put(showSnackbar(response.message));
        // yield put(receivedPaymentSuccess(response.data));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      // yield put(receivedPaymentError(error.message));
    }
  }
}

/**
 * Load lesson details for student  saga
 */
export function* loadLessonDetailsSaga() {
  while (true) {
    const { lesson_id } = yield take(LOAD_LESSON_DETAILS);
    try {
      const response = yield call(API.getLessonDetails, lesson_id);
      if (response && response.status === true) {
        yield put(selectInvoice(response.data));
        NavigationService.navigate('SingleInvoice');
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      // yield put(receivedPaymentError(error.message));
    }
  }
}

/**
 * Like Teacher saga
 */
export function* likeTeacherSaga() {
  while (true) {
    const { teacher_id } = yield take(LIKE_TEACHER);
    try {
      const response = yield call(API.likeTeacher, teacher_id);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(likeTeacherUpdated(teacher_id));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(likeTeacherError(error.message));
    }
  }
}

/**
 * Rate Teacher saga
 */
export function* rateTeacherSaga() {
  while (true) {
    const { teacher_id, item_id, lesson_id, rating } = yield take(RATE_TEACHER);
    try {
      const response = yield call(
        API.rateTeacher,
        teacher_id,
        item_id,
        lesson_id,
        rating
      );
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        // yield put(rateTeacherUpdated(teacher_id));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(rateTeacherError(error.message));
    }
  }
}

// Individual exports for testing
export default function* SingleInvoicePageSaga() {
  yield fork(rootReceivedPaymentPageSaga);
  yield fork(loadLessonDetailsSaga);
  yield fork(likeTeacherSaga);
  yield fork(rateTeacherSaga);
}
//getLessonDetails
