import {
  LOAD_TEACHING_INFORMATION,
  LOAD_TEACHING_INFORMATION_SUCCESS,
  LOAD_TEACHING_INFORMATION_ERROR,
  DELETE_TEACHING_INFORMATION,
  DELETE_TEACHING_INFORMATION_SUCCESS,
  DELETE_TEACHING_INFORMATION_ERROR,
  loadTeachingInformations
} from './ducks';
import { UserType } from '../User/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface TeachingInformationPageProps {
  loadTeachingInformations: typeof loadTeachingInformations;
  teaching: initialStateTeachingInformationType;
  navigation: NavigationStackProp;
  userType: UserType;
  language: string;
}

export interface TeachingInformationType {
  education_information_id: number;
  user_id: number;
  root_id: number;
  root_name: string;
  item_name: string;
  item_id: number;
}

export interface initialStateTeachingInformationType {
  data: Array<TeachingInformationType>;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface loadTeachingInformationsAction {
  type: typeof LOAD_TEACHING_INFORMATION;
  page: number;
}

export interface teachingLoadedAction {
  type: typeof LOAD_TEACHING_INFORMATION_SUCCESS;
  data: Array<TeachingInformationType>;
}

export interface teachingLoadingErrorAction {
  type: typeof LOAD_TEACHING_INFORMATION_ERROR;
  error: string;
}

export interface deleteTeachingInformationAction {
  type: typeof DELETE_TEACHING_INFORMATION;
  teaching_id: number;
}

export interface deleteTeachingInformationSuccessAction {
  type: typeof DELETE_TEACHING_INFORMATION_SUCCESS;
  teaching_id: number;
}

export interface deleteTeachingInformationErrorAction {
  type: typeof DELETE_TEACHING_INFORMATION_ERROR;
  error: string;
}

export type TeachingInformationActionTypes =
  | loadTeachingInformationsAction
  | teachingLoadedAction
  | teachingLoadingErrorAction
  | deleteTeachingInformationAction
  | deleteTeachingInformationSuccessAction
  | deleteTeachingInformationErrorAction;
