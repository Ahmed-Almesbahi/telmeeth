import { createSelector } from 'reselect';
import produce from 'immer';
import {
  SettingActionTypes,
  initialStateSettingType,
  SettingsDataType
} from './types';

/*
 *
 * SettingPage constants
 *
 */
export const LOAD_SETTINGS = 'app/SettingPage/LOAD_SETTINGS';
export const LOAD_SETTINGS_SUCCESS = 'app/SettingPage/LOAD_SETTINGS_SUCCESS';
export const LOAD_SETTINGS_ERROR = 'app/SettingPage/LOAD_SETTINGS_ERROR';

/*
 *
 * SettingPage reducer
 *
 */
export const initialState: initialStateSettingType = {
  data: {
    personalInfo: false,
    teachingInfo: false,
    userLocation: false,
    userAttachment: false,
    settingValidation: false,
    locationRange: false,
    locationPreference: false,
    is_pending: true
  },
  loading: false,
  error: '',
  loaded: false
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: SettingActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SETTINGS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_SETTINGS_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_SETTINGS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the SettingPage state domain
 */

const selectSettingPageDomain = (state: any) => state.settings || initialState;

/**
 * Default selector used by SettingPage
 */

export const makeSelectSettings = () =>
  createSelector(
    selectSettingPageDomain,
    substate => substate
  );

/**
 * Load the settings, this action starts the request saga
 * @return {object} An action object with a type of LOAD_SETTINGS
 */
export function loadSettings(): SettingActionTypes {
  return {
    type: LOAD_SETTINGS
  };
}

/**
 * Dispatched when the settings are loaded by the request saga
 *
 * @param  {array} data The setting data
 *
 * @return {object}      An action object with a type of LOAD_SETTINGS_SUCCESS passing the repos
 */
export function settingsLoaded(data: SettingsDataType): SettingActionTypes {
  return {
    type: LOAD_SETTINGS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the setting fails
 *
 * @param  {object} error The error
 * @return {object}       An action object with a type of LOAD_SETTINGS_ERROR passing the error
 */
export function settingLoadingError(error: string): SettingActionTypes {
  return {
    type: LOAD_SETTINGS_ERROR,
    error
  };
}
