import { createSelector } from "reselect";
import produce from "immer";
import {
  initialStateInviteType,
  InviteActionTypes,
  InviteDataType
} from "./types";

/*
 *
 * InvitePage constants
 *
 */
export const LOAD_INVITES = "app/InvitePage/LOAD_INVITES";
export const LOAD_INVITES_SUCCESS = "app/InvitePage/LOAD_INVITES_SUCCESS";
export const LOAD_INVITES_ERROR = "app/InvitePage/LOAD_INVITES_ERROR";

/*
 *
 * InvitePage reducer
 *
 */

export const initialState: initialStateInviteType = {
  data: {
    total_student_lessons: 0,
    current_student_lesson_count: 0,
    student_lesson_limit: 0,
    total_teacher_lessons: 0,
    current_teacher_lesson_count: 0,
    teacher_lesson_limit: 0,
    credit_earned: 0,
    credit_spent: 0,
    credit_balance: 0
  },
  loading: false,
  error: "",
  loaded: false
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: InviteActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_INVITES:
        draft.loading = true;
        draft.error = "";
        break;

      case LOAD_INVITES_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_INVITES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the InvitePage state domain
 */

const selectInvitePageDomain = (state:any) => state.invites || initialState;

/**
 * Default selector used by InvitePage
 */

export const makeSelectInvites = () =>
  createSelector(
    selectInvitePageDomain,
    substate => substate
  );

/**
 * Load the invites, this action starts the request saga
 * @return {object} An action object with a type of LOAD_INVITES
 */
export function loadInvites(): InviteActionTypes {
  return {
    type: LOAD_INVITES
  };
}

/**
 * Dispatched when the invites are loaded by the request saga
 *
 * @param  {object} data The invite data
 *
 * @return {object}      An action object with a type of LOAD_INVITES_SUCCESS passing the repos
 */
export function invitesLoaded(data: InviteDataType): InviteActionTypes {
  return {
    type: LOAD_INVITES_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the invite fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_INVITES_ERROR passing the error
 */
export function inviteLoadingError(error:string): InviteActionTypes {
  return {
    type: LOAD_INVITES_ERROR,
    error
  };
}
