import produce from 'immer';
import { createSelector } from 'reselect';
import { initialStateUserType, UserActionTypes } from './types';
import { LOAD_DRAWER_SUCCESS } from '../DrawerPage/ducks';

/*
 *
 * User constants
 *
 */
export const SET_OTP = 'app/User/SET_OTP';
export const SET_USER = 'app/User/SET_USER';
export const SET_USER_TYPE = 'app/User/SET_USER_TYPE';
export const LOGIN_USER_SUCCESS = 'app/User/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'app/User/LOGIN_USER_ERROR';

export const LOGOUT_USER = 'app/User/LOGOUT_USER';

export const UPDATE_USER = 'app/User/UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'app/User/UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'app/User/UPDATE_USER_ERROR';

export const LOAD_USER = 'app/User/LOAD_USER';
export const LOAD_USER_SUCCESS = 'app/User/LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'app/User/UPDATE_USERN_ERROR';

/*
 *
 * User reducer
 *
 */

export const initialState: initialStateUserType = {
  user_id: 0,
  otp: 0,
  mobile_no: 0,
  access_token: '',
  email: '',
  invitation_code: '',
  user_type: 2, // 1 Teacher , 2 Student , 3 Admin
  username: '',
  user_student_id: 0,
  first_name: '',
  last_name: '',
  address: '',
  latitude: 0,
  longitude: 0
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: UserActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_OTP:
        draft.user_id = action.payload.user_id;
        draft.otp = action.payload.otp;
        draft.mobile_no = action.payload.mobile_no;
        break;

      case SET_USER:
        draft.access_token = action.payload.access_token;
        draft.email = action.payload.email;
        draft.invitation_code = action.payload.invitation_code;
        draft.user_id = action.payload.user_id;
        draft.username = action.payload.username;
        break;

      case SET_USER_TYPE:
        draft.user_type = action.user_type;
        break;

      case LOGIN_USER_SUCCESS:
        // draft.loading = false;
        break;

      case LOGIN_USER_ERROR:
        // draft.error = action.error;
        // draft.loading = false;
        break;

      case LOAD_DRAWER_SUCCESS:
        if (draft.user_type === 2) {
          draft.user_student_id = action.data.user_student_id;
          draft.first_name = action.data.first_name;
          draft.last_name = action.data.last_name;
          draft.address = action.data.address;
          draft.latitude = action.data.latitude;
          draft.longitude = action.data.longitude;
          // draft.latitude = parseFloat(action.data.latitude);
          // draft.longitude = parseFloat(action.data.longitude);
        }
        break;

      case LOGOUT_USER:
        return (draft = {
          ...initialState,
          user_type: draft.user_type
        });
        break;
    }
  });

/*
 *
 * User Selectors
 *
 */
export const selectUserDomain = (state: any) => state.user || initialState;

/**
 * Default selector used by User
 */

export const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    substate => substate
  );

export const makeSelectUserType = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user_type
  );

export const makeSelectUserId = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user_id
  );

/*
 *
 * User Actions
 *
 */
export const setUser = (payload: initialStateUserType): UserActionTypes => {
  return {
    type: SET_USER,
    payload
  };
};
export const setUserType = (type: number): UserActionTypes => {
  return {
    type: SET_USER_TYPE,
    user_type: type
  };
};
export const loginUserSuccess = (
  user: initialStateUserType
): UserActionTypes => {
  return {
    type: LOGIN_USER_SUCCESS,
    user
  };
};
export const loginUserError = (): UserActionTypes => {
  return {
    type: LOGIN_USER_ERROR
  };
};

export const logoutUser = (): UserActionTypes => {
  return {
    type: LOGOUT_USER
  };
};

export const updateUser = (): UserActionTypes => {
  return {
    type: UPDATE_USER
  };
};

export const loadUser = (): UserActionTypes => {
  return {
    type: LOAD_USER
  };
};
