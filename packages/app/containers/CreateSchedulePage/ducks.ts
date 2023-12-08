import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateCreateSchedulePageType,
  CreateSchedulePageActionTypes
} from './types';

/*
 *
 * CreateSchedulePage constants
 *
 */
export const SET_SCHEDULE_OPTION = 'app/CreateSchedulePage/SET_SCHEDULE_OPTION';
export const CREATE_SCHEDULE = 'app/CreateSchedulePage/CREATE_SCHEDULE';
export const CREATE_SCHEDULE_SUCCESS =
  'app/CreateSchedulePage/CREATE_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_ERROR =
  'app/CreateSchedulePage/CREATE_SCHEDULE_ERROR';

/*
 *
 * CreateSchedulePage reducer
 *
 */
export const initialState: initialStateCreateSchedulePageType = {
  data: {
    is_individual: false,
    is_student_group: false,
    is_student_home: false,
    is_teacher_home: false,
    lesson_start: '',
    lesson_end: '',
    lesson_date: []
  },
  readyToSubmit: false,
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: CreateSchedulePageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_SCHEDULE:
        draft.loading = true;
        draft.error = '';
        break;

      case CREATE_SCHEDULE_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        break;

      case CREATE_SCHEDULE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SET_SCHEDULE_OPTION:
        // @ts-ignore
        draft.data[action.key] = action.value;

        if (
          (draft.data.is_individual || draft.data.is_student_group) &&
          (draft.data.is_teacher_home || draft.data.is_student_home) &&
          draft.data.lesson_date.length > 0 &&
          draft.data.lesson_start !== '' &&
          draft.data.lesson_end !== ''
        ) {
          draft.readyToSubmit = true;
        } else {
          draft.readyToSubmit = false;
        }

        break;
    }
  });

/**
 * Direct selector to the createSchedulePage state domain
 */
const selectCreateSchedulePageDomain = (state: any) =>
  state.createSchedulePage || initialState;

/**
 * Default selector used by CreateSchedulePage
 */
export const makeSelectCreateSchedulePage = () =>
  createSelector(
    selectCreateSchedulePageDomain,
    substate => substate
  );

/*
 *
 * CreateSchedulePage actions
 *
 */
export function setScheduleOption(
  key: string,
  value: boolean | Array<string> | string
): CreateSchedulePageActionTypes {
  return {
    type: SET_SCHEDULE_OPTION,
    key,
    value
  };
}

export function createSchedules(data: object): CreateSchedulePageActionTypes {
  return {
    type: CREATE_SCHEDULE,
    data
  };
}

export function createSchedulesSuccess(): CreateSchedulePageActionTypes {
  return {
    type: CREATE_SCHEDULE_SUCCESS
  };
}
export function createSchedulesError(
  error: string
): CreateSchedulePageActionTypes {
  return {
    type: CREATE_SCHEDULE_ERROR,
    error
  };
}
