import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStatePushNotificationType,
  PushNotificationActionTypes
} from './types';

/*
 *
 * PushNotification constants
 *
 */
export const DEFAULT_ACTION = 'app/PushNotification/DEFAULT_ACTION';

/*
 *
 * PushNotification reducer
 *
 */
export const initialState: initialStatePushNotificationType = {
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: PushNotificationActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

/**
 * Direct selector to the pushNotification state domain
 */
const selectPushNotificationDomain = (state: any) =>
  state.pushNotification || initialState;

/**
 * Default selector used by PushNotification
 */
export const makeSelectPushNotification = () =>
  createSelector(
    selectPushNotificationDomain,
    substate => substate
  );

/*
 *
 * PushNotification actions
 *
 */
export function defaultAction(): PushNotificationActionTypes {
  return {
    type: DEFAULT_ACTION
  };
}
