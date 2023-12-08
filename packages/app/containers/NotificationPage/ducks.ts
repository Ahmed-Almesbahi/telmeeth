import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateNotificationType,
  NotificationActionTypes,
  NotificationType
} from './types';

/*
 *
 * NotificationPage constants
 *
 */
export const SELECT_NOTIFICATION = 'app/NotificationPage/SELECT_NOTIFICATION';
export const LOAD_NOTIFICATIONS = 'app/NotificationPage/LOAD_NOTIFICATIONS';
export const LOAD_NOTIFICATIONS_SUCCESS =
  'app/NotificationPage/LOAD_NOTIFICATIONS_SUCCESS';
export const LOAD_NOTIFICATIONS_ERROR =
  'app/NotificationPage/LOAD_NOTIFICATIONS_ERROR';
export const DELETE_NOTIFICATION = 'app/NotificationPage/DELETE_NOTIFICATION';
export const DELETE_NOTIFICATION_SUCCESS =
  'app/NotificationPage/DELETE_NOTIFICATION_SUCCESS';
export const DELETE_NOTIFICATION_ERROR =
  'app/NotificationPage/DELETE_NOTIFICATION_ERROR';

/*
 *
 * NotificationPage reducer
 *
 */
export const initialState: initialStateNotificationType = {
  data: [],
  selected: {
    created_at: '',
    description: '',
    image_url: '',
    is_previous: false,
    is_read: 0,
    message: {
      title: '',
      description: '',
      student_request_lesson: {
        is_student_home: 0,
        is_teacher_home: 0,
        student_count: 0,
        student_id: 0,
        item_id: 0
      }
    },
    notification_id: 0,
    notification_type: '',
    recipient_id: 0,
    title: ''
  },
  loading: false,
  error: '',
  loaded: false,
  isRefreshing: false, //for pull to refresh,
  stopLoading: false
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: NotificationActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_NOTIFICATION:
        draft.selected = action.data;
        break;

      case LOAD_NOTIFICATIONS:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_NOTIFICATIONS_SUCCESS:
        // let listData = state.data;
        // console.log("listData", listData);
        // draft.data = listData.concat(action.data);
        action.data.map((d: any) => draft.data.push(d));
        // draft.data.push = listData.concat(action.data);
        // draft.data = action.data;
        // draft.data.push(action.data);
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_NOTIFICATIONS_ERROR:
        draft.stopLoading = true;
        draft.error = action.error;
        draft.loading = false;
        break;

      case DELETE_NOTIFICATION:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case DELETE_NOTIFICATION_SUCCESS:
        draft.data.splice(
          draft.data.findIndex(
            notification =>
              notification.notification_id === action.notification_id
          ),
          1
        );
        draft.loading = false;
        draft.loaded = true;
        break;

      case DELETE_NOTIFICATION_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the notificationPage state domain
 */

const selectNotificationPageDomain = (state: any) =>
  state.notifications || initialState;

/**
 * Default selector used by NotificationPage
 */

export const makeSelectNotifications = () =>
  createSelector(
    selectNotificationPageDomain,
    substate => substate
  );

/**
 * Select  notification
 * @param  {number} page The page number
 * @return {object} An action object with a type of LOAD_NOTIFICATIONS
 */
export function selectNotification(
  data: NotificationType
): NotificationActionTypes {
  return {
    type: SELECT_NOTIFICATION,
    data
  };
}

/**
 * Load the notifications, this action starts the request saga
 * @param  {number} page The page number
 * @return {object} An action object with a type of LOAD_NOTIFICATIONS
 */
export function loadNotifications(page: number): NotificationActionTypes {
  return {
    type: LOAD_NOTIFICATIONS,
    page
  };
}

/**
 * Dispatched when the notifications are loaded by the request saga
 *
 * @param  {array} repos The notification data
 *
 * @return {object}      An action object with a type of LOAD_NOTIFICATIONS_SUCCESS passing the repos
 */
export function notificationsLoaded(
  data: Array<NotificationType>
): NotificationActionTypes {
  return {
    type: LOAD_NOTIFICATIONS_SUCCESS,
    data
  };
}

/**
 * Dispatched when loading the notification fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_NOTIFICATIONS_ERROR passing the error
 */
export function notificationLoadingError(
  error: string
): NotificationActionTypes {
  return {
    type: LOAD_NOTIFICATIONS_ERROR,
    error
  };
}

/**
 * Delete the notifications, this action starts the request saga
 * @param  {number} notification_id The notification id to delete
 * @return {object} An action object with a type of DELETE_NOTIFICATION
 */
export function deleteNotification(
  notification_id: number
): NotificationActionTypes {
  return {
    type: DELETE_NOTIFICATION,
    notification_id
  };
}

/**
 * Dispatched when the notifications are deleted by the request saga
 *
 * @param  {number} notification_id The notification id to delete
 *
 * @return {object}      An action object with a type of DELETE_NOTIFICATION_SUCCESS passing the repos
 */
export function deleteNotificationSuccess(
  notification_id: number
): NotificationActionTypes {
  return {
    type: DELETE_NOTIFICATION_SUCCESS,
    notification_id
  };
}

/**
 * Dispatched when delete the notification fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of DELETE_NOTIFICATION_ERROR passing the error
 */
export function deleteNotificationError(
  error: string
): NotificationActionTypes {
  return {
    type: DELETE_NOTIFICATION_ERROR,
    error
  };
}
