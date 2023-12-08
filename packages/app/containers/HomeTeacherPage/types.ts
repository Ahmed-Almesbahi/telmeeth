import {
  LOAD_HOME_TEACHER,
  LOAD_HOME_TEACHER_SUCCESS,
  LOAD_HOME_TEACHER_ERROR,
  GO_ONLINE_HOME_TEACHER,
  GO_ONLINE_HOME_TEACHER_SUCCESS,
  GO_ONLINE_HOME_TEACHER_ERROR,
  loadHomeTeacher,
  goOnline,
  SELECT_LESSON,
  selectLesson,
  CANCEL_LESSON,
  CANCEL_LESSON_SUCCESS,
  CANCEL_LESSON_ERROR,
  cancelLesson,
  START_LESSON,
  START_LESSON_SUCCESS,
  START_LESSON_ERROR,
  startLesson,
  endLesson,
  END_LESSON,
  END_LESSON_SUCCESS,
  END_LESSON_ERROR
} from './ducks';
import { LanguageOption } from '../LanguagePage/types';
import {
  NavigationStackProp,
  NavigationStackScreenProps
} from 'react-navigation-stack';
import { SettingsDataType } from '../SettingPage/types';

export interface HomeTeacherProps extends NavigationStackScreenProps {
  homeTeacher: initialStateHomeTeacherType;
  // navigation: NavigationStackProp;
  loadHomeTeacher: typeof loadHomeTeacher;
  goOnline: typeof goOnline;
  selectLesson: typeof selectLesson;
  cancelLesson: typeof cancelLesson;
  startLesson: typeof startLesson;
  endLesson: typeof endLesson;
  validation: SettingsDataType;
  language: LanguageOption;
  intl: any;
}

export interface LessonNotStartedType extends HomeTeacherProps {
  data: HomeTeacherLessonsType;
}
export interface LessonStartedType extends HomeTeacherProps {
  data: HomeTeacherLessonsType;
}

export interface HomeTeacherLessonsType {
  // id: number;
  // status: string;
  // type: string;
  // student_count: number;
  // title: string;
  // subtitle: string;
  // duration: string;
  // startTime: string;
  // customerName: string;
  // studentPhone: string;

  actual_start_seconds: number;
  country_calling: number;
  end: string;
  firebase_lesson_date?: string;
  firebase_lesson_id?: string;
  first_name: string;
  last_name: string;
  latitude: number;
  lesson_id: number;
  longitude: number;
  mobile_no: number;
  number_of_students: number;
  ontheway: number;
  remain_seconds: number;
  start: string;
  student_id: number;
  name: string;
  name_ar: string;
  teacher_id: number;
  teaching_location: string;
  teaching_type_name: string;
}

export interface HomeTeacherType {
  is_onlie: boolean;
  is_home_location: boolean;
  is_current_location: boolean;
  is_setting_valid: boolean;
  is_lesson_started: boolean;
  lesson_id: number;
  info_msg: string;
  extendLesson: Array<string>;
}
export interface initialStateHomeTeacherType {
  data: Array<HomeTeacherLessonsType>;
  selected: HomeTeacherLessonsType;
  top_setting: HomeTeacherType;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface selectLessonAction {
  type: typeof SELECT_LESSON;
  data: HomeTeacherLessonsType;
}

export interface loadHomeTeacherAction {
  type: typeof LOAD_HOME_TEACHER;
}

export interface homeTeacherLoadedAction {
  type: typeof LOAD_HOME_TEACHER_SUCCESS;
  top_setting: HomeTeacherType;
  data: Array<HomeTeacherLessonsType>;
}

export interface homeTeacherLoadingErrorAction {
  type: typeof LOAD_HOME_TEACHER_ERROR;
  error: string;
  top_setting: HomeTeacherType;
}

export interface goOnlineAction {
  type: typeof GO_ONLINE_HOME_TEACHER;
  is_online: boolean;
}

export interface goOnlineUpdatedAction {
  type: typeof GO_ONLINE_HOME_TEACHER_SUCCESS;
}

export interface goOnlineErrorAction {
  type: typeof GO_ONLINE_HOME_TEACHER_ERROR;
  error: string;
}

export interface cancelLessonAction {
  type: typeof CANCEL_LESSON;
  lesson_id: number;
  // firebase_lesson_id: string;
  // firebase_lesson_date: number;
}

export interface cancelLessonSuccessAction {
  type: typeof CANCEL_LESSON_SUCCESS;
  lesson_id: number;
}

export interface cancelLessonErrorAction {
  type: typeof CANCEL_LESSON_ERROR;
  error: string;
}

export interface startLessonAction {
  type: typeof START_LESSON;
  lesson_id: number;
  actual_number_of_students: number;
}

export interface startLessonSuccessAction {
  type: typeof START_LESSON_SUCCESS;
  lesson_id: number;
}

export interface startLessonErrorAction {
  type: typeof START_LESSON_ERROR;
  error: string;
}

export interface endLessonAction {
  type: typeof END_LESSON;
  lesson_id: number;
}

export interface endLessonSuccessAction {
  type: typeof END_LESSON_SUCCESS;
  lesson_id: number;
}

export interface endLessonErrorAction {
  type: typeof END_LESSON_ERROR;
  error: string;
}

export type HomeTeacherActionTypes =
  | selectLessonAction
  | loadHomeTeacherAction
  | homeTeacherLoadedAction
  | homeTeacherLoadingErrorAction
  | goOnlineAction
  | goOnlineUpdatedAction
  | goOnlineErrorAction
  | cancelLessonAction
  | cancelLessonSuccessAction
  | cancelLessonErrorAction
  | startLessonAction
  | startLessonSuccessAction
  | startLessonErrorAction
  | endLessonAction
  | endLessonSuccessAction
  | endLessonErrorAction;
