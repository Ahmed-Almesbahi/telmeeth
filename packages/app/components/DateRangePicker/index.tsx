import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Icon } from '..';
import { MaterialCommunityIcons } from '../Icon';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocale } from '../../containers/LanguagePage/ducks';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { LanguageOption } from '../../containers/LanguagePage/types';
import { compose } from '../../utils/helper';

const XDate = require('xdate');

type DateRangePickerProps = {
  initialRange: Array<string>;
  onSuccess: (startDay: string, endDay: string) => void;
  onSelectedStartMarker?: (day: object) => void;
  theme?: any;
  language: LanguageOption;
};
class DateRangePicker extends Component<DateRangePickerProps, {}> {
  state = {
    isFromDatePicked: false,
    isToDatePicked: false,
    markedDates: {},
    fromDate: ''
  };

  componentDidMount() {
    this.setupInitialRange();
  }

  onDayPress = (day: any) => {
    if (
      !this.state.isFromDatePicked ||
      (this.state.isFromDatePicked && this.state.isToDatePicked)
    ) {
      if (this.props.onSelectedStartMarker) {
        this.props.onSelectedStartMarker(day);
      }
      this.setupStartMarker(day);
    } else if (!this.state.isToDatePicked) {
      let markedDates = { ...this.state.markedDates };
      let [mMarkedDates, range] = this.setupMarkedDates(
        this.state.fromDate,
        day.dateString,
        markedDates
      );
      if (range >= 0) {
        this.setState({
          isFromDatePicked: true,
          isToDatePicked: true,
          markedDates: mMarkedDates
        });
        this.props.onSuccess(this.state.fromDate, day.dateString);
      } else {
        this.setupStartMarker(day);
      }
    }
  };

  setupStartMarker = (day: any) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor
      }
    };
    this.setState({
      isFromDatePicked: true,
      isToDatePicked: false,
      fromDate: day.dateString,
      markedDates: markedDates
    });
  };

  setupMarkedDates = (fromDate: any, toDate: any, markedDates: any) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: this.props.theme.markColor,
            textColor: this.props.theme.markTextColor
          }
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
          if (i < range) {
            markedDates[tempDate] = {
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: this.props.theme.markColor,
              textColor: this.props.theme.markTextColor
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  setupInitialRange = () => {
    if (!this.props.initialRange) return;
    let [fromDate, toDate] = this.props.initialRange;
    let markedDates = {
      [fromDate]: {
        startingDay: true,
        color: this.props.theme.markColor,
        textColor: this.props.theme.markTextColor
      }
    };
    let [mMarkedDates, range] = this.setupMarkedDates(
      fromDate,
      toDate,
      markedDates
    );
    this.setState({ markedDates: mMarkedDates, fromDate: fromDate });
  };

  render() {
    return (
      <Calendar
        {...this.props}
        markingType={'period'}
        current={this.state.fromDate}
        markedDates={this.state.markedDates}
        renderArrow={direction => (
          <MaterialCommunityIcons
            size={20}
            name={
              direction === 'left'
                ? this.props.language == 'ar'
                  ? 'arrow-right'
                  : 'arrow-left'
                : this.props.language == 'ar'
                ? 'arrow-left'
                : 'arrow-right'
            }
          />
        )}
        onDayPress={day => {
          this.onDayPress(day);
        }}
      />
    );
  }
}

// DateRangePicker.defaultProps = {
//   theme: { markColor: '#00adf5', markTextColor: '#ffffff' }
// };

const mapStateToProps = createStructuredSelector({
  language: makeSelectLocale()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(DateRangePicker);
