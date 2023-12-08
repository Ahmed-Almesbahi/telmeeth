import {
  LOAD_INVITES,
  LOAD_INVITES_SUCCESS,
  LOAD_INVITES_ERROR,
  loadInvites
} from './ducks';
import { initialStateUserType } from '../User/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface InvitePageProps {
  invites: initialStateInviteType;
  loadInvites: typeof loadInvites;
  user: initialStateUserType;
  navigation: NavigationStackProp;
  intl: any;
}

export interface InviteDataType {
  total_student_lessons: number;
  current_student_lesson_count: number;
  student_lesson_limit: number;
  total_teacher_lessons: number;
  current_teacher_lesson_count: number;
  teacher_lesson_limit: number;
  credit_earned: number;
  credit_spent: number;
  credit_balance: number;
}
export interface initialStateInviteType {
  data: InviteDataType;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface loadInvitesAction {
  type: typeof LOAD_INVITES;
}
export interface invitesLoadedAction {
  type: typeof LOAD_INVITES_SUCCESS;
  data: InviteDataType;
}
export interface inviteLoadingErrorAction {
  type: typeof LOAD_INVITES_ERROR;
  error: string;
}

export type InviteActionTypes =
  | loadInvitesAction
  | invitesLoadedAction
  | inviteLoadingErrorAction;
