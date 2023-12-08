import { Platform } from '../components/Platform';
import { I18nManager } from 'react-native';

export const VERSION = '1';
export const API_VERSION = 'v1';
export const GOOGLE_MAP_KEY = 'AIzaSyC0GVIt3YsDM5u6uZudr18rSulVLYFEnzA';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const FONT = I18nManager.isRTL
  ? Platform.OS == 'ios'
    ? 'Tajawal'
    : 'Tajawal-Regular'
  : 'Tajawal';
// export const FONT = 'Helvetica';

let tmp_url;
export const REACT_DEBUG = __DEV__;
if (Platform.OS === 'web') {
  tmp_url = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'https://api2.telmeeth.com/v1';
} else {
  tmp_url = REACT_DEBUG
    ? 'http://192.168.88.17:8000/v1'
    : 'http://192.168.88.17:8000/v1';
  // : 'https://api2.telmeeth.com/v1';
}

// export const API_URL = 'http://api.telmeeth.test/v1';
// console.log('xxxx', __DEV__);
// export const API_URL = REACT_DEBUG
//   ? process.env.REACT_APP_API_URL
//     ? process.env.REACT_APP_API_URL
//     : 'http://api.telmeeth.test/v1'
//   : process.env.REACT_APP_API_URL
//   ? process.env.REACT_APP_API_URL
//   : 'https://api2.telmeeth.com/v1';
export const API_URL = tmp_url;

console.log('URL', API_URL);

export const UPLOAD_URL = REACT_DEBUG
  ? process.env.REACT_APP_UPLOAD_URL
    ? process.env.REACT_APP_UPLOAD_URL
    : 'http://api.telmeeth.test/uploads'
  : process.env.REACT_APP_UPLOAD_URL
  ? process.env.REACT_APP_UPLOAD_URL
  : 'https://api2.telmeeth.com/uploads';

export const DEFAULT_MAP_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export const TEACHER_TYPE = 1;
export const STUDENT_TYPE = 2;
export const ADMIN_TYPE = 3;
export const GRAY_BACKGROUND = '#efefef';
export const GRAY_TEXT = '#b5b5b7';

export const NOTIFICATION_TYPE_REQUEST_TEACHER = 1;
export const NOTIFICATION_TYPE_CANCEL_REQUEST = 2;
export const NOTIFICATION_TYPE_BOOKED_REQUEST = 4;
export const NOTIFICATION_TYPE_SETTING = 8;
export const NOTIFICATION_TYPE_PAYMENT = 6;
export const NOTIFICATION_TYPE_ONMYWAY = 9;
