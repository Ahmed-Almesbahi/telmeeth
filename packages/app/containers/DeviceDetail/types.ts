import { SET_DEVICE_DETAIL_OPTION } from './ducks';

export interface DeviceDetailProps {}

export interface initialStateDeviceDetailType {
  // device_id: number;
  // user_id: number;
  api_version: string; // 1.0 | v1
  app_version_code: number; // 1 | 2 | 5
  device_name: string; // Samsung | iPhone
  device_version: string; // 12.1.3 |Android SDK built for x86 | SM-J500F
  device_token: string; // B737D98E-CD16-4A39-A15F-6222F5138811
  device_type: string; // IOS | Android | Web
  fcm_id: string; // dxp0FQoTwz4:APA91bGVubr-idyqAVfTsBMUxZ0CsqKGV1PbkVimOrkuIrlEaguiduFNYwc4kzAVFdoLA5lp0HBBTsnr1cV6trdxIkv3qkyfwRcBc3YuqTeFck84Tpxc26h22aH4pW63f4-PwdqcVYDh
  // lang: string; // en | en

  // extra
  // loading: boolean;
  // loaded: boolean;
  // error: string;
}

export interface setDeviceDetailOptionAction {
  type: typeof SET_DEVICE_DETAIL_OPTION;
  key: string;
  value: string;
}

export type DeviceDetailActionTypes = setDeviceDetailOptionAction;
