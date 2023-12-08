/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

// import globalReducer from './containers/App/reducer';
import languageReducer from './containers/LanguagePage/ducks';
import drawerPageReducer from './containers/DrawerPage/ducks';
import userReducer from './containers/User/ducks';
import invoicesReducer from './containers/InvoicePage/ducks';
import singleInvoicesReducer from './containers/SingleInvoicePage/ducks';
import certificatesReducer from './containers/CertificatePage/ducks';
import invitesReducer from './containers/InvitePage/ducks';
import homeTeacherReducer from './containers/HomeTeacherPage/ducks';
import homeStudentReducer from './containers/HomeStudentPage/ducks';
import preferenceReducer from './containers/PreferencePage/ducks';
import itemReducer from './containers/EducationInformationPage/ducks';
import attachmentsReducer from './containers/AttachmentPage/ducks';
import notificationsReducer from './containers/NotificationPage/ducks';
import profileReducer from './containers/ProfilePage/ducks';
import teachingReducer from './containers/TeachingInformationPage/ducks';
import settingsReducer from './containers/SettingPage/ducks';
import scheduleReducer from './containers/SchedulePage/ducks';
import createScheduleReducer from './containers/CreateSchedulePage/ducks';
import snackbarReducer from './containers/Snackbar/ducks';
import requestReducer from './containers/RequestPage/ducks';
import findWayReducer from './containers/FindWayPage/ducks';
import locationReducer from './containers/LocationPage/ducks';
import rangeReducer from './containers/RangePage/ducks';
import deviceDetailReducer from './containers/DeviceDetail/ducks';
import banksReducer from './containers/SelectPaymentPage/ducks';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // global: globalReducer,
    user: userReducer,
    language: languageReducer,
    drawer: drawerPageReducer,
    attachments: attachmentsReducer,
    invoices: invoicesReducer,
    singleInvoice: singleInvoicesReducer,
    certificates: certificatesReducer,
    notifications: notificationsReducer,
    invites: invitesReducer,
    profile: profileReducer,
    teaching: teachingReducer,
    homeTeacher: homeTeacherReducer,
    homeStudent: homeStudentReducer,
    preference: preferenceReducer,
    settings: settingsReducer,
    items: itemReducer,
    schedules: scheduleReducer,
    createSchedulePage: createScheduleReducer,
    snackbar: snackbarReducer,
    findWay: findWayReducer,
    request: requestReducer,
    location: locationReducer,
    range: rangeReducer,
    banks: banksReducer,
    deviceDetail: deviceDetailReducer,
    ...injectedReducers
  });

  return rootReducer;
}

export type AppState = ReturnType<typeof createReducer>;
