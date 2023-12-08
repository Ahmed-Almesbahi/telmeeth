import { loadStudentSchedule } from '../ducks';
import { NavigationStackProp } from 'react-navigation-stack';
// import { SearchLessonType } from '../Search/types';

export interface BookedLessonType {
  booked_lesson_date: number;
  booked_lesson_name: string;
  booked_teaching_location: string;
  booked_teaching_type: string;
  firebase_lesson_date: number;
  firebase_lesson_id: string;
  lesson_end: string;
  lesson_id: number;
  lesson_start: string;
  lesson_status: string;
  number_of_students: number;
  student_id: number;
  student_name: string;
  teacher_address: string;
  teacher_id: number;
  teacher_latitude: number;
  teacher_longitude: number;
  teacher_mobile_no: string;
}

export interface BookedLessonsProps {
  loadStudentSchedule: typeof loadStudentSchedule;
  bookedLessons: Array<BookedLessonType>;
  navigation: NavigationStackProp;
}

export interface BookedLessonProps {
  data: BookedLessonType;
  navigation: NavigationStackProp;
}
