/**
 *
 * PaymentPage
 *
 */

import React, { memo, useState, useRef, createRef } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from '../../components/Helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
// import makeSelectPaymentPage from './selectors';
// import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Platform } from '../../components/Platform';

import {
  Appbar,
  Surface,
  List,
  Divider,
  TextInput,
  Button,
  Avatar,
  HelperText
} from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { MaterialCommunityIcons, Small, Text, H1, H2 } from '../../components';
// import DatePicker from '../../components/DatePicker';
import { ROUTE_SELECT_PAYMENT } from '../../Router';
import { makeSelectBanksPage } from '../SelectPaymentPage/ducks';
import { PaymentPageProps } from './types';
import PaymentForm from './Formik';
import { postPayment } from './ducks';

const PaymentPage: React.SFC<PaymentPageProps> = props => {
  // useInjectReducer({ key: 'paymentPage', reducer });
  useInjectSaga({ key: 'paymentPage', saga });
  // const openDrawer: any = React.useContext(DrawerContext);

  // const _formik = useRef(null);
  const _formik: any = createRef();

  const bankDetails = props.banks.data.filter(
    d => d.bank_id === props.banks.selected.bank_id
  );

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='PAYMENT' defaultTitle='Description of PAYMENT' />
      <Appbar.Header>
        <Appbar.BackAction
          // icon="menu"
          color='white'
          onPress={() => {
            props.navigation.push('SelectPayment');
          }}
        />
        {/* <Appbar.Action icon="menu" onPress={() => props.navigation.openDrawer()} color="white" /> */}
        <Appbar.Content
          title={<FormattedMessage {...messages.payment} />}
          color='white'
        />
        <Appbar.Action
          icon='done'
          onPress={() => {
            _formik.current.submitForm();
          }}
          color='white'
        />
      </Appbar.Header>
      <ScrollView style={styles.bodyContainer}>
        <Surface style={styles.surface}>
          <List.Item
            // style={{ padding: 0 }}
            // title={bankDetails[0].bank_name}
            title={'Teleemth Company'}
            description={() => (
              <>
                <Text gray>{bankDetails[0].telmeeth_ac_no}</Text>
                <Text gray>{bankDetails[0].iban_number}</Text>
              </>
            )}
            left={props => (
              <View style={{ justifyContent: 'center' }}>
                <Avatar.Image
                  size={40}
                  source={{
                    // uri: UPLOAD_URL + '/bank_logos/' + d.bank_logo
                    uri: bankDetails[0].bank_logo
                  }}
                />
              </View>

              // <List.Icon
              //   {...props}
              //   icon={p => <MaterialCommunityIcons {...p} name='bank' />}
              // />
            )}
          />
        </Surface>
        <Surface style={styles.surface}>
          <List.Item
            // style={{ padding: 0 }}
            // title={bankDetails[0].bank_name}
            title={<Text gray>{bankDetails[0].tax_number}</Text>}
            left={props => (
              <View style={{ justifyContent: 'center' }}>
                <Text gray>Tax Number:</Text>
              </View>

              // <List.Icon
              //   {...props}
              //   icon={p => <MaterialCommunityIcons {...p} name='bank' />}
              // />
            )}
          />
        </Surface>

        <Surface style={styles.surface}>
          <View style={[styles.flexDirectionRow, { paddingVertical: 10 }]}>
            <View style={styles.flex1}>
              <Small gray>{<FormattedMessage {...messages.total} />}</Small>
              <Small gray>{<FormattedMessage {...messages.amount} />}</Small>
            </View>
            <View style={styles.flex1}>
              <Small gray>{<FormattedMessage {...messages.balance} />}</Small>
            </View>
            <View style={styles.flex1}>
              <Small gray>{<FormattedMessage {...messages.myCredit} />}</Small>
            </View>
            <View style={styles.flex1}>
              <Small gray>{<FormattedMessage {...messages.student} />}</Small>
              <Small gray>{<FormattedMessage {...messages.promo} />}</Small>
            </View>
          </View>

          <View style={[styles.flexDirectionRow, { paddingBottom: 10 }]}>
            <View style={styles.flex1}>
              <Text>{props.banks.selected.orginal_due_amount}</Text>
            </View>
            <View style={styles.flex1}>
              <Text>{props.banks.selected.teacher_balance}</Text>
            </View>
            <View style={styles.flex1}>
              <Text>{props.banks.selected.teacher_credit}</Text>
            </View>
            <View style={styles.flex1}>
              <Text>{props.banks.selected.student_credit}</Text>
            </View>
          </View>

          <Divider />

          <View style={{ padding: 10 }}>
            {/* <View style={styles.flex1}>
              <Text>
                
              </Text>
            </View> */}
            <View style={[styles.flexDirectionRow]}>
              <View style={{ marginTop: 8 }}>
                <FormattedMessage {...messages.dueAmount} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 4,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      borderRightWidth: 1,
                      borderRightColor: 'gray',
                      marginHorizontal: 10,
                      paddingRight: 10
                    }}
                  >
                    <Text>SR</Text>
                  </View>
                  <View style={{ paddingVertical: 5 }}>
                    <H2 style={{ color: 'red' }}>
                      {props.banks.selected.due_amount}
                    </H2>
                  </View>
                </View>

                <Text style={{ marginTop: 10 }}>
                  {props.banks.selected.payment_step}
                </Text>
              </View>
            </View>
          </View>
        </Surface>

        <PaymentForm
          ref={_formik}
          data={props.banks.selected}
          bank={props.banks.selectedBank}
          intl={props.intl}
          onSubmit={(values: any, action: any) => {
            if (Platform.OS == 'web') {
              // TODO: fix loop
              let formdata = new FormData();
              values.map((v: any, k: any) => {
                formdata.append(k, v);
              });
              props.postPayment(formdata);
            } else {
              let newData = [];
              // console.log('valuesvalues', values);
              for (var k in values) {
                if (values.hasOwnProperty(k)) {
                  if (k == 'document') {
                    newData.push({
                      ...values[k]
                    });
                  } else {
                    newData.push({
                      name: k,
                      data: values[k]
                    });
                  }
                }
              }

              props.postPayment(newData);
            }

            // console.log('_formik', _formik);
          }}
          // onSubmit={props.onSubmit}
          navigation={props.navigation}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  // paymentPage: makeSelectPaymentPage(),
  banks: makeSelectBanksPage()
});

function mapDispatchToProps(dispatch: any) {
  return {
    postPayment: (data: any) => dispatch(postPayment(data))
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
)(PaymentPage);
