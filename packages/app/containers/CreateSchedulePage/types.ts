import {
  CREATE_SCHEDULE,
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_ERROR,
  createSchedules,
  setScheduleOption,
  SET_SCHEDULE_OPTION
} from './ducks';
import { NavigationStackProp } from 'react-navigation-stack';

export interface CreateSchedulePageProps {
  intl: any;
  createSchedules: typeof createSchedules;
  createSchedulePage: initialStateCreateSchedulePageType;
  setScheduleOption: typeof setScheduleOption;
  navigation: NavigationStackProp;
}

export interface CreateScheduleType {
  is_individual: boolean;
  is_student_group: boolean;
  is_student_home: boolean;
  is_teacher_home: boolean;
  lesson_start: string;
  lesson_end: string;
  lesson_date: Array<string>;
}

export interface initialStateCreateSchedulePageType {
  data: CreateScheduleType;
  readyToSubmit: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface setScheduleOptionAction {
  type: typeof SET_SCHEDULE_OPTION;
  key: string;
  value: boolean | Array<string> | string;
}

export interface createSchedulesAction {
  type: typeof CREATE_SCHEDULE;
  data: object;
}

export interface createSchedulesSuccessAction {
  type: typeof CREATE_SCHEDULE_SUCCESS;
}

export interface createSchedulesErrorAction {
  type: typeof CREATE_SCHEDULE_ERROR;
  error: string;
}

export type CreateSchedulePageActionTypes =
  | setScheduleOptionAction
  | createSchedulesAction
  | createSchedulesSuccessAction
  | createSchedulesErrorAction;
