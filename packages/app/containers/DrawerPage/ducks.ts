/*
 *
 * DrawerPage ducks
 *
 */
import produce from 'immer';
import { createSelector } from 'reselect';
import { LOGOUT_USER } from '../User/ducks';
import {
  initialStateDrawerType,
  DrawerActionTypes,
  DrawerDataType,
  settingValidationType
} from './types';

/*
 *
 * DrawerPage constants
 *
 */

export const SET_DRAWER_TAB = 'app/DrawerPage/SET_DRAWER_TAB';
export const LOAD_DRAWER = 'app/DrawerPage/LOAD_DRAWER';
export const LOAD_DRAWER_SUCCESS = 'app/DrawerPage/LOAD_DRAWER_SUCCESS';
export const LOAD_DRAWER_ERROR = 'app/DrawerPage/LOAD_DRAWER_ERROR';
export const VALIDATE_SETTINGS = 'app/DrawerPage/VALIDATE_SETTINGS';
export const VALIDATE_SETTINGS_SUCCESS =
  'app/DrawerPage/VALIDATE_SETTINGS_SUCCESS';
export const VALIDATE_SETTINGS_ERROR = 'app/DrawerPage/VALIDATE_SETTINGS_ERROR';

export const initialState: initialStateDrawerType = {
  data: {
    first_name: '',
    last_name: '',
    rating: 0,
    is_teacher_home: false,
    is_student_home: false,
    number_rating: 0,
    address: '',
    is_individual: false,
    is_student_group: false,
    request_accepted: 0,
    request_canceled: 0,

    user_student_id: 0,
    latitude: 0,
    longitude: 0
  },
  validation: {
    personalInfo: false,
    teachingInfo: false,
    userLocation: false,
    userAttachment: false,
    settingValidation: false,
    locationRange: false,
    locationPreference: false,
    is_pending: false
  },
  tab: 'home-teacher',
  loading: false,
  error: '',
  loaded: false
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: DrawerActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case SET_DRAWER_TAB:
        draft.tab = action.tab;
        break;
      case LOAD_DRAWER:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_DRAWER_SUCCESS:
        draft.data = { ...draft.data, ...action.data };
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_DRAWER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case VALIDATE_SETTINGS:
        // draft.loading = true;
        draft.error = '';
        break;

      case VALIDATE_SETTINGS_SUCCESS:
        draft.validation = {
          personalInfo: action.data.personalInfo,
          teachingInfo: action.data.teachingInfo,
          userLocation: action.data.userLocation,
          userAttachment: action.data.userAttachment,
          settingValidation: action.data.settingValidation,
          locationRange: action.data.locationRange,
          locationPreference: action.data.locationPreference,
          is_pending: action.data.is_pending
        };
        // draft.loading = false;
        // draft.loaded = true;
        break;

      case VALIDATE_SETTINGS_ERROR:
        draft.error = action.error;
        // draft.loading = false;
        break;

      case LOGOUT_USER:
        draft.tab = initialState.tab;
    }
  });
};

/**
 * Direct selector to the DrawerPage state domain
 */

export const selectDrawerPageDomain = (state: any) =>
  state.drawer || initialState;

/**
 * Default selector used by DrawerPage
 */

export const makeSelectTab = () =>
  createSelector(
    selectDrawerPageDomain,
    (state: any) => state.tab
  );
export const makeSelectDrawer = () =>
  createSelector(
    selectDrawerPageDomain,
    state => state
  );
export const makeSelectValidation = () =>
  createSelector(
    selectDrawerPageDomain,
    state => state.validation
  );

/*
 *
 * DrawerPage actions
 *
 */

export function setDrawerTab(tab: string): DrawerActionTypes {
  return {
    type: SET_DRAWER_TAB,
    tab
  };
}

/**
 * Load the drawer, this action starts the request saga
 * @return {object} An action object with a type of LOAD_DRAWER
 */
export function loadDrawer(): DrawerActionTypes {
  return {
    type: LOAD_DRAWER
  };
}

/**
 * Dispatched when the drawer are loaded by the request saga
 *
 * @param  {array} data The drawer data
 *
 * @return {object}      An action object with a type of LOAD_DRAWER_SUCCESS passing the repos
 */
export function drawerLoaded(data: DrawerDataType): DrawerActionTypes {
  return {
    type: LOAD_DRAWER_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the drawer fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_DRAWER_ERROR passing the error
 */
export function drawerLoadingError(error: string): DrawerActionTypes {
  return {
    type: LOAD_DRAWER_ERROR,
    error
  };
}

/**
 * Load the drawer, this action starts the request saga
 * @return {object} An action object with a type of LOAD_DRAWER
 */
export function validateSettings(): DrawerActionTypes {
  return {
    type: VALIDATE_SETTINGS
  };
}

/**
 * Dispatched when the drawer are loaded by the request saga
 *
 * @param  {array} data The drawer data
 *
 * @return {object}      An action object with a type of VALIDATE_SETTINGS_SUCCESS passing the repos
 */
export function validateSettingsLoaded(
  data: settingValidationType
): DrawerActionTypes {
  return {
    type: VALIDATE_SETTINGS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the drawer fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of VALIDATE_SETTINGS_ERROR passing the error
 */
export function validateSettingsError(error: string): DrawerActionTypes {
  return {
    type: VALIDATE_SETTINGS_ERROR,
    error
  };
}
