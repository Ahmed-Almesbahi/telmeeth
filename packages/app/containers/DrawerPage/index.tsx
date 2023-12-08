import React, { memo, useEffect } from 'react';
import { View, Linking, ScrollView } from 'react-native';
import { Drawer } from 'react-native-paper';
import { Text, H1, Button, MaterialCommunityIcons } from '../../components';
import styles from './styles';
import { TEACHER_TYPE } from '../../utils/constants';
import UserInfo from './userInfo';
import {
  ROUTE_HOME_TEACHER,
  ROUTE_HOME_STUDENT,
  ROUTE_SCHEDULE,
  ROUTE_SELECT_PAYMENT,
  ROUTE_INVOICE,
  ROUTE_NOTIFICATION,
  ROUTE_CERTIFICATE,
  ROUTE_INVITE,
  ROUTE_SETTINGS,
  ROUTE_CONTACT
} from '../../Router';
import { initialStateDrawerType } from './types';
import SafeAreaView from 'react-native-safe-area-view';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  setDrawerTab,
  makeSelectDrawer,
  loadDrawer,
  validateSettings
} from './ducks';

import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserType, makeSelectUser } from '../User/ducks';
import { makeSelectLocale } from '../LanguagePage/ducks';
import { injectIntl } from 'react-intl';
import { compose } from '../../utils/helper';
import { NavigationStackProp } from 'react-navigation-stack';
import { initialStateUserType } from '../User/types';
import * as NavigationService from '../../NavigationService';
import DrawerItem from '../../components/DrawerItem';

export interface DrawerContentProps {
  type: number;
  language: string;
  drawerState: initialStateDrawerType;
  navigation: NavigationStackProp;
  setTab: typeof setDrawerTab;
  closeDrawer: () => void;
  intl: any;
  loadDrawer: typeof loadDrawer;
  validateSettings: typeof validateSettings;
  children: React.ReactNode;
  user: initialStateUserType;
}

const DrawerContent: React.SFC<DrawerContentProps> = props => {
  // useInjectSaga({ key: 'drawerPage', saga });

  useEffect(() => {
    if (props.user.access_token != '') {
      props.loadDrawer();
      props.validateSettings();
    }
  }, [props.user.username]);

  const openHelpLink = () => {
    let helpUrl: string;
    if (props.type === TEACHER_TYPE) {
      helpUrl =
        props.language == 'ar'
          ? 'https://www.telmeeth.com/ar/teachers/#ArabicStudentFAQ'
          : 'https://www.telmeeth.com/teachers/#EnglishStudentFAQ';
    } else {
      helpUrl =
        props.language == 'ar'
          ? 'https://www.telmeeth.com/ar/students/#ArabicStudentFAQ'
          : 'https://www.telmeeth.com/students/#EnglishStudentFAQ';
    }
    Linking.canOpenURL(helpUrl).then(supported => {
      if (supported) {
        Linking.openURL(helpUrl);
      } else {
        console.log(`Don't know how to open URI: ${helpUrl}`);
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#d8d8d8',
        width: 280,
        backgroundColor: '#8a8b8c'
      }}
      forceInset={{ top: 'always', bottom: 'never' }}
    >
      <View style={styles.drawerContainer}>
        <UserInfo {...props} />
        <ScrollView style={styles.itemContainer}>
          <Drawer.Item
            label={props.intl.formatMessage(messages.home)}
            icon='home-outline'
            active={
              props.drawerState.tab === ROUTE_HOME_TEACHER ||
              props.drawerState.tab === ROUTE_HOME_STUDENT
            }
            onPress={() => {
              if (props.type === TEACHER_TYPE) {
                // props.navigation.navigate('HomeTeacher');
                NavigationService.navigate('HomeTeacher');
                props.setTab(ROUTE_HOME_TEACHER);
              } else {
                // props.navigation.navigate('HomeStudent');
                NavigationService.navigate('HomeStudent');
                props.setTab(ROUTE_HOME_STUDENT);
              }

              // props.closeDrawer();
            }}
          />
          {props.type === TEACHER_TYPE ? (
            <Drawer.Item
              label={props.intl.formatMessage(messages.Schedule)}
              icon='calendar'
              active={props.drawerState.tab === ROUTE_SCHEDULE}
              onPress={() => {
                props.setTab(ROUTE_SCHEDULE);

                // props.navigation.navigate('Schedule');
                NavigationService.navigate('Schedule');
                // props.closeDrawer();
              }}
            />
          ) : null}
          {props.type === TEACHER_TYPE ? (
            <Drawer.Item
              label={props.intl.formatMessage(messages.Payment)}
              icon='currency-usd'
              active={props.drawerState.tab === ROUTE_SELECT_PAYMENT}
              onPress={() => {
                props.setTab(ROUTE_SELECT_PAYMENT);

                // props.navigation.navigate('SelectPayment');
                NavigationService.navigate('SelectPayment');
                // props.closeDrawer();
              }}
            />
          ) : null}
          <Drawer.Item
            label={props.intl.formatMessage(messages.Invoices)}
            icon='file-document-outline'
            active={props.drawerState.tab === ROUTE_INVOICE}
            onPress={() => {
              props.setTab(ROUTE_INVOICE);

              // props.navigation.navigate('Invoice');
              NavigationService.navigate('Invoice');
              // props.closeDrawer();
            }}
          />
          <Drawer.Item
            label={props.intl.formatMessage(messages.Notifications)}
            icon='bell-outline'
            active={props.drawerState.tab === ROUTE_NOTIFICATION}
            onPress={() => {
              props.setTab(ROUTE_NOTIFICATION);

              // props.navigation.navigate('Notification');
              NavigationService.navigate('Notification');
              // props.closeDrawer();
            }}
          />
          {props.type === TEACHER_TYPE ? (
            <Drawer.Item
              label={props.intl.formatMessage(messages.Certification)}
              icon='certificate'
              active={props.drawerState.tab === ROUTE_CERTIFICATE}
              onPress={() => {
                props.setTab(ROUTE_CERTIFICATE);

                // props.navigation.navigate('Certificate');
                NavigationService.navigate('Certificate');
                // props.closeDrawer();
              }}
            />
          ) : null}
          <Drawer.Item
            label={props.intl.formatMessage(messages.inviteAndPromoCode)}
            icon='share'
            active={props.drawerState.tab === ROUTE_INVITE}
            onPress={() => {
              props.setTab(ROUTE_INVITE);

              // props.navigation.navigate('Invite');
              NavigationService.navigate('Invite');
              // props.closeDrawer();
            }}
          />
          <DrawerItem
            label={props.intl.formatMessage(messages.Settings)}
            icon='settings-outline'
            active={props.drawerState.tab === ROUTE_SETTINGS}
            right={
              !props.drawerState.validation.settingValidation ? (
                <MaterialCommunityIcons
                  color='red'
                  size={20}
                  name='alert-circle-outline'
                />
              ) : null
            }
            onPress={() => {
              props.setTab(ROUTE_SETTINGS);

              // props.navigation.navigate('Settings');
              NavigationService.navigate('Settings');
              // props.closeDrawer();
            }}
          />
        </ScrollView>
        <SafeAreaView
          style={{
            // flex: 1,
            backgroundColor: 'white'
          }}
          forceInset={{ top: 'never', bottom: 'always' }}
        >
          <View style={styles.footerContainer}>
            <Button
              mode='text'
              style={styles.footerButton}
              onPress={() => {
                props.setTab(ROUTE_CONTACT);

                // props.navigation.navigate('Contact');
                NavigationService.navigate('Contact');
                // props.closeDrawer();
              }}
            >
              <FormattedMessage {...messages.contactUs} />
            </Button>
            <Button
              mode='text'
              style={styles.footerButton}
              onPress={() => {
                // we need to open link
                openHelpLink();
                // props.closeDrawer();
              }}
            >
              <FormattedMessage {...messages.help} />
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

// export default DrawerContent;

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  language: makeSelectLocale(),
  drawerState: makeSelectDrawer(),
  user: makeSelectUser()
  //   user: makeSelectUser()
});

export function mapDispatchToProps(dispatch: any) {
  return {
    setTab: (tab: string) => dispatch(setDrawerTab(tab)),
    loadDrawer: () => dispatch(loadDrawer()),
    validateSettings: () => dispatch(validateSettings())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(DrawerContent);
