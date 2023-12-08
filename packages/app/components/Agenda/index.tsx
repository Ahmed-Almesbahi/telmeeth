import * as React from 'react';
// import { Agenda as XAgenda } from 'react-native-calendars';
import OriginalAgenda from 'original-agenda';
import moment from 'moment';
import { View } from 'react-native';
import { Text } from '../index';
import styles from './styles';
import { themeTeacher, themeStudent } from '../../containers/App/themes';
import { SearchLessonType } from '../../containers/HomeStudentPage/Search/types';
import _forIn from 'lodash/forIn';
import _size from 'lodash/size';
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserType } from '../../containers/User/ducks';
import { compose } from 'redux';
import { TEACHER_TYPE } from '../../utils/constants';
import { BookedLessonType } from '../../containers/HomeStudentPage/BookedLessons/types';

interface AgendaProps {
  items?: any;
  extractThisData?: Array<SearchLessonType | BookedLessonType>;
  renderItem?: (item: any) => any;
  loadItems?: (day: any) => any;
  markedDates?: () => any;
  rowHasChanged?: (r1: any, r2: any) => boolean;
  userType?: number;
}

let items = {};
let minData = moment().format('YYYY-MM-DD');

const Agenda: React.SFC<AgendaProps> = props => {
  const renderItem = (item: any) => {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.lesson_date}</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1 !== r2;
  };

  const extractedItems = (
    items: Array<SearchLessonType | BookedLessonType>
  ) => {
    let data: any = {};

    if (items.length > 0) {
      items.map((d: any) => {
        if (d.lesson_date) {
          data[d.lesson_date] = [];
        }
      });
      _forIn(data, (value, key) => {
        let tmpData = items.filter((e: any) => e.lesson_date == key);
        tmpData.map(xData => {
          data[key].push({
            ...xData
          });
        });
      });
    }

    return data;
  };

  if (props.extractThisData && props.extractThisData.length > 0) {
    items = extractedItems(props.extractThisData);
  } else {
    items = props.items;
  }

  // set min data to what is available to us , is not login to show empty data
  if (_size(items) > 0) {
    minData = Object.keys(items)[0];
  }

  console.log('minData', minData);

  // return null;

  return (
    // @ts-ignore
    <OriginalAgenda
      items={items}
      // items={}
      loadItemsForMonth={props.loadItems}
      // callback that fires when the calendar is opened or closed
      onCalendarToggled={(calendarOpened: any) => {
        console.log('onCalendarToggled', calendarOpened);
      }}
      // callback that gets called on day press
      onDayPress={(day: any) => {
        console.log('day pressed');
      }}
      // callback that gets called when day changes while scrolling agenda list
      // onDayChange={day => {
      //   console.log('day changed');
      // }}
      // current={moment().format('YYYY-MM-DD')}
      selected={minData}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={minData}
      renderItem={props.renderItem ? props.renderItem : renderItem}
      rowHasChanged={props.rowHasChanged ? props.rowHasChanged : rowHasChanged}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={0}
      // Max amount of months allowed to scroll to the future. Default = 50
      // this will really speed up the component
      futureScrollRange={2}
      // Enable or disable scrolling of calendar list
      scrollEnabled={true}
      // dayComponent={() => <Text>asdf</Text>}
      // dayComponent={({ date, state }) => {
      //   return (
      //     <View style={{ flex: 1 }}>
      //       <Text
      //         style={{
      //           textAlign: 'center',
      //           color: state === 'disabled' ? 'gray' : 'black'
      //         }}
      //       >
      //         {date.day}
      //       </Text>
      //     </View>
      //   );
      // }}
      // specify what should be rendered instead of ActivityIndicator
      renderEmptyData={() => {
        return (
          <View style={styles.emptyData}>
            <Text>
              <FormattedMessage {...messages.noRecords} />
            </Text>
          </View>
        );
      }}
      // markingType='custom'
      // removeClippedSubviews={false}
      markedDates={props.markedDates && props.markedDates()}
      // monthFormat={'yyyy'}
      theme={{
        // agenda styles
        // agendaDayTextColor: 'yellow',
        // agendaDayNumColor: 'green',
        agendaTodayColor:
          props.userType === TEACHER_TYPE
            ? themeTeacher.colors.primary
            : themeStudent.colors.primary,
        agendaKnobColor:
          props.userType === TEACHER_TYPE
            ? themeTeacher.colors.primary
            : themeStudent.colors.primary,

        selectedDayTextColor:
          props.userType === TEACHER_TYPE
            ? themeTeacher.colors.primary
            : themeStudent.colors.primary,
        // selectedDayTextColor: 'white',
        selectedDayBackgroundColor:
          props.userType === TEACHER_TYPE
            ? themeTeacher.colors.primary
            : themeStudent.colors.primary
        // 'stylesheet.calendar.header': {
        //   week: {
        //     borderWidth: 1,
        //     borderColor: 'red',
        //     marginTop: 0,
        //     flexDirection: 'row',
        //     justifyContent: 'space-between'
        //   }
        // }
      }}
      // renderDay={(day, item) => <Text>{day ? day.day : 'item'}</Text>}
      // style={{ flex: 1 }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  userType: makeSelectUserType()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(Agenda);
