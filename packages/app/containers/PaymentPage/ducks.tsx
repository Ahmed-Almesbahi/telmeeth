import { createSelector } from 'reselect';
import produce from 'immer';
import { PaymentActionTypes, initialStatePaymentType } from './types';
import { BankDataType } from '../SelectPaymentPage/types';

/*
 *
 * PaymentPage constants
 *
 */
export const POST_PAYMENT = 'app/PaymentPage/POST_PAYMENT';
export const POST_PAYMENT_SUCCESS = 'app/PaymentPage/POST_PAYMENT_SUCCESS';
export const POST_PAYMENT_ERROR = 'app/PaymentPage/POST_PAYMENT_ERROR';

/*
 *
 * PaymentPage reducer
 *
 */
export const initialState: initialStatePaymentType = {
  //   data: [],
  loading: true,
  error: '',
  loaded: false
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: PaymentActionTypes
): initialStatePaymentType =>
  produce(state, draft => {
    switch (action.type) {
      case POST_PAYMENT:
        draft.loading = true;
        draft.error = '';
        break;

      case POST_PAYMENT_SUCCESS:
        // draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case POST_PAYMENT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the PaymentPage state domain
 */

const selectBanksPageDomain = (state: any) => state.payment || initialState;

/**
 * Default selector used by PaymentPage
 */

export const makeSelectBanksPage = () =>
  createSelector(
    selectBanksPageDomain,
    substate => substate
  );

/**
 * Load banks, this action starts the request saga
 *
 * @return {object} An action object with a type of POST_PAYMENT
 */
export function postPayment(data: any): PaymentActionTypes {
  return {
    type: POST_PAYMENT,
    data
  };
}

/**
 * Dispatched when the time difference are loaded by the request saga
 *
 * @param  {object} "data":{"time_diff":22}
 *
 * @return {object}      An action object with a type of POST_PAYMENT_SUCCESS passing the repos
 */
export function postPaymentSuccess(
  data: Array<BankDataType>
): PaymentActionTypes {
  return {
    type: POST_PAYMENT_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the request fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of POST_PAYMENT_ERROR passing the error
 */
export function postPaymentError(error: string): PaymentActionTypes {
  return {
    type: POST_PAYMENT_ERROR,
    error
  };
}
