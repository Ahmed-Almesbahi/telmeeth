/**
 *
 * PushNotification
 *
 */

import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

// import { compose } from 'redux';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, { makeSelectPushNotification } from './ducks';
import { PushNotificationProps, ReceivedNotificationData } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import firebase, { messaging } from '../../utils/init-fcm';

import styles from './styles';
import { showSnackbar } from '../Snackbar/ducks';
import { setDeviceDetailOption } from '../DeviceDetail/ducks';
import {
  ROUTE_REQUEST,
  ROUTE_HOME_TEACHER,
  ROUTE_SINGLE_INVOICE
} from '../../Router';
import { selectNotification } from '../NotificationPage/ducks';
import Sound from '../../components/Sound';
import { Platform } from '../../components/Platform';
import { setHomeStudentOption } from '../HomeStudentPage/ducks';
import { loadLessonDetails } from '../SingleInvoicePage/ducks';
import { compose } from '../../utils/helper';

const _Sound =
  Platform.OS == 'web'
    ? new Sound(require('../../images/notificationsound.wav'))
    : new Sound('notificationsound.wav', Sound.MAIN_BUNDLE);

const PushNotification: React.SFC<PushNotificationProps> = props => {
  // useInjectReducer({ key: 'pushNotification', reducer });
  //   useInjectSaga({ key: 'pushNotification', saga });

  const handleReceivedMessage = (payload: any) => {
    console.log('payload', payload);
    const data = extractData(payload);
    console.log('data', data);

    if (data && data.title) {
      // if (data.description) {
      _Sound.play();
      props.showSnackbar(data.title);
    }

    if (data && data.urlImageString) {
      if (data.urlImageString != '') {
        console.log('what is sendNotification?');
        // new sendNotification(data, pref).execute(
        // 	data.urlImageString
        // );
      } else {
        checkNotificationType(null, data, null, true);
      }
    } else {
      console.log('start checkNotificationType');
      checkNotificationType(null, data, null, true);
    }
  };

  useEffect(() => {
    let removeonMessage: any,
      removeNotificationDisplayedListener: any,
      removeNotificationListener: any,
      removeNotificationOpenedListener: any;
    if (messaging !== undefined) {
      // request permission for notification
      messaging
        .requestPermission()
        .then(async function() {
          const fcm_id = await messaging.getToken();
          console.log('fcm_id', fcm_id);
          props.setDeviceDetailOption('fcm_id', fcm_id);
        })
        .catch(function(err: any) {
          props.showSnackbar('Please enable notificaiton permission.');
          console.log('Unable to get permission to notify.', err);
        });

      //   navigator.serviceWorker.addEventListener('message', message =>
      //     console.log(message)
      //   );

      removeonMessage = messaging.onMessage((payload: any) => {
        handleReceivedMessage(payload);
      });

      if (Platform.OS !== 'web') {
        removeNotificationDisplayedListener = firebase
          .notifications()
          .onNotificationDisplayed((notification: any) => {
            console.log('onNotificationDisplayed', notification);
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
          });
        removeNotificationListener = firebase
          .notifications()
          .onNotification((notification: any) => {
            console.log('onNotification', notification);
            handleReceivedMessage(notification);
            // Process your notification as required
          });
        removeNotificationOpenedListener = firebase
          .notifications()
          .onNotificationOpened((notificationOpen: any) => {
            console.log('onNotificationOpened', notificationOpen);
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: any = notificationOpen.notification;
          });

        firebase
          .notifications()
          .getInitialNotification()
          .then((notificationOpen: any) => {
            console.log('getInitialNotification', notificationOpen);
            if (notificationOpen) {
              // App was opened by a notification
              // Get the action triggered by the notification being opened
              const action = notificationOpen.action;
              // Get information about the notification that was opened
              const notification = notificationOpen.notification;
            }
          });
      }
    } else {
      props.showSnackbar(
        'Your browser dose not support notification, Please use Chrome'
      );
    }

    return () => {
      removeonMessage();
      if (Platform.OS !== 'web') {
        removeNotificationDisplayedListener();
        removeNotificationListener();
        removeNotificationOpenedListener();
      }
    };

    // requestPermission(firebase);
  }, []);

  const extractData = (payload: any) => {
    console.log('Message received.', payload);
    let data;
    let extractedData: any = {};
    const commanData = [
      'badge',
      'lesson_date',
      'content_available',
      'description',
      'mutable_content',
      'sound'
    ];

    // if not IOS , then it will match here
    if (payload.data && payload.data.data) {
      data = JSON.parse(payload.data.data);
    }
    // Only for IOS
    else if (payload.notification) {
      for (var property in payload.data) {
        if (payload.data.hasOwnProperty(property)) {
          let newName = property.replace('gcm.notification.', '');
          extractedData[newName] = payload.data[property];

          //the json is ok
          if (IsJsonString(extractedData[newName])) {
            console.log('going to parse', newName);
            extractedData[newName] = JSON.parse(extractedData[newName]);
          }
          // if (
          //   commanData.indexOf(newName) === -1 &&
          //   extractedData[newName] != ''
          // ) {
          //   extractedData[newName] = JSON.parse(extractedData[newName]);
          // }
        }
      }

      data = {
        ...payload.notification,
        description: payload.body,
        ...extractedData
      };
    }
    console.log('Message extracted.', data);
    return data;
  };

  const checkNotificationType = (
    bitmap: any,
    data: ReceivedNotificationData,
    pref: any,
    isDashboard: boolean
  ) => {
    try {
      let title = '',
        description = '';
      // NotificationDataModel notificationDataModel =
      // 		new NotificationDataModel();
      const notificationDataModel = null;
      console.log('check checkNotificationType', data);
      if (data.title) {
        title = data.title;
      }

      if (data.description) {
        description = data.description;
      }

      // Teacher Notificaiton
      if (data.student_cancel_lesson) {
        props.navigation.navigate('HomeTeacher');
      }
      if (data.student_request_lesson) {
        afterAcceptLessonNotification(
          pref,
          data,
          title,
          description,
          bitmap,
          notificationDataModel
        );
      } else if (data.lesson_force_end) {
        afterLessonForceEnd(
          data,
          title,
          description,
          bitmap,
          notificationDataModel
        );
      } else if (data.pending_teacher) {
        afterPendingLesson(title, description, bitmap, notificationDataModel);
      } else if (
        data.student_schedule_booked_lesson ||
        data.student_schedule_canceled_lesson
      ) {
        afterStudentScheduledBookedLesson(
          data,
          title,
          description,
          bitmap,
          notificationDataModel
        );
      }
      // Student Notification
      else if (data.teacher_accept_lesson) {
        navigateAfterAcceptLessonNotification(data);
      } else if (data.on_the_way) {
        console.log('on_the_way');
        // navigateAfterAcceptLessonNotification(data);
      } else if (data.student_last_lesson) {
        console.log('student_last_lesson', data);
        props.loadLessonDetails(data.lesson_id);
        // props.push(ROUTE_SINGLE_INVOICE);
      } else {
        afterOtherNotification(
          isDashboard,
          title,
          description,
          bitmap,
          notificationDataModel
        );
      }
    } catch (e) {
      console.log('PushNotification Error:', e);
    }
  };

  const afterAcceptLessonNotification = (
    pref: any,
    data: ReceivedNotificationData,
    title: string,
    description: string,
    bitmap: any,
    notificationDataModel: any
  ) => {
    const student_request_lesson: any = data.student_request_lesson;
    // we need to save received data to notification store
    props.selectNotification({
      created_at: student_request_lesson.created_at,
      description,
      image_url: '',
      is_previous: false,
      is_read: 0,
      message: {
        title,
        description,
        student_request_lesson
      },
      notification_id: student_request_lesson.notification_id,
      notification_type: '',
      recipient_id: 0,
      title
    });
    // TODO: Need to check this
    // props.push(ROUTE_REQUEST + '/' + student_request_lesson.notification_id);
    props.navigation.push('Request');
  };

  const afterLessonForceEnd = (
    data: ReceivedNotificationData,
    title: string,
    description: string,
    bitmap: any,
    notificationDataModel: any
  ) => {
    const jsonObject = data.lesson_force_end;
    console.log('what to do ?', data);
    // what to do ?
  };

  const afterPendingLesson = (
    title: string,
    description: string,
    bitmap: any,
    notificationDataModel: any
  ) => {
    console.log('what to do ? afterPendingLesson');
    // what to do ?
  };

  const afterStudentScheduledBookedLesson = (
    data: ReceivedNotificationData,
    title: string,
    description: string,
    bitmap: any,
    notificationDataModel: any
  ) => {
    console.log('what to do ?', data);
    props.setHomeStudentOption('bottomTab', 'Search');
    // if (data.has("lesson_date")) {
    // requestNotification(title, description, notificationDataModel, STATE.SCHEDULE_SCREEN, data.getString("lesson_date"), bitmap);
    // }
  };

  const afterOtherNotification = (
    isDashboard: boolean,
    title: string,
    description: string,
    bitmap: any,
    notificationDataModel: any
  ) => {
    // notificationDataModel.setTitle(title);
    // notificationDataModel.setDescription(description);
    // notificationDataModel.setCreatedAt(null);
    // generalNotification(isDashboard, title, description, notificationDataModel, bitmap);
  };

  const navigateAfterAcceptLessonNotification = (
    data: ReceivedNotificationData
  ) => {
    console.log('What to do ?', data);
    props.setHomeStudentOption('bottomTab', 'BookedLessons');
  };

  const IsJsonString = (str: any) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  return <>{props.children}</>;
};

const mapStateToProps = createStructuredSelector({
  pushNotification: makeSelectPushNotification()
});

function mapDispatchToProps(dispatch: any) {
  return {
    setDeviceDetailOption: (key: any, value: any) =>
      dispatch(setDeviceDetailOption(key, value)),
    showSnackbar: (message: string) => dispatch(showSnackbar(message)),
    selectNotification: (data: any) => dispatch(selectNotification(data)),
    loadLessonDetails: (lesson_id: number) =>
      dispatch(loadLessonDetails(lesson_id)),
    setHomeStudentOption: (key: any, value: any) =>
      dispatch(setHomeStudentOption(key, value))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(PushNotification);
