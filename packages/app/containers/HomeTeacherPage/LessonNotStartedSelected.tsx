import React, { useState } from 'react';
import { View, Linking } from 'react-native';
import { Button, Surface, IconButton } from 'react-native-paper';
import {
  MaterialCommunityIcons,
  H2,
  Small,
  XSmall,
  H1
} from '../../components';
import styles from './styles';
import { LessonNotStartedType } from './types';
import { ROUTE_FIND_WAY } from '../../Router';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

const LessonNotStartedSelected = (props: LessonNotStartedType) => {
  const [state, setState] = useState({
    actual_number_of_students: props.data.number_of_students
  });
  const openURL = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const { data } = props;

  return (
    <Surface style={styles.lessonNotStartedSelectedContainer}>
      <View style={[styles.flexDirectionRow, { paddingHorizontal: 10 }]}>
        <View style={styles.teachingTypeSelected}>
          <Small light>{data.teaching_location}</Small>
        </View>
        <View style={styles.flexDirectionRow}>
          <MaterialCommunityIcons name='account' size={20} color='#B3B7AF' />
          <H2 light>{data.number_of_students}</H2>
        </View>
      </View>

      <View style={[styles.flexDirectionRow, styles.playContainer]}>
        <View style={styles.playView} />
        <View style={styles.playView}>
          <IconButton
            onPress={() => {
              props.startLesson(
                props.data.lesson_id,
                state.actual_number_of_students
              );
            }}
            size={60}
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              width: 60,
              height: 60,
              borderRadius: 30
            }}
            icon={p => (
              <MaterialCommunityIcons
                name='play-circle-outline'
                {...p}
                // size={50}
                color='white'
              />
            )}
          />

          <H2 style={{ marginBottom: 5 }} light>
            {props.language === 'ar' ? data.name_ar : data.name}
          </H2>

          <XSmall light>
            <FormattedMessage {...messages.lesson} /> - 1
          </XSmall>
        </View>
        <View style={styles.playView}>
          <View style={styles.studentCount}>
            <H1 light>{state.actual_number_of_students}</H1>
          </View>
          <View style={styles.flexDirectionRow}>
            <IconButton
              onPress={() => {
                setState({
                  actual_number_of_students: state.actual_number_of_students + 1
                });
              }}
              style={styles.increamentButton}
              // contentStyle={styles.increamentButtonContent}
              icon={() => (
                <MaterialCommunityIcons
                  name='plus-circle-outline'
                  size={25}
                  color='white'
                />
              )}
            />
            <IconButton
              onPress={() => {
                setState({
                  actual_number_of_students: state.actual_number_of_students - 1
                });
              }}
              style={styles.increamentButton}
              // contentStyle={styles.increamentButtonContent}
              icon={() => (
                <MaterialCommunityIcons
                  name='minus-circle-outline'
                  size={25}
                  color='white'
                />
              )}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          styles.flexDirectionRow,
          { marginHorizontal: 10, marginBottom: 10 }
        ]}
      >
        <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
          <MaterialCommunityIcons
            name='clock-outline'
            size={15}
            color='#B3B7AF'
          />
          <Small style={{ color: '#B3B7AF', marginHorizontal: 5 }}>
            {data.start} - {data.end}
          </Small>
        </View>
        <Small style={{ color: '#ff9600', marginHorizontal: 5 }}>
          {moment()
            .add(props.data.remain_seconds, 'seconds')
            .fromNow()}{' '}
          <FormattedMessage {...messages.toStart} />
        </Small>
      </View>

      <View style={[styles.flexDirectionRow, styles.bottomBarSelected]}>
        <IconButton
          onPress={() => {
            props.selectLesson(data);
            // props.push(ROUTE_FIND_WAY);
            props.navigation.push('FindWay');
          }}
          icon={() => (
            <MaterialCommunityIcons
              name='map-marker-radius'
              color='#70D942'
              size={30}
            />
          )}
        />
        <IconButton
          onPress={() => {
            openURL('tel:' + data.mobile_no);
          }}
          icon={() => (
            <MaterialCommunityIcons name='phone' color='#70D942' size={30} />
          )}
        />
        <IconButton
          onPress={() => {}}
          icon={() => (
            <MaterialCommunityIcons
              name='close-circle-outline'
              color='red'
              size={30}
            />
          )}
        />
      </View>
    </Surface>
  );
};

export default LessonNotStartedSelected;
