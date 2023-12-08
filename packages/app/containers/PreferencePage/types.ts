import {
  LOAD_PREFERENCE,
  LOAD_PREFERENCE_SUCCESS,
  LOAD_PREFERENCE_ERROR,
  SET_PREFERENCE,
  SET_PREFERENCE_SUCCESS,
  SET_TEACHING_LOCATION_ERROR,
  SET_TEACHING_LOCATION_SUCCESS,
  SET_TEACHING_LOCATION,
  LOAD_TEACHING_LOCATION_ERROR,
  LOAD_TEACHING_LOCATION_SUCCESS,
  LOAD_TEACHING_LOCATION,
  TOGGLE_PREFERENCE,
  HIDE_SNAKE_BAR,
  SET_PREFERENCE_ERROR,
  loadPreference,
  loadTeachingLocation,
  setPreference,
  setTeachingLocation,
  hideSnakeBar,
  togglePreference
} from './ducks';

import { UserType } from '../User/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface PreferencePageProps {
  preference: initialStatePreferenceType;
  loadPreference: typeof loadPreference;
  loadTeachingLocation: typeof loadTeachingLocation;
  navigation: NavigationStackProp;
  setPreference: typeof setPreference;
  setTeachingLocation: typeof setTeachingLocation;
  hideSnakeBar: typeof hideSnakeBar;
  togglePreference: typeof togglePreference;
  userType: UserType;
}

export interface PreferenceType {
  is_individual: boolean;
  is_student_group: boolean;
  is_student_home: boolean;
  is_teacher_home: boolean;
  user_id: number;
}
export interface initialStatePreferenceType {
  data: PreferenceType;
  loading: boolean;
  loaded: boolean;
  setLoading: boolean;
  setLoaded: boolean;
  error: string;
  message: string;
}

export interface loadPreferenceAction {
  type: typeof LOAD_PREFERENCE;
}

export interface preferenceLoadedAction {
  type: typeof LOAD_PREFERENCE_SUCCESS;
  data: PreferenceType;
}

export interface preferenceLoadingErrorAction {
  type: typeof LOAD_PREFERENCE_ERROR;
  error: string;
}

export interface setPreferenceAction {
  type: typeof SET_PREFERENCE;
  is_individual: boolean;
  is_student_group: boolean;
}

export interface preferenceUpdatedAction {
  type: typeof SET_PREFERENCE_SUCCESS;
  message: string;
}

export interface preferenceUpdatingErrorAction {
  type: typeof SET_PREFERENCE_ERROR;
  error: string;
}

export interface hideSnakeBarAction {
  type: typeof HIDE_SNAKE_BAR;
}

export interface togglePreferenceAction {
  type: typeof TOGGLE_PREFERENCE;
  key: string;
  value: boolean;
}

export interface loadTeachingLocationAction {
  type: typeof LOAD_TEACHING_LOCATION;
}

export interface teachingLocationLoadedAction {
  type: typeof LOAD_TEACHING_LOCATION_SUCCESS;
  data: PreferenceType;
}

export interface teachingLocationLoadingErrorAction {
  type: typeof LOAD_TEACHING_LOCATION_ERROR;
  error: string;
}

export interface setTeachingLocationAction {
  type: typeof SET_TEACHING_LOCATION;
  is_teacher_home: boolean;
  is_student_home: boolean;
}

export interface teachingLocationUpdatedAction {
  type: typeof SET_TEACHING_LOCATION_SUCCESS;
  message: string;
}

export interface teachingLocationUpdatingErrorAction {
  type: typeof SET_TEACHING_LOCATION_ERROR;
  error: string;
}

export type PreferenceActionTypes =
  | loadPreferenceAction
  | preferenceLoadedAction
  | preferenceLoadingErrorAction
  | setPreferenceAction
  | preferenceUpdatedAction
  | preferenceUpdatingErrorAction
  | hideSnakeBarAction
  | togglePreferenceAction
  | loadTeachingLocationAction
  | teachingLocationLoadedAction
  | teachingLocationLoadingErrorAction
  | setTeachingLocationAction
  | teachingLocationUpdatedAction
  | teachingLocationUpdatingErrorAction;
