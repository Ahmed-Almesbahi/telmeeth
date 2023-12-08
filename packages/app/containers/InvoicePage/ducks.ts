import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateInvoiceType,
  InvoiceActionTypes,
  InvoiceType
} from './types';

/*
 *
 * InvoicesPage constants
 *
 */
export const LOAD_INVOICES = 'app/InvoicesPage/LOAD_INVOICES';
export const LOAD_INVOICES_SUCCESS = 'app/InvoicesPage/LOAD_INVOICES_SUCCESS';
export const LOAD_INVOICES_ERROR = 'app/InvoicesPage/LOAD_INVOICES_ERROR';

/*
 *
 * InvoicesPage reducer
 *
 */

export const initialState: initialStateInvoiceType = {
  data: [],
  loading: false,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: InvoiceActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_INVOICES:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_INVOICES_SUCCESS:
        action.data.map(d => draft.data.push(d));
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_INVOICES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the invoicePage state domain
 */

const selectInvoicesPageDomain = (state: any) => state.invoices || initialState;

/**
 * Default selector used by InvoicesPage
 */

export const makeSelectInvoices = () =>
  createSelector(
    selectInvoicesPageDomain,
    substate => substate
  );

/**
 * Load the invoices, this action starts the request saga
 * @param  {number} page The page number
 * @return {object} An action object with a type of LOAD_INVOICES
 */
export function loadInvoices(page: number): InvoiceActionTypes {
  return {
    type: LOAD_INVOICES,
    page
  };
}

/**
 * Dispatched when the invoices are loaded by the request saga
 *
 * @param  {array} repos The invoice data
 *
 * @return {object}      An action object with a type of LOAD_INVOICES_SUCCESS passing the repos
 */
export function invoicesLoaded(data: Array<InvoiceType>): InvoiceActionTypes {
  return {
    type: LOAD_INVOICES_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the invoice fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_INVOICES_ERROR passing the error
 */
export function invoiceLoadingError(error: string): InvoiceActionTypes {
  return {
    type: LOAD_INVOICES_ERROR,
    error
  };
}
