import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '../../components';
import { themeTeacher } from '../../containers/App/themes';

const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarDayComponentProps {
  state?: string;
  marking?: any;
  horizontal?: boolean;
  date?: any;
  onPress?: (data: any) => void;
  current?: string;
  copilot?: any;
}

const CalendarDayComponent: React.SFC<CalendarDayComponentProps> = props => {
  const getContentStyle = () => {
    const { state, marking = {} } = props;
    const style: any = {
      content: {},
      text: {
        color: '#838383'
      }
    };

    if (state === 'disabled') {
      style.text.color = '#c1c2c1';
    } else {
      if (marking.selected) {
        style.content.borderColor = themeTeacher.colors.primary;
        style.content.borderWidth = 1;
        style.text.color = 'gray';
        style.content.backgroundColor = 'white';
        style.content.borderRadius = 50;
      } else if (marking.booked) {
        style.content.borderColor = '#d4f3c7';
        style.content.borderRadius = 50;
        style.content.borderWidth = 1;
        style.content.backgroundColor = '#d4f3c7';
      } else if (marking.scheduled) {
        style.content.borderColor = '#d1d3ce';
        style.content.borderRadius = 50;
        style.content.borderWidth = 1;
        style.content.backgroundColor = '#d1d3ce';
      }
    }

    return style;
  };

  const onDayPress = () => {
    props.onPress && props.onPress(props.date);
  };

  const contentStyle = getContentStyle();
  // const highDemandImage = require('../images/high-demand.png');

  return (
    <View style={styles.container} {...props.copilot}>
      <View style={styles.header}>
        {props.horizontal ? (
          <Text style={styles.weekName} numberOfLines={1}>
            {weekDaysNames[props.date.weekDay].toUpperCase()}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={[styles.content, contentStyle.content]}
        onPress={onDayPress}
      >
        <Text style={[styles.contentText, contentStyle.text]}>
          {String(props.children)}
        </Text>
        {props.marking.highDemand && props.state !== 'disabled' ? (
          // <Image source={highDemandImage} style={styles.smallIcon} />
          <Icon name='star' />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

interface CalendarDayWrapper {}

const CalendarDayWrapper: React.SFC<CalendarDayWrapper> = props => {
  return <CalendarDayComponent {...props} />;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
    marginRight: 7
  },
  header: {},
  weekName: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#838383'
  },
  content: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentText: {
    fontSize: 20
  },
  footer: {
    flexDirection: 'row'
  },
  smallIcon: {
    width: 12,
    height: 12,
    position: 'absolute',
    top: -1,
    right: -1
  }
});

export default CalendarDayWrapper;
