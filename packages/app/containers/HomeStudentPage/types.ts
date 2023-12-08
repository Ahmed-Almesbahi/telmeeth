import {
  LOAD_HOME_STUDENT,
  LOAD_HOME_STUDENT_SUCCESS,
  LOAD_HOME_STUDENT_ERROR,
  loadHomeStudent,
  LOAD_HOME_SUBJECTS,
  LOAD_HOME_SUBJECTS_SUCCESS,
  LOAD_HOME_SUBJECTS_ERROR,
  loadHomeSubjects,
  SELECT_SUBJECT,
  selectSubject,
  SET_SEARCH_OPTION,
  RESET_HOME_STUDENT,
  resetHomeStudent,
  setHomeStudentOption,
  LOAD_HOME_TEACHERS,
  LOAD_HOME_TEACHERS_SUCCESS,
  LOAD_HOME_TEACHERS_ERROR,
  loadHomeTeachers,
  LIKE_TEACHER,
  LIKE_TEACHER_SUCCESS,
  LIKE_TEACHER_ERROR,
  likeTeacher,
  LOAD_RANGE_RATE,
  LOAD_RANGE_RATE_SUCCESS,
  LOAD_RANGE_RATE_ERROR,
  loadRangeRate,
  LOAD_REQUEST_LESSON_ERROR,
  LOAD_REQUEST_LESSON_SUCCESS,
  LOAD_REQUEST_LESSON,
  makeRequestLesson,
  CANCEL_REQUEST_LESSON,
  CANCEL_REQUEST_LESSON_SUCCESS,
  CANCEL_REQUEST_LESSON_ERROR,
  cancelRequestLesson,
  CANCEL_REQUEST,
  cancelRequest,
  LOAD_LESSONS_BY_MONTH,
  LOAD_LESSONS_BY_MONTH_SUCCESS,
  LOAD_LESSONS_BY_MONTH_ERROR,
  SELECT_LESSONS_BY_MONTH,
  BOOK_SCHEDULE_LESSON,
  BOOK_SCHEDULE_LESSON_SUCCESS,
  BOOK_SCHEDULE_LESSON_ERROR,
  LOAD_STUDENT_SCHEDULE,
  LOAD_STUDENT_SCHEDULE_SUCCESS,
  LOAD_STUDENT_SCHEDULE_ERROR
} from './ducks';
import { initialStateUserType } from '../User/types';
import {
  SearchTeachersType,
  SearchSubjectsType,
  SearchLessonType
} from './Search/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface HomeStudentProps {
  homeStudent: initialStateHomeStudentType;
  navigation: NavigationStackProp;
  loadHomeStudent: typeof loadHomeStudent;
  bottomTab: 'Search' | 'BookedLessons';
  setHomeStudentOption: typeof setHomeStudentOption;
  user: initialStateUserType;
  intl: any;
}

export interface RequestLessonType {
  recipient_id: number;
  is_teacher_home: number;
  is_student_home: number;
  item_id: number;
  student_count: number;
  student_id: number;
}

export interface RangeRateType {
  teacher_id: number;
  is_student_home: number;
  is_teacher_home: number;
  student_count: number;
}

export interface HomeStudentType {
  is_onlie: boolean;
  is_home_location: boolean;
  is_current_location: boolean;
  is_setting_valid: boolean;
  is_lesson_started: boolean;
  lesson_id: number;
  info_msg: string;
  extendLesson: Array<string>;
}

export interface lessonByMonthType {
  bookedLessons: Array<SearchLessonType>;
  scheduleLessons: Array<SearchLessonType>;
}
export interface initialStateHomeStudentType {
  teachers: Array<SearchTeachersType>;
  selectedTeacher: SearchTeachersType;
  subjects: Array<SearchSubjectsType>;
  selectedSubject: SearchSubjectsType;
  lessonByMonth: lessonByMonthType;
  selectedLessonByMonth: SearchLessonType;
  top_setting: HomeStudentType;
  range: {
    home: string;
    kms: number;
    rate: number;
  };
  notification_id: number;
  step: number;
  student_count: number;
  openSubjectMenu: boolean;
  tab: string;
  bottomTab: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface cancelRequestLessonAction {
  type: typeof CANCEL_REQUEST_LESSON;
  notification_id: number;
  recipient_id: number;
}

export interface cancelRequestLessonLoadedAction {
  type: typeof CANCEL_REQUEST_LESSON_SUCCESS;
}

export interface cancelRequestLessonLoadingErrorAction {
  type: typeof CANCEL_REQUEST_LESSON_ERROR;
  error: string;
}

export interface makeRequestLessonAction {
  type: typeof LOAD_REQUEST_LESSON;
  data: RequestLessonType;
}

export interface requestLessonLoadedAction {
  type: typeof LOAD_REQUEST_LESSON_SUCCESS;
  notification_id: number;
}

export interface requestLessonLoadingErrorAction {
  type: typeof LOAD_REQUEST_LESSON_ERROR;
  error: string;
}

export interface loadRangeRateAction {
  type: typeof LOAD_RANGE_RATE;
  data: RangeRateType;
}

export interface rangeRateLoadedAction {
  type: typeof LOAD_RANGE_RATE_SUCCESS;
  data: {
    kms: number;
    rate: number;
  };
}

export interface rangeRateLoadingErrorAction {
  type: typeof LOAD_RANGE_RATE_ERROR;
  error: string;
}

export interface loadHomeStudentAction {
  type: typeof LOAD_HOME_STUDENT;
}

export interface homeStudentLoadedAction {
  type: typeof LOAD_HOME_STUDENT_SUCCESS;
  top_setting: HomeStudentType;
}

export interface homeStudentLoadingErrorAction {
  type: typeof LOAD_HOME_STUDENT_ERROR;
  error: string;
  top_setting: HomeStudentType;
}

export interface loadHomeSubjectsAction {
  type: typeof LOAD_HOME_SUBJECTS;
  search_type: string;
  student_id: number;
  student_count: number;
}

export interface homeSubjectsLoadedAction {
  type: typeof LOAD_HOME_SUBJECTS_SUCCESS;
  subjects: Array<SearchSubjectsType>;
}

export interface homeSubjectsLoadingErrorAction {
  type: typeof LOAD_HOME_SUBJECTS_ERROR;
  error: string;
}

export interface loadHomeTeachersAction {
  type: typeof LOAD_HOME_TEACHERS;
  search_type: string;
  subject_id: number;
  student_id: number;
  student_count: number;
}

export interface homeTeachersLoadedAction {
  type: typeof LOAD_HOME_TEACHERS_SUCCESS;
  teachers: Array<SearchTeachersType>;
}

export interface homeTeachersLoadingErrorAction {
  type: typeof LOAD_HOME_TEACHERS_ERROR;
  error: string;
}

export interface likeTeacherAction {
  type: typeof LIKE_TEACHER;
  teacher_id: number;
}

export interface likeTeacherUpdatedAction {
  type: typeof LIKE_TEACHER_SUCCESS;
  teacher_id: number;
}

export interface likeTeacherErrorAction {
  type: typeof LIKE_TEACHER_ERROR;
  error: string;
}

export interface selectSubjectAction {
  type: typeof SELECT_SUBJECT;
  data: SearchSubjectsType;
}

export interface setHomeStudentOptionAction {
  type: typeof SET_SEARCH_OPTION;
  key: string;
  value: boolean | Array<string> | string | number | SearchTeachersType;
}

export interface resetHomeStudentAction {
  type: typeof RESET_HOME_STUDENT;
}

export interface cancelRequestAction {
  type: typeof CANCEL_REQUEST;
}

export interface loadLessonsByMonthAction {
  type: typeof LOAD_LESSONS_BY_MONTH;
  month_date: string;
  teacher_id: number;
  student_id: number;
}

export interface lessonsByMonthLoadedAction {
  type: typeof LOAD_LESSONS_BY_MONTH_SUCCESS;
  data: lessonByMonthType;
}

export interface lessonsByMonthLoadingErrorAction {
  type: typeof LOAD_LESSONS_BY_MONTH_ERROR;
  error: string;
}

export interface selectLessonsByMonthAction {
  type: typeof SELECT_LESSONS_BY_MONTH;
  lesson_id: number;
}

export interface bookScheduleLessonAction {
  type: typeof BOOK_SCHEDULE_LESSON;
  data: SearchLessonType;
}

export interface bookScheduleLessonLoadedAction {
  type: typeof BOOK_SCHEDULE_LESSON_SUCCESS;
  data: SearchLessonType;
}

export interface bookScheduleLessonLoadingErrorAction {
  type: typeof BOOK_SCHEDULE_LESSON_ERROR;
  error: string;
}

export interface loadStudentScheduleAction {
  type: typeof LOAD_STUDENT_SCHEDULE;
}

export interface loadStudentScheduleLoadedAction {
  type: typeof LOAD_STUDENT_SCHEDULE_SUCCESS;
  data: Array<SearchLessonType>;
}

export interface loadStudentScheduleLoadingErrorAction {
  type: typeof LOAD_STUDENT_SCHEDULE_ERROR;
  error: string;
}

export type HomeStudentActionTypes =
  | cancelRequestLessonAction
  | cancelRequestLessonLoadedAction
  | cancelRequestLessonLoadingErrorAction
  | makeRequestLessonAction
  | requestLessonLoadedAction
  | requestLessonLoadingErrorAction
  | loadRangeRateAction
  | rangeRateLoadedAction
  | rangeRateLoadingErrorAction
  | loadHomeStudentAction
  | homeStudentLoadedAction
  | homeStudentLoadingErrorAction
  | loadHomeSubjectsAction
  | homeSubjectsLoadedAction
  | homeSubjectsLoadingErrorAction
  | loadHomeTeachersAction
  | homeTeachersLoadedAction
  | homeTeachersLoadingErrorAction
  | likeTeacherAction
  | likeTeacherUpdatedAction
  | likeTeacherErrorAction
  | selectSubjectAction
  | setHomeStudentOptionAction
  | resetHomeStudentAction
  | cancelRequestAction
  | loadLessonsByMonthAction
  | lessonsByMonthLoadedAction
  | lessonsByMonthLoadingErrorAction
  | selectLessonsByMonthAction
  | bookScheduleLessonAction
  | bookScheduleLessonLoadedAction
  | bookScheduleLessonLoadingErrorAction
  | loadStudentScheduleAction
  | loadStudentScheduleLoadedAction
  | loadStudentScheduleLoadingErrorAction;
