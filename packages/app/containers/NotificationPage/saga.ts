import { fork, take, call, put } from 'redux-saga/effects';
import {
  LOAD_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  notificationsLoaded,
  notificationLoadingError,
  deleteNotificationSuccess,
  deleteNotificationError
} from './ducks';
import API from '../../utils/api';

/**
 * Load notifications saga
 */
export function* loadNotificationsSaga() {
  while (true) {
    const { page } = yield take(LOAD_NOTIFICATIONS);
    try {
      const response = yield call(API.getNotifications, page, 10);
      if (response && response.status === true) {
        yield put(notificationsLoaded(response.data));
      }
    } catch (error) {
      yield put(notificationLoadingError(error.message));
    }
  }
}

/**
 * delete notifications saga
 */
export function* deleteNotificationSaga() {
  while (true) {
    const { notification_id } = yield take(DELETE_NOTIFICATION);
    try {
      const response = yield call(API.deleteNotification, notification_id);
      if (response && response.status === true) {
        yield put(deleteNotificationSuccess(notification_id));
      }
    } catch (error) {
      yield put(deleteNotificationError(error.message));
    }
  }
}

export default function* notificationSaga() {
  yield fork(loadNotificationsSaga);
  yield fork(deleteNotificationSaga);
}
