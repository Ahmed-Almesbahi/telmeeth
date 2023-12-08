import React from 'react';
// Common Pages
import LauncherPage from './containers/LauncherPage';
import LoginPage from './containers/LoginPage';
import OtpPage from './containers/OtpPage';
import InvoicePage from './containers/InvoicePage';
import SingleInvoicePage from './containers/SingleInvoicePage';
import NotificationPage from './containers/NotificationPage';
import LanguagePage from './containers/LanguagePage';
import ContactPage from './containers/ContactPage';
import InvitePage from './containers/InvitePage';
import SettingPage from './containers/SettingPage';
import ProfilePage from './containers/ProfilePage';
import ChangeMobilePage from './containers/ChangeMobilePage';
import NotFoundPage from './containers/NotFoundPage';

// Teacher Pages
import HomeTeacherPage from './containers/HomeTeacherPage';
import SelectPaymentPage from './containers/SelectPaymentPage';
import PaymentPage from './containers/PaymentPage';
import SchedulePage from './containers/SchedulePage';
import CreateSchedulePage from './containers/CreateSchedulePage';
import CertificatePage from './containers/CertificatePage';
import TeachingInformationPage from './containers/TeachingInformationPage';
import AttachmentPage from './containers/AttachmentPage';
import PreferencePage from './containers/PreferencePage';
import LocationPage from './containers/LocationPage';
import RangePage from './containers/RangePage';
import RequestPage from './containers/RequestPage';
import EducationInformationPage from './containers/EducationInformationPage';
import FindWayPage from './containers/FindWayPage';

// Student Pages
import HomeStudentPage from './containers/HomeStudentPage';
import { MaterialCommunityIcons } from './components/Icon';
import { createStackNavigator } from 'react-navigation-stack';

export const ROUTE_LAUNCHER = '';
export const ROUTE_LOGIN = 'login';
export const ROUTE_OTP = 'otp';
export const ROUTE_INVOICE = 'invoices';
export const ROUTE_SINGLE_INVOICE = 'invoice';
export const ROUTE_NOTIFICATION = 'notifications';
export const ROUTE_LANGUAGE = 'language';
export const ROUTE_CONTACT = 'contact';
export const ROUTE_INVITE = 'invite';
export const ROUTE_SETTINGS = 'settings';
export const ROUTE_NOT_FOUND = '';
export const ROUTE_HOME_TEACHER = 'home-teacher';
export const ROUTE_SELECT_PAYMENT = 'select-payment';
export const ROUTE_SCHEDULE = 'schedule';
export const ROUTE_CREATE_SCHEDULE = 'create-schedule';
export const ROUTE_CERTIFICATE = 'certificate';
export const ROUTE_TEACHING_INFORMATION = 'teaching-information';
export const ROUTE_ATTACHMENT = 'attachments';
export const ROUTE_PREFERENCE = 'preference';
export const ROUTE_CHANGE_MOBILE = 'change-mobile';
export const ROUTE_LOCATION = 'location';
export const ROUTE_RANGE = 'range';
export const ROUTE_REQUEST = 'request';
export const ROUTE_HOME_STUDENT = 'home-student';
export const ROUTE_PROFILE = 'profile';
export const ROUTE_PAYMENT = 'payment';
export const ROUTE_EDUCATION_INFORMATION = 'education-information';
export const ROUTE_FIND_WAY = 'find-way';

export const DrawerRoutes: any = {
  HomeTeacher: {
    path: ROUTE_HOME_TEACHER,
    screen: createStackNavigator(
      {
        HomeTeacher: { screen: HomeTeacherPage },
        SingleInvoice: {
          path: ROUTE_SINGLE_INVOICE,
          screen: SingleInvoicePage
        },
        FindWay: { path: ROUTE_FIND_WAY, screen: FindWayPage }
      },
      { headerMode: 'none' }
    )
  },
  HomeStudent: {
    path: ROUTE_HOME_STUDENT,

    screen: createStackNavigator(
      {
        HomeStudent: { screen: HomeStudentPage },
        SingleInvoice: {
          path: ROUTE_SINGLE_INVOICE,
          screen: SingleInvoicePage
        },
        FindWay: { path: ROUTE_FIND_WAY, screen: FindWayPage }
      },
      { headerMode: 'none' }
    )
  },
  SelectPayment: {
    path: ROUTE_SELECT_PAYMENT,
    screen: createStackNavigator(
      {
        SelectPayment: SelectPaymentPage,
        Payment: {
          path: ROUTE_PAYMENT + '/:id',
          screen: PaymentPage
          // requiredSignedIn: true
        }
      },
      { headerMode: 'none' }
    )
    // requiredSignedIn: true
  },
  Invoice: {
    path: ROUTE_INVOICE,
    screen: createStackNavigator(
      {
        Invoice: InvoicePage
      },
      { headerMode: 'none' }
    )
    // requiredSignedIn: true
  },
  Schedule: {
    path: ROUTE_SCHEDULE,
    screen: createStackNavigator(
      {
        Schedule: SchedulePage,
        CreateSchedule: {
          path: ROUTE_CREATE_SCHEDULE,
          screen: CreateSchedulePage
          // requiredSignedIn: true
        }
      },
      { headerMode: 'none' }
    )
    // requiredSignedIn: true
  },
  Certificate: {
    path: ROUTE_CERTIFICATE,
    screen: CertificatePage
    // requiredSignedIn: true
  },
  Notification: {
    path: ROUTE_NOTIFICATION,
    screen: createStackNavigator(
      {
        Notification: NotificationPage,
        Request: {
          path: ROUTE_REQUEST + '/:id',
          screen: RequestPage
          // requiredSignedIn: true
        }
      },
      { headerMode: 'none' }
    )
    // requiredSignedIn: true
  },
  Invite: {
    path: ROUTE_INVITE,
    screen: InvitePage
    // requiredSignedIn: true
  },
  Settings: {
    path: ROUTE_SETTINGS,
    screen: createStackNavigator(
      {
        Settings: SettingPage,
        ChangeMobile: {
          path: ROUTE_CHANGE_MOBILE,
          screen: ChangeMobilePage
          // requiredSignedIn: true
        },
        Language: {
          path: ROUTE_LANGUAGE,
          screen: LanguagePage
          // requiredSignedIn: true
        },
        Profile: {
          path: ROUTE_PROFILE,
          screen: ProfilePage
          // requiredSignedIn: true
        },
        Location: {
          path: ROUTE_LOCATION,
          screen: LocationPage
          // requiredSignedIn: true
        },
        Otp: {
          path: ROUTE_OTP,
          screen: OtpPage,
          navigationOptions: {
            // headerTransparent: true
          }
          // requiredSignedIn: false
        },
        Preference: {
          path: ROUTE_PREFERENCE,
          screen: PreferencePage
          // requiredSignedIn: true
        },
        Attachment: {
          path: ROUTE_ATTACHMENT,
          screen: AttachmentPage
          // requiredSignedIn: true
        },
        Range: {
          path: ROUTE_RANGE,
          screen: RangePage
          // requiredSignedIn: true
        },
        TeachingInformation: {
          path: ROUTE_TEACHING_INFORMATION,
          screen: createStackNavigator(
            {
              TeachingInformation: TeachingInformationPage,
              EducationInformation: {
                path: ROUTE_EDUCATION_INFORMATION,
                screen: EducationInformationPage
                // requiredSignedIn: true
              },
              // TODO: need to fix this
              EducationInformationExtra: {
                path: ROUTE_EDUCATION_INFORMATION + '/:id',
                screen: EducationInformationPage
                // requiredSignedIn: true
              }
            },
            { headerMode: 'none' }
          )
          // requiredSignedIn: true
        }
      },
      { headerMode: 'none' }
    )
    // requiredSignedIn: true
  },
  Contact: {
    path: ROUTE_CONTACT,
    screen: createStackNavigator(
      {
        Contact: ContactPage
      },
      { headerMode: 'none' }
    )
    // requiredSignedIn: true
  }
};

export const UnloggedRoutes = {
  Launcher: {
    path: ROUTE_LAUNCHER,
    screen: LauncherPage,
    navigationOptions: {
      header: null
    }
    // requiredSignedIn: false
  },
  Login: {
    path: ROUTE_LOGIN,
    screen: LoginPage,
    navigationOptions: {
      headerTransparent: true,
      headerStyle: { borderBottomWidth: 0 }
      // headerBackgroundTransitionPreset: 'translate',
      // headerStyle: {
      //   backgroundColor: 'transparent'
      // },
    }

    // headerMode: 'uikit',
    // requiredSignedIn: false
  },
  Otp: {
    path: ROUTE_OTP,
    screen: OtpPage,
    navigationOptions: {
      headerTransparent: true
    }
    // requiredSignedIn: false
  },
  NotFound: {
    path: ROUTE_NOT_FOUND,
    screen: NotFoundPage
    // requiredSignedIn: false
  }
};
