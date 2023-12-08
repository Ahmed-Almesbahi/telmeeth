import { createSelector } from 'reselect';
import produce from 'immer';
import {
  RequestActionTypes,
  timeDifferenceResponse,
  initialStateRequestType,
  AcceptLessonData
} from './types';

/*
 *
 * RequestPage constants
 *
 */
export const LOAD_TIME_DIFF = 'app/RequestPage/LOAD_TIME_DIFF';
export const LOAD_TIME_DIFF_SUCCESS = 'app/RequestPage/LOAD_TIME_DIFF_SUCCESS';
export const LOAD_TIME_DIFF_ERROR = 'app/RequestPage/LOAD_TIME_DIFF_ERROR';
export const ACCEPT_LESSON = 'app/RequestPage/ACCEPT_LESSON';
export const ACCEPT_LESSON_SUCCESS = 'app/RequestPage/ACCEPT_LESSON_SUCCESS';
export const ACCEPT_LESSON_ERROR = 'app/RequestPage/ACCEPT_LESSON_ERROR';

/*
 *
 * RequestPage reducer
 *
 */
export const initialState: initialStateRequestType = {
  // data: {
  //   first_name: '',
  //   last_name: '',
  //   edu_cert_id: 0,
  //   major_id: 0,
  //   job: '',
  //   identity_name: '',
  //   identity_number: 0,
  //   gender: '',
  //   birth_date: '',
  //   educational_certificates: []
  // },
  time_diff: -1,
  loading: true,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: RequestActionTypes
): initialStateRequestType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TIME_DIFF:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_TIME_DIFF_SUCCESS:
        draft.time_diff = action.data.time_diff;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_TIME_DIFF_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ACCEPT_LESSON:
        draft.loading = true;
        draft.error = '';
        break;

      case ACCEPT_LESSON_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        break;

      case ACCEPT_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the RequestPage state domain
 */

const selectRequestPageDomain = (state: any) => state.request || initialState;

/**
 * Default selector used by RequestPage
 */

export const makeSelectRequestPage = () =>
  createSelector(
    selectRequestPageDomain,
    substate => substate
  );

/**
 * Load time difference, this action starts the request saga
 *
 * @param  {string} datetime The current time
 * @param  {number} notification_id The notification id to check time difference
 * @return {object} An action object with a type of LOAD_TIME_DIFF
 */
export function timeDifferenceLoad(
  datetime: string,
  notification_id: number
): RequestActionTypes {
  return {
    type: LOAD_TIME_DIFF,
    datetime,
    notification_id
  };
}

/**
 * Dispatched when the time difference are loaded by the request saga
 *
 * @param  {object} "data":{"time_diff":22}
 *
 * @return {object}      An action object with a type of LOAD_TIME_DIFF_SUCCESS passing the repos
 */
export function timeDiffereceLoaded(
  data: timeDifferenceResponse
): RequestActionTypes {
  return {
    type: LOAD_TIME_DIFF_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the request fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_TIME_DIFF_ERROR passing the error
 */
export function timeDiffereceLoadingError(error: string): RequestActionTypes {
  return {
    type: LOAD_TIME_DIFF_ERROR,
    error
  };
}

/**
 * Accept Lesson, this action starts the request saga
 *
 * @param  {object} data The request id to update
 * @return {object} An action object with a type of ACCEPT_LESSON
 */
export function acceptLesson(data: AcceptLessonData): RequestActionTypes {
  return {
    type: ACCEPT_LESSON,
    data
  };
}

/**
 * Dispatched when the accept lesson are updated by the request saga
 *
 *
 * @return {object}      An action object with a type of ACCEPT_LESSON_SUCCESS passing the repos
 */
export function acceptLessonSuccess(): RequestActionTypes {
  return {
    type: ACCEPT_LESSON_SUCCESS
  };
}

/**
 * Dispatched when update the request fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ACCEPT_LESSON_ERROR passing the error
 */
export function acceptLessonError(error: string): RequestActionTypes {
  return {
    type: ACCEPT_LESSON_ERROR,
    error
  };
}
