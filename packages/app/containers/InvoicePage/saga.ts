import { fork, take, call, put, select } from 'redux-saga/effects';
import { LOAD_INVOICES, invoicesLoaded, invoiceLoadingError } from './ducks';
import API from '../../utils/api';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';

/**
 * Load invoices saga
 */
export function* loadNotificationsSaga() {
  while (true) {
    const { page } = yield take(LOAD_INVOICES);
    const userType = yield select(makeSelectUserType());
    try {
      const response =
        userType === TEACHER_TYPE
          ? yield call(API.getTeacherHistory, page, 10)
          : yield call(API.getStudentHistory, page, 10);

      if (response && response.status === true) {
        yield put(invoicesLoaded(response.data));
      }
    } catch (error) {
      yield put(invoiceLoadingError(error.message));
    }
  }
}

export default function* invoiceSaga() {
  yield fork(loadNotificationsSaga);
}
