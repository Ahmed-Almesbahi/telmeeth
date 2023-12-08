import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateChangeMobilePageType,
  ChangeMobilePageActionTypes
} from './types';
import { FormikActions } from 'formik';

/*
 *
 * ChangeMobilePage constants
 *
 */
export const UPDATE_MOBILE_NUMBER = 'app/ChangeMobilePage/UPDATE_MOBILE_NUMBER';
export const UPDATE_MOBILE_NUMBER_SUCCESS =
  'app/ChangeMobilePage/UPDATE_MOBILE_NUMBER_SUCCESS';
export const UPDATE_MOBILE_NUMBER_ERROR =
  'app/ChangeMobilePage/UPDATE_MOBILE_NUMBER_ERROR';

/*
 *
 * ChangeMobilePage reducer
 *
 */
export const initialState: initialStateChangeMobilePageType = {
  mobile_no: '',
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: ChangeMobilePageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_MOBILE_NUMBER:
        break;
      case UPDATE_MOBILE_NUMBER_SUCCESS:
        break;
      case UPDATE_MOBILE_NUMBER_ERROR:
        break;
    }
  });

/**
 * Direct selector to the changeMobilePage state domain
 */
const selectChangeMobilePageDomain = (state: any) =>
  state.changeMobilePage || initialState;

/**
 * Default selector used by ChangeMobilePage
 */
export const makeSelectChangeMobilePage = () =>
  createSelector(
    selectChangeMobilePageDomain,
    substate => substate
  );

/*
 *
 * ChangeMobilePage actions
 *
 */
export function updateMobileNumber(
  data: any,
  action: FormikActions<any>
): ChangeMobilePageActionTypes {
  return {
    type: UPDATE_MOBILE_NUMBER,
    data,
    action
  };
}
export function updateMobileNumberSuccess(): ChangeMobilePageActionTypes {
  return {
    type: UPDATE_MOBILE_NUMBER_SUCCESS
  };
}
export function updateMobileNumberError(): ChangeMobilePageActionTypes {
  return {
    type: UPDATE_MOBILE_NUMBER_ERROR
  };
}
