/**
 *
 * TeachingInformationPage
 *
 */

import React, { memo, Fragment, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer, {
  makeSelectTeachingInformations,
  loadTeachingInformations
} from './ducks';
import saga from './saga';

import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Helmet } from '../../components/Helmet';
import { Appbar, Divider } from 'react-native-paper';
import NoRecords from '../../components/NoRecords';
import { List, FAB } from 'react-native-paper';
import { Icon } from '../../components';
import { ROUTE_SETTINGS, ROUTE_EDUCATION_INFORMATION } from '../../Router';

import styles from './styles';
import { TeachingInformationPageProps } from './types';
import { makeSelectUserType } from '../User/ducks';
import { STUDENT_TYPE, TEACHER_TYPE } from '../../utils/constants';
import { makeSelectLocale } from '../LanguagePage/ducks';

let page = 0;

const TeachingInformationPage = (props: TeachingInformationPageProps) => {
  // useInjectReducer({ key: "teaching", reducer });
  useInjectSaga({ key: 'teachingInformationPage', saga });

  useEffect(() => {
    props.loadTeachingInformations(page);
  }, []);

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='TEACHING' defaultTitle='Description of TEACHING' />
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.navigate('Settings');
          }}
          color='white'
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.teaching} />}
          color='white'
        />
      </Appbar.Header>
      {props.teaching.data.length ? (
        <ScrollView style={styles.bodyContainer}>
          {props.teaching.data.map(d => {
            return (
              <Fragment key={d.education_information_id}>
                <List.Item
                  title={d.root_name}
                  description={String(d.item_name)}
                  onPress={() => {
                    // props.push(
                    //   ROUTE_EDUCATION_INFORMATION +
                    //     '/' +
                    //     d.education_information_id
                    // );
                    props.navigation.navigate('EducationInformation', {
                      id: d.education_information_id
                    });
                  }}
                  right={p => (
                    <List.Icon
                      {...p}
                      icon={
                        props.language == 'ar'
                          ? 'chevron-left'
                          : 'chevron-right'
                      }
                    />
                  )}
                />
                <Divider />
              </Fragment>
            );
          })}
        </ScrollView>
      ) : (
        <NoRecords />
      )}
      {(props.userType === STUDENT_TYPE && props.teaching.data.length === 0) ||
      props.userType === TEACHER_TYPE ? (
        <FAB
          style={styles.fab}
          small={false}
          color='white'
          icon={props => <Icon name='add' {...props} />}
          onPress={() => {
            props.navigation.navigate('EducationInformation');
          }}
        />
      ) : null}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  teaching: makeSelectTeachingInformations(),
  userType: makeSelectUserType(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadTeachingInformations: (page: number) =>
      dispatch(loadTeachingInformations(page))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(TeachingInformationPage);
