import { fork, take, call, put, select } from 'redux-saga/effects';
import {
  LOAD_BANKS,
  banksLoadingError,
  banksLoaded,
  GET_BANK_DETAILS,
  getBankDetailsLoaded,
  getBankDetailsLoadingError
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import { ROUTE_PAYMENT } from '../../Router';
import * as NavigationService from '../../NavigationService';

/**
 * Load Banks saga
 */
export function* loadBanksSaga() {
  while (true) {
    yield take(LOAD_BANKS);
    try {
      // const userType = yield select(makeSelectUserType());
      const response = yield call(API.getBanks);

      if (response && response.status === true) {
        yield put(banksLoaded(response.data));
      }
    } catch (error) {
      yield put(banksLoadingError(error.message));
    }
  }
}

/**
 * get bank details saga
 */
export function* getBankDetailsSaga() {
  while (true) {
    const { bank_id } = yield take(GET_BANK_DETAILS);
    try {
      const response = yield call(API.getBankDetails);
      if (response && response.status === true) {
        if (response.data.due_amount === 0) {
          throw new Error('No amount due at the moment');
        }
        yield put(getBankDetailsLoaded({ bank_id, ...response.data }));
        // yield put(push(ROUTE_PAYMENT + '/' + bank_id));
        NavigationService.navigate('Payment', { bank_id });
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(getBankDetailsLoadingError(error.message));
    }
  }
}

export default function* profileSaga() {
  yield fork(loadBanksSaga);
  yield fork(getBankDetailsSaga);
}
