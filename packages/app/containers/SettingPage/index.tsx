/**
 *
 * SettingPage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
// import makeSelectSettingPage from "./selectors";

import { Helmet } from '../../components/Helmet';
import { FormattedMessage } from 'react-intl';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
// import reducer from "./reducer";
import saga from './saga';
import messages from './messages';

import { Appbar, Surface, List } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { MaterialCommunityIcons } from '../../components';
import { logoutUser, makeSelectUserType } from '../User/ducks';
import {
  ROUTE_PROFILE,
  ROUTE_TEACHING_INFORMATION,
  ROUTE_ATTACHMENT,
  ROUTE_LOCATION,
  ROUTE_RANGE,
  ROUTE_PREFERENCE,
  ROUTE_LANGUAGE,
  ROUTE_LOGIN,
  ROUTE_CHANGE_MOBILE
} from '../../Router';
import {
  setDrawerTab,
  makeSelectDrawer,
  makeSelectValidation,
  validateSettings
} from '../DrawerPage/ducks';
import { SettingPageProps } from './types';
import { TEACHER_TYPE } from '../../utils/constants';
import { loadSettings } from './ducks';
import { DrawerActions } from 'react-navigation-drawer';
import Responsive from '../../components/Responsive';

const SettingPage: React.SFC<SettingPageProps> = props => {
  // useInjectReducer({ key: "settingPage", reducer });
  useInjectSaga({ key: 'settingPage', saga });
  console.log('run');
  // const openDrawer: any = React.useContext(DrawerContext);
  return (
    <View style={styles.container}>
      <Helmet titleTemplate='SETTINGS' defaultTitle='Description of SETTINGS' />
      <Appbar.Header>
        {/* <Appbar.Action
          icon='menu'
          onPress={() => {
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          color='white'
        /> */}
        <Responsive
          large={
            <Appbar.Action
              icon='menu'
              onPress={() => props.navigation.openDrawer()}
              color='white'
            />
          }
          xlarge={null}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.setting} />}
          color='white'
        />
      </Appbar.Header>
      <ScrollView style={styles.bodyContainer}>
        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.personalInformation} />}
            onPress={() => {
              props.navigation.push('Profile');
            }}
            right={p =>
              !props.validation.personalInfo ? (
                <List.Icon
                  {...p}
                  icon={iconProps => (
                    <MaterialCommunityIcons
                      {...iconProps}
                      color='red'
                      name='alert-circle-outline'
                    />
                  )}
                />
              ) : null
            }
            // style={{ padding: 0 }}
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='account-edit' />
                )}
              />
            )}
          />
        </Surface>
        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.teachingInformation} />}
            onPress={() => {
              props.navigation.push('TeachingInformation');
            }}
            right={p =>
              !props.validation.teachingInfo ? (
                <List.Icon
                  {...p}
                  icon={iconProps => (
                    <MaterialCommunityIcons
                      {...iconProps}
                      color='red'
                      name='alert-circle-outline'
                    />
                  )}
                />
              ) : null
            }
            // style={{ padding: 0 }}
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='teach' />
                )}
              />
            )}
          />
        </Surface>

        {props.userType === TEACHER_TYPE ? (
          <Surface style={styles.surfaceContainer}>
            <List.Item
              title={<FormattedMessage {...messages.attachments} />}
              onPress={() => {
                props.navigation.push('Attachment');
              }}
              right={p =>
                !props.validation.userAttachment ? (
                  <List.Icon
                    {...p}
                    icon={iconProps => (
                      <MaterialCommunityIcons
                        {...iconProps}
                        color='red'
                        name='alert-circle-outline'
                      />
                    )}
                  />
                ) : null
              }
              // style={{ padding: 0 }}
              left={props => (
                <List.Icon
                  {...props}
                  icon={iconProps => (
                    <MaterialCommunityIcons {...iconProps} name='attachment' />
                  )}
                />
              )}
            />
          </Surface>
        ) : null}
        {/* {Platform.OS !== "web" ? (
          <> */}
        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.location} />}
            onPress={() => {
              props.navigation.push('Location');
            }}
            right={p =>
              !props.validation.userLocation ? (
                <List.Icon
                  {...p}
                  icon={iconProps => (
                    <MaterialCommunityIcons
                      {...iconProps}
                      color='red'
                      name='alert-circle-outline'
                    />
                  )}
                />
              ) : null
            }
            // style={{ padding: 0 }}
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='map-marker' />
                )}
              />
            )}
          />
        </Surface>
        {props.userType === TEACHER_TYPE ? (
          <Surface style={styles.surfaceContainer}>
            <List.Item
              title={<FormattedMessage {...messages.range} />}
              onPress={() => {
                props.navigation.push('Range');
              }}
              right={p =>
                !props.validation.locationRange ? (
                  <List.Icon
                    {...p}
                    icon={iconProps => (
                      <MaterialCommunityIcons
                        {...iconProps}
                        color='red'
                        name='alert-circle-outline'
                      />
                    )}
                  />
                ) : null
              }
              // style={{ padding: 0 }}
              left={props => (
                <List.Icon
                  {...props}
                  icon={iconProps => (
                    <MaterialCommunityIcons {...iconProps} name='highway' />
                  )}
                />
              )}
            />
          </Surface>
        ) : null}
        {/* </>
        ) : null} */}
        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.preference} />}
            onPress={() => {
              props.navigation.push('Preference');
            }}
            // style={{ padding: 0 }}
            right={p =>
              !props.validation.locationPreference ? (
                <List.Icon
                  {...p}
                  icon={iconProps => (
                    <MaterialCommunityIcons
                      {...iconProps}
                      color='red'
                      name='alert-circle-outline'
                    />
                  )}
                />
              ) : null
            }
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='star-outline' />
                )}
              />
            )}
          />
        </Surface>
        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.changeMobile} />}
            onPress={() => {
              props.navigation.push('ChangeMobile');
            }}
            // style={{ padding: 0 }}
            left={props => <List.Icon {...props} icon='cellphone' />}
          />
        </Surface>
        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.language} />}
            onPress={() => {
              props.navigation.push('Language');
            }}
            // style={{ padding: 0 }}
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='translate' />
                )}
              />
            )}
          />
        </Surface>

        <Surface style={styles.surfaceContainer}>
          <List.Item
            title={<FormattedMessage {...messages.signOut} />}
            onPress={() => {
              props.logout();
              props.navigation.navigate('Login');
            }}
            // style={{ padding: 0 }}
            left={props => (
              <List.Icon
                {...props}
                icon={iconProps => (
                  <MaterialCommunityIcons {...iconProps} name='power-standby' />
                )}
              />
            )}
          />
        </Surface>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  // settingPage: makeSelectSettingPage()
  userType: makeSelectUserType(),
  validation: makeSelectValidation()
});

function mapDispatchToProps(dispatch: any) {
  return {
    setTab: (tab: string) => dispatch(setDrawerTab(tab)),
    logout: () => dispatch(logoutUser())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SettingPage);
