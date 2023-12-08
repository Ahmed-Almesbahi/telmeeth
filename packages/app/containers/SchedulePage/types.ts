import {
  LOAD_SCHEDULE,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_SCHEDULE_ERROR,
  DELETE_SCHEDULE,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_ERROR,
  loadSchedules,
  deleteSchedule
} from './ducks';
import { NavigationStackProp } from 'react-navigation-stack';

export interface SchedulePageProps {
  schedules: initialStateScheduleType;
  loadSchedules: typeof loadSchedules;
  deleteSchedule: typeof deleteSchedule;
  navigation: NavigationStackProp;
  intl: any;
}

export interface ScheduleType {
  booking_type: string;
  is_available: boolean;
  is_individual: number;
  is_lesson_booked: boolean;
  is_student_group: number;
  is_student_home: number;
  is_teacher_home: number;
  lesson_date: string;
  lesson_end: number;
  lesson_start: number;
  lesson_status: number;
  schedule_end_time: string;
  schedule_lesson_date: number;
  schedule_preferred_location: string;
  schedule_start_time: string;
  schedule_type: string;
  firebase_lesson_id: string;
  firebase_lesson_date: number;

  // TODO : Make sure the is a schedule_id returned from API
  schedule_id: number;
}
export interface initialStateScheduleType {
  data: Array<ScheduleType>;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface loadScheduleAction {
  type: typeof LOAD_SCHEDULE;
}

export interface schedulesLoadedAction {
  type: typeof LOAD_SCHEDULE_SUCCESS;
  data: Array<ScheduleType>;
}
export interface scheduleLoadingAction {
  type: typeof LOAD_SCHEDULE_ERROR;
  error: string;
}
export interface deleteScheduleAction {
  type: typeof DELETE_SCHEDULE;
  firebase_lesson_id: string;
  firebase_lesson_date: number;
}
export interface deleteScheduleSuccessAction {
  type: typeof DELETE_SCHEDULE_SUCCESS;
  schedule_id: number;
  firebase_lesson_id: string;
  // data: any;
}
export interface deleteScheduleErrorAction {
  type: typeof DELETE_SCHEDULE_ERROR;
  error: string;
}

export type ScheduleActionTypes =
  | loadScheduleAction
  | schedulesLoadedAction
  | scheduleLoadingAction
  | deleteScheduleAction
  | deleteScheduleSuccessAction
  | deleteScheduleErrorAction;
