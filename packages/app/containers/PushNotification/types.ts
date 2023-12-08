import { DEFAULT_ACTION } from './ducks';
import { showSnackbar } from '../Snackbar/ducks';
import { setDeviceDetailOption } from '../DeviceDetail/ducks';
import { selectNotification } from '../NotificationPage/ducks';
import { setHomeStudentOption } from '../HomeStudentPage/ducks';
import { loadLessonDetails } from '../SingleInvoicePage/ducks';
import { NavigationStackProp } from 'react-navigation-stack';

export interface PushNotificationProps {
  navigation: NavigationStackProp;
  showSnackbar: typeof showSnackbar;
  setDeviceDetailOption: typeof setDeviceDetailOption;
  selectNotification: typeof selectNotification;
  setHomeStudentOption: typeof setHomeStudentOption;
  loadLessonDetails: typeof loadLessonDetails;
}

interface ReceivedNotificationLessonForceEndData {
  lesson_id: number;
  info_msg: string;
}

interface ReceivedNotificationStudentRequestLessonData {
  notification_id: number;
  student_id: number;
  is_teacher_home: number;
  is_student_home: number;
  student_count: number;
  subject_id: number;
  created_at: string;
}

interface ReceivedNotificationTeacherAcceptLessonData {
  student_user_id: number;
  created_at: number;
  notification_id: number;
  lesson_id: number;
}
interface ReceivedNotificationStudentCancelLessonData {
  created_at: string;
  notification_id: number;
}

export interface ReceivedNotificationData {
  title?: string;
  description?: string;
  student_request_lesson?: ReceivedNotificationStudentRequestLessonData;
  lesson_force_end?: ReceivedNotificationLessonForceEndData;
  pending_teacher?: any;
  student_schedule_booked_lesson?: any;
  student_schedule_canceled_lesson?: any;
  teacher_accept_lesson?: ReceivedNotificationTeacherAcceptLessonData;
  student_cancel_lesson?: ReceivedNotificationStudentCancelLessonData;
  urlImageString?: string;
  on_the_way: any;
  student_last_lesson: any;
  lesson_id: any;
}

export interface initialStatePushNotificationType {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface defaultAction {
  type: typeof DEFAULT_ACTION;
}

export type PushNotificationActionTypes = defaultAction;
