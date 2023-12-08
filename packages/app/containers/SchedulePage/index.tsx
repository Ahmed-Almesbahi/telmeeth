/**
 *
 * SchedulePage
 *
 */

import React, { memo, useState, useEffect, Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from '../../components/Helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import styles from './styles';

import _merge from 'lodash/merge';
import _forIn from 'lodash/forIn';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
// import makeSelectSchedulePage from "./selectors";
// import reducer from "./reducer";
import saga from './saga';
import messages from './messages';

import { Appbar, FAB } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { Calendar } from 'react-native-toggle-calendar';
import { makeSelectSchedules, loadSchedules, deleteSchedule } from './ducks';
import { SchedulePageProps, ScheduleType } from './types';
import LoadingIndicator from '../../components/LoadingIndicator';
import moment from 'moment';
import { Icon } from '../../components';
import { ROUTE_CREATE_SCHEDULE } from '../../Router';
import {
  CalendarDayComponent,
  CalendarHeaderComponent,
  CalendarFooterComponent,
  Booked,
  Scheduled
} from '../../components/Calender';
import Responsive from '../../components/Responsive';

let selectedCalendarDate = moment();
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const currentDate = moment();

const SchedulePage: React.SFC<SchedulePageProps> = props => {
  const [state, setState] = useState({
    selectedCalendarDateString: selectedCalendarDate.format('YYYY-MM-DD'),
    selectedCalendarMonthString: selectedCalendarDate.format('YYYY-MM-DD'),
    calendarHeaderData: {},
    horizontal: true,
    ratesInventoryDataArray: [],
    saveButtonClicked: false,
    calendarLoading: true,
    items: props.schedules.data
  });

  useInjectSaga({ key: 'schedulePage', saga });

  useEffect(() => {
    props.loadSchedules();
  }, []);

  useEffect(() => {
    // initial load
    if (props.schedules.data !== state.items) {
      setState({ ...state, items: props.schedules.data });
    }
  }, [props.schedules.data]);

  const markedDates = () => {
    let data: any = {};
    props.schedules.data.map(d => {
      data[d.lesson_date] = {
        booked: d.is_lesson_booked ? true : false,
        scheduled: d.is_lesson_booked ? false : true,
        selected:
          state.selectedCalendarDateString === d.lesson_date ? true : false
      };
    });

    return data;
  };

  const updateSelectedCalendarMonth = (selectedCalendarMonthString: string) => {
    setState({
      ...state,
      selectedCalendarMonthString,
      calendarLoading: false
    });
  };

  const onDayPress = (date: any) => {
    selectedCalendarDate = moment(date.dateString);
    const selectedCalendarDateString = selectedCalendarDate.format(
      'YYYY-MM-DD'
    );

    let items = state.items;
    if (items.length > 0) {
      items = items.filter(
        d => moment(d.lesson_date).diff(selectedCalendarDate) >= 0
      );
    }

    setState({
      ...state,
      ratesInventoryDataArray: [], // reset inventory data
      selectedCalendarDateString,
      selectedCalendarMonthString: selectedCalendarDateString,
      horizontal: true,
      items: items
    });
  };

  const onPressArrowLeft = (currentMonth: any, addMonthCallback: any) => {
    const monthStartDate = moment(currentMonth.getTime()).startOf('month');

    // don't go back for past months
    if (monthStartDate > currentDate) {
      addMonthCallback(-1);
      const selectedCalendarMonthString = moment(currentMonth.getTime())
        .add(-1, 'month')
        .format('YYYY-MM-DD');
      updateSelectedCalendarMonth(selectedCalendarMonthString);
    }
  };

  const onPressArrowRight = (currentMonth: any, addMonthCallback: any) => {
    addMonthCallback(1);
    const selectedCalendarMonthString = moment(currentMonth.getTime())
      .add(1, 'month')
      .format('YYYY-MM-DD');
    updateSelectedCalendarMonth(selectedCalendarMonthString);
  };

  const onPressListView = () => {
    setState({ ...state, horizontal: true });
  };

  const onPressGridView = () => {
    setState({ ...state, horizontal: false });
  };

  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='SCHEDULE' defaultTitle='Description of SCHEDULE' />
      <Appbar.Header>
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
          title={<FormattedMessage {...messages.schedule} />}
          color='white'
        />
      </Appbar.Header>
      {props.schedules.loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Calendar
            current={state.selectedCalendarMonthString}
            minDate={minimumDate.format('YYYY-MM-DD')}
            dayComponent={CalendarDayComponent}
            calendarHeaderComponent={CalendarHeaderComponent}
            headerData={state.calendarHeaderData}
            style={{ padding: 0 }}
            onPressArrowLeft={onPressArrowLeft}
            onPressArrowRight={onPressArrowRight}
            onPressListView={onPressListView}
            onPressGridView={onPressGridView}
            markedDates={markedDates()}
            horizontal={state.horizontal}
            onDayPress={onDayPress}
            showPastDatesInHorizontal={1}
            horizontalEndReachedThreshold={50}
            horizontalStartReachedThreshold={0}
          />
          {!state.horizontal ? (
            <CalendarFooterComponent
              calendarDateString={selectedCalendarDate.format('DD MMM, YYYY')}
            />
          ) : null}

          {props.schedules.data.length > 0 ? (
            <FlatList
              data={state.items}
              renderItem={({ item }) =>
                item.is_lesson_booked ? (
                  <Booked data={item} />
                ) : (
                  <Scheduled
                    deleteSchedule={props.deleteSchedule}
                    data={item}
                  />
                )
              }
              numColumns={2}
              keyExtractor={(item, index) => String(item.firebase_lesson_id)}
            />
          ) : null}
        </>
      )}
      <FAB
        style={styles.fab}
        small={false}
        icon={props => <Icon name='add' {...props} color='white' />}
        onPress={() => {
          props.navigation.push('CreateSchedule');
        }}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  schedules: makeSelectSchedules()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadSchedules: () => dispatch(loadSchedules()),
    deleteSchedule: (
      firebase_lesson_id: string,
      firebase_lesson_date: number
    ) => dispatch(deleteSchedule(firebase_lesson_id, firebase_lesson_date))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
  injectIntl
)(SchedulePage);
