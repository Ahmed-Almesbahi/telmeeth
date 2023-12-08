import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateFindWayPageType, FindWayPageActionTypes } from './types';

/*
 *
 * FindWayPage constants
 *
 */
export const ON_MY_WAY = 'app/FindWayPage/ON_MY_WAY';
export const ON_MY_WAY_SUCCESS = 'app/FindWayPage/ON_MY_WAY_SUCCESS';
// export const ON_MY_WAY_ERROR = 'app/FindWayPage/ON_MY_WAY_ERROR';
export const UPDATE_USER_LOCATION = 'app/FindWayPage/UPDATE_USER_LOCATION';
export const UPDATE_USER_LOCATION_SUCCESS =
  'app/FindWayPage/UPDATE_USER_LOCATION_SUCCESS';
export const UPDATE_USER_LOCATION_ERROR =
  'app/FindWayPage/UPDATE_USER_LOCATION_ERROR';

/*
 *
 * FindWayPage reducer
 *
 */
export const initialState: initialStateFindWayPageType = {
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: FindWayPageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case ON_MY_WAY:
        break;
      case ON_MY_WAY_SUCCESS:
        break;
      // case ON_MY_WAY_ERROR:
      //   break;
    }
  });

/**
 * Direct selector to the findWayPage state domain
 */
const selectFindWayPageDomain = (state: any) => state.findWay || initialState;

/**
 * Default selector used by FindWayPage
 */
export const makeSelectFindWayPage = () =>
  createSelector(
    selectFindWayPageDomain,
    substate => substate
  );

/*
 *
 * FindWayPage actions
 *
 */

/**
 *
 *
 * @export
 * @param {number} recipient_id
 * @param {number} lesson_id
 * @returns {FindWayPageActionTypes}
 */
export function updateOnMyWay(
  recipient_id: number,
  lesson_id: number
): FindWayPageActionTypes {
  return {
    type: ON_MY_WAY,
    recipient_id,
    lesson_id
  };
}
export function updateOnMyWaySuccess(data: any): FindWayPageActionTypes {
  return {
    type: ON_MY_WAY_SUCCESS,
    data
  };
}

export function updateUserLocation(
  current_latitude: number,
  current_longitude: number
): FindWayPageActionTypes {
  return {
    type: UPDATE_USER_LOCATION,
    current_latitude,
    current_longitude
  };
}
export function updateUserLocationSuccess(
  current_latitude: number,
  current_longitude: number
): FindWayPageActionTypes {
  return {
    type: UPDATE_USER_LOCATION_SUCCESS,
    current_latitude,
    current_longitude
  };
}
export function updateUserLocationError(
  message: string
): FindWayPageActionTypes {
  return {
    type: UPDATE_USER_LOCATION_ERROR,
    message
  };
}
// export function updateOnMyWayError(error: string): FindWayPageActionTypes {
//   return {
//     type: ON_MY_WAY_ERROR,
//     error
//   };
// }
