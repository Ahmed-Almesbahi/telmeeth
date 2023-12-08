import { fork, take, call, put } from 'redux-saga/effects';
import {
  UPDATE_LANGUAGE,
  languageUpdated,
  languageUpdatingError
} from './ducks';
import API from '../../utils/api';

/**
 * Update language saga
 */
export function* updateLanguageSaga() {
  while (true) {
    console.log('should it');
    const { lang } = yield take(UPDATE_LANGUAGE);
    console.log('got it');
    try {
      const response = yield call(API.changeLanguage, lang);
      console.log('res', response);
      if (response && response.status === true) {
        yield put(languageUpdated(lang));
      }
    } catch (error) {
      yield put(languageUpdatingError(error.message));
    }
  }
}

export default function* languageSaga() {
  yield fork(updateLanguageSaga);
}
