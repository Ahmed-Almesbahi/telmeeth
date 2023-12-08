import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateRangePageType,
  RangePageActionTypes,
  RangeDataType
} from './types';

/*
 *
 * RangePage constants
 *
 */
export const LOAD_RANGE = 'app/RangePage/LOAD_RANGE';
export const LOAD_RANGE_SUCCESS = 'app/RangePage/LOAD_RANGE_SUCCESS';
export const LOAD_RANGE_ERROR = 'app/RangePage/LOAD_RANGE_ERROR';
export const UPDATE_RANGE = 'app/RangePage/UPDATE_RANGE';
export const UPDATE_RANGE_SUCCESS = 'app/RangePage/UPDATE_RANGE_SUCCESS';
export const UPDATE_RANGE_ERROR = 'app/RangePage/UPDATE_RANGE_ERROR';
export const UPDATE_RANGE_OPTION = 'app/RangePage/UPDATE_RANGE_OPTION';

/*
 *
 * RangePage reducer
 *
 */
export const initialStateRange: initialStateRangePageType = {
  data: {
    user_location_id: 0,
    user_id: 0,
    address: '',
    country_name: '',
    city: '',
    postal_code: 0,
    latitude: 0,
    longitude: 0,
    user_km_range: 0,
    gender: ''
  },
  error: '',
  loaded: false,
  loading: true
};

export default (state = initialStateRange, action: RangePageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_RANGE:
        draft.loading = true;
        draft.error = '';
        break;
      case LOAD_RANGE_SUCCESS:
        draft.data.user_location_id = action.data.user_location_id
          ? action.data.user_location_id
          : state.data.user_location_id;
        draft.data.user_id = action.data.user_id
          ? action.data.user_id
          : state.data.user_id;
        draft.data.address = action.data.address
          ? action.data.address
          : state.data.address;
        draft.data.country_name = action.data.country_name
          ? action.data.country_name
          : state.data.country_name;
        draft.data.city = action.data.city ? action.data.city : state.data.city;
        draft.data.postal_code = action.data.postal_code
          ? action.data.postal_code
          : state.data.postal_code;
        draft.data.latitude =
          action.data.latitude !== undefined
            ? action.data.latitude
            : state.data.latitude;
        draft.data.longitude =
          action.data.longitude !== undefined
            ? action.data.longitude
            : state.data.longitude;
        draft.data.user_km_range = action.data.user_km_range
          ? action.data.user_km_range
          : state.data.user_km_range;
        draft.data.gender = action.data.gender
          ? action.data.gender
          : state.data.gender;

        draft.loading = false;
        draft.loaded = true;
        break;
      case LOAD_RANGE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case UPDATE_RANGE:
        draft.loading = true;
        draft.error = '';
        break;
      case UPDATE_RANGE_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        break;
      case UPDATE_RANGE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the rangePage state domain
 */
const selectRangePageDomain = (state:any) => state.range || initialStateRange;

/**
 * Default selector used by RangePage
 */
export const makeSelectRangePage = () =>
  createSelector(
    selectRangePageDomain,
    substate => substate
  );

/*
 *
 * RangePage actions
 *
 */
export function loadRange(): RangePageActionTypes {
  return {
    type: LOAD_RANGE
  };
}

/**
 * Dispatch when saga load range success
 *
 * @param {RangeDataType} data
 * @returns {RangePageActionTypes}
 */
export function loadRangeSuccess(data: RangeDataType): RangePageActionTypes {
  return {
    type: LOAD_RANGE_SUCCESS,
    data
  };
}

/**
 * Dispatch when saga load range failed
 *
 * @export
 * @param {string} error
 * @returns {RangePageActionTypes}
 */
export function loadRangeError(error: string): RangePageActionTypes {
  return {
    type: LOAD_RANGE_ERROR,
    error
  };
}

export function updateRange(user_km_range: number): RangePageActionTypes {
  return {
    type: UPDATE_RANGE,
    user_km_range
  };
}

/**
 * Dispatch when saga update range success
 *
 * @returns {RangePageActionTypes}
 */
export function updateRangeSuccess(): RangePageActionTypes {
  return {
    type: UPDATE_RANGE_SUCCESS
  };
}

/**
 * Dispatch when saga update range failed
 *
 * @export
 * @param {string} error
 * @returns {RangePageActionTypes}
 */
export function updateRangeError(error: string): RangePageActionTypes {
  return {
    type: UPDATE_RANGE_ERROR,
    error
  };
}
