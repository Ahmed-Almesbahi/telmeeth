import * as React from 'react';
import { View, FlatList } from 'react-native';

import { DrawerContext } from '../../../hooks/useDrawerContext';

import { Appbar, Button } from 'react-native-paper';

import { Helmet } from '../../../components/Helmet';
import { MaterialCommunityIcons, Text } from '../../../components';

import Agenda from '../../../components/Agenda';

import styles from '../styles';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import {
  loadStudentSchedule,
  makeSelectHomeStudentBookedLessons
} from '../ducks';
import { BookedLessonsProps } from './types';
import { createStructuredSelector } from 'reselect';
import BookedLesson from './BookedLesson';
import { themeStudent } from '../../App/themes';
import messages from '../messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ROUTE_NOTIFICATION } from '../../../Router';
import { compose } from '../../../utils/helper';

import { Calendar } from 'react-native-toggle-calendar';
import moment from 'moment';
import {
  CalendarDayComponent,
  CalendarHeaderComponent,
  CalendarFooterComponent,
  Booked,
  Scheduled
} from '../../../components/Calender';

let selectedCalendarDate = moment();
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const currentDate = moment();

const BookedLessons: React.SFC<BookedLessonsProps> = props => {
  const [state, setState] = React.useState({
    selectedCalendarDateString: selectedCalendarDate.format('YYYY-MM-DD'),
    selectedCalendarMonthString: selectedCalendarDate.format('YYYY-MM-DD'),
    calendarHeaderData: {},
    horizontal: true,
    ratesInventoryDataArray: [],
    saveButtonClicked: false,
    calendarLoading: true,
    items: props.bookedLessons
  });

  React.useEffect(() => {
    props.loadStudentSchedule();
  }, []);

  React.useEffect(() => {
    // initial load
    if (props.bookedLessons !== state.items) {
      setState({ ...state, items: props.bookedLessons });
    }
  }, [props.bookedLessons]);

  const markedDates = () => {
    let data: any = {};
    props.bookedLessons.map((d: any) => {
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
        (d: any) => moment(d.lesson_date).diff(selectedCalendarDate) >= 0
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

  // if (props.bookedLessons.length === 0) {
  //   return null;
  // }

  // console.log('bookedLessons', props.bookedLessons);
  // return null;

  console.log('props.bookedLessons', props.bookedLessons);

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Helmet
        titleTemplate='BOOKED LESSONS'
        defaultTitle='Description of BOOKED LESSONS'
      />
      <Appbar.Header>
        <Appbar.Action
          icon='menu'
          onPress={() => props.navigation.openDrawer()}
          color='white'
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.bookedLessons} />}
          color='white'
        />

        <Appbar.Action
          icon={p => <MaterialCommunityIcons {...p} name='bell-outline' />}
          onPress={() => {
            props.navigation.push('Notification');
          }}
        />
      </Appbar.Header>

      {/* <Agenda
        renderItem={(item: any) => (
          <BookedLesson {...props} data={item} push={props.push} />
        )}
        extractThisData={props.bookedLessons}
      /> */}
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

      {state.items.length > 0 ? (
        <FlatList
          data={state.items}
          renderItem={({ item }) => (
            <BookedLesson
              {...props}
              data={item}
              navigation={props.navigation}
            />
          )}
          keyExtractor={(item, index) => String(item.firebase_lesson_id)}
        />
      ) : null}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  bookedLessons: makeSelectHomeStudentBookedLessons()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadStudentSchedule: () => dispatch(loadStudentSchedule())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(BookedLessons);
