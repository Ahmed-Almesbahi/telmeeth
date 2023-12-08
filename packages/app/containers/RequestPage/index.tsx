/**
 *
 * RequestPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from '../../components/Helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
// import { useInjectReducer } from "../../utils/injectReducer";
// import makeSelectRequestPage from "./selectors";
import saga from './saga';
import messages from './messages';

import { Appbar, Button } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import CircularProgress from '../../components/CircularProgress';
import { Small } from '../../components';
import {
  makeSelectRequestPage,
  timeDifferenceLoad,
  acceptLesson
} from './ducks';
import { RequestPageProps } from './types';
import { ROUTE_HOME_TEACHER } from '../../Router';
import _delay from 'lodash/delay';
import { setDrawerTab } from '../DrawerPage/ducks';
import moment from 'moment-timezone';
import { makeSelectNotifications } from '../NotificationPage/ducks';
import Sound from '../../components/Sound';
import { Platform } from '../../components/Platform';

const _Sound: any =
  Platform.OS == 'web'
    ? new Sound(require('../../images/timersound.wav'))
    : new Sound('timersound.wav', Sound.MAIN_BUNDLE);

const RequestPage: React.SFC<RequestPageProps> = props => {
  const [countdown, setCountdown] = useState(100);
  // useInjectReducer({ key: 'requestPage', reducer });
  useInjectSaga({ key: 'requestPage', saga });

  if (Platform.OS == 'web') {
    React.useEffect(() => {
      if (_Sound.sound.state() === 'loaded') {
        // _Sound.sound.play();
        // console.log('x', _x.sound.state());
        _Sound.play();
      }
      return () => _Sound.stop();
    }, [_Sound.sound.state()]);
  } else {
    React.useEffect(() => {
      _Sound.play((success: boolean) => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });

      return () => _Sound.stop();
    }, []);
  }

  useEffect(() => {
    const currentDate = new Date();

    // TODO: time must match mysql timezone
    props.timeDifferenceLoad(
      // encodeURI(
      moment()
        .tz('UTC')
        .format('YYYY-MM-DD HH:mm:ss'),
      // )
      parseFloat(props.match.params.id)
    );
  }, []);

  useEffect(() => {
    // console.log('p', props.request.time_diff);
    if (props.request.time_diff > 0) {
      const interval = setInterval(() => {
        setCountdown(countdown => {
          // initial
          if (countdown === 100) {
            return props.request.time_diff;
          }
          if (countdown === 1) {
            clearInterval(interval);
            redirectoToHome();
            return 0;
          }
          return countdown - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    _delay(function() {
      if (props.request.time_diff === 0) {
        redirectoToHome();
      }
    }, 5000);
  }, [props.request.time_diff]);

  const redirectoToHome = () => {
    props.setTab(ROUTE_HOME_TEACHER);
    props.navigation.navigate('HomeTeacher');
  };

  // const openDrawer: any = React.useContext(DrawerContext);

  // console.log('countdown', props.notification.selected);
  // return null;
  return (
    <View style={styles.container}>
      <Helmet titleTemplate='REQUEST' defaultTitle='Description of REQUEST' />
      <Appbar.Header>
        <Appbar.Action
          icon='menu'
          onPress={() => props.navigation.openDrawer()}
          color='white'
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.request} />}
          color='white'
        />
        <Appbar.Action
          color='white'
          icon='close'
          onPress={() => {
            props.setTab(ROUTE_HOME_TEACHER);
            props.navigation.navigate('HomeTeacher');
          }}
        />
      </Appbar.Header>
      <View style={styles.bodyContainer}>
        {props.request.time_diff === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text style={{ textAlign: 'center' }}>
              <FormattedMessage {...messages.youCanAccpet} />
            </Text>
          </View>
        ) : (
          <>
            <View style={{ marginBottom: 100 }}>
              <FormattedMessage {...messages.requesting} />
            </View>
            <CircularProgress
              percent={countdown}
              radius={80}
              bgRingWidth={5}
              progressRingWidth={5}
              ringColor='#7EDC55'
              ringBgColor='#EDEDED'
              //  textFontSize: 40,
              //  textFontWeight: "bold",
              //  clockwise: true,
              //  bgColor: "white",
              //  startDegrees: 0
            >
              <Button
                onPress={() => {
                  props.acceptLesson({
                    notification_id:
                      props.notification.selected.notification_id,
                    is_teacher_home:
                      props.notification.selected.message.student_request_lesson
                        .is_teacher_home,
                    is_student_home:
                      props.notification.selected.message.student_request_lesson
                        .is_student_home,
                    item_id:
                      props.notification.selected.message.student_request_lesson
                        .item_id,
                    student_count:
                      props.notification.selected.message.student_request_lesson
                        .student_count,
                    student_id:
                      props.notification.selected.message.student_request_lesson
                        .student_id
                  });
                }}
              >
                <Small>
                  <FormattedMessage {...messages.tapToAccept} />
                </Small>
              </Button>
            </CircularProgress>
          </>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  request: makeSelectRequestPage(),
  notification: makeSelectNotifications()
});

function mapDispatchToProps(dispatch: any) {
  return {
    setTab: (page: string) => dispatch(setDrawerTab(page)),
    acceptLesson: (data: any) => dispatch(acceptLesson(data)),
    timeDifferenceLoad: (datetime: any, notification_id: number) =>
      dispatch(timeDifferenceLoad(datetime, notification_id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(RequestPage);
