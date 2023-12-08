import * as React from 'react';
import { Surface, Button, Chip, ActivityIndicator } from 'react-native-paper';
import { TeachersListProps, SearchTeachersType } from './types';
import { View } from 'react-native';
import { Text, H2, H1, Small, Icon } from '../../../components';
import styles from './styles';
import { themeStudent } from '../../App/themes';
import {
  initialStateHomeStudent,
  loadRangeRate,
  setHomeStudentOption,
  makeRequestLesson
} from '../ducks';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';
import { initialStateHomeStudentType } from '../types';
import { initialStateUserType } from '../../User/types';

interface TeacherSelectedProps {
  d: SearchTeachersType;
  before?: React.ReactNode;
  after?: React.ReactNode;
  onRequestPress?: (data: any) => void;
  homeStudent: initialStateHomeStudentType;
  loadRangeRate: typeof loadRangeRate;
  setHomeStudentOption: typeof setHomeStudentOption;
  makeRequestLesson: typeof makeRequestLesson;
  user: initialStateUserType;
}

const TeacherSelected: React.SFC<TeacherSelectedProps> = props => {
  const [state, setState] = React.useState({
    selected: props.homeStudent.range.home
  });

  const selectedColor = { primary: 'white' };

  return (
    <Surface
      style={{
        // borderWidth: 1,
        // borderColor: 'yellow',
        backgroundColor: themeStudent.colors.primary,
        marginTop: 10,
        paddingTop: 10,
        marginRight: 10,
        alignItems: 'center',
        borderRadius: 5,
        elevation: 3
      }}
    >
      {props.before}
      <H1 light style={{ marginBottom: 15 }}>
        {props.d.first_name} {props.d.last_name}
      </H1>
      <View style={{ flexDirection: 'row' }}>
        {props.d.is_student_home ? (
          <Button
            mode='contained'
            dark={state.selected === 'student' ? false : true}
            theme={{
              roundness: 5,
              colors: state.selected === 'student' ? selectedColor : {}
            }}
            style={{ borderWidth: 1, borderColor: 'white' }}
            onPress={() => {
              setState({ selected: 'student' });
              props.loadRangeRate({
                teacher_id: props.d.user_id,
                is_student_home: 1,
                is_teacher_home: 0,
                student_count: props.homeStudent.student_count
              });
            }}
          >
            <Small>
              <FormattedMessage {...messages.homeStudent} />
            </Small>
          </Button>
        ) : null}
        {props.d.is_teacher_home && props.d.is_student_home ? (
          <Icon name='pin-drop' color='white' size={30} />
        ) : null}
        {props.d.is_teacher_home ? (
          <Button
            // textStyle={{
            //   fontSize: 8,
            //   margin: 0
            // }}
            dark={state.selected === 'teacher' ? false : true}
            theme={{
              roundness: 5,
              colors: state.selected === 'teacher' ? selectedColor : {}
            }}
            mode='contained'
            style={{ borderWidth: 1, borderColor: 'white' }}
            onPress={() => {
              setState({ selected: 'teacher' });
              props.loadRangeRate({
                teacher_id: props.d.user_id,
                is_student_home: 0,
                is_teacher_home: 1,
                student_count: props.homeStudent.student_count
              });
            }}
          >
            <Small>
              <FormattedMessage {...messages.homeTeacher} />
            </Small>
          </Button>
        ) : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 25,
          marginTop: 60
        }}
      >
        <Text light>
          <FormattedMessage {...messages.sr} />
        </Text>
        {props.homeStudent.loading ? (
          <ActivityIndicator
            animating={true}
            color='white'
            style={{ marginHorizontal: 10 }}
          />
        ) : (
          <Text light style={{ fontSize: 35, marginHorizontal: 10 }}>
            {props.homeStudent.range.rate}
          </Text>
        )}

        <Text light>
          /<FormattedMessage {...messages.hr} />
        </Text>
      </View>

      <View style={styles.teacherListRightWrapper}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Button
            mode='outlined'
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderBottomWidth: 0,
              borderLeftWidth: 0
            }}
            theme={{ colors: { primary: 'white' } }}
            onPress={() =>
              props.setHomeStudentOption(
                'selectedTeacher',
                initialStateHomeStudent.selectedTeacher
              )
            }
          >
            <FormattedMessage {...messages.back} />
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Button
            mode='outlined'
            style={{
              borderWidth: 1,
              borderColor: 'white',
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0
            }}
            theme={{ colors: { primary: 'white' } }}
            onPress={
              props.onRequestPress
                ? () =>
                    props.onRequestPress &&
                    props.onRequestPress({
                      teaching_location:
                        props.homeStudent.range.home === 'studnet' ? 2 : 1,
                      student_count: props.homeStudent.student_count,
                      student_id: props.user.user_student_id,
                      subject_id: props.homeStudent.selectedSubject.subject_id
                    })
                : () =>
                    props.makeRequestLesson({
                      is_student_home:
                        props.homeStudent.range.home === 'studnet' ? 1 : 0,
                      is_teacher_home:
                        props.homeStudent.range.home === 'teacher' ? 1 : 0,
                      recipient_id: props.homeStudent.selectedTeacher.user_id,
                      student_count: props.homeStudent.student_count,
                      student_id: props.user.user_student_id,
                      item_id: props.homeStudent.selectedSubject.item_id
                    })
            }
          >
            <FormattedMessage {...messages.request} />
          </Button>
        </View>
      </View>
    </Surface>
  );
};

export default TeacherSelected;
