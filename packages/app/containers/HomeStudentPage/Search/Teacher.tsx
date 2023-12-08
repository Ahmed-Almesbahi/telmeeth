import * as React from 'react';
import {
  TouchableRipple,
  Surface,
  Button,
  Chip,
  IconButton
} from 'react-native-paper';
import { TeachersListProps, SearchTeachersType } from './types';
import { View } from 'react-native';
import { Small, Text, MaterialCommunityIcons, H1 } from '../../../components';
import styles from './styles';
import { themeStudent } from '../../App/themes';
import StarRating from '../../../components/StarRating';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

interface TeacherProps extends TeachersListProps {
  d: SearchTeachersType;
  style?: any;
  onPress?: () => void;
  left?: React.ReactNode;
  content?: React.ReactNode;
  right?: React.ReactNode;
}

const Teacher: React.SFC<TeacherProps> = props => {
  return (
    <TouchableRipple
      style={props.style}
      onPress={
        props.onPress
          ? props.onPress
          : () => {
              if (props.homeStudent.tab === 'Schedule') {
                props.setHomeStudentOption('step', 3);
              }
              props.setHomeStudentOption('selectedTeacher', props.d);
              props.loadRangeRate({
                teacher_id: props.d.user_id,
                is_student_home: props.d.is_student_home,
                is_teacher_home: props.d.is_teacher_home,
                student_count: props.homeStudent.student_count
              });
            }
      }
    >
      <Surface
        style={{
          padding: 10,
          // alignItems: 'center',
          // justifyContent: 'center',
          borderRadius: 5,
          elevation: 1,
          flexDirection: 'row'
        }}
      >
        {props.left ? (
          props.left
        ) : (
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#eaeaea',
              justifyContent: 'center',
              paddingRight: 10,
              marginRight: 10
            }}
          >
            <Button
              mode='outlined'
              theme={{ roundness: 5 }}
              onPress={() => {
                props.setHomeStudentOption('selectedTeacher', props.d);
                props.loadRangeRate({
                  teacher_id: props.d.user_id,
                  is_student_home: props.d.is_student_home,
                  is_teacher_home: props.d.is_teacher_home,
                  student_count: props.homeStudent.student_count
                });
              }}
            >
              {props.homeStudent.tab === 'Schedule' ? (
                <View>
                  <MaterialCommunityIcons
                    name='calendar-blank-outline'
                    size={35}
                  />
                  <Small style={{ marginTop: 10 }}>
                    <FormattedMessage {...messages.schedule} />
                  </Small>
                </View>
              ) : (
                <Small>
                  <FormattedMessage {...messages.request} />
                </Small>
              )}
            </Button>
          </View>
        )}

        <View style={styles.teacherListRightWrapper}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'red',
              // flex: 3
              flex: 1
              // marginTop: 10
            }}
          >
            {props.content ? props.content : null}
            {props.d.first_name ? (
              <H1 style={{ textAlign: 'left', marginBottom: 5 }}>
                {props.d.first_name}
              </H1>
            ) : null}
            {props.d.number_rating ? (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <StarRating
                  starSize={20}
                  disabled={true}
                  maxStars={5}
                  fullStarColor='#ffd200'
                  rating={props.d.rating}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                <Small>({props.d.number_rating})</Small>
              </View>
            ) : null}

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 20
              }}
            >
              {props.d.is_student_home ? (
                <Chip
                  textStyle={{
                    fontSize: 7,
                    margin: 0
                  }}
                  style={{ marginRight: 5 }}
                  // onPress={() => console.log('Pressed')}
                >
                  <FormattedMessage {...messages.homeStudent} />
                </Chip>
              ) : null}
              {props.d.is_teacher_home ? (
                <Chip
                  textStyle={{
                    fontSize: 7,
                    margin: 0
                  }}
                  // onPress={() => console.log('Pressed')}
                >
                  <FormattedMessage {...messages.homeTeacher} />
                  {props.d.user_km_range
                    ? `(${props.d.user_km_range} KM)`
                    : null}
                </Chip>
              ) : null}
            </View>
          </View>
          {props.right ? (
            props.right
          ) : (
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                flex: 1,
                alignItems: 'flex-end'
              }}
            >
              <IconButton
                icon={p => (
                  <MaterialCommunityIcons
                    {...p}
                    name={props.d.is_like ? 'thumb-up' : 'thumb-up-outline'}
                  />
                )}
                color={themeStudent.colors.primary}
                size={20}
                onPress={() => {
                  props.likeTeacher && props.likeTeacher(props.d.user_id);
                }}
              />
            </View>
          )}
        </View>
      </Surface>
    </TouchableRipple>
  );
};

export default Teacher;
