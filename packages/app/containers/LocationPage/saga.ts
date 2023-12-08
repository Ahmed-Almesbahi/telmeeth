import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import {
  LOAD_LOCATION,
  loadLocationError,
  loadLocationSuccess,
  UPDATE_LOCATION,
  updateLocationError,
  updateLocationSuccess,
  SUGGEST_LOCATION,
  suggestLocationSuccess
} from './ducks';
import API from '../../utils/api';
import { showSnackbar } from '../Snackbar/ducks';
import * as NavigationService from '../../NavigationService';
import { ROUTE_RANGE, ROUTE_SETTINGS } from '../../Router';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';
import { validateSettings } from '../DrawerPage/ducks';

/**
 * Load location saga
 */
export function* rootLocationSaga() {
  while (true) {
    yield take(LOAD_LOCATION);
    try {
      const response = yield call(API.getUserLocation);
      if (response && response.status === true) {
        yield put(loadLocationSuccess(response.data));
      }
    } catch (error) {
      yield put(loadLocationError(error.message));
    }
  }
}

/**
 * Update location saga
 */
export function* updateLocationSaga() {
  while (true) {
    const { data } = yield take(UPDATE_LOCATION);
    const userType = yield select(makeSelectUserType());
    try {
      const response = yield call(API.saveUserLocation, data);
      if (response && response.status === true) {
        yield put(showSnackbar(response.message));
        yield put(updateLocationSuccess());
        yield put(validateSettings());
        if (userType === TEACHER_TYPE) {
          yield call(NavigationService.navigate, 'Range');
        } else {
          NavigationService.navigate('Settings');
        }
      }
    } catch (error) {
      yield put(showSnackbar(error.message));
      yield put(updateLocationError(error.message));
    }
  }
}

/**
 * Suggest locations saga
 */
export function* suggestLocationSaga(action: any) {
  // while (true) {
  // console.log('run');
  //   const { text } = yield take(SUGGEST_LOCATION);
  const { text } = action;
  if (text.length <= 4) {
    return;
  }
  //try {
  const response = yield API.getSuggestLocations(text);
  // const response = yield call(API.getSuggestLocations, text);
  // console.log('ress', response.data.predictions);
  if (response && response.status === true) {
    // yield put(showSnackbar(response.message));
    yield put(suggestLocationSuccess(response.data.predictions));
  }
  //} catch (error) {
  // yield put(showSnackbar(error.message));
  // yield put(updateLocationError(error.message));
  //}
  // console.log('done');
  // }
}

// Individual exports for testing
export default function* LocationPageSaga() {
  yield fork(rootLocationSaga);
  yield fork(updateLocationSaga);
  // yield fork(suggestLocationSaga);
  // TODO : only take latest is not working as expected
  yield takeLatest(SUGGEST_LOCATION, suggestLocationSaga);
}

//signup/get-location
//{"status":true,"message":"listed successfully","data":{"user_location_id":3,"user_id":365,"address":"Al Zahrah,Medina 42335,Saudi Arabia","country_name":"Saudi Arabia","city":"Medina","postal_code":42335,"latitude":24.524654199999997,"longitude":39.5691841,"user_km_range":15,"gender":"male"}}

//signup/user-location
//postal_code=34517&address=P%C4%B1nar%2C%201503.%20Sk.%2C%2034517%20Esenyurt%2F%C4%B0stanbul%2C%20Turkey&country_name=Turkey&latitude=41.034317699999995&longitude=28.661480899999997
//{"status":true,"message":"Record updated successfully"}

//https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Eseny&types=establishment&location=37.76999,-122.44696&radius=500&key=GOOGLE_MAP_KEY&language=en
//const response = await instance.get(`${url}`, params);
