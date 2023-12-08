import {
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  loadProfiles,
  updateProfile
} from './ducks';
import { FormikActions } from 'formik';
import { UserType } from '../User/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface ProfilePageProps {
  navigation: NavigationStackProp;
  loadProfiles: typeof loadProfiles;
  profile: initialStateProfileType;
  onSubmit: typeof updateProfile;
  userType: UserType;
  intl: any;
}

export interface ProfileFormProps {
  profile: initialStateProfileType;
  onSubmit: typeof updateProfile;
  userType: UserType;
  intl: any;
  navigation: NavigationStackProp;
}

export interface EducationalCertificatesType {
  edu_cert_id: string;
  edu_cert_name: string;
}

export interface ProfileType {
  first_name: string;
  last_name: string;
  edu_cert_id: number;
  major_id: number;
  job: string;
  identity_name: string;
  identity_number: number;
  gender: string;
  birth_date: string;
  educational_certificates: Array<EducationalCertificatesType>;
}

export interface initialStateProfileType {
  data: ProfileType;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface loadProfilesAction {
  type: typeof LOAD_PROFILE;
}

export interface profileLoadedAction {
  type: typeof LOAD_PROFILE_SUCCESS;
  data: ProfileType;
}

export interface profileLoadingErrorAction {
  type: typeof LOAD_PROFILE_ERROR;
  error: string;
}

export interface updateProfileAction {
  type: typeof UPDATE_PROFILE;
  data: ProfileType;
  action: FormikActions<ProfileType>;
}

export interface updateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
}

export interface updateProfileErrorAction {
  type: typeof UPDATE_PROFILE_ERROR;
  error: string;
}

export type ProfileActionTypes =
  | loadProfilesAction
  | profileLoadedAction
  | profileLoadingErrorAction
  | updateProfileAction
  | updateProfileSuccessAction
  | updateProfileErrorAction;
