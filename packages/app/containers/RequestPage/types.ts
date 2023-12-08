import {
  LOAD_TIME_DIFF,
  LOAD_TIME_DIFF_SUCCESS,
  LOAD_TIME_DIFF_ERROR,
  ACCEPT_LESSON,
  ACCEPT_LESSON_SUCCESS,
  ACCEPT_LESSON_ERROR,
  timeDifferenceLoad,
  acceptLesson
} from './ducks';
import { match } from 'react-router';
import { setDrawerTab } from '../DrawerPage/ducks';
import { initialStateNotificationType } from '../NotificationPage/types';
import { NavigationStackProp } from 'react-navigation-stack';
// import { FormikActions } from 'formik';
// import { UserType } from '../User/types';

export interface AcceptLessonData {
  notification_id: number;
  is_teacher_home: number;
  is_student_home: number;
  item_id: number;
  student_count: number;
  student_id: number;
}

export interface timeDifferenceResponse {
  time_diff: number;
  // data: {
  //   time_diff: number;
  // };
}

interface RequestParams {
  id: string;
}

export interface RequestPageProps {
  navigation: NavigationStackProp;
  timeDifferenceLoad: typeof timeDifferenceLoad;
  match: match<RequestParams>;
  request: initialStateRequestType;
  setTab: typeof setDrawerTab;
  acceptLesson: typeof acceptLesson;
  notification: initialStateNotificationType;
  // userType: UserType;
  // intl: any;
}

// export interface EducationalCertificatesType {
//   edu_cert_id: string;
//   edu_cert_name: string;
// }

// export interface ProfileType {
//   first_name: string;
//   last_name: string;
//   edu_cert_id: number;
//   major_id: number;
//   job: string;
//   identity_name: string;
//   identity_number: number;
//   gender: string;
//   birth_date: string;
//   educational_certificates: Array<EducationalCertificatesType>;
// }

export interface initialStateRequestType {
  // data: ProfileType;
  time_diff: number;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface timeDifferenceLoadAction {
  type: typeof LOAD_TIME_DIFF;
  datetime: string;
  notification_id: number;
}

export interface timeDiffereceLoadedAction {
  type: typeof LOAD_TIME_DIFF_SUCCESS;
  data: timeDifferenceResponse;
}

export interface timeDiffereceLoadingErrorAction {
  type: typeof LOAD_TIME_DIFF_ERROR;
  error: string;
}

export interface acceptLessonAction {
  type: typeof ACCEPT_LESSON;
  data: AcceptLessonData;
}

export interface acceptLessonSuccessAction {
  type: typeof ACCEPT_LESSON_SUCCESS;
}

export interface acceptLessonErrorAction {
  type: typeof ACCEPT_LESSON_ERROR;
  error: string;
}

export type RequestActionTypes =
  | timeDifferenceLoadAction
  | timeDiffereceLoadedAction
  | timeDiffereceLoadingErrorAction
  | acceptLessonAction
  | acceptLessonSuccessAction
  | acceptLessonErrorAction;
