import { fork, all, put, select } from 'redux-saga/effects';
import sagaLoginPage from '../containers/LoginPage/saga';
import sagaHomeStudentPage from '../containers/HomeStudentPage/saga';
import sagaSingleInvoicePage from '../containers/SingleInvoicePage/saga';
import sagaDrawerPage from '../containers/DrawerPage/saga';
// import sagaSchedulePage from 'containers/SchedulePage/saga';
import _map from 'lodash/map';

const combinedSagas: any = {
  sagaLoginPage,
  sagaHomeStudentPage,
  sagaSingleInvoicePage,
  sagaDrawerPage
  // sagaSchedulePage
};

export default function* rootSaga() {
  yield all(_map(Object.keys(combinedSagas), key => fork(combinedSagas[key])));
  //   yield all(_map(combinedSagas, fork));
}
