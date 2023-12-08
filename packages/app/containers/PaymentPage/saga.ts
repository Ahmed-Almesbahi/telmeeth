import { fork, take, call, put, select } from 'redux-saga/effects';
import { POST_PAYMENT, postPaymentSuccess, postPaymentError } from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { ROUTE_HOME_TEACHER } from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * Post Payment  saga
 */
export function* postPaymentSaga() {
  while (true) {
    const { data } = yield take(POST_PAYMENT);
    try {
      // const userType = yield select(makeSelectUserType());
      const response = yield call(API.postPayment, data);

      if (response && response.status == true) {
        yield put(showSnackbar(response.message));
        yield put(postPaymentSuccess(response.data));
        NavigationService.navigate('HomeTeacher');
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(postPaymentError(error.message));
    }
  }
}

export default function* profileSaga() {
  yield fork(postPaymentSaga);
}
