/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import { View, Linking, KeyboardAvoidingView } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { loginRequest } from './ducks';
import { makeSelectUserType } from '../User/ducks';
import { makeSelectLocale } from '../LanguagePage/ducks';
import { createStructuredSelector } from 'reselect';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Formik } from 'formik';
import * as yup from 'yup';

import LauncherBackground from '../../components/LauncherBackground';
import { Helmet } from '../../components/Helmet';
import { Appbar } from 'react-native-paper';
import Text from '../../components/Text';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import InnerLoginForm from './form';

import styles from './styles';
// must import even if not used , just to load icon for web
import { ROUTE_LAUNCHER } from '../../Router';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

interface LoginPageProps {
  intl: any;
  language: LanguageOption;
  type: number;
  navigation: NavigationStackProp;
  onSubmit: any;
}

export const LoginPage: React.SFC<LoginPageProps> = props => {
  const intl = props.intl;
  const loginFormSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(/^[5]\d{8}$/, intl.formatMessage(messages.betweenDigits))
      .required()
  });

  const openTermsLink = () => {
    const registerUrl =
      props.language == 'ar'
        ? 'https://www.telmeeth.com/ar/terms-and-conditions/'
        : 'https://www.telmeeth.com/terms-and-conditions/';
    Linking.canOpenURL(registerUrl).then(supported => {
      if (supported) {
        Linking.openURL(registerUrl);
      } else {
        console.log(`Don't know how to open URI: ${registerUrl}`);
      }
    });
  };

  return (
    <LauncherBackground type={props.type} language={props.language}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <Helmet titleTemplate='Login' defaultTitle='Description of LoginPage' />
        <Appbar.Header style={{ backgroundColor: 'transparent', elevation: 0 }}>
          <Appbar.BackAction
            onPress={() => {
              props.navigation.popToTop();
            }}
            color='white'
          />
        </Appbar.Header>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
              <Logo type={props.type} />
            </View>

            <View style={styles.formContainer}>
              <Formik
                initialValues={{ mobile: '' }}
                validationSchema={loginFormSchema}
                render={p => <InnerLoginForm {...p} intl={props.intl} />}
                onSubmit={props.onSubmit}
              />
            </View>

            <View style={styles.termsContainer}>
              <Text light>
                <FormattedMessage {...messages.terms} />
              </Text>
              <Button
                onPress={openTermsLink}
                mode='text'
                contentStyle={{ width: 300 }}
              >
                <FormattedMessage {...messages.termsLink} />
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LauncherBackground>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    onSubmit: (values: any, actions: any) =>
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
)(LoginPage);
