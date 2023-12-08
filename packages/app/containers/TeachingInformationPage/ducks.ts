import { createSelector } from 'reselect';
import produce from 'immer';
import {
  TeachingInformationActionTypes,
  TeachingInformationType,
  initialStateTeachingInformationType
} from './types';

/*
 *
 * TeachingInformationPage constants
 *
 */
export const LOAD_TEACHING_INFORMATION =
  'app/TeachingInformationPage/LOAD_TEACHING_INFORMATION';
export const LOAD_TEACHING_INFORMATION_SUCCESS =
  'app/TeachingInformationPage/LOAD_TEACHING_INFORMATION_SUCCESS';
export const LOAD_TEACHING_INFORMATION_ERROR =
  'app/TeachingInformationPage/LOAD_TEACHING_INFORMATION_ERROR';
export const DELETE_TEACHING_INFORMATION =
  'app/TeachingInformationPage/DELETE_TEACHING_INFORMATION';
export const DELETE_TEACHING_INFORMATION_SUCCESS =
  'app/TeachingInformationPage/DELETE_TEACHING_INFORMATION_SUCCESS';
export const DELETE_TEACHING_INFORMATION_ERROR =
  'app/TeachingInformationPage/DELETE_TEACHING_INFORMATION_ERROR';

/*
 *
 * TeachingInformationPage reducer
 *
 */
export const initialState: initialStateTeachingInformationType = {
  data: [],
  loading: false,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: TeachingInformationActionTypes
): initialStateTeachingInformationType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TEACHING_INFORMATION:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_TEACHING_INFORMATION_SUCCESS:
        // action.data.map(d => draft.data.push(d));
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_TEACHING_INFORMATION_ERROR:
        draft.error = action.error;
        draft.data = initialState.data;
        draft.loading = false;
        break;

      case DELETE_TEACHING_INFORMATION:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case DELETE_TEACHING_INFORMATION_SUCCESS:
        // draft.data.splice(
        //   draft.data.findIndex(
        //     teaching => teaching.teaching_id === action.teaching_id
        //   ),
        //   1
        // );
        draft.loading = false;
        draft.loaded = true;
        break;

      case DELETE_TEACHING_INFORMATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the teachingInformationPage state domain
 */

const selectTeachingInformationPageDomain = (state: any) =>
  state.teaching || initialState;

/**
 * Default selector used by TeachingInformationPage
 */

export const makeSelectTeachingInformations = () =>
  createSelector(
    selectTeachingInformationPageDomain,
    substate => substate
  );

/**
 * Load the teaching, this action starts the request saga
 * @param  {number} page The page number
 * @return {object} An action object with a type of LOAD_TEACHING_INFORMATION
 */
export function loadTeachingInformations(
  page: number
): TeachingInformationActionTypes {
  return {
    type: LOAD_TEACHING_INFORMATION,
    page
  };
}

/**
 * Dispatched when the teaching are loaded by the request saga
 *
 * @param  {array} repos The teaching data
 *
 * @return {object}      An action object with a type of LOAD_TEACHING_INFORMATION_SUCCESS passing the repos
 */
export function teachingLoaded(
  data: Array<TeachingInformationType>
): TeachingInformationActionTypes {
  return {
    type: LOAD_TEACHING_INFORMATION_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the teaching fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_TEACHING_INFORMATION_ERROR passing the error
 */
export function teachingLoadingError(
  error: string
): TeachingInformationActionTypes {
  return {
    type: LOAD_TEACHING_INFORMATION_ERROR,
    error
  };
}

/**
 * Delete the teaching, this action starts the request saga
 * @param  {number} teaching_id The teaching id to delete
 * @return {object} An action object with a type of DELETE_TEACHING_INFORMATION
 */
export function deleteTeachingInformation(
  teaching_id: number
): TeachingInformationActionTypes {
  return {
    type: DELETE_TEACHING_INFORMATION,
    teaching_id
  };
}

/**
 * Dispatched when the teaching are deleted by the request saga
 *
 * @param  {number} teaching_id The teaching id to delete
 *
 * @return {object}      An action object with a type of DELETE_TEACHING_INFORMATION_SUCCESS passing the repos
 */
export function deleteTeachingInformationSuccess(
  teaching_id: number
): TeachingInformationActionTypes {
  return {
    type: DELETE_TEACHING_INFORMATION_SUCCESS,
    teaching_id
  };
}

/**
 * Dispatched when delete the teaching fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of DELETE_TEACHING_INFORMATION_ERROR passing the error
 */
export function deleteTeachingInformationError(
  error: string
): TeachingInformationActionTypes {
  return {
    type: DELETE_TEACHING_INFORMATION_ERROR,
    error
  };
}
