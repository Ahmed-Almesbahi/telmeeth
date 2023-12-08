import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import moment from 'moment';
import { Icon } from '../../components';
import { MaterialCommunityIcons } from '../Icon';
import { IconButton } from 'react-native-paper';

const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const now = moment();

interface CalendarHeaderComponentProps {
  headerData?: any;
  horizontal?: boolean;
  onPressArrowRight: (month: any, addMonth: any) => {};
  onPressArrowLeft: (month: any, addMonth: any) => void;
  onPressListView: () => void;
  onPressGridView: () => void;
  addMonth?: () => void;
  month?: any;
}

const CalendarHeaderComponent: React.SFC<
  CalendarHeaderComponentProps
> = props => {
  const onPressArrowLeft = () => {
    props.onPressArrowLeft(props.month, props.addMonth);
  };

  const onPressArrowRight = () => {
    props.onPressArrowRight(props.month, props.addMonth);
  };

  const shouldLeftArrowBeDisabled = () => {
    const selectedDate = moment(props.month.getTime());
    return selectedDate.isSame(now, 'month');
  };

  return (
    <View style={{}}>
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: 'row',
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <IconButton
            icon={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
            color='#7f7e7e'
            size={30}
            onPress={onPressArrowLeft}
            disabled={shouldLeftArrowBeDisabled()}
          />

          <Text style={styles.dateText}>
            {moment(props.month.getTime()).format('MMM, YYYY')}
          </Text>
          <IconButton
            icon={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
            color='#7f7e7e'
            size={30}
            onPress={onPressArrowRight}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          {!props.horizontal ? (
            <IconButton
              icon={p => (
                <MaterialCommunityIcons
                  {...p}
                  name='close'
                  size={25}
                  color='#7f7e7e'
                />
              )}
              onPress={props.onPressListView}
            />
          ) : null}
          {props.horizontal ? (
            <IconButton
              icon={p => (
                <MaterialCommunityIcons
                  {...p}
                  name='calendar-month-outline'
                  size={25}
                  color='#7f7e7e'
                />
              )}
              onPress={props.onPressGridView}
            />
          ) : null}
        </View>
      </View>
      {// not showing week day in case of horizontal calendar, this will be handled by day component
      props.horizontal ? null : (
        <View style={styles.week}>
          {weekDaysNames.map((day, index) => (
            <Text key={index} style={styles.weekName} numberOfLines={1}>
              {day.toUpperCase()}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  week: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  weekName: {
    marginTop: 2,
    marginBottom: 7,
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7c7c7c'
  },
  dateText: {
    fontSize: 18,
    color: '#7f7e7e'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 4,
    marginTop: -2
  },
  leftIcon: {
    transform: [{ rotate: '180deg' }]
  },
  icon: {
    width: 24,
    height: 24
  },
  disabled: {
    opacity: 0.4
  }
});

export default CalendarHeaderComponent;
