import * as React from 'react';
import { ScheduleType } from './types';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialCommunityIcons, Small, XSmall } from '../../components';
import { deleteSchedule } from './ducks';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

interface ContentProps {
  data: ScheduleType;
  deleteSchedule: typeof deleteSchedule;
  intl: any;
}

const Content: React.SFC<ContentProps> = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row'
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1
          }}
        >
          <MaterialCommunityIcons
            color='gray'
            name='account-group-outline'
            size={30}
          />
          {props.data.is_individual == 1 ? (
            <XSmall gray>
              <FormattedMessage {...messages.individual} />
            </XSmall>
          ) : null}
          {props.data.is_student_group == 1 ? (
            <XSmall gray>
              <FormattedMessage {...messages.studentGroup} />
            </XSmall>
          ) : null}
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1
          }}
        >
          <MaterialCommunityIcons color='gray' name='home-outline' size={30} />
          {props.data.is_student_home == 1 ? (
            <XSmall gray>
              <FormattedMessage {...messages.studentHome} />
            </XSmall>
          ) : null}
          {props.data.is_teacher_home == 1 ? (
            <XSmall gray>
              <FormattedMessage {...messages.teacherHome} />
            </XSmall>
          ) : null}
        </View>
      </View>
      <View style={{}}>
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            alignItems: 'flex-end',
            flex: 1
          }}
        >
          <IconButton
            color='gray'
            size={18}
            style={{ margin: 0 }}
            icon={p => (
              <MaterialCommunityIcons {...p} name='close-circle-outline' />
            )}
            onPress={() => {
              props.deleteSchedule(
                props.data.firebase_lesson_id,
                props.data.firebase_lesson_date
              );
            }}
          />
        </View>

        {/* <MaterialCommunityIcons name='timer' size={20} /> */}
        <XSmall>{props.data.schedule_start_time}</XSmall>
      </View>
    </View>
  );
};

export default Content;
