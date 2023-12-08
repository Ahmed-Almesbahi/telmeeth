import React, { useEffect, useState } from 'react';
import { ScheduleTeachersListProps } from './types';
import { View } from 'react-native';

import Teacher from './Teacher';
import TeacherSelected from './TeacherSelected';
import RequestLesson from './RequestLesson';
import Agenda from '../../../components/Agenda';
import moment from 'moment';
import LoadingIndicator from '../../../components/LoadingIndicator';
import _delay from 'lodash/delay';
import _forIn from 'lodash/forIn';
import { Button, Small, Text, H2 } from '../../../components';
import { themeStudent } from '../../App/themes';

import { Calendar } from 'react-native-toggle-calendar';
import {
  CalendarDayComponent,
  CalendarHeaderComponent,
  CalendarFooterComponent,
  Booked,
  Scheduled
} from '../../../components/Calender';
import { FlatList } from 'react-native';

let selectedCalendarDate = moment();
const minimumDate = moment().add(-1, 'day'); // one day before for midnight check-in usecase
const currentDate = moment();

const ScheduleTeachersList: React.SFC<ScheduleTeachersListProps> = props => {
  const [state, setState] = useState({
    selectedCalendarDateString: selectedCalendarDate.format('YYYY-MM-DD'),
    selectedCalendarMonthString: selectedCalendarDate.format('YYYY-MM-DD'),
    calendarHeaderData: {},
    horizontal: true,
    ratesInventoryDataArray: [],
    saveButtonClicked: false,
    calendarLoading: true,
    items: props.homeStudent.lessonByMonth.scheduleLessons
  });

  const [selectedLessonByMonth, setSelectedLessonByMonth] = useState({
    lesson_id: 0,
    lesson_date: '',
    lesson_start: '',
    lesson_end: '',
    number_of_students: 0,
    is_teacher_home: false,
    is_student_home: false,
    is_individual: false,
    is_student_group: false,
    lesson_status: 0,
    firebase_lesson_id: '',
    firebase_lesson_date: ''
  });

  useEffect(() => {
    console.log('really?');
    // we used this hack cause this action is triggerd before saga load  , so saga won't catch the action
    // _delay(() => {

    // }, 500);
    props.loadLessonsByMonth(
      moment().format('YYYY-MM-DD'),
      props.homeStudent.selectedTeacher.user_id,
      props.user.user_student_id
    );
    // props.loadLessonsByMonth(
    //   moment().format('YYYY-MM-DD'),
    //   props.homeStudent.selectedTeacher.user_id,
    //   props.user.user_student_id
    // );
  }, []);

  // useEffect(() => {
  //   props.loadSchedules();
  // }, []);

  useEffect(() => {
    // initial load
    if (props.homeStudent.lessonByMonth.scheduleLessons !== state.items) {
      setState({
        ...state,
        items: props.homeStudent.lessonByMonth.scheduleLessons
      });
    }
  }, [props.homeStudent.lessonByMonth.scheduleLessons]);

  const markedDates = () => {
    let data: any = {};
    props.homeStudent.lessonByMonth.scheduleLessons.map((d: any) => {
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

  const renderItem = (item: any) => {
    if (item.selected) {
      return (
        <TeacherSelected
          d={item}
          // {...props}
          homeStudent={props.homeStudent}
          loadRangeRate={props.loadRangeRate}
          setHomeStudentOption={props.setHomeStudentOption}
          makeRequestLesson={props.makeRequestLesson}
          user={props.user}
          before={
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <View style={{ flex: 1 }}>
                <H2 light>{props.homeStudent.selectedSubject.subject_name}</H2>
                {/* <Text light>{item.lesson_end}</Text> */}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end'
                }}
              >
                <Text light>{item.lesson_start} - </Text>
                <Text light>{item.lesson_end}</Text>
              </View>
            </View>
          }
          onRequestPress={data => {
            props.bookScheduleLesson({
              ...data,
              lesson_id: item.lesson_id
            });
            props.setHomeStudentOption('bottomTab', 'BookedLessons');
          }}
          // right={<></>}
          // style={{ marginTop: 10, marginRight: 10 }}
        />
      );
    } else {
      return (
        <Teacher
          {...props}
          d={{
            ...item,
            user_id: props.homeStudent.selectedTeacher.user_id,
            user_km_range: props.homeStudent.selectedTeacher.user_km_range
          }}
          onPress={() => {
            props.selectLessonsByMonth(item.lesson_id);
            // setSelectedLessonByMonth(item);
            // console.log('test', test);
            // test[0].hello = true;
            // props.setHomeStudentOption('selectedLessonByMonth', item);
          }}
          left={
            <View style={{ justifyContent: 'center' }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: themeStudent.colors.primary,
                  borderRadius: 4,
                  padding: 5,
                  marginHorizontal: 5
                }}
              >
                <Text>BOOK NOW</Text>
              </View>
            </View>
          }
          content={
            <View style={{}}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                <Text gray>{item.lesson_start} - </Text>
                <Text gray>{item.lesson_end}</Text>
              </View>
            </View>
          }
          right={<></>}
          style={{ marginTop: 10, marginRight: 10 }}
        />
      );
    }
  };

  return (
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

      {state.items.length > 0 ? (
        <FlatList
          data={state.items}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => String(item.firebase_lesson_id)}
        />
      ) : null}
    </>
  );

  // return (
  //   <Agenda
  //     // items={test}
  //     renderItem={renderItem}
  //     extractThisData={props.homeStudent.lessonByMonth.scheduleLessons}
  //   />
  // );
};

export default ScheduleTeachersList;
