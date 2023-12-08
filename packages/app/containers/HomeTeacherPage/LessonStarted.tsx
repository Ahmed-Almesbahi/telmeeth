import React, { useState, useEffect } from 'react';
import { View, Linking } from 'react-native';
import { Button, Surface, IconButton } from 'react-native-paper';
import {
  MaterialCommunityIcons,
  H2,
  Small,
  XSmall,
  H1,
  Text
} from '../../components';
import styles from './styles';
import { LessonNotStartedType, LessonStartedType } from './types';
import { ROUTE_FIND_WAY } from '../../Router';
import moment from 'moment';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

const LessonStarted = (props: LessonStartedType) => {
  const [countdown, setCountdown] = useState(props.data.actual_start_seconds);

  useEffect(() => {
    if (props.data.actual_start_seconds > 0) {
      const interval = setInterval(() => {
        setCountdown(countdown => {
          return countdown + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [props.data.actual_start_seconds]);

  const { data } = props;
  return (
    <Surface style={styles.lessonNotStartedSelectedContainer}>
      <View style={[styles.flexDirectionRow, { paddingHorizontal: 10 }]}>
        <View style={styles.teachingTypeSelected}>
          <Small light>{data.teaching_location}</Small>
        </View>
        <View style={styles.flexDirectionRow}>
          <MaterialCommunityIcons
            name='clock-outline'
            size={15}
            color='#B3B7AF'
          />
          <Small style={{ color: '#B3B7AF', marginHorizontal: 5 }}>
            {data.start} - {data.end}
          </Small>
        </View>
      </View>

      <View
        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
      >
        <Text light style={{ marginVertical: 5 }}>
          {data.first_name} {data.last_name}
        </Text>
        <H2 light>{props.language === 'ar' ? data.name_ar : data.name}</H2>
        <Small light style={{ marginTop: 20, marginBottom: 5 }}>
          {data.number_of_students} Students
        </Small>
        <H1 light style={{ marginBottom: 20 }}>
          {moment()
            .startOf('day')
            .add(countdown, 'seconds')
            .format('HH:mm:ss')}
        </H1>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10
        }}
      >
        <Button
          mode='contained'
          onPress={() => {
            props.endLesson(data.lesson_id);
          }}
          theme={{ colors: { primary: '#D8453B' } }}
        >
          <FormattedMessage {...messages.endLesson} />
        </Button>
      </View>
    </Surface>
  );
};

export default LessonStarted;
