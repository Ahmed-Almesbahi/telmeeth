import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStatePreferenceType,
  PreferenceType,
  PreferenceActionTypes
} from './types';

/*
 *
 * PreferencePage constants
 *
 */
export const LOAD_PREFERENCE = 'app/PreferencePage/LOAD_PREFERENCE';
export const LOAD_PREFERENCE_SUCCESS =
  'app/PreferencePage/LOAD_PREFERENCE_SUCCESS';
export const LOAD_PREFERENCE_ERROR = 'app/PreferencePage/LOAD_PREFERENCE_ERROR';
export const SET_PREFERENCE = 'app/PreferencePage/SET_PREFERENCE';
export const SET_PREFERENCE_SUCCESS =
  'app/PreferencePage/SET_PREFERENCE_SUCCESS';
export const SET_PREFERENCE_ERROR = 'app/PreferencePage/SET_PREFERENCE_ERROR';
export const HIDE_SNAKE_BAR = 'app/PreferencePage/HIDE_SNAKE_BAR';
export const TOGGLE_PREFERENCE = 'app/PreferencePage/TOGGLE_PREFERENCE';

export const LOAD_TEACHING_LOCATION =
  'app/PreferencePage/LOAD_TEACHING_LOCATION';
export const LOAD_TEACHING_LOCATION_SUCCESS =
  'app/PreferencePage/LOAD_TEACHING_LOCATION_SUCCESS';
export const LOAD_TEACHING_LOCATION_ERROR =
  'app/PreferencePage/LOAD_TEACHING_LOCATION_ERROR';
export const SET_TEACHING_LOCATION = 'app/PreferencePage/SET_TEACHING_LOCATION';
export const SET_TEACHING_LOCATION_SUCCESS =
  'app/PreferencePage/SET_TEACHING_LOCATION_SUCCESS';
export const SET_TEACHING_LOCATION_ERROR =
  'app/PreferencePage/SET_TEACHING_LOCATION_ERROR';

/*
 *
 * PreferencePage reducer
 *
 */
export const initialState: initialStatePreferenceType = {
  data: {
    is_individual: false,
    is_student_group: false,
    is_student_home: false,
    is_teacher_home: false,
    user_id: 0
  },
  loading: false,
  loaded: false,
  setLoading: false,
  setLoaded: false,
  error: '',
  message: ''
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: PreferenceActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PREFERENCE:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_PREFERENCE_SUCCESS:
        draft.data.is_individual = action.data.is_individual;
        draft.data.is_student_group = action.data.is_student_group;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_PREFERENCE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SET_PREFERENCE:
        draft.setLoading = true;
        draft.error = '';
        break;

      case SET_PREFERENCE_SUCCESS:
        draft.message = action.message;
        draft.setLoading = false;
        draft.setLoaded = true;
        break;

      case SET_PREFERENCE_ERROR:
        draft.error = action.error;
        draft.setLoading = false;
        break;

      case HIDE_SNAKE_BAR:
        draft.setLoaded = false;
        draft.message = '';
        break;

      case TOGGLE_PREFERENCE:
        // @ts-ignore
        draft.data[action.key] = action.value;
        break;

      case LOAD_TEACHING_LOCATION:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_TEACHING_LOCATION_SUCCESS:
        draft.data.is_student_home = action.data.is_student_home;
        draft.data.is_teacher_home = action.data.is_teacher_home;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_TEACHING_LOCATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SET_TEACHING_LOCATION:
        draft.setLoading = true;
        draft.error = '';
        break;

      case SET_TEACHING_LOCATION_SUCCESS:
        draft.message = action.message;
        draft.setLoading = false;
        draft.setLoaded = true;
        break;

      case SET_TEACHING_LOCATION_ERROR:
        draft.error = action.error;
        draft.setLoading = false;
        break;
    }
  });

/**
 * Direct selector to the PreferencePage state domain
 */

const selectPreferencePageDomain = (state: any) =>
  state.preference || initialState;

/**
 * Default selector used by PreferencePage
 */

export const makeSelectPreference = () =>
  createSelector(
    selectPreferencePageDomain,
    substate => substate
  );

/**
 * Load the preference, this action starts the request saga
 * @return {object} An action object with a type of LOAD_PREFERENCE
 */
export function loadPreference(): PreferenceActionTypes {
  return {
    type: LOAD_PREFERENCE
  };
}

/**
 * Dispatched when the preference are loaded by the request saga
 *
 * @param  {object} data The preference data
 *
 * @return {object}      An action object with a type of LOAD_PREFERENCE_SUCCESS passing the repos
 */
export function preferenceLoaded(data: PreferenceType): PreferenceActionTypes {
  return {
    type: LOAD_PREFERENCE_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the preference fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_PREFERENCE_ERROR passing the error
 */
export function preferenceLoadingError(error: string): PreferenceActionTypes {
  return {
    type: LOAD_PREFERENCE_ERROR,
    error
  };
}

/**
 * Set the preference, this action starts the request saga
 * @param  {boolean} is_individual The preference data
 * @param  {boolean} is_student_group The preference data
 * @return {object} An action object with a type of SET_PREFERENCE
 */
export function setPreference(
  is_individual: boolean,
  is_student_group: boolean
): PreferenceActionTypes {
  return {
    type: SET_PREFERENCE,
    is_individual,
    is_student_group
  };
}

/**
 * Dispatched when the preference are saved by the request saga
 *
 * @param  {string} message The preference success message
 *
 * @return {object}      An action object with a type of SET_PREFERENCE_SUCCESS passing the repos
 */
export function preferenceUpdated(message: string): PreferenceActionTypes {
  return {
    type: SET_PREFERENCE_SUCCESS,
    message
  };
}

/**
 * Dispatched when updating the preference fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of SET_PREFERENCE_ERROR passing the error
 */
export function preferenceUpdatingError(error: string): PreferenceActionTypes {
  return {
    type: SET_PREFERENCE_ERROR,
    error
  };
}

/**
 * Dispatched after show snakebar
 *
 *
 * @return
 */
export function hideSnakeBar(): PreferenceActionTypes {
  return {
    type: HIDE_SNAKE_BAR
  };
}

/**
 * Toggle Preference
 *
 * @param  {string} key The key of option
 * @param  {string} value The value of option
 * @return
 */
export function togglePreference(
  key: string,
  value: boolean
): PreferenceActionTypes {
  return {
    type: TOGGLE_PREFERENCE,
    key,
    value
  };
}

/**
 * Load the teaching location, this action starts the request saga
 * @return {object} An action object with a type of LOAD_TEACHING_LOCATION
 */
export function loadTeachingLocation(): PreferenceActionTypes {
  return {
    type: LOAD_TEACHING_LOCATION
  };
}

/**
 * Dispatched when the teaching location are loaded by the request saga
 *
 * @param  {object} data The preference data
 *
 * @return {object}      An action object with a type of LOAD_TEACHING_LOCATION_SUCCESS passing the repos
 */
export function teachingLocationLoaded(
  data: PreferenceType
): PreferenceActionTypes {
  return {
    type: LOAD_TEACHING_LOCATION_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the teaching location fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_TEACHING_LOCATION_ERROR passing the error
 */
export function teachingLocationLoadingError(
  error: string
): PreferenceActionTypes {
  return {
    type: LOAD_TEACHING_LOCATION_ERROR,
    error
  };
}

/**
 * Set the teaching location, this action starts the request saga
 * @param  {boolean} is_teacher_home The preference data
 * @param  {boolean} is_student_home The preference data
 * @return {object} An action object with a type of SET_TEACHING_LOCATION
 */
export function setTeachingLocation(
  is_teacher_home: boolean,
  is_student_home: boolean
): PreferenceActionTypes {
  return {
    type: SET_TEACHING_LOCATION,
    is_teacher_home,
    is_student_home
  };
}

/**
 * Dispatched when the teaching location are saved by the request saga
 *
 * @param  {string} message The preference success message
 *
 * @return {object}      An action object with a type of SET_TEACHING_LOCATION_SUCCESS passing the repos
 */
export function teachingLocationUpdated(
  message: string
): PreferenceActionTypes {
  return {
    type: SET_TEACHING_LOCATION_SUCCESS,
    message
  };
}

/**
 * Dispatched when updating the teaching location fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of SET_TEACHING_LOCATION_ERROR passing the error
 */
export function teachingLocationUpdatingError(
  error: string
): PreferenceActionTypes {
  return {
    type: SET_TEACHING_LOCATION_ERROR,
    error
  };
}
