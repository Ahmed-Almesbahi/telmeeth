/**
 *
 * SingleInvoicePage
 *
 */

import React, { memo, useState } from 'react';
import { View, ScrollView } from 'react-native';

// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { connect } from 'react-redux';
// import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectSingleInvoicePage,
  likeTeacher,
  rateTeacher,
  receivedPayment
} from './ducks';
import { SingleInvoicePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import {
  Appbar,
  DataTable,
  Surface,
  Avatar,
  IconButton
} from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { Helmet } from '../../components/Helmet';

import styles from './styles';
import { H1, Button, H2, Text, Small } from '../../components';
import { makeSelectUserType } from '../User/ducks';
import { TEACHER_TYPE, STUDENT_TYPE } from '../../utils/constants';
import { ROUTE_HOME_TEACHER, ROUTE_HOME_STUDENT } from '../../Router';
import { themeTeacher, themeStudent } from '../App/themes';
import StarRating from '../../components/StarRating';
import { makeSelectLocale } from '../LanguagePage/ducks';

const SingleInvoicePage: React.SFC<SingleInvoicePageProps> = props => {
  const [state, setState] = useState({
    starCount: 0
  });
  // useInjectReducer({ key: 'singleInvoicePage', reducer });
  // useInjectSaga({ key: 'singleInvoicePage', saga });
  // const openDrawer: any = React.useContext(DrawerContext);
  const onStarRatingPress = (rating: number) => {
    props.rateTeacher(data.teacher_id, data.item_id, data.lesson_id, rating);
    setState({
      starCount: rating
    });
  };
  const { data } = props.singleInvoice;
  //   const data = {
  //     unique_id: 'I000742',
  //     order_id: 26,
  //     teacher_id: 4216,
  //     lesson_id: 742,
  //     original_amt: 735,
  //     creditearn_discount: 0,
  //     total_amount: 735,
  //     promocode_discount: 0,
  //     total_hours: '08:10',
  //     subject_name: 'Tawheed',
  //     lesson_actual_start_time: '12:51 AM',
  //     lesson_actual_end_time: '09:01 AM',
  //     actual_number_of_students: 1,
  //     lesson_date: '2019-07-24',
  //     teaching_type_name: 'Individual',
  //     teaching_location: 'Student Home'
  //   };

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='LAST LESSON'
        defaultTitle='Description of LAST LESSON'
      />

      <Appbar.Header>
        <Appbar.Action
          color='white'
          icon='menu'
          onPress={() => props.navigation.openDrawer()}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.lastLesson} />}
          color='white'
        />
        <Appbar.Action
          icon='close'
          color='white'
          onPress={() => {
            props.navigation.navigate(
              props.userType === TEACHER_TYPE ? 'HomeTeacher' : 'HomeStudent'
            );
          }}
        />
      </Appbar.Header>

      <ScrollView style={styles.bodyContainer}>
        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <H1 gray>
            <FormattedMessage {...messages.yourLastLesson} />
          </H1>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderColor: '#aaaaaa',
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
            marginBottom: 5
          }}
        >
          <View
            style={{ alignItems: 'center', marginTop: -60, marginBottom: 20 }}
          >
            <Avatar.Icon size={70} icon='person' />
          </View>
          {props.userType === STUDENT_TYPE ? (
            <View style={{ alignItems: 'flex-end', marginTop: -50 }}>
              <IconButton
                icon='thumb-up'
                color={themeStudent.colors.primary}
                size={20}
                onPress={() => {
                  props.likeTeacher(data.teacher_id);
                }}
              />
            </View>
          ) : null}

          <Surface style={{ elevation: 3, marginBottom: 20 }}>
            <DataTable>
              <DataTable.Row style={{ minHeight: 40 }}>
                <DataTable.Cell>
                  <Small gray>
                    <FormattedMessage {...messages.originalCost} />
                  </Small>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Small>
                    : <FormattedMessage {...messages.SR} /> {data.original_amt}
                  </Small>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{ minHeight: 40 }}>
                <DataTable.Cell>
                  <Small gray>
                    <FormattedMessage {...messages.promoDiscount} />
                  </Small>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Small>
                    : -<FormattedMessage {...messages.SR} />{' '}
                    {data.promocode_discount}
                  </Small>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{ minHeight: 40 }}>
                <DataTable.Cell>
                  <Small gray>
                    <FormattedMessage {...messages.earnedDiscount} />
                  </Small>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Small>
                    : -<FormattedMessage {...messages.SR} />
                    {data.creditearn_discount}
                  </Small>
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={{ minHeight: 40 }}>
                <DataTable.Cell>
                  <Text style={{ fontWeight: 'bold' }}>
                    <FormattedMessage {...messages.net} />
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  :
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color:
                        props.userType === TEACHER_TYPE
                          ? themeTeacher.colors.primary
                          : themeStudent.colors.primary
                    }}
                  >
                    <FormattedMessage {...messages.SR} /> {data.total_amount}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Surface>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10
            }}
          >
            <H2>{props.language === 'ar' ? data.name_ar : data.name}</H2>
            <H2>{data.total_hours}</H2>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10
            }}
          >
            <Text gray>{data.lesson_date}</Text>
            <Text gray>{data.teaching_type_name}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Small gray>
              {data.lesson_actual_start_time} - {data.lesson_actual_end_time}
            </Small>
            <Text gray>
              {data.actual_number_of_students}{' '}
              <FormattedMessage {...messages.student} />
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <H1>
              <FormattedMessage {...messages.invoice} /> :{data.unique_id}
            </H1>
          </View>
        </View>

        {props.userType === TEACHER_TYPE ? (
          <Button
            theme={{ ...themeTeacher, roundness: 10 }}
            contentStyle={{ width: '100%' }}
            onPress={() => {
              props.receivedPayment(data.lesson_id);
            }}
          >
            <FormattedMessage {...messages.received} />
          </Button>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ marginBottom: 10 }}>
              <FormattedMessage {...messages.rateYourTeacher} />
            </Text>
            <StarRating
              starSize={30}
              maxStars={5}
              rating={state.starCount}
              fullStarColor={
                props.userType === TEACHER_TYPE
                  ? themeTeacher.colors.primary
                  : themeStudent.colors.primary
              }
              selectedStar={rating => onStarRatingPress(rating)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  singleInvoice: makeSelectSingleInvoicePage(),
  userType: makeSelectUserType(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    receivedPayment: (lesson_id: number) =>
      dispatch(receivedPayment(lesson_id)),
    rateTeacher: (
      teacher_id: number,
      item_id: number,
      lesson_id: number,
      rating: number
    ) => dispatch(rateTeacher(teacher_id, item_id, lesson_id, rating)),
    likeTeacher: (teacher_id: number) => dispatch(likeTeacher(teacher_id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SingleInvoicePage);
