import { UserType } from '../User/types';
import { logoutUser } from '../User/ducks';
import {
  LOAD_SETTINGS_ERROR,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS,
  loadSettings
} from './ducks';
import { NavigationStackProp } from 'react-navigation-stack';

export interface SettingPageProps {
  userType: UserType;
  navigation: NavigationStackProp;
  logout: typeof logoutUser;
  loadSettings: typeof loadSettings;
  validation: SettingsDataType;
}

export interface SettingsDataType {
  personalInfo: boolean;
  teachingInfo: boolean;
  userLocation: boolean;
  userAttachment: boolean;
  locationPreference: boolean;
  locationRange: boolean;
  settingValidation: boolean;
  is_pending: boolean;
}

export interface initialStateSettingType {
  data: SettingsDataType;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadSettingsAction {
  type: typeof LOAD_SETTINGS;
}
export interface settingsLoadedAction {
  type: typeof LOAD_SETTINGS_SUCCESS;
  data: SettingsDataType;
}
export interface settingLoadingErrorAction {
  type: typeof LOAD_SETTINGS_ERROR;
  error: string;
}

export type SettingActionTypes =
  | loadSettingsAction
  | settingsLoadedAction
  | settingLoadingErrorAction;
