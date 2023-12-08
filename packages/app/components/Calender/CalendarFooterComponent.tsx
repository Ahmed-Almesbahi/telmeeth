import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from '../../components';

interface CalendarFooterComponent {
  calendarDateString: any;
}

const CalendarFooterComponent: React.SFC<CalendarFooterComponent> = props => {
  // const highDemandImage = require('../images/high-demand.png');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconInfo}>
          <View style={[styles.soldOutCircle, styles.circle]} />
          <Text style={[styles.infoText, styles.green]}>BOOKED</Text>
        </View>
        <View style={styles.iconInfo}>
          <View style={[styles.blockedCircle, styles.circle]} />
          <Text style={styles.infoText}>SCHEDULED</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconInfo: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center'
  },
  highDemandInfo: {
    marginRight: 0
  },
  infoText: {
    fontSize: 12,
    color: '#7f7e7e',
    marginLeft: 6
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 50
  },
  soldOutCircle: {
    backgroundColor: '#d4f3c7'
  },
  blockedCircle: {
    backgroundColor: '#d1d3ce'
  },
  footer: {
    marginTop: 12,
    marginBottom: 10
  },
  smallIcon: {
    width: 12,
    height: 12,
    marginLeft: 4
  },
  footerText: {
    color: '#2D3332',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
  green: {
    color: '#7f7e7e'
  }
});

export default CalendarFooterComponent;
