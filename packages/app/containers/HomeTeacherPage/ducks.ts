import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHomeTeacherType,
  HomeTeacherActionTypes,
  HomeTeacherLessonsType
} from './types';

/*
 *
 * HomeTeacherPage constants
 *
 */
export const SELECT_LESSON = 'app/HomeTeacherPage/SELECT_LESSON';
export const LOAD_HOME_TEACHER = 'app/HomeTeacherPage/LOAD_HOME_TEACHER';
export const LOAD_HOME_TEACHER_SUCCESS =
  'app/HomeTeacherPage/LOAD_HOME_TEACHER_SUCCESS';
export const LOAD_HOME_TEACHER_ERROR =
  'app/HomeTeacherPage/LOAD_HOME_TEACHER_ERROR';
export const GO_ONLINE_HOME_TEACHER =
  'app/HomeTeacherPage/GO_ONLINE_HOME_TEACHER';
export const GO_ONLINE_HOME_TEACHER_SUCCESS =
  'app/HomeTeacherPage/GO_ONLINE_HOME_TEACHER_SUCCESS';
export const GO_ONLINE_HOME_TEACHER_ERROR =
  'app/HomeTeacherPage/GO_ONLINE_HOME_TEACHER_ERROR';
export const CANCEL_LESSON = 'app/HomeTeacherPage/CANCEL_LESSON';
export const CANCEL_LESSON_SUCCESS =
  'app/HomeTeacherPage/CANCEL_LESSON_SUCCESS';
export const CANCEL_LESSON_ERROR = 'app/HomeTeacherPage/CANCEL_LESSON_ERROR';
export const START_LESSON = 'app/HomeTeacherPage/START_LESSON';
export const START_LESSON_SUCCESS = 'app/HomeTeacherPage/START_LESSON_SUCCESS';
export const START_LESSON_ERROR = 'app/HomeTeacherPage/START_LESSON_ERROR';
export const END_LESSON = 'app/HomeTeacherPage/END_LESSON';
export const END_LESSON_SUCCESS = 'app/HomeTeacherPage/END_LESSON_SUCCESS';
export const END_LESSON_ERROR = 'app/HomeTeacherPage/END_LESSON_ERROR';

/*
 *
 * HomeTeacherPage reducer
 *
 */

export const initialState: initialStateHomeTeacherType = {
  data: [],
  selected: {
    actual_start_seconds: 0,
    country_calling: 0,
    end: '',
    firebase_lesson_date: '',
    firebase_lesson_id: '',
    first_name: '',
    last_name: '',
    latitude: 0,
    lesson_id: 0,
    longitude: 0,
    mobile_no: 0,
    number_of_students: 0,
    ontheway: 0,
    remain_seconds: 0,
    start: '',
    student_id: 0,
    name: '',
    name_ar: '',
    teacher_id: 0,
    teaching_location: '',
    teaching_type_name: ''
  },
  top_setting: {
    is_onlie: false,
    is_home_location: true,
    is_current_location: false,
    is_setting_valid: true,
    is_lesson_started: false,
    lesson_id: 0,
    info_msg: '',
    extendLesson: []
  },
  loading: false,
  error: '',
  loaded: false
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: HomeTeacherActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_LESSON:
        draft.selected = action.data;
        break;

      case LOAD_HOME_TEACHER:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_HOME_TEACHER_SUCCESS:
        draft.data = action.data;
        draft.top_setting = action.top_setting;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_HOME_TEACHER_ERROR:
        draft.data = [];
        draft.error = action.error;
        draft.top_setting = action.top_setting;
        draft.loading = false;
        break;

      case GO_ONLINE_HOME_TEACHER:
        draft.loading = true;
        draft.error = '';
        break;

      case GO_ONLINE_HOME_TEACHER_SUCCESS:
        draft.top_setting.is_onlie = !state.top_setting.is_onlie;
        draft.loading = false;
        draft.loaded = true;
        break;

      case GO_ONLINE_HOME_TEACHER_ERROR:
        // draft.error = action.error;
        // draft.top_setting = action.top_setting;
        draft.loading = false;
        break;

      case CANCEL_LESSON:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case CANCEL_LESSON_SUCCESS:
        draft.data.splice(
          draft.data.findIndex(lesson => lesson.lesson_id === action.lesson_id),
          1
        );
        draft.loading = false;
        draft.loaded = true;
        break;

      case CANCEL_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case START_LESSON:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case START_LESSON_SUCCESS:
        const index = draft.data.findIndex(
          lesson => lesson.lesson_id === action.lesson_id
        );
        if (index >= 0) {
          draft.data[index] = { ...draft.data[index], actual_start_seconds: 1 };
        }
        draft.loading = false;
        draft.loaded = true;
        break;

      case START_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case END_LESSON:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case END_LESSON_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        break;

      case END_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the HomeTeacherPage state domain
 */

const selectHomeTeacherPageDomain = (state: any) =>
  state.homeTeacher || initialState;

/**
 * Default selector used by HomeTeacherPage
 */

export const makeSelectHomeTeacher = () =>
  createSelector(
    selectHomeTeacherPageDomain,
    substate => substate
  );

export const makeSelectHomeTeacherLesson = () =>
  createSelector(
    selectHomeTeacherPageDomain,
    substate => substate.selected
  );

/**
 * Select lesson
 *
 * @return {object} An action object with a type of LOAD_HOME_TEACHER
 */
export function selectLesson(
  data: HomeTeacherLessonsType
): HomeTeacherActionTypes {
  return {
    type: SELECT_LESSON,
    data
  };
}

/**
 * Load the homeTeacher, this action starts the request saga
 * @return {object} An action object with a type of LOAD_HOME_TEACHER
 */
export function loadHomeTeacher(): HomeTeacherActionTypes {
  return {
    type: LOAD_HOME_TEACHER
  };
}

/**
 * Dispatched when the homeTeacher are loaded by the request saga
 *
 * @param  {object} data The homeTeacher data
 *
 * @return {object}      An action object with a type of LOAD_HOME_TEACHER_SUCCESS passing the repos
 */
export function homeTeacherLoaded(
  top_setting: any,
  data: Array<HomeTeacherLessonsType>
): HomeTeacherActionTypes {
  return {
    type: LOAD_HOME_TEACHER_SUCCESS,
    top_setting,
    data
  };
}

/**
 * Dispatched when loading the homeTeacher fails
 *
 * @param  {string} error The error
 * @param  {object} top_setting The error
 *
 * @return {object}       An action object with a type of LOAD_HOME_TEACHER_ERROR passing the error
 */
export function homeTeacherLoadingError(
  error: string,
  top_setting: any
): HomeTeacherActionTypes {
  return {
    type: LOAD_HOME_TEACHER_ERROR,
    error,
    top_setting
  };
}

/**
 * update teacher avability status, this action starts the request saga
 * @param  {boolean} is_online
 * @return {object} An action object with a type of GO_ONLINE_HOME_TEACHER
 */
export function goOnline(is_online: boolean): HomeTeacherActionTypes {
  return {
    type: GO_ONLINE_HOME_TEACHER,
    is_online
  };
}

/**
 * Dispatched when the avability status are updated by the request saga
 *
 *
 * @return {object}  An action object with a type of GO_ONLINE_HOME_TEACHER_SUCCESS passing the repos
 */
export function goOnlineUpdated(): HomeTeacherActionTypes {
  return {
    type: GO_ONLINE_HOME_TEACHER_SUCCESS
  };
}

/**
 * Dispatched when loading the homeTeacher fails
 *
 * @param  {string} error The error
 *
 * @return {object}  An action object with a type of GO_ONLINE_HOME_TEACHER_ERROR passing the error
 */
export function goOnlineError(error: string): HomeTeacherActionTypes {
  return {
    type: GO_ONLINE_HOME_TEACHER_ERROR,
    error
  };
}

/**
 * Cancel Lesson, this action starts the request saga
 * @param  {number} lesson_id The lesson_id id to cancel
 * @return {object} An action object with a type of CANCEL_LESSON
 */
export function cancelLesson(
  lesson_id: number
  // firebase_lesson_id: string,
  // firebase_lesson_date: number
): HomeTeacherActionTypes {
  return {
    type: CANCEL_LESSON,
    lesson_id
    // firebase_lesson_id,
    // firebase_lesson_date
  };
}

/**
 * Dispatched when the lesson are cancelld by the request saga
 *
 * @param  {number} lesson_id The lesson_id id to cancel
 *
 * @return {object}      An action object with a type of CANCEL_LESSON_SUCCESS passing the repos
 */
export function cancelLessonSuccess(lesson_id: number): HomeTeacherActionTypes {
  return {
    type: CANCEL_LESSON_SUCCESS,
    lesson_id
  };
}

/**
 * Dispatched when cancel the lesson fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of CANCEL_LESSON_ERROR passing the error
 */
export function cancelLessonError(error: string): HomeTeacherActionTypes {
  return {
    type: CANCEL_LESSON_ERROR,
    error
  };
}

/**
 * Start the lesson, this action starts the request saga
 * @param  {number} lesson_id The lesson_id id to start
 * @param  {number} actual_number_of_students number of students to teach
 * @return {object} An action object with a type of START_LESSON
 */
export function startLesson(
  lesson_id: number,
  actual_number_of_students: number
): HomeTeacherActionTypes {
  return {
    type: START_LESSON,
    lesson_id,
    actual_number_of_students
  };
}

/**
 * Dispatched when the lesson are started by the request saga
 *
 * @param  {number} lesson_id The lesson_id id to start
 *
 * @return {object}      An action object with a type of START_LESSON_SUCCESS passing the repos
 */
export function startLessonSuccess(lesson_id: number): HomeTeacherActionTypes {
  return {
    type: START_LESSON_SUCCESS,
    lesson_id
  };
}

/**
 * Dispatched when start the lesson fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of START_LESSON_ERROR passing the error
 */
export function startLessonError(error: string): HomeTeacherActionTypes {
  return {
    type: START_LESSON_ERROR,
    error
  };
}

/**
 * End the lesson, this action starts the request saga
 * @param  {number} lesson_id The lesson_id id to start
 * @return {object} An action object with a type of END_LESSON
 */
export function endLesson(lesson_id: number): HomeTeacherActionTypes {
  return {
    type: END_LESSON,
    lesson_id
  };
}

/**
 * Dispatched when the lesson are ended by the request saga
 *
 * @param  {number} lesson_id The lesson_id id to end
 *
 * @return {object}      An action object with a type of END_LESSON_SUCCESS passing the repos
 */
export function endLessonSuccess(lesson_id: number): HomeTeacherActionTypes {
  return {
    type: END_LESSON_SUCCESS,
    lesson_id
  };
}

/**
 * Dispatched when end the lesson fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of END_LESSON_ERROR passing the error
 */
export function endLessonError(error: string): HomeTeacherActionTypes {
  return {
    type: END_LESSON_ERROR,
    error
  };
}
