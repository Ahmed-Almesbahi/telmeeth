import { createSelector } from 'reselect';
import produce from 'immer';
import { initialStateDeviceDetailType, DeviceDetailActionTypes } from './types';
import DeviceInfo from 'react-native-device-info';
// import { Platform } from 'react-native';

import { Platform } from '../../components/Platform';
import { API_VERSION } from '../../utils/constants';

// console.log('Platform', Platform);
/*
 *
 * DeviceDetail constants
 *
 */
export const SET_DEVICE_DETAIL_OPTION =
  'app/DeviceDetail/SET_DEVICE_DETAIL_OPTION';

/*
 *
 * DeviceDetail reducer
 *
 */
export const initialState: initialStateDeviceDetailType = {
  // device_id: 0,
  // user_id: 0,
  api_version: '',
  app_version_code: 0,
  device_name: '',
  device_version: '',
  device_token: '',
  device_type: '',
  fcm_id: ''
  // lang: 'en',

  // error: '',
  // loaded: false,
  // loading: false
};

export default (
  state = initialState,
  action: DeviceDetailActionTypes
): initialStateDeviceDetailType =>
  produce(state, (draft: initialStateDeviceDetailType | any) => {
    switch (action.type) {
      case SET_DEVICE_DETAIL_OPTION:
        draft[action.key] = action.value;

        draft.device_type = Platform.realOS;
        draft.device_name = DeviceInfo.getUserAgent()
          ? DeviceInfo.getUserAgent()
          : DeviceInfo.getDeviceName();
        draft.device_version = DeviceInfo.getReadableVersion();
        // draft.api_version = DeviceInfo.getVersion();
        draft.api_version = API_VERSION;
        draft.device_token = 'DO NOT EXISTS';
        draft.app_version_code = 1; // what else I can do
        //
        // device_type: Platform.OS,
        break;
    }
  });

/**
 * Direct selector to the deviceDetail state domain
 */
const selectDeviceDetailDomain = (state: any) =>
  state.deviceDetail || initialState;

/**
 * Default selector used by DeviceDetail
 */
export const makeSelectDeviceDetail = () =>
  createSelector(
    selectDeviceDetailDomain,
    substate => substate
  );

/*
 *
 * DeviceDetail actions
 *
 */
export function setDeviceDetailOption(
  key: string,
  value: any
): DeviceDetailActionTypes {
  return {
    type: SET_DEVICE_DETAIL_OPTION,
    key,
    value
  };
}
