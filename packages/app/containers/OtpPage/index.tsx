/**
 *
 * OtpPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, Animated, Linking, KeyboardAvoidingView } from 'react-native';
import { useInjectSaga } from '../../utils/injectSaga';

// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { connect } from 'react-redux';
import { verifyOtp } from './actions';
import { makeSelectUserType } from '../User/ducks';
import { makeSelectLocale } from '../LanguagePage/ducks';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import sagaLogin from '../LoginPage/saga'; // we need it for resend code again
import { loginRequest } from '../LoginPage/ducks';
import { Platform } from '../../components/Platform';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Formik } from 'formik';
import * as yup from 'yup';

import LauncherBackground from '../../components/LauncherBackground';
import { Helmet } from '../../components/Helmet';
import { Appbar } from 'react-native-paper';
import { Text, Button, H2, H1, Icon } from '../../components';
import Form from './form';

import styles from './styles';
// must import even if not used , just to load icon for web
import {
  MaterialIcons,
  MaterialCommunityIcons
} from '../../components/Icon/index';
import { TEACHER_TYPE } from '../../utils/constants';
import {
  ROUTE_HOME_TEACHER,
  ROUTE_HOME_STUDENT,
  ROUTE_LOGIN
} from '../../Router';
import { makeSelectUser } from '../User/ducks';
import { LanguageOption } from '../LanguagePage/types';
import { initialStateUserType } from '../User/types';
import { NavigationStackProp } from 'react-navigation-stack';

interface OtpPageProps {
  intl: any;
  type: number;
  language: LanguageOption;
  navigation: NavigationStackProp;
  user: initialStateUserType;
  onSubmit: any;
  resendOtp: any;
}

export const OtpPage: React.SFC<OtpPageProps> = props => {
  const initialState = {
    anim: new Animated.Value(0),
    value: {
      mobile: ''
    },
    errorMessages: []
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    Animated.timing(state.anim, { toValue: 3000, duration: 3000 }).start();
  }, []);
  useInjectSaga({ key: 'OtpPage', saga });
  // useInjectSaga({ key: "loginPage", sagaLogin });

  const otpFormSchema = yup.object().shape({
    passCode1: yup
      .number()
      .required(props.intl.formatMessage(messages.enterCode)),
    passCode2: yup
      .number()
      .required(props.intl.formatMessage(messages.enterCode)),
    passCode3: yup
      .number()
      .required(props.intl.formatMessage(messages.enterCode)),
    passCode4: yup
      .number()
      .required(props.intl.formatMessage(messages.enterCode))
  });

  const fadeIn = (delay: number, from = 0) => {
    const { anim } = state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  };

  return (
    <LauncherBackground type={props.type} language={props.language}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' enabled>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Helmet titleTemplate='Login' defaultTitle='Description of OtpPage' />
        <Appbar.Header style={{ backgroundColor: 'transparent', elevation: 0 }}>
          <Appbar.BackAction
            onPress={() => {
              props.navigation.goBack();
            }}
            color='white'
          />
        </Appbar.Header>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons
                name='cellphone-key'
                size={60}
                style={{ marginTop: 20 }}
                color='white'
              />
              <H1 light style={{ marginVertical: 20 }}>
                <FormattedMessage {...messages.EnterOTP} />
              </H1>
              <Text light>
                <FormattedMessage {...messages.geSMS} />
              </Text>
              <View style={[styles.flexDirectionRow, { marginVertical: 20 }]}>
                <Button
                  style={{ width: '100%' }}
                  contentStyle={{
                    width: '100%'
                  }}
                  mode='text'
                  onPress={() => props.navigation.goBack()}
                >
                  <H1 light>966-{props.user.mobile_no}</H1>{' '}
                  <MaterialCommunityIcons
                    name='pencil'
                    size={20}
                    color='white'
                  />
                </Button>
              </View>
            </View>

            <View style={styles.formContainer}>
              <Formik
                initialValues={{
                  passCode1: '',
                  passCode2: '',
                  passCode3: '',
                  passCode4: ''
                }}
                validationSchema={otpFormSchema}
                render={p => (
                  <Form
                    {...p}
                    language={props.language}
                    resendOtp={(values: any, actions: any) =>
                      props.resendOtp({ mobile: props.user.mobile_no }, actions)
                    }
                  />
                )}
                onSubmit={props.onSubmit}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LauncherBackground>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  user: makeSelectUser(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    onSubmit: (values: any, actions: any) =>
      dispatch(verifyOtp({ values, actions })),
    resendOtp: (values: any, actions: any) =>
      dispatch(loginRequest({ values, actions }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(OtpPage);
