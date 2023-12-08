/**
 *
 * CreateSchedulePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectCreateSchedulePage,
  createSchedules,
  setScheduleOption
} from './ducks';
import { CreateSchedulePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

// import { Calendar } from "../../react-native-calendars";
import DateRangePicker from '../../components/DateRangePicker';
import TimePicker from '../../components/TimePicker';

import {
  Appbar,
  Button,
  HelperText,
  TouchableRipple
} from 'react-native-paper';
import { Helmet } from '../../components/Helmet';
import moment from 'moment';
import styles from './styles';
import { MaterialCommunityIcons, Small } from '../../components';
import { themeTeacher } from '../App/themes';
import { ROUTE_SCHEDULE } from '../../Router';
import SafeAreaView from 'react-native-safe-area-view';

const XDate = require('xdate');

const CreateSchedulePage = (props: CreateSchedulePageProps) => {
  // useInjectReducer({ key: 'createSchedulePage', reducer });
  useInjectSaga({ key: 'createSchedulePage', saga });

  useEffect(() => {
    if (props.createSchedulePage.data.lesson_start === '') {
      onTimeSelected(new Date());
    }
  }, []);

  const unactiveThemeColor = { colors: { primary: 'gray' } };

  const getDateRange = (fromDate: string, toDate: string): Array<string> => {
    let markedDates = [];

    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates.push(toDate);
      } else {
        markedDates.push(fromDate);
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates.push(tempDate);
          } else {
            markedDates.push(tempDate);
          }
        }
      }
    }

    return markedDates;
  };

  // Update the value in response to user picking event
  const onTimeSelected = (date: any = null) => {
    const start = moment(date).format('HH:mm');
    const end = moment(date)
      .add(1, 'hours')
      .format('HH:mm');
    props.setScheduleOption('lesson_start', start);
    props.setScheduleOption('lesson_end', end);
  };

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='CREATE SCHEDULE'
        defaultTitle='Description of CREATE SCHEDULE'
      />

      <Appbar.Header style={{ elevation: 0 }}>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.goBack();
          }}
          color='white'
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.createSchedule} />}
          color='white'
        />
      </Appbar.Header>

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#f4f4f4'
        }}
      >
        <TouchableRipple
          style={{
            borderRightWidth: 1,
            borderRightColor: '#f4f4f4',
            flex: 1
          }}
          onPress={() => {
            props.setScheduleOption(
              'is_individual',
              !props.createSchedulePage.data.is_individual
            );
          }}
        >
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              size={25}
              color={
                props.createSchedulePage.data.is_individual
                  ? themeTeacher.colors.primary
                  : 'gray'
              }
              name='account'
            />
            <Text
              style={
                props.createSchedulePage.data.is_individual
                  ? styles.font11Primary
                  : styles.font11Gray
              }
            >
              <FormattedMessage {...messages.individual} />
            </Text>
          </View>
        </TouchableRipple>

        <View style={{ flex: 1 }}>
          <TouchableRipple
            // icon={p => (
            //   <MaterialCommunityIcons {...p} size={25} name='account-group' />
            // )}
            // style={{}}
            // contentStyle={{ height: 50 }}
            // theme={state.is_student_group ? {} : unactiveThemeColor}
            // theme={
            //   props.createSchedulePage.data.is_student_group
            //     ? {}
            //     : unactiveThemeColor
            // }
            onPress={() => {
              props.setScheduleOption(
                'is_student_group',
                !props.createSchedulePage.data.is_student_group
              );
              // setState({ ...state, is_student_group: !state.is_student_group })
            }}
          >
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons
                size={25}
                color={
                  props.createSchedulePage.data.is_student_group
                    ? themeTeacher.colors.primary
                    : 'gray'
                }
                name='account-group'
              />
              <Text
                style={
                  props.createSchedulePage.data.is_student_group
                    ? styles.font11Primary
                    : styles.font11Gray
                }
              >
                <FormattedMessage {...messages.studentGroup} />
              </Text>
            </View>
            {/* <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>
              <Text style={{ fontSize: 11 }}>STUDENT</Text>
              <Text style={{ fontSize: 11 }}>GROUP</Text>
            </View> */}
          </TouchableRipple>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#f4f4f4'
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableRipple
            // icon={p => (
            //   <MaterialCommunityIcons {...p} size={25} name='home-outline' />
            // )}
            // contentStyle={{ height: 50 }}
            style={{ borderRightWidth: 1, borderRightColor: '#f4f4f4' }}
            // theme={state.is_teacher_home ? {} : unactiveThemeColor}
            theme={
              props.createSchedulePage.data.is_teacher_home
                ? {}
                : unactiveThemeColor
            }
            onPress={() => {
              props.setScheduleOption(
                'is_teacher_home',
                !props.createSchedulePage.data.is_teacher_home
              );
              // setState({ ...state, is_teacher_home: !state.is_teacher_home });
            }}
          >
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons
                size={25}
                color={
                  props.createSchedulePage.data.is_teacher_home
                    ? themeTeacher.colors.primary
                    : 'gray'
                }
                name='home-outline'
              />
              <Text
                style={
                  props.createSchedulePage.data.is_teacher_home
                    ? styles.font11Primary
                    : styles.font11Gray
                }
              >
                <FormattedMessage {...messages.teacherHome} />
              </Text>
            </View>
            {/* <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>
              <Text style={{ fontSize: 11 }}>TEACHER</Text>
              <Text style={{ fontSize: 11 }}>HOME</Text>
            </View> */}
          </TouchableRipple>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableRipple
            // icon={p => (
            //   <MaterialCommunityIcons {...p} size={25} name='home-outline' />
            // )}
            // contentStyle={{ height: 50 }}
            // theme={state.is_student_home ? {} : unactiveThemeColor}
            // theme={
            //   props.createSchedulePage.data.is_student_home
            //     ? {}
            //     : unactiveThemeColor
            // }
            onPress={() => {
              props.setScheduleOption(
                'is_student_home',
                !props.createSchedulePage.data.is_student_home
              );
              // setState({ ...state, is_student_home: !state.is_student_home })
            }}
          >
            <View style={styles.buttonContainer}>
              <MaterialCommunityIcons
                size={25}
                color={
                  props.createSchedulePage.data.is_student_home
                    ? themeTeacher.colors.primary
                    : 'gray'
                }
                name='home-outline'
              />
              <Text
                style={
                  props.createSchedulePage.data.is_student_home
                    ? styles.font11Primary
                    : styles.font11Gray
                }
              >
                <FormattedMessage {...messages.studentHome} />
              </Text>
            </View>
            {/* <View style={{ marginHorizontal: 15, flexDirection: 'row' }}>
              <Text style={{ fontSize: 11 }}>STUDENT</Text>
              <Text style={{ fontSize: 11 }}>HOME</Text>
            </View> */}
          </TouchableRipple>
        </View>
      </View>

      <ScrollView style={styles.bodyContainer}>
        <DateRangePicker
          // initialRange={[state.lesson_date_start, state.lesson_date_end]}
          onSuccess={(lesson_date_start: any, lesson_date_end: any) => {
            const dates = getDateRange(lesson_date_start, lesson_date_end);
            props.setScheduleOption('lesson_date', dates);
            // setState({ ...state, lesson_date_start, lesson_date_end });
          }}
          // we need this in case the teacher want to select one day
          onSelectedStartMarker={(day: any) => {
            props.setScheduleOption('lesson_date', [day.dateString]);
          }}
          minDate={moment()
            .add(1, 'days')
            .format('YYYY-MM-DD')}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction: 'left' | 'right') => {
            return (
              <MaterialCommunityIcons
                size={30}
                color='#3f3f3f'
                name={`chevron-${direction}`}
              />
            );
          }}
          theme={{
            markColor: themeTeacher.colors.primary,
            markTextColor: 'white'
          }}
        />

        <TimePicker onTimeSelected={onTimeSelected} />
      </ScrollView>

      <HelperText
        type='error'
        visible={props.createSchedulePage.error != '' ? true : false}
      >
        {props.createSchedulePage.error}
      </HelperText>
      <SafeAreaView forceInset={{ top: 'never', bottom: 'always' }}>
        <Button
          mode='contained'
          contentStyle={{ height: 40 }}
          loading={props.createSchedulePage.loading}
          disabled={
            !props.createSchedulePage.readyToSubmit ||
            props.createSchedulePage.loading
          }
          onPress={() => {
            props.createSchedules({
              is_individual: props.createSchedulePage.data.is_individual,
              is_student_group: props.createSchedulePage.data.is_student_group,
              is_student_home: props.createSchedulePage.data.is_student_home,
              is_teacher_home: props.createSchedulePage.data.is_teacher_home,
              lesson_start: props.createSchedulePage.data.lesson_start,
              lesson_end: props.createSchedulePage.data.lesson_end,
              lesson_date: props.createSchedulePage.data.lesson_date
            });
          }}
        >
          <FormattedMessage {...messages.done} />
        </Button>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  createSchedulePage: makeSelectCreateSchedulePage()
});

function mapDispatchToProps(dispatch: any) {
  return {
    createSchedules: (data: any) => dispatch(createSchedules(data)),
    setScheduleOption: (key: any, value: any) =>
      dispatch(setScheduleOption(key, value))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(CreateSchedulePage);
