/**
 *
 * HomeTeacherPage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';

import { Helmet } from '../../components/Helmet';

import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Appbar, Surface, Switch, Button } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { MaterialCommunityIcons, H2 } from '../../components';
import { GRAY_TEXT } from '../../utils/constants';
import NoRecords from '../../components/NoRecords';
import LessonNotStartedSelected from './LessonNotStartedSelected';
import LessonNotStarted from './LessonNotStarted';
import LessonStarted from './LessonStarted';
import { ROUTE_NOTIFICATION } from '../../Router';

import styles from './styles';
import reducer, {
  makeSelectHomeTeacher,
  loadHomeTeacher,
  goOnline,
  selectLesson,
  cancelLesson,
  startLesson,
  endLesson
} from './ducks';
import { HomeTeacherProps } from './types';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectLocale } from '../LanguagePage/ducks';
import BackgroundGeo from '../BackgroundGeo';
import Responsive from '../../components/Responsive';
import { makeSelectValidation } from '../DrawerPage/ducks';
import CompleteInformation from './CompleteInformation';

const HomeTeacherPage: React.SFC<HomeTeacherProps> = props => {
  // useInjectReducer({ key: "homeTeacher", reducer });
  useInjectSaga({ key: 'homeTeacherPage', saga });

  console.log('props', props);

  useEffect(() => {
    props.loadHomeTeacher();
  }, []);

  // const openDrawer: any = React.useContext(DrawerContext);

  // const data = [];
  return (
    <View style={styles.container}>
      <Helmet titleTemplate='HOME' defaultTitle='Description of HOME' />
      <Appbar.Header>
        <Responsive
          large={
            <Appbar.Action
              icon='menu'
              onPress={() => props.navigation.openDrawer()}
              color='white'
            />
          }
          xlarge={null}
        />

        <Appbar.Content
          title={<FormattedMessage {...messages.home} />}
          color='white'
        />
        <Appbar.Action
          color='white'
          icon='bell-outline'
          onPress={() => {
            props.navigation.push('Notification');
          }}
        />
      </Appbar.Header>

      {!props.validation.is_pending ||
      !props.validation.settingValidation ? null : (
        <Surface style={styles.surface}>
          <View style={{ marginHorizontal: 10, marginVertical: 7 }}>
            <Switch
              value={
                props.homeTeacher.top_setting &&
                props.homeTeacher.top_setting.is_onlie
                  ? true
                  : false
              }
              onValueChange={() => {
                props.goOnline(!props.homeTeacher.top_setting.is_onlie);
                // this.setState({ isSwitchOn: !isSwitchOn });
              }}
            />
          </View>

          {/* <Button
          onPress={() => {}}
          icon={p => (
            <MaterialCommunityIcons
              {...p}
              size={35}
              color={GRAY_TEXT}
              name='home-map-marker'
            />
          )}
        />
        <Button
          onPress={() => {}}
          icon={p => (
            <MaterialCommunityIcons {...p} size={30} name='google-maps' />
          )}
        /> */}
        </Surface>
      )}

      {!props.validation.is_pending || !props.validation.settingValidation ? (
        <CompleteInformation
          validation={props.validation}
          navigation={props.navigation}
          intl={props.intl}
        />
      ) : props.homeTeacher.data && props.homeTeacher.data.length ? (
        <ScrollView style={styles.bodyContainer}>
          <BackgroundGeo />
          {props.homeTeacher.data.map(
            (d: any, k) =>
              d.actual_start_seconds > 0 ? (
                <LessonStarted key={k} {...props} data={d} />
              ) : d.lesson_id === props.homeTeacher.selected.lesson_id &&
                props.homeTeacher.selected.lesson_id > 0 ? (
                <LessonNotStartedSelected key={k} {...props} data={d} />
              ) : (
                <LessonNotStarted key={k} {...props} data={d} />
              )
            // <LessonNotStarted key={k} {...props} data={d} />
            // d.status === 'started' ? (
            //   <LessonStarted key={d.id} data={d} />
            // ) : (
            //   <LessonNotStarted key={d.id} data={d} />
            // )
          )}
        </ScrollView>
      ) : (
        <NoRecords>
          <MaterialCommunityIcons
            name='book-open-page-variant'
            color={GRAY_TEXT}
            size={70}
          />
          <H2>
            <FormattedMessage {...messages.empty} />
          </H2>
        </NoRecords>
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  homeTeacher: makeSelectHomeTeacher(),
  validation: makeSelectValidation(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadHomeTeacher: () => dispatch(loadHomeTeacher()),
    goOnline: (is_online: any) => dispatch(goOnline(is_online)),
    selectLesson: (data: any) => dispatch(selectLesson(data)),
    cancelLesson: (lesson_id: number) => dispatch(cancelLesson(lesson_id)),
    endLesson: (lesson_id: number) => dispatch(endLesson(lesson_id)),
    startLesson: (lesson_id: number, actual_number_of_students: number) =>
      dispatch(startLesson(lesson_id, actual_number_of_students))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(HomeTeacherPage);
