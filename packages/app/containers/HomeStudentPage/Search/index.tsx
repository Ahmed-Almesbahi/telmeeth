import * as React from 'react';
import { View } from 'react-native';

import { DrawerContext } from '../../../hooks/useDrawerContext';

import { Appbar, Button } from 'react-native-paper';

import { Helmet } from '../../../components/Helmet';
import { MaterialCommunityIcons } from '../../../components';

// import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  loadHomeSubjects,
  makeSelectHomeStudent,
  selectSubject,
  resetHomeStudent,
  setHomeStudentOption,
  loadHomeTeachers,
  likeTeacher,
  loadRangeRate,
  makeRequestLesson,
  cancelRequestLesson,
  cancelRequest,
  loadLessonsByMonth,
  selectLessonsByMonth,
  bookScheduleLesson
} from '../ducks';
import { SearchProps } from './types';
import { createStructuredSelector } from 'reselect';
import SearchMap from './Map';

import styles from './styles';
import TeachersList from './TeachersList';
import ScheduleTeachersList from './ScheduleTeachersList';
import messages from '../messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { makeSelectLocale } from '../../LanguagePage/ducks';
import { ROUTE_NOTIFICATION } from '../../../Router';
import { compose } from '../../../utils/helper';

const Search: React.SFC<SearchProps> = props => {
  const openDrawer: any = React.useContext(DrawerContext);

  const SecondBar = () => {
    return (
      <View style={styles.secondBar}>
        <View style={{ width: '50%' }}>
          <Button
            // style={{ flex: 1 }}
            color='white'
            onPress={() => {
              if (props.homeStudent.tab !== 'Now') {
                props.setHomeStudentOption('step', 1);
                props.setHomeStudentOption('tab', 'Now');
              }
            }}
            icon={p => (
              <MaterialCommunityIcons {...p} size={18} name='clock-outline' />
            )}
          >
            <FormattedMessage {...messages.now} />
          </Button>
          {props.homeStudent.tab === 'Now' ? (
            <View style={styles.arrow}>
              <MaterialCommunityIcons color='white' size={40} name='menu-up' />
            </View>
          ) : null}
        </View>
        <View
          style={{
            // flex: 1,
            width: '50%',
            position: 'relative'
            // borderWidth: 1,
            // borderColor: 'green'
          }}
        >
          <Button
            color='white'
            onPress={() => {
              if (props.homeStudent.tab !== 'Schedule') {
                props.setHomeStudentOption('step', 1);
                props.setHomeStudentOption('tab', 'Schedule');
              }
            }}
            style={{
              flex: 1
            }}
            icon={p => (
              <MaterialCommunityIcons
                {...p}
                size={18}
                name='calendar-check-outline'
              />
            )}
          >
            <FormattedMessage {...messages.schedule} />
          </Button>
          {props.homeStudent.tab === 'Schedule' ? (
            <View style={styles.arrow}>
              <MaterialCommunityIcons color='white' size={40} name='menu-up' />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const ThirdBar = () => {
    return (
      <View style={styles.thirdBar}>
        <View style={styles.groupButtonWrapper}>
          <Button
            onPress={() => {
              props.setHomeStudentOption(
                'student_count',
                props.homeStudent.student_count - 1
              );
            }}
            icon={p => <MaterialCommunityIcons {...p} size={20} name='minus' />}
          >
            {' '}
          </Button>
          <Button
            icon={p => (
              <MaterialCommunityIcons {...p} size={20} name='account-group' />
            )}
          >
            {props.homeStudent.student_count}
          </Button>

          <Button
            onPress={() => {
              props.setHomeStudentOption(
                'student_count',
                props.homeStudent.student_count + 1
              );
            }}
            icon={p => <MaterialCommunityIcons {...p} size={20} name='plus' />}
          >
            {' '}
          </Button>
        </View>
        <Button
          onPress={() => {
            if (props.homeStudent.openSubjectMenu) {
              props.setHomeStudentOption('openSubjectMenu', false);
            } else {
              props.loadHomeSubjects(
                props.homeStudent.tab,
                props.user.user_student_id,
                props.homeStudent.student_count
              );
            }
            // setState({ ...state, openSubjectMenu: !state.openSubjectMenu });
          }}
        >
          {props.homeStudent.selectedSubject.subject_id > 0 ? (
            props.homeStudent.selectedSubject.subject_name
          ) : (
            <FormattedMessage {...messages.selectSubject} />
          )}
        </Button>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Helmet
        titleTemplate={
          props.intl.formatMessage(messages.search2)
          // <FormattedMessage {...messages.search2} />
        }
        defaultTitle='Description of SEARCH'
      />
      <Appbar.Header>
        {props.homeStudent.step === 1 ? (
          <Appbar.Action
            icon='menu'
            // onPress={() => openDrawer()}
            onPress={() => props.navigation.openDrawer()}
            color='white'
          />
        ) : (
          <Appbar.BackAction
            color='white'
            onPress={() => {
              props.setHomeStudentOption('step', 1);
            }}
          />
        )}

        <Appbar.Content
          title={
            props.homeStudent.step === 3 ? (
              props.homeStudent.selectedTeacher.first_name
            ) : (
              <FormattedMessage {...messages.search} />
            )
          }
          color='white'
        />

        <Appbar.Action
          color='white'
          icon={p => <MaterialCommunityIcons {...p} name='bell-outline' />}
          onPress={() => {
            props.navigation.push('Notification');
          }}
        />
      </Appbar.Header>

      {SecondBar()}
      {props.homeStudent.step === 1 ? ThirdBar() : null}

      {props.homeStudent.step === 1 ? (
        <SearchMap {...props} />
      ) : props.homeStudent.step === 2 ? (
        <TeachersList {...props} />
      ) : (
        <ScheduleTeachersList {...props} />
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  homeStudent: makeSelectHomeStudent(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadHomeSubjects: (
      search_type: string,
      student_id: number,
      student_count: number
    ) => dispatch(loadHomeSubjects(search_type, student_id, student_count)),
    selectSubject: (data: any) => dispatch(selectSubject(data)),
    resetHomeStudent: () => dispatch(resetHomeStudent()),
    likeTeacher: (teacher_id: number) => dispatch(likeTeacher(teacher_id)),
    loadHomeTeachers: (
      search_type: any,
      subject_id: number,
      student_id: number,
      student_count: number
    ) =>
      dispatch(
        loadHomeTeachers(search_type, subject_id, student_id, student_count)
      ),
    setHomeStudentOption: (key: any, value: any) =>
      dispatch(setHomeStudentOption(key, value)),
    loadRangeRate: (data: any) => dispatch(loadRangeRate(data)),
    makeRequestLesson: (data: any) => dispatch(makeRequestLesson(data)),
    cancelRequestLesson: (notification_id: number, recipient_id: number) =>
      dispatch(cancelRequestLesson(notification_id, recipient_id)),
    cancelRequest: () => dispatch(cancelRequest()),
    bookScheduleLesson: (data: any) => dispatch(bookScheduleLesson(data)),
    selectLessonsByMonth: (lesson_id: number) =>
      dispatch(selectLessonsByMonth(lesson_id)),
    loadLessonsByMonth: (
      month_date: any,
      teacher_id: number,
      student_id: number
    ) => dispatch(loadLessonsByMonth(month_date, teacher_id, student_id))
  };
}

const withConnect = connect(
  mapStateToProps,
  // null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(Search);
