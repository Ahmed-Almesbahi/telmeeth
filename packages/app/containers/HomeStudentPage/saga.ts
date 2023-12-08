import { fork, take, call, put, select } from 'redux-saga/effects';
import {
  LOAD_HOME_STUDENT,
  homeStudentLoaded,
  homeStudentLoadingError,
  homeSubjectsLoaded,
  homeSubjectsLoadingError,
  LOAD_HOME_SUBJECTS,
  LOAD_HOME_TEACHERS,
  homeTeachersLoaded,
  homeTeachersLoadingError,
  likeTeacherUpdated,
  likeTeacherError,
  LIKE_TEACHER,
  LOAD_RANGE_RATE,
  rangeRateLoaded,
  rangeRateLoadingError,
  LOAD_REQUEST_LESSON,
  requestLessonLoadingError,
  requestLessonLoaded,
  CANCEL_REQUEST_LESSON,
  cancelRequestLessonLoaded,
  cancelRequestLessonLoadingError,
  LOAD_LESSONS_BY_MONTH,
  lessonsByMonthLoaded,
  lessonsByMonthLoadingError,
  BOOK_SCHEDULE_LESSON,
  bookScheduleLessonLoadingError,
  bookScheduleLessonLoaded,
  LOAD_STUDENT_SCHEDULE,
  loadStudentScheduleLoadingError,
  loadStudentScheduleLoaded
} from './ducks';
import API from '../../utils/api';
import { SHOW_SNACKBAR, showSnackbar } from '../Snackbar/ducks';
import { makeSelectUserId } from '../User/ducks';
import _forIn from 'lodash/forIn';
import moment from 'moment';

/**
 * Load homeStudent saga
 */
export function* loadHomeStudentSaga() {
  while (true) {
    yield take(LOAD_HOME_STUDENT);
    try {
      const response = yield call(API.todayLesson);
      if (response && response.status === true) {
        yield put(homeStudentLoaded(response.data));
      }
      if (response && response.status === false) {
        yield put(
          homeStudentLoadingError(response.message, response.top_setting)
        );
      }
    } catch (error) {
      yield put(homeStudentLoadingError(error.message, error.top_setting));
    }
  }
}

/**
 * Load homeSubjects saga
 */
export function* loadHomeSubjectsSaga() {
  while (true) {
    const { search_type, student_id, student_count } = yield take(
      LOAD_HOME_SUBJECTS
    );
    try {
      const response = yield call(
        API.getSubjectList,
        search_type,
        student_id,
        student_count
      );
      if (response && response.status === true) {
        // console.log(object)
        if (response.data.subjects.length === 0) {
          yield put({
            type: SHOW_SNACKBAR,
            message: 'Nothing available at this moment'
          });
        }
        yield put(homeSubjectsLoaded(response.data.subjects));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(homeSubjectsLoadingError(error.message));
    }
  }
}

/**
 * Load Teacher List saga
 */
export function* loadTeacherListSaga() {
  while (true) {
    const { search_type, subject_id, student_id, student_count } = yield take(
      LOAD_HOME_TEACHERS
    );
    try {
      const response = yield call(
        API.getTeacherList,
        search_type,
        subject_id,
        student_id,
        student_count
      );
      if (response && response.status === true) {
        if (response.data.length === 0) {
          yield put({
            type: SHOW_SNACKBAR,
            message: 'Nothing available at this moment'
          });
        }

        // convert string to boolean
        const convertedData = response.data.map((teacher: any) => ({
          ...teacher,
          is_like: teacher.is_like == 'true',
          is_student_home: teacher.is_student_home == 'true',
          is_teacher_home: teacher.is_teacher_home == 'true'
        }));

        yield put(homeTeachersLoaded(convertedData));
      }
    } catch (error) {
      yield put(homeTeachersLoadingError(error.message));
    }
  }
}

/**
 * Like Teacher saga
 */
export function* likeTeacherSaga() {
  while (true) {
    const { teacher_id } = yield take(LIKE_TEACHER);
    try {
      const response = yield call(API.likeTeacher, teacher_id);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(likeTeacherUpdated(teacher_id));
      }
    } catch (error) {
      yield put(likeTeacherError(error.message));
    }
  }
}

/**
 * Load Range Rate saga
 */
export function* loadRangeRateSaga() {
  while (true) {
    const { data } = yield take(LOAD_RANGE_RATE);
    try {
      const response = yield call(API.getRangeRate, data);
      if (response && response.status === true) {
        yield put(rangeRateLoaded(response.data));
      }
    } catch (error) {
      yield put(rangeRateLoadingError(error.message));
    }
  }
}

/**
 * Load Request Lesson saga
 */
export function* loadRequestLessonSaga() {
  while (true) {
    const { data } = yield take(LOAD_REQUEST_LESSON);
    try {
      const response = yield call(API.requestLesson, data);
      if (response && response.status === true) {
        yield put(requestLessonLoaded(response.notification_id));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(requestLessonLoadingError(error.message));
    }
  }
}

/**
 * Load Request Lesson saga
 */
export function* cancelRequestLessonSaga() {
  while (true) {
    const { recipient_id, notification_id } = yield take(CANCEL_REQUEST_LESSON);
    try {
      const response = yield call(
        API.cancelRequestLesson,
        notification_id,
        recipient_id
      );
      if (response && response.status === true) {
        yield put(cancelRequestLessonLoaded());
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(cancelRequestLessonLoadingError(error.message));
    }
  }
}

/**
 * Load Lessons by Month saga
 */
export function* loadLessonsByMonthSaga() {
  while (true) {
    const { month_date, teacher_id, student_id } = yield take(
      LOAD_LESSONS_BY_MONTH
    );
    try {
      const response = yield call(
        API.getScheduledDates,
        month_date,
        teacher_id,
        student_id
      );
      if (response && response.status === true) {
        yield put(lessonsByMonthLoaded(response.data));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(lessonsByMonthLoadingError(error.message));
    }
  }
}

/**
 * Booked schedule lesson saga
 */
export function* bookScheduleLessonSaga() {
  while (true) {
    const { data } = yield take(BOOK_SCHEDULE_LESSON);
    const {
      lesson_id,
      student_id,
      student_count,
      subject_id,
      teaching_location
    } = data;

    try {
      const response = yield call(API.bookScheduledLesson, {
        lesson_id,
        student_id,
        student_count,
        subject_id,
        teaching_location
      });
      if (response && response.status === true) {
        yield put(bookScheduleLessonLoaded(response.data));
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(bookScheduleLessonLoadingError(error.message));
    }
  }
}

/**
 * Load student schedule lesson  from firebase saga
 */
export function* loadStudentScheduleSaga() {
  while (true) {
    yield take(LOAD_STUDENT_SCHEDULE);

    try {
      const userId = yield select(makeSelectUserId());
      const response = yield call(API.getStudentScheduls, userId);

      console.log('loadStudentScheduleSaga response', response);
      let data: any = [];
      response.forEach((childSnapshot: any) => {
        let childData = childSnapshot.val();

        var d = new Date();
        var n = d.getTime();

        let later = moment(parseFloat(childSnapshot.key)).format('YYYY-MM-DD');
        let now = moment(n).format('YYYY-MM-DD');

        console.log('object', childSnapshot);
        // if (parseFloat(childSnapshot.key) < n) {
        if (moment(now).isBefore(later, 'year')) {
          return;
        }

        _forIn(childData.bookedLessons, function(value, key) {
          data.push({
            ...value,
            lesson_date: moment(parseFloat(value.booked_lesson_date)).format(
              'YYYY-MM-DD'
            ),
            firebase_lesson_id: key,
            firebase_lesson_date: childSnapshot.key
          });
        });
      });
      if (response) {
        yield put(loadStudentScheduleLoaded(data));
      }
    } catch (error) {
      console.log('errror', error);
      yield put(loadStudentScheduleLoadingError(error.message));
    }
  }
}

export default function* homeStudentSaga() {
  yield fork(loadHomeStudentSaga);
  yield fork(loadHomeSubjectsSaga);
  yield fork(loadTeacherListSaga);
  yield fork(likeTeacherSaga);
  yield fork(loadRangeRateSaga);
  yield fork(loadRequestLessonSaga);
  yield fork(cancelRequestLessonSaga);
  yield fork(loadLessonsByMonthSaga);
  yield fork(bookScheduleLessonSaga);
  yield fork(loadStudentScheduleSaga);
}

//http://192.168.10.10/v1/notification/request-lesson
//{"status":true,"message":"Your message has been sent successfully","notification_id":6691}

//http://192.168.10.10/v1/notification/cancel-lesson-request
//{"recipient_id":"4216","notification_id":6695}

//lessons/lesson-by-month?month_date=2019-7-1&teacher_id=4314&student_id=1300
//{"status":true,"message":"listed successfully","data":{"bookedLessons":[{"lesson_date":"2019-07-26"}],"scheduleLessons":[{"lesson_date":"2019-07-30"},{"lesson_date":"2019-07-31"}]}}

//lessons/lesson-by-teacher?subject_id=1&teacher_id=4314&lesson_date=2019-7-25
//{"status":false,"message":"No records found"}
//D/OkHttp: {"status":true,"message":"listed successfully","data":[{"subject_name":"Tawheed","lesson_id":"842","lesson_date":"2019-07-26","lesson_start":"22:59:00","lesson_end":"23:59:00","number_of_students":"1","is_teacher_home":false,"is_student_home":true,"is_individual":true,"is_student_group":false,"lesson_status":"1","firebase_lesson_id":"-LkQGDfoiwWvcGxzLaEi","firebase_lesson_date":"1564088400000"}]}

// for schedule

//https://api.telmeeth.com/v1/lessons/booked-schedule-lesson
// POST {"lesson_id":"863","teaching_location":"2","subject_id":"1","student_count":"1","student_id":"1300"}
// {"status":true,"message":"Record updated successfully"}

// http://api.telmeeth.test/v1/lessons/cancel-lesson
