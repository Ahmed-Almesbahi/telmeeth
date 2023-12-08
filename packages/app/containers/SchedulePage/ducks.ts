import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateScheduleType,
  ScheduleActionTypes,
  ScheduleType
} from './types';

/*
 *
 * SchedulePage constants
 *
 */
export const LOAD_SCHEDULE = 'app/SchedulePage/LOAD_SCHEDULE';
export const LOAD_SCHEDULE_SUCCESS = 'app/SchedulePage/LOAD_SCHEDULE_SUCCESS';
export const LOAD_SCHEDULE_ERROR = 'app/SchedulePage/LOAD_SCHEDULE_ERROR';
export const DELETE_SCHEDULE = 'app/SchedulePage/DELETE_SCHEDULE';
export const DELETE_SCHEDULE_SUCCESS =
  'app/SchedulePage/DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_ERROR = 'app/SchedulePage/DELETE_SCHEDULE_ERROR';

/*
 *
 * SchedulePage reducer
 *
 */
export const initialState: initialStateScheduleType = {
  data: [],
  loading: false,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: ScheduleActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SCHEDULE:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_SCHEDULE_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_SCHEDULE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case DELETE_SCHEDULE:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case DELETE_SCHEDULE_SUCCESS:
        draft.data.splice(
          draft.data.findIndex(
            schedule =>
              schedule.firebase_lesson_id === action.firebase_lesson_id
          ),
          1
        );
        draft.loading = false;
        draft.loaded = true;
        break;

      case DELETE_SCHEDULE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the schedulePage state domain
 */

const selectSchedulePageDomain = (state: any) =>
  state.schedules || initialState;

/**
 * Default selector used by SchedulePage
 */

export const makeSelectSchedules = () =>
  createSelector(
    selectSchedulePageDomain,
    substate => substate
  );

export const makeSelectSchedule = () =>
  createSelector(
    selectSchedulePageDomain,
    substate => substate
  );

/**
 * Load the schedules, this action starts the request saga
 * @param  {number} page The page number
 * @return {object} An action object with a type of LOAD_SCHEDULE
 */
export function loadSchedules(): ScheduleActionTypes {
  return {
    type: LOAD_SCHEDULE
  };
}

/**
 * Dispatched when the schedules are loaded by the request saga
 *
 * @param  {array} repos The schedule data
 *
 * @return {object}      An action object with a type of LOAD_SCHEDULE_SUCCESS passing the repos
 */
export function schedulesLoaded(
  data: Array<ScheduleType>
): ScheduleActionTypes {
  return {
    type: LOAD_SCHEDULE_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the schedule fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_SCHEDULE_ERROR passing the error
 */
export function scheduleLoadingError(error: string): ScheduleActionTypes {
  return {
    type: LOAD_SCHEDULE_ERROR,
    error
  };
}

/**
 * Delete the schedules, this action starts the request saga
 * @param  {number} schedule_id The schedule id to delete
 * @return {object} An action object with a type of DELETE_SCHEDULE
 */
export function deleteSchedule(
  firebase_lesson_id: string,
  firebase_lesson_date: number
): ScheduleActionTypes {
  return {
    type: DELETE_SCHEDULE,
    firebase_lesson_id,
    firebase_lesson_date
  };
}

/**
 * Dispatched when the schedules are deleted by the request saga
 *
 * @param  {number} schedule_id The schedule id to delete
 *
 * @return {object}      An action object with a type of DELETE_SCHEDULE_SUCCESS passing the repos
 */
export function deleteScheduleSuccess(
  schedule_id: number,
  firebase_lesson_id: string
): ScheduleActionTypes {
  return {
    type: DELETE_SCHEDULE_SUCCESS,
    schedule_id,
    firebase_lesson_id
  };
}

/**
 * Dispatched when delete the schedule fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of DELETE_SCHEDULE_ERROR passing the error
 */
export function deleteScheduleError(error: string): ScheduleActionTypes {
  return {
    type: DELETE_SCHEDULE_ERROR,
    error
  };
}
