/**
 *
 * LanguagePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import { compose } from 'redux';
// import makeSelectLanguagePage from "./selectors";

import { Helmet } from '../../components/Helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
// import reducer from "./reducer";
import saga from './saga';
import messages from './messages';

import { Appbar, RadioButton, List, Divider } from 'react-native-paper';
import { GlobalStyle, MaterialCommunityIcons } from '../../components';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { ROUTE_SETTINGS } from '../../Router';
import { LanguagePageProps, LanguageOption } from './types';
import { updateLanguage, makeSelectLanguage, makeSelectLocale } from './ducks';
import RNRestart from 'react-native-restart';
import { Platform } from '../../components/Platform';
import { compose } from '../../utils/helper';

const LanguagePage = (props: LanguagePageProps) => {
  const [state, setState] = useState(props.language.rand);
  // useInjectReducer({ key: "languagePage", reducer });
  useInjectSaga({ key: 'languagePage', saga });

  // useEffect(() => {
  //   // if (state !== props.language.locale) {
  //   //   console.log('object', props.language.locale);
  //   // }
  //   console.log(state + '++' + props.language.rand);
  //   if (state !== props.language.rand) {
  //     // if (props.language.local) {
  //     console.log('worked', props.language);
  //     // RNRestart.Restart();
  //     // console.log('object', props.language.locale);
  //   }
  // }, [props.language.rand]);

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='LANGUAGE' defaultTitle='Description of LANGUAGE' />
      <Appbar.Header>
        <Appbar.BackAction
          color='white'
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.language} />}
          color='white'
        />

        {/* <Appbar.Action
          icon="check"
          // icon={p => (
          //   <MaterialCommunityIcons {...p} name="content-save-outline" />
          // )}
          onPress={() => {}}
        /> */}
      </Appbar.Header>
      <View style={styles.bodyContainer}>
        <List.Item
          style={[
            GlobalStyle.marginBottom10,
            {
              backgroundColor: 'white'
            }
          ]}
          title='English'
          onPress={() => {
            props.dispatch(updateLanguage(LanguageOption.English));

            // if (Platform.OS !== 'web') {
            //   setTimeout(() => {
            //     RNRestart.Restart();
            //   }, 200);
            // }
          }}
          right={() => (
            <RadioButton
              value='first'
              status={
                props.language.locale === LanguageOption.English
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                props.dispatch(updateLanguage(LanguageOption.English));
                // if (Platform.OS !== 'web') {
                //   setTimeout(() => {
                //     RNRestart.Restart();
                //   }, 200);
                // }
              }}
            />
          )}
        />
        <Divider />
        <List.Item
          style={[GlobalStyle.marginBottom10, { backgroundColor: 'white' }]}
          title='عربي'
          onPress={() => {
            props.dispatch(updateLanguage(LanguageOption.Arabic));
            // if (Platform.OS !== 'web') {
            //   setTimeout(() => {
            //     RNRestart.Restart();
            //   }, 500);
            // }
          }}
          right={() => (
            <RadioButton
              value='first'
              status={
                props.language.locale === LanguageOption.Arabic
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => {
                props.dispatch(updateLanguage(LanguageOption.Arabic));
                // if (Platform.OS !== 'web') {
                //   setTimeout(() => {
                //     RNRestart.Restart();
                //   }, 500);
                // }
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage(),
  local: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    // updateLanguauge2: lang => dispatch(updateLanguage(lang)),
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(LanguagePage);
