import {
  SET_USER,
  SET_USER_TYPE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER,
  LOGOUT_USER,
  LOAD_USER,
  SET_OTP
} from './ducks';
import { drawerLoadedAction } from '../DrawerPage/types';

export enum UserType {
  Teacher = 1,
  Student = 2,
  Admin = 3
}

export interface initialStateUserType {
  user_id: number;
  otp: number;
  mobile_no: number;
  access_token: string;
  email: string;
  invitation_code: string;
  user_type: number;
  username: string;

  user_student_id: number;
  first_name: string;
  last_name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface setUserAction {
  type: typeof SET_USER;
  payload: initialStateUserType;
}

export interface setUserTypeAction {
  type: typeof SET_USER_TYPE;
  user_type: UserType;
}

export interface loginUserSuccessAction {
  type: typeof LOGIN_USER_SUCCESS;
  user: initialStateUserType;
}
export interface loginUserErrorAction {
  type: typeof LOGIN_USER_ERROR;
}
export interface logoutUserAction {
  type: typeof LOGOUT_USER;
}
export interface updateUserAction {
  type: typeof UPDATE_USER;
}
export interface loadUserAction {
  type: typeof LOAD_USER;
}
export interface setOtpAction {
  type: typeof SET_OTP;
  payload: initialStateUserType;
}

export type UserActionTypes =
  | setUserAction
  | setUserTypeAction
  | loginUserSuccessAction
  | loginUserErrorAction
  | logoutUserAction
  | updateUserAction
  | drawerLoadedAction
  | loadUserAction
  | setOtpAction;
