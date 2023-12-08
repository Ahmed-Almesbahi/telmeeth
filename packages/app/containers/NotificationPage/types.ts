import {
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_ERROR,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
  loadNotifications,
  deleteNotification,
  SELECT_NOTIFICATION,
  selectNotification
} from './ducks';
import { initialStateUserType } from '../User/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface NotificationPageProps {
  notifications: initialStateNotificationType;
  loadNotifications: typeof loadNotifications;
  deleteNotification: typeof deleteNotification;
  navigation: NavigationStackProp;
  selectNotification: typeof selectNotification;
  type: 1 | 2;
}

export interface NotificationType {
  created_at: string;
  description: string;
  image_url: string;
  is_previous: boolean;
  is_read: number;
  message: {
    title: string;
    description: string;
    student_request_lesson: {
      is_student_home: number;
      is_teacher_home: number;
      student_count: number;
      student_id: number;
      item_id: number;
    };
    // image_url: ""
  };
  notification_id: number;
  notification_type: string | any;
  recipient_id: number;
  title: string;
}
export interface initialStateNotificationType {
  data: Array<NotificationType>;
  selected: NotificationType;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
  stopLoading: boolean;
}

export interface selectNotificationAction {
  type: typeof SELECT_NOTIFICATION;
  data: NotificationType;
}

export interface loadNotificationsAction {
  type: typeof LOAD_NOTIFICATIONS;
  page: number;
}

export interface notificationsLoadedAction {
  type: typeof LOAD_NOTIFICATIONS_SUCCESS;
  data: Array<NotificationType>;
}
export interface notificationLoadingAction {
  type: typeof LOAD_NOTIFICATIONS_ERROR;
  error: string;
}
export interface deleteNotificationAction {
  type: typeof DELETE_NOTIFICATION;
  notification_id: number;
}
export interface deleteNotificationSuccessAction {
  type: typeof DELETE_NOTIFICATION_SUCCESS;
  notification_id: number;
}
export interface deleteNotificationErrorAction {
  type: typeof DELETE_NOTIFICATION_ERROR;
  error: string;
}

export type NotificationActionTypes =
  | selectNotificationAction
  | loadNotificationsAction
  | notificationsLoadedAction
  | notificationLoadingAction
  | deleteNotificationAction
  | deleteNotificationSuccessAction
  | deleteNotificationErrorAction;
