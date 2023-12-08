import { fork, take, call, put } from 'redux-saga/effects';
import { LOAD_INVITES, invitesLoaded, inviteLoadingError } from './ducks';
import API from '../../utils/api';

/**
 * Load invites saga
 */
export function* loadInvitesSaga() {
  while (true) {
    yield take(LOAD_INVITES);
    try {
      const response = yield call(API.getInvitations);
      if (response && response.status === true) {
        yield put(invitesLoaded(response.data));
      }
    } catch (error) {
      yield put(inviteLoadingError(error.message));
    }
  }
}

export default function* inviteSaga() {
  yield fork(loadInvitesSaga);
}
