import { initialStateUserType } from '../../User/types';
import {
  loadHomeSubjects,
  selectSubject,
  resetHomeStudent,
  setHomeStudentOption,
  loadHomeTeachers,
  likeTeacher,
  loadRangeRate,
  makeRequestLesson,
  cancelRequestLesson,
  cancelRequest,
  loadLessonsByMonth,
  bookScheduleLesson,
  selectLessonsByMonth
} from '../ducks';
import { initialStateHomeStudentType } from '../types';
import { LanguageOption } from '../../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface SearchProps {
  homeStudent: initialStateHomeStudentType;
  user: initialStateUserType;
  loadHomeSubjects: typeof loadHomeSubjects;
  selectSubject?: typeof selectSubject;
  resetHomeStudent?: typeof resetHomeStudent;
  setHomeStudentOption: typeof setHomeStudentOption;
  loadHomeTeachers?: typeof loadHomeTeachers;
  likeTeacher?: typeof likeTeacher;
  loadRangeRate: typeof loadRangeRate;
  makeRequestLesson: typeof makeRequestLesson;
  cancelRequestLesson: typeof cancelRequestLesson;
  cancelRequest: typeof cancelRequest;
  bookScheduleLesson: typeof bookScheduleLesson;
  loadLessonsByMonth: typeof loadLessonsByMonth;
  selectLessonsByMonth: typeof selectLessonsByMonth;
  intl: any;
  navigation: NavigationStackProp;
  language: LanguageOption;
}

export interface MapProps extends SearchProps {}
export interface TeachersListProps extends SearchProps {}
export interface ScheduleTeachersListProps extends SearchProps {}

export interface SearchSubjectsType {
  subject_name: string;
  subject_id: number;
  item_id: number;
  user_id: number;
  user_km_range: number;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface SearchTeachersType {
  first_name: string;
  last_name: string;
  user_id: number;
  education_information_id: number;
  user_km_range: number;
  is_teacher_home: number;
  is_like: boolean;
  order_like: number;
  rating: number;
  number_rating: number;
  is_student_home: number;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface SearchLessonType {
  lesson_id: number;
  lesson_date: string;
  lesson_start: string;
  lesson_end: string;
  number_of_students: number;
  is_teacher_home: number;
  is_student_home: number;
  is_individual: number;
  is_student_group: number;
  lesson_status: number;
  firebase_lesson_id: string;
  firebase_lesson_date: string;
  selected: boolean;
}
