/**
 *
 * PreferencePage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';

import { Helmet } from '../../components/Helmet';

import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import {
  Appbar,
  RadioButton,
  List,
  Button,
  Snackbar,
  Divider
} from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { GlobalStyle, MaterialCommunityIcons, Text } from '../../components';
import { ROUTE_SETTINGS } from '../../Router';

import styles from './styles';
import {
  loadPreference,
  makeSelectPreference,
  setPreference,
  hideSnakeBar,
  togglePreference,
  loadTeachingLocation,
  setTeachingLocation
} from './ducks';
import { PreferencePageProps } from './types';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE } from '../../utils/constants';
import { themeTeacher, themeStudent } from '../App/themes';

const PreferencePage = (props: PreferencePageProps) => {
  // useInjectReducer({ key: 'preferencePage', reducer });
  useInjectSaga({ key: 'preferencePage', saga });
  useEffect(() => {
    props.loadPreference();
    props.loadTeachingLocation();
  }, []);

  //show snakebar when done saving
  if (props.preference.setLoaded && props.preference.message != '') {
    // setState({ visible: true });
    // props.hideSnakeBar();
  }

  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='PREFERENCE'
        defaultTitle='Description of PREFERENCE'
      />
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.goBack();
          }}
          color='white'
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.preference} />}
          color='white'
        />
        <Button
          mode='text'
          disabled={props.preference.setLoading}
          loading={props.preference.setLoading}
          onPress={() => {
            if (props.userType === TEACHER_TYPE) {
              props.setPreference(
                props.preference.data.is_individual,
                props.preference.data.is_student_group
              );
            }
            props.setTeachingLocation(
              props.preference.data.is_teacher_home,
              props.preference.data.is_student_home
            );
          }}
        >
          <Text light>
            <FormattedMessage {...messages.done} />
          </Text>
        </Button>
      </Appbar.Header>
      <ScrollView style={styles.bodyContainer}>
        <List.Item
          left={props => (
            <List.Icon
              {...props}
              icon={p => <MaterialCommunityIcons {...p} name='home-outline' />}
            />
          )}
          title={<FormattedMessage {...messages.teacherHome} />}
          onPress={() => {
            props.togglePreference(
              'is_teacher_home',
              !props.preference.data.is_teacher_home
            );
          }}
          right={() => (
            <RadioButton
              value='first'
              theme={{
                colors: {
                  disabled:
                    props.userType === TEACHER_TYPE
                      ? themeTeacher.colors.primary
                      : themeStudent.colors.primary
                }
              }}
              status={
                props.preference.data.is_teacher_home ? 'checked' : 'unchecked'
              }
              disabled={true}
              // onPress={() =>
              //   props.togglePreference(
              //     'is_teacher_home',
              //     !props.preference.data.is_teacher_home
              //   )
              // }
            />
          )}
        />
        <Divider />
        <List.Item
          left={props => (
            <List.Icon
              {...props}
              icon={p => <MaterialCommunityIcons {...p} name='home-outline' />}
            />
          )}
          title={<FormattedMessage {...messages.studentHome} />}
          onPress={() => {
            props.togglePreference(
              'is_student_home',
              !props.preference.data.is_student_home
            );
          }}
          right={() => (
            <RadioButton
              value='first'
              theme={{
                colors: {
                  disabled:
                    props.userType === TEACHER_TYPE
                      ? themeTeacher.colors.primary
                      : themeStudent.colors.primary
                }
              }}
              disabled={true}
              status={
                props.preference.data.is_student_home ? 'checked' : 'unchecked'
              }
              // onPress={() =>
              //   props.togglePreference(
              //     'is_student_home',
              //     !props.preference.data.is_student_home
              //   )
              // }
            />
          )}
        />

        {props.userType === TEACHER_TYPE ? (
          <>
            <Divider />
            <List.Item
              left={props => (
                <List.Icon
                  {...props}
                  icon={p => (
                    <MaterialCommunityIcons {...p} name='account-outline' />
                  )}
                />
              )}
              title={<FormattedMessage {...messages.individual} />}
              onPress={() => {
                props.togglePreference(
                  'is_individual',
                  !props.preference.data.is_individual
                );
              }}
              right={() => (
                <RadioButton
                  value='first'
                  status={
                    props.preference.data.is_individual
                      ? 'checked'
                      : 'unchecked'
                  }
                  theme={{
                    colors: {
                      disabled:
                        props.userType === TEACHER_TYPE
                          ? themeTeacher.colors.primary
                          : themeStudent.colors.primary
                    }
                  }}
                  disabled={true}
                  // onPress={() =>
                  //   props.togglePreference(
                  //     'is_individual',
                  //     !props.preference.data.is_individual
                  //   )
                  // }
                />
              )}
            />
          </>
        ) : null}
        {props.userType === TEACHER_TYPE ? (
          <>
            <Divider />
            <List.Item
              title={<FormattedMessage {...messages.studentGroup} />}
              onPress={() => {
                props.togglePreference(
                  'is_student_group',
                  !props.preference.data.is_student_group
                );
              }}
              left={props => (
                <List.Icon
                  {...props}
                  icon={p => (
                    <MaterialCommunityIcons
                      {...p}
                      name='account-group-outline'
                    />
                  )}
                />
              )}
              right={() => (
                <RadioButton
                  value='first'
                  status={
                    props.preference.data.is_student_group
                      ? 'checked'
                      : 'unchecked'
                  }
                  theme={{
                    colors: {
                      disabled:
                        props.userType === TEACHER_TYPE
                          ? themeTeacher.colors.primary
                          : themeStudent.colors.primary
                    }
                  }}
                  disabled={true}
                  // onPress={() =>
                  //   props.togglePreference(
                  //     'is_student_group',
                  //     !props.preference.data.is_student_group
                  //   )
                  // }
                />
              )}
            />
          </>
        ) : null}
      </ScrollView>
      <Snackbar
        visible={
          props.preference.message != '' && props.preference.setLoaded === true
            ? true
            : false
        }
        onDismiss={() => {
          props.hideSnakeBar();
        }}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {props.preference.message}
      </Snackbar>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  preference: makeSelectPreference(),
  userType: makeSelectUserType()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadPreference: () => dispatch(loadPreference()),
    loadTeachingLocation: () => dispatch(loadTeachingLocation()),
    hideSnakeBar: () => dispatch(hideSnakeBar()),
    togglePreference: (key: string, value: boolean) =>
      dispatch(togglePreference(key, value)),
    setPreference: (is_individual: boolean, is_student_group: boolean) =>
      dispatch(setPreference(is_individual, is_student_group)),
    setTeachingLocation: (is_teacher_home: boolean, is_student_home: boolean) =>
      dispatch(setTeachingLocation(is_teacher_home, is_student_home))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(PreferencePage);
