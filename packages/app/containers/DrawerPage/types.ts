import {
  SET_DRAWER_TAB,
  LOAD_DRAWER,
  LOAD_DRAWER_SUCCESS,
  LOAD_DRAWER_ERROR,
  setDrawerTab,
  loadDrawer,
  VALIDATE_SETTINGS,
  VALIDATE_SETTINGS_SUCCESS,
  VALIDATE_SETTINGS_ERROR
} from './ducks';
import { initialStateUserType } from '../User/types';
import { LOGOUT_USER } from '../User/ducks';
import { NavigationStackProp } from 'react-navigation-stack';

export interface DrawerProps {
  drawerState: initialStateDrawerType;
  loadDrawer: typeof loadDrawer;
  children: React.ReactNode;
  language: string;
  type: number;
  navigation: NavigationStackProp;
  setTab: typeof setDrawerTab;
  user: initialStateUserType;
  intl: any;
}

export interface DrawerDataType {
  first_name: string;
  last_name: string;
  rating: number;
  is_teacher_home: boolean;
  is_student_home: boolean;
  number_rating: number;
  address: string;
  is_individual: boolean;
  is_student_group: boolean;
  request_accepted: number;
  request_canceled: number;

  // for student only
  user_student_id: number;
  latitude: number;
  longitude: number;
}

export interface settingValidationType {
  personalInfo: boolean;
  teachingInfo: boolean;
  userLocation: boolean;
  userAttachment: boolean;
  locationRange: boolean;
  locationPreference: boolean;
  settingValidation: boolean;
  is_pending: boolean;
}
export interface initialStateDrawerType {
  data: DrawerDataType;
  validation: settingValidationType;
  tab: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface setDrawerTabAction {
  type: typeof SET_DRAWER_TAB;
  tab: string;
}
export interface loadDrawerAction {
  type: typeof LOAD_DRAWER;
}
export interface drawerLoadedAction {
  type: typeof LOAD_DRAWER_SUCCESS;
  data: DrawerDataType;
}
export interface drawerLoadingErrorAction {
  type: typeof LOAD_DRAWER_ERROR;
  error: string;
}
export interface validateSettingsAction {
  type: typeof VALIDATE_SETTINGS;
}
export interface validateSettingsLoadedAction {
  type: typeof VALIDATE_SETTINGS_SUCCESS;
  data: settingValidationType;
}
export interface validateSettingsErrorAction {
  type: typeof VALIDATE_SETTINGS_ERROR;
  error: string;
}
export interface logoutAction {
  type: typeof LOGOUT_USER;
}

export type DrawerActionTypes =
  | setDrawerTabAction
  | loadDrawerAction
  | drawerLoadedAction
  | drawerLoadingErrorAction
  | validateSettingsAction
  | validateSettingsLoadedAction
  | validateSettingsErrorAction
  | logoutAction;
