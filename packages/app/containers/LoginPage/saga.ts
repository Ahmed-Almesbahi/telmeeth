import { call, put, select, fork, take } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './ducks';
import { makeSelectUserType } from '../User/ducks';
import { _post } from '../../utils/request';
import API from '../../utils/api';
import { ROUTE_OTP } from '../../Router';
import { SET_OTP } from '../User/ducks';
import { API_VERSION } from '../../utils/constants';
// import DeviceInfo from 'react-native-device-info';
// import { Platform } from 'react-native';
import { makeSelectDeviceDetail } from '../DeviceDetail/ducks';
import * as NavigationService from '../../NavigationService';

/**
 * Effect to handle authorization
 * @param  {number} mobile               The mobile of the user
 * @param  {number} user_type            The tyoe of the user, Teacher or student
 */
export function* authorize({ mobile, user_type }: any, actions: any) {
  // We send an action that tells Redux we're sending a request
  // yield put({ type: LOGIN_SENDING_REQUEST, loading: true });

  // We then try to register or log in the user, depending on the request
  try {
    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous. Because we're using generators, we can work
    // as if it's synchronous because we pause execution until the call is done
    // with `yield`!

    const deviceDetails = yield select(makeSelectDeviceDetail());

    const response = yield call(API.sendOtp, {
      ...deviceDetails,
      // "user_id": 4216,
      country_code_id: 2,
      mobile_no: mobile,
      user_type: user_type
    });

    return response;
  } catch (error) {
    // If we get an error we send Redux the appropiate action and return
    // yield put({ type: LOGIN_REQUEST_ERROR, error: error.message });
    yield call(actions.setErrors, { mobile: error.message });
    yield call(actions.setSubmitting, false);

    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({ type: LOGIN_SENDING_REQUEST, loading: false });
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    // eslint-disable-line no-constant-condition
    // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
    // Our LOGIN_REQUEST action passes along the form values as the payload and form actions as
    // meta data. This allows us to not only use the values to do whatever API calls and such
    // we need, but also to maintain control flow here in our saga.
    const { payload: values, meta: actions } = yield take(LOGIN_REQUEST);

    const user_type = yield select(makeSelectUserType());

    const response = yield call(
      authorize,
      { mobile: values.mobile, user_type },
      actions
    );

    if (response && response.status === true) {
      // ...we send Redux appropiate actions
      yield put({
        type: SET_OTP,
        payload: { ...response.data, mobile_no: values.mobile }
      }); // User is logged in (authorized)
      // yield put(push(ROUTE_OTP)); // Go to Otp page
      NavigationService.navigate('Otp');
    }
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function* root() {
  yield fork(loginFlow);
}
