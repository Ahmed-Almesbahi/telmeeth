import { createSelector } from 'reselect';
import produce from 'immer';
import {
  ProfileActionTypes,
  ProfileType,
  initialStateProfileType
} from './types';

/*
 *
 * ProfilePage constants
 *
 */
export const LOAD_PROFILE = 'app/ProfilePage/LOAD_PROFILE';
export const LOAD_PROFILE_SUCCESS = 'app/ProfilePage/LOAD_PROFILE_SUCCESS';
export const LOAD_PROFILE_ERROR = 'app/ProfilePage/LOAD_PROFILE_ERROR';
export const UPDATE_PROFILE = 'app/ProfilePage/UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'app/ProfilePage/UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'app/ProfilePage/UPDATE_PROFILE_ERROR';

/*
 *
 * ProfilePage reducer
 *
 */
export const initialState: initialStateProfileType = {
  data: {
    first_name: '',
    last_name: '',
    edu_cert_id: 0,
    major_id: 0,
    job: '',
    identity_name: '',
    identity_number: 0,
    gender: '',
    birth_date: '',
    educational_certificates: []
  },
  loading: true,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: ProfileActionTypes
): initialStateProfileType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PROFILE:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_PROFILE_SUCCESS:
        // action.data.map(d => draft.data.push(d));
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_PROFILE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case UPDATE_PROFILE:
        draft.error = '';
        break;

      case UPDATE_PROFILE_SUCCESS:
        break;

      case UPDATE_PROFILE_ERROR:
        draft.error = action.error;
        break;
    }
  });

/**
 * Direct selector to the ProfilePage state domain
 */

const selectProfilePageDomain = (state: any) => state.profile || initialState;

/**
 * Default selector used by ProfilePage
 */

export const makeSelectProfiles = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate
  );

/**
 * Load the profile, this action starts the request saga
 * @return {object} An action object with a type of LOAD_PROFILE
 */
export function loadProfiles(): ProfileActionTypes {
  return {
    type: LOAD_PROFILE
  };
}

/**
 * Dispatched when the profile are loaded by the request saga
 *
 * @param  {array} repos The profile data
 *
 * @return {object}      An action object with a type of LOAD_PROFILE_SUCCESS passing the repos
 */
export function profileLoaded(data: ProfileType): ProfileActionTypes {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the profile fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PROFILE_ERROR passing the error
 */
export function profileLoadingError(error: string): ProfileActionTypes {
  return {
    type: LOAD_PROFILE_ERROR,
    error
  };
}

/**
 * Delete the profile, this action starts the request saga
 * @param  {array} data The profile id to update
 * @param  {mix} action The profile id to update
 * @return {object} An action object with a type of UPDATE_PROFILE
 */
export function updateProfile(data: any, action: any): ProfileActionTypes {
  return {
    type: UPDATE_PROFILE,
    data,
    action
  };
}

/**
 * Dispatched when the profile are updated by the request saga
 *
 *
 * @return {object}      An action object with a type of UPDATE_PROFILE_SUCCESS passing the repos
 */
export function updateProfileSuccess(): ProfileActionTypes {
  return {
    type: UPDATE_PROFILE_SUCCESS
  };
}

/**
 * Dispatched when update the profile fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of UPDATE_PROFILE_ERROR passing the error
 */
export function updateProfileError(error: string): ProfileActionTypes {
  return {
    type: UPDATE_PROFILE_ERROR,
    error
  };
}
