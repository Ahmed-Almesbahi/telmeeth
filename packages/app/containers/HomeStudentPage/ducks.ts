import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateHomeStudentType,
  HomeStudentActionTypes,
  RequestLessonType,
  RangeRateType,
  lessonByMonthType,
  HomeStudentType
} from './types';
import _update from 'lodash/update';
import {
  SearchLessonType,
  SearchSubjectsType,
  SearchTeachersType
} from './Search/types';

/*
 *
 * HomeStudentPage constants
 *
 */
export const CANCEL_REQUEST = 'app/HomeStudentPage/CANCEL_REQUEST';
export const LOAD_REQUEST_LESSON = 'app/HomeStudentPage/LOAD_REQUEST_LESSON';
export const LOAD_REQUEST_LESSON_SUCCESS =
  'app/HomeStudentPage/LOAD_REQUEST_LESSON_SUCCESS';
export const LOAD_REQUEST_LESSON_ERROR =
  'app/HomeStudentPage/LOAD_REQUEST_LESSON_ERROR';
export const CANCEL_REQUEST_LESSON =
  'app/HomeStudentPage/CANCEL_REQUEST_LESSON';
export const CANCEL_REQUEST_LESSON_SUCCESS =
  'app/HomeStudentPage/CANCEL_REQUEST_LESSON_SUCCESS';
export const CANCEL_REQUEST_LESSON_ERROR =
  'app/HomeStudentPage/CANCEL_REQUEST_LESSON_ERROR';
export const LOAD_RANGE_RATE = 'app/HomeStudentPage/LOAD_RANGE_RATE';
export const LOAD_RANGE_RATE_SUCCESS =
  'app/HomeStudentPage/LOAD_RANGE_RATE_SUCCESS';
export const LOAD_RANGE_RATE_ERROR =
  'app/HomeStudentPage/LOAD_RANGE_RATE_ERROR';
export const LOAD_HOME_STUDENT = 'app/HomeStudentPage/LOAD_HOME_STUDENT';
export const LOAD_HOME_STUDENT_SUCCESS =
  'app/HomeStudentPage/LOAD_HOME_STUDENT_SUCCESS';
export const LOAD_HOME_STUDENT_ERROR =
  'app/HomeStudentPage/LOAD_HOME_STUDENT_ERROR';
export const LOAD_HOME_SUBJECTS = 'app/HomeStudentPage/LOAD_HOME_SUBJECTS';
export const LOAD_HOME_SUBJECTS_SUCCESS =
  'app/HomeStudentPage/LOAD_HOME_SUBJECTS_SUCCESS';
export const LOAD_HOME_SUBJECTS_ERROR =
  'app/HomeStudentPage/LOAD_HOME_SUBJECTS_ERROR';
export const LOAD_HOME_TEACHERS = 'app/HomeStudentPage/LOAD_HOME_TEACHERS';
export const LOAD_HOME_TEACHERS_SUCCESS =
  'app/HomeStudentPage/LOAD_HOME_TEACHERS_SUCCESS';
export const LOAD_HOME_TEACHERS_ERROR =
  'app/HomeStudentPage/LOAD_HOME_TEACHERS_ERROR';
export const LIKE_TEACHER = 'app/HomeStudentPage/LIKE_TEACHER';
export const LIKE_TEACHER_SUCCESS = 'app/HomeStudentPage/LIKE_TEACHER_SUCCESS';
export const LIKE_TEACHER_ERROR = 'app/HomeStudentPage/LIKE_TEACHER_ERROR';
export const SELECT_SUBJECT = 'app/HomeStudentPage/SELECT_SUBJECT';
export const SET_SEARCH_OPTION = 'app/HomeStudentPage/SET_SEARCH_OPTION';
export const RESET_HOME_STUDENT = 'app/HomeStudentPage/RESET_HOME_STUDENT';
export const BOOK_SCHEDULE_LESSON = 'app/HomeStudentPage/BOOK_SCHEDULE_LESSON';
export const BOOK_SCHEDULE_LESSON_SUCCESS =
  'app/HomeStudentPage/BOOK_SCHEDULE_LESSON_SUCCESS';
export const BOOK_SCHEDULE_LESSON_ERROR =
  'app/HomeStudentPage/BOOK_SCHEDULE_LESSON_ERROR';

export const LOAD_LESSONS_BY_MONTH =
  'app/HomeStudentPage/LOAD_LESSONS_BY_MONTH';
export const LOAD_LESSONS_BY_MONTH_SUCCESS =
  'app/HomeStudentPage/LOAD_LESSONS_BY_MONTH_SUCCESS';
export const LOAD_LESSONS_BY_MONTH_ERROR =
  'app/HomeStudentPage/LOAD_LESSONS_BY_MONTH_ERROR';

export const SELECT_LESSONS_BY_MONTH =
  'app/HomeStudentPage/SELECT_LESSONS_BY_MONTH';

export const LOAD_STUDENT_SCHEDULE =
  'app/HomeStudentPage/LOAD_STUDENT_SCHEDULE';
export const LOAD_STUDENT_SCHEDULE_SUCCESS =
  'app/HomeStudentPage/LOAD_STUDENT_SCHEDULE_SUCCESS';
export const LOAD_STUDENT_SCHEDULE_ERROR =
  'app/HomeStudentPage/LOAD_STUDENT_SCHEDULE_ERROR';

/*
 *
 * HomeStudentPage reducer
 *
 */

export const initialStateHomeStudent: initialStateHomeStudentType = {
  teachers: [], // all teachers from search will be listed here
  selectedTeacher: {
    // when teacher is selected , will be saved here
    first_name: '',
    last_name: '',
    user_id: 0,
    education_information_id: 0,
    user_km_range: 0,
    is_teacher_home: 0,
    is_like: false,
    order_like: 0,
    rating: 0,
    number_rating: 0,
    is_student_home: 0,
    latitude: 0,
    longitude: 0,
    distance: 0
  },
  subjects: [], // all avaiable subject to book , will be listed here
  selectedSubject: {
    // when subject is selected , will be saved here
    subject_name: '',
    subject_id: 0,
    user_id: 0,
    user_km_range: 0,
    latitude: 0,
    longitude: 0,
    distance: 0,
    item_id: 0
  },
  lessonByMonth: {
    bookedLessons: [],
    scheduleLessons: []
  },
  selectedLessonByMonth: {
    lesson_id: 0,
    lesson_date: '',
    lesson_start: '',
    lesson_end: '',
    number_of_students: 0,
    is_teacher_home: 0,
    is_student_home: 0,
    is_individual: 0,
    is_student_group: 0,
    lesson_status: 0,
    firebase_lesson_id: '',
    firebase_lesson_date: '',
    selected: false
  },
  top_setting: {
    // default data for the page
    is_onlie: false,
    is_home_location: true,
    is_current_location: false,
    is_setting_valid: true,
    is_lesson_started: false,
    lesson_id: 0,
    info_msg: '',
    extendLesson: []
  },
  range: {
    // when press on teacher / student location . range price will be saved here
    home: '',
    kms: 0,
    rate: 0
  },
  notification_id: 0,
  step: 1, // 1 for the first page , 2 listing teachers , 3 listing teachers withing scheculed calenders
  student_count: 1,
  openSubjectMenu: false,
  tab: 'Now',
  bottomTab: 'Search', // Search | BookedLessons
  loading: false,
  error: '',
  loaded: false
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialStateHomeStudent,
  action: HomeStudentActionTypes
) =>
  produce(state, draft => {
    switch (action.type) {
      case CANCEL_REQUEST_LESSON:
        // draft.range.home = action.data.is_teacher_home ? 'teacher' : 'student';
        draft.loading = true;
        draft.error = '';
        break;

      case CANCEL_REQUEST_LESSON_SUCCESS:
        draft.notification_id = 0;
        draft.loading = false;
        draft.loaded = true;
        break;

      case CANCEL_REQUEST_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_REQUEST_LESSON:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_REQUEST_LESSON_SUCCESS:
        draft.notification_id = action.notification_id;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_REQUEST_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_RANGE_RATE:
        draft.range.home = action.data.is_teacher_home ? 'teacher' : 'student';
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_RANGE_RATE_SUCCESS:
        draft.range = {
          ...state.range,
          ...action.data
        };
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_RANGE_RATE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_HOME_STUDENT:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_HOME_STUDENT_SUCCESS:
        draft.top_setting = action.top_setting;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_HOME_STUDENT_ERROR:
        draft.error = action.error;
        draft.top_setting = action.top_setting;
        draft.loading = false;
        break;

      case LOAD_HOME_SUBJECTS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_HOME_SUBJECTS_SUCCESS:
        draft.subjects = action.subjects;
        draft.openSubjectMenu = !state.openSubjectMenu;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_HOME_SUBJECTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_HOME_TEACHERS:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_HOME_TEACHERS_SUCCESS:
        draft.teachers = action.teachers;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_HOME_TEACHERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LIKE_TEACHER:
        draft.loading = true;
        draft.error = '';
        break;

      case LIKE_TEACHER_SUCCESS:
        draft.teachers = draft.teachers.map(teacher =>
          teacher.user_id === action.teacher_id
            ? { ...teacher, is_like: !teacher.is_like }
            : teacher
        );
        draft.loading = false;
        draft.loaded = true;
        break;

      case LIKE_TEACHER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SELECT_SUBJECT:
        draft.selectedSubject = action.data;
        draft.openSubjectMenu = false;
        break;

      case SET_SEARCH_OPTION:
        // @ts-ignore
        draft[action.key] = action.value;
        if (action.key === 'tab' || action.key === 'bottomTab') {
          draft.subjects = [];
          draft.selectedSubject = initialStateHomeStudent.selectedSubject;

          draft.teachers = [];
          draft.selectedTeacher = initialStateHomeStudent.selectedTeacher;

          draft.lessonByMonth = initialStateHomeStudent.lessonByMonth;
          draft.selectedLessonByMonth =
            initialStateHomeStudent.selectedLessonByMonth;

          draft.student_count = 1;
          draft.openSubjectMenu = false;

          draft.notification_id = initialStateHomeStudent.notification_id;
          draft.step = initialStateHomeStudent.step;
        }
        break;

      case CANCEL_REQUEST:
        draft.notification_id = 0;

        break;

      // case RESET_HOME_STUDENT:
      //   draft.subjects = [];
      //   draft.selectedSubject = initialState.selectedSubject;
      //   draft.student_count = 1;
      //   draft.openSubjectMenu = false;
      //   break;

      case LOAD_LESSONS_BY_MONTH:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_LESSONS_BY_MONTH_SUCCESS:
        const scheduleLessons = action.data.scheduleLessons.map(d => {
          return { ...d, selected: false };
        });

        draft.lessonByMonth = {
          bookedLessons: [],
          scheduleLessons: scheduleLessons
        };
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_LESSONS_BY_MONTH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case SELECT_LESSONS_BY_MONTH:
        // reset all selected to false
        draft.lessonByMonth.scheduleLessons.map(d => (d.selected = false));

        const index = draft.lessonByMonth.scheduleLessons.findIndex(
          d => d.lesson_id === action.lesson_id
        );

        draft.lessonByMonth.scheduleLessons[index].selected = true;

        break;

      case BOOK_SCHEDULE_LESSON:
        // draft.range.home = action.data.is_teacher_home ? 'teacher' : 'student';
        draft.loading = true;
        draft.error = '';
        break;

      case BOOK_SCHEDULE_LESSON_SUCCESS:
        draft.notification_id = 0;
        draft.loading = false;
        draft.loaded = true;
        break;

      case BOOK_SCHEDULE_LESSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_STUDENT_SCHEDULE:
        // draft.range.home = action.data.is_teacher_home ? 'teacher' : 'student';
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_STUDENT_SCHEDULE_SUCCESS:
        draft.lessonByMonth.bookedLessons = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_STUDENT_SCHEDULE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the HomeStudentPage state domain
 */

const selectHomeStudentPageDomain = (state: any) =>
  state.homeStudent || initialStateHomeStudent;

/**
 * Default selector used by HomeStudentPage
 */

export const makeSelectHomeStudent = () =>
  createSelector(
    selectHomeStudentPageDomain,
    substate => substate
  );

export const makeSelectHomeStudentBottomTab = () =>
  createSelector(
    selectHomeStudentPageDomain,
    substate => substate.bottomTab
  );

export const makeSelectHomeStudentBookedLessons = () =>
  createSelector(
    selectHomeStudentPageDomain,
    substate => substate.lessonByMonth.bookedLessons
  );

/**
 * Make cancel Request Lesson, this action starts the request saga
 * @return {object} An action object with a type of CANCEL_REQUEST_LESSON
 */
export function cancelRequestLesson(
  notification_id: number,
  recipient_id: number
): HomeStudentActionTypes {
  return {
    type: CANCEL_REQUEST_LESSON,
    notification_id,
    recipient_id
  };
}

/**
 * Dispatched when cancel Request Lesson are loaded by the request saga
 *
 *
 * @return {object} An action object with a type of CANCEL_REQUEST_LESSON_SUCCESS passing the repos
 */
export function cancelRequestLessonLoaded(): HomeStudentActionTypes {
  return {
    type: CANCEL_REQUEST_LESSON_SUCCESS
  };
}

/**
 * Dispatched when cancel the request lesson fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of CANCEL_REQUEST_LESSON_ERROR passing the error
 */
export function cancelRequestLessonLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: CANCEL_REQUEST_LESSON_ERROR,
    error
  };
}

/**
 * Make the Request Lesson, this action starts the request saga
 * @return {object} An action object with a type of LOAD_REQUEST_LESSON
 */
export function makeRequestLesson(
  data: RequestLessonType
): HomeStudentActionTypes {
  return {
    type: LOAD_REQUEST_LESSON,
    data
  };
}

/**
 * Dispatched when the Request Lesson are loaded by the request saga
 *
 * @param  {number} notification_id The notification id
 * @return {object} An action object with a type of LOAD_REQUEST_LESSON_SUCCESS passing the repos
 */
export function requestLessonLoaded(
  notification_id: number
): HomeStudentActionTypes {
  return {
    type: LOAD_REQUEST_LESSON_SUCCESS,
    notification_id
  };
}

/**
 * Dispatched when loading the request lesson fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_REQUEST_LESSON_ERROR passing the error
 */
export function requestLessonLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: LOAD_REQUEST_LESSON_ERROR,
    error
  };
}

/**
 * Load the rangeRate, this action starts the request saga
 * @return {object} An action object with a type of LOAD_RANGE_RATE
 */
export function loadRangeRate(data: RangeRateType): HomeStudentActionTypes {
  return {
    type: LOAD_RANGE_RATE,
    data
  };
}

/**
 * Dispatched when the rangeRate are loaded by the request saga
 *
 * @param  {object} data The rangeRate data
 *
 * @return {object}      An action object with a type of LOAD_RANGE_RATE_SUCCESS passing the repos
 */
export function rangeRateLoaded(data: any): HomeStudentActionTypes {
  return {
    type: LOAD_RANGE_RATE_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the rangeRate fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_RANGE_RATE_ERROR passing the error
 */
export function rangeRateLoadingError(error: string): HomeStudentActionTypes {
  return {
    type: LOAD_RANGE_RATE_ERROR,
    error
  };
}
/**
 * Load the homeStudent, this action starts the request saga
 * @return {object} An action object with a type of LOAD_HOME_STUDENT
 */
export function loadHomeStudent(): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_STUDENT
  };
}

/**
 * Dispatched when the homeStudent are loaded by the request saga
 *
 * @param  {object} data The homeStudent data
 *
 * @return {object}      An action object with a type of LOAD_HOME_STUDENT_SUCCESS passing the repos
 */
export function homeStudentLoaded(
  top_setting: HomeStudentType
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_STUDENT_SUCCESS,
    top_setting
  };
}

/**
 * Dispatched when loading the homeStudent fails
 *
 * @param  {string} error The error
 * @param  {object} top_setting The error
 *
 * @return {object}       An action object with a type of LOAD_HOME_STUDENT_ERROR passing the error
 */
export function homeStudentLoadingError(
  error: string,
  top_setting: HomeStudentType
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_STUDENT_ERROR,
    error,
    top_setting
  };
}

/**
 * Load the homeSubjects, this action starts the request saga
 *
 * @param  {string} search_type Now or Schedule
 * @param  {number} student_id The current student id
 * @param  {student_count} student_count number of students
 * @return {object} An action object with a type of LOAD_HOME_SUBJECTS
 */
export function loadHomeSubjects(
  search_type: string,
  student_id: number,
  student_count: number
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_SUBJECTS,
    search_type,
    student_id,
    student_count
  };
}

/**
 * Dispatched when the homeSubjects are loaded by the request saga
 *
 * @param  {object} data The homeSubjects data
 *
 * @return {object}      An action object with a type of LOAD_HOME_SUBJECTS_SUCCESS passing the repos
 */
export function homeSubjectsLoaded(
  subjects: Array<SearchSubjectsType>
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_SUBJECTS_SUCCESS,
    subjects
  };
}

/**
 * Dispatched when loading the homeSubjects fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_HOME_SUBJECTS_ERROR passing the error
 */
export function homeSubjectsLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_SUBJECTS_ERROR,
    error
  };
}

/**
 * Load the homeTeachers, this action starts the request saga
 *
 * @param  {string} search_type Now or Schedule
 * @param  {number} subject_id Now or Schedule
 * @param  {number} student_id The current student id
 * @param  {student_count} student_count number of students
 * @return {object} An action object with a type of LOAD_HOME_TEACHERS
 */
export function loadHomeTeachers(
  search_type: string,
  subject_id: number,
  student_id: number,
  student_count: number
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_TEACHERS,
    search_type,
    subject_id,
    student_id,
    student_count
  };
}

/**
 * Dispatched when the homeTeachers are loaded by the request saga
 *
 * @param  {object} data The homeTeachers data
 *
 * @return {object}      An action object with a type of LOAD_HOME_TEACHERS_SUCCESS passing the repos
 */
export function homeTeachersLoaded(
  teachers: Array<SearchTeachersType>
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_TEACHERS_SUCCESS,
    teachers
  };
}

/**
 * Dispatched when loading the homeTeachers fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_HOME_TEACHERS_ERROR passing the error
 */
export function homeTeachersLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: LOAD_HOME_TEACHERS_ERROR,
    error
  };
}

/**
 * dispatch like teacher, this action starts the request saga
 *
 * @param  {number} teacher_id the teacher id to like
 *
 * @return {object} An action object with a type of LIKE_TEACHER
 */
export function likeTeacher(teacher_id: number): HomeStudentActionTypes {
  return {
    type: LIKE_TEACHER,
    teacher_id
  };
}

/**
 * Dispatched when the like teacher are loaded by the request saga
 *
 * @param  {number} teacher_id the teacher id to like
 *
 * @return {object}      An action object with a type of LIKE_TEACHER_SUCCESS passing the repos
 */
export function likeTeacherUpdated(teacher_id: number): HomeStudentActionTypes {
  return {
    type: LIKE_TEACHER_SUCCESS,
    teacher_id
  };
}

/**
 * Dispatched when like teacher fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LIKE_TEACHER_ERROR passing the error
 */
export function likeTeacherError(error: string): HomeStudentActionTypes {
  return {
    type: LIKE_TEACHER_ERROR,
    error
  };
}

/**
 * Dispatched when student select subject
 *
 * @param  {object} data The subject object
 *
 * @return {object}       An action object with a type of SELECT_SUBJECT passing the error
 */
export function selectSubject(
  data: SearchSubjectsType
): HomeStudentActionTypes {
  return {
    type: SELECT_SUBJECT,
    data
  };
}

export function setHomeStudentOption(
  key: string,
  value: boolean | Array<string> | string | number | SearchTeachersType
): HomeStudentActionTypes {
  return {
    type: SET_SEARCH_OPTION,
    key,
    value
  };
}

export function resetHomeStudent(): HomeStudentActionTypes {
  return {
    type: RESET_HOME_STUDENT
  };
}

export function cancelRequest(): HomeStudentActionTypes {
  return {
    type: CANCEL_REQUEST
  };
}

/**
 *  Load lesson by month, this action starts the request saga
 *
 * @export
 * @param {string} month_date
 * @param {number} teacher_id
 * @param {number} student_id
 * @returns {HomeStudentActionTypes} An action object with a type of LOAD_LESSONS_BY_MONTH
 */
export function loadLessonsByMonth(
  month_date: string,
  teacher_id: number,
  student_id: number
): HomeStudentActionTypes {
  return {
    type: LOAD_LESSONS_BY_MONTH,
    month_date,
    teacher_id,
    student_id
  };
}

/**
 * Dispatched when the lesson by month are loaded by the request saga
 *
 * @param  {object} data The homeTeachers data
 *
 * @return {object}      An action object with a type of LOAD_LESSONS_BY_MONTH_SUCCESS passing the repos
 */
export function lessonsByMonthLoaded(
  data: lessonByMonthType
): HomeStudentActionTypes {
  return {
    type: LOAD_LESSONS_BY_MONTH_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading lesseons by month fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_LESSONS_BY_MONTH_ERROR passing the error
 */
export function lessonsByMonthLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: LOAD_LESSONS_BY_MONTH_ERROR,
    error
  };
}

export function selectLessonsByMonth(
  lesson_id: number
): HomeStudentActionTypes {
  return {
    type: SELECT_LESSONS_BY_MONTH,
    lesson_id
  };
}

/**
 * Make cancel Request Lesson, this action starts the request saga
 * @return {object} An action object with a type of BOOK_SCHEDULE_LESSON
 */
export function bookScheduleLesson(
  data: SearchLessonType
): HomeStudentActionTypes {
  return {
    type: BOOK_SCHEDULE_LESSON,
    data
  };
}

/**
 * Dispatched when cancel Request Lesson are loaded by the request saga
 *
 *
 * @return {object} An action object with a type of BOOK_SCHEDULE_LESSON_SUCCESS passing the repos
 */
export function bookScheduleLessonLoaded(
  data: SearchLessonType
): HomeStudentActionTypes {
  return {
    type: BOOK_SCHEDULE_LESSON_SUCCESS,
    data
  };
}

/**
 * Dispatched when cancel the request lesson fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of BOOK_SCHEDULE_LESSON_ERROR passing the error
 */
export function bookScheduleLessonLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: BOOK_SCHEDULE_LESSON_ERROR,
    error
  };
}

/**
 * Load student schedule Lessons from firebase, this action starts the request saga
 * @return {object} An action object with a type of LOAD_STUDENT_SCHEDULE
 */
export function loadStudentSchedule(): HomeStudentActionTypes {
  return {
    type: LOAD_STUDENT_SCHEDULE
  };
}

/**
 * Dispatched when cancel Request Lesson are loaded by the request saga
 *
 *
 * @return {object} An action object with a type of LOAD_STUDENT_SCHEDULE_SUCCESS passing the repos
 */
export function loadStudentScheduleLoaded(
  data: Array<SearchLessonType>
): HomeStudentActionTypes {
  return {
    type: LOAD_STUDENT_SCHEDULE_SUCCESS,
    data
  };
}

/**
 * Dispatched when cancel the request lesson fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LOAD_STUDENT_SCHEDULE_ERROR passing the error
 */
export function loadStudentScheduleLoadingError(
  error: string
): HomeStudentActionTypes {
  return {
    type: LOAD_STUDENT_SCHEDULE_ERROR,
    error
  };
}
