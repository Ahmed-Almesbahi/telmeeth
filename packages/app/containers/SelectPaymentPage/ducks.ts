import { createSelector } from 'reselect';
import produce from 'immer';
import {
  BanksActionTypes,
  initialStateBankType,
  BankDataType,
  PaymentDataType
} from './types';

/*
 *
 * SelectPaymentPage constants
 *
 */
export const LOAD_BANKS = 'app/SelectPaymentPage/LOAD_BANKS';
export const LOAD_BANKS_SUCCESS = 'app/SelectPaymentPage/LOAD_BANKS_SUCCESS';
export const LOAD_BANKS_ERROR = 'app/SelectPaymentPage/LOAD_BANKS_ERROR';
export const GET_BANK_DETAILS = 'app/SelectPaymentPage/GET_BANK_DETAILS';
export const GET_BANK_DETAILS_SUCCESS =
  'app/SelectPaymentPage/GET_BANK_DETAILS_SUCCESS';
export const GET_BANK_DETAILS_ERROR =
  'app/SelectPaymentPage/GET_BANK_DETAILS_ERROR';

/*
 *
 * SelectPaymentPage reducer
 *
 */
export const initialState: initialStateBankType = {
  data: [],
  selected: {
    bank_id: 0,
    account_number: '',
    bank_name: '',
    due_amount: 0,
    due_date: '',
    iban_number: '',
    orginal_due_amount: 0,
    payment_id: 0,
    payment_status: 0,
    payment_step: '',
    student_credit: 0,
    tax_number: '',
    teacher_balance: 0,
    teacher_bank: '',
    teacher_credit: 0,
    teacher_id: 0
  },
  selectedBank: {
    bank_id: 0,
    bank_logo: '',
    bank_name: '',
    iban_number: '',
    tax_number: 0,
    telmeeth_ac_no: ''
  },
  bankLoading: false,
  loading: true,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: BanksActionTypes
): initialStateBankType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_BANKS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_BANKS_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_BANKS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_BANK_DETAILS:
        const selectedBank = draft.data.find(d => d.bank_id == action.bank_id);
        if (selectedBank != undefined) {
          draft.selectedBank = selectedBank;
        }

        draft.bankLoading = true;
        // draft.loading = true;
        draft.error = '';
        break;

      case GET_BANK_DETAILS_SUCCESS:
        draft.selected = action.data;
        draft.bankLoading = false;
        draft.loading = false;
        draft.loaded = true;
        break;

      case GET_BANK_DETAILS_ERROR:
        draft.error = action.error;
        draft.bankLoading = false;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the SelectPaymentPage state domain
 */

const selectBanksPageDomain = (state: any) => state.banks || initialState;

/**
 * Default selector used by SelectPaymentPage
 */

export const makeSelectBanksPage = () =>
  createSelector(
    selectBanksPageDomain,
    substate => substate
  );

/**
 * Load banks, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_BANKS
 */
export function banksLoad(): BanksActionTypes {
  return {
    type: LOAD_BANKS
  };
}

/**
 * Dispatched when the time difference are loaded by the request saga
 *
 * @param  {object} "data":{"time_diff":22}
 *
 * @return {object}      An action object with a type of LOAD_BANKS_SUCCESS passing the repos
 */
export function banksLoaded(data: Array<BankDataType>): BanksActionTypes {
  return {
    type: LOAD_BANKS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the request fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_BANKS_ERROR passing the error
 */
export function banksLoadingError(error: string): BanksActionTypes {
  return {
    type: LOAD_BANKS_ERROR,
    error
  };
}

/**
 * get bank details, this action starts the request saga
 *
 * @param  {string} datetime The current time
 * @param  {number} notification_id The notification id to check time difference
 * @return {object} An action object with a type of GET_BANK_DETAILS
 */
export function getBankDetails(bank_id: number): BanksActionTypes {
  return {
    type: GET_BANK_DETAILS,
    bank_id
  };
}

/**
 * Dispatched when the time difference are loaded by the request saga
 *
 * @param  {object} "data":{"time_diff":22}
 *
 * @return {object}      An action object with a type of GET_BANK_DETAILS_SUCCESS passing the repos
 */
export function getBankDetailsLoaded(data: PaymentDataType): BanksActionTypes {
  return {
    type: GET_BANK_DETAILS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the request fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of GET_BANK_DETAILS_ERROR passing the error
 */
export function getBankDetailsLoadingError(error: string): BanksActionTypes {
  return {
    type: GET_BANK_DETAILS_ERROR,
    error
  };
}
