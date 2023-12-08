/**
 *
 * PaymentPage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from '../../components/Helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import styles from './styles';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';
import messages from './messages';

import {
  Appbar,
  List,
  Avatar,
  Surface,
  Divider,
  ActivityIndicator
} from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import NoRecords from '../../components/NoRecords';
import { UPLOAD_URL } from '../../utils/constants';
import { ROUTE_PAYMENT } from '../../Router';
import { SelectPaymentPageProps } from './types';
import { banksLoad, makeSelectBanksPage, getBankDetails } from './ducks';
import LoadingIndicator from '../../components/LoadingIndicator';
import Responsive from '../../components/Responsive';

const SelectPaymentPage: React.SFC<SelectPaymentPageProps> = props => {
  // useInjectReducer({ key: "paymentPage", reducer });
  useInjectSaga({ key: 'paymentPage', saga });
  useEffect(() => {
    props.banksLoad();
  }, []);
  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='SELECT BANK'
        defaultTitle='Description of SELECT BANK'
      />
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
          title={<FormattedMessage {...messages.selectBank} />}
          color='white'
        />
      </Appbar.Header>
      {props.banks.loading ? (
        <LoadingIndicator />
      ) : props.banks.data.length > 0 ? (
        <ScrollView style={styles.bodyContainer}>
          {props.banks.data.map(d => (
            <>
              <List.Item
                key={d.bank_id}
                title={d.bank_name}
                onPress={() => {
                  props.getBankDetails(d.bank_id);
                }}
                left={props => (
                  <Avatar.Image
                    {...props}
                    size={40}
                    source={{
                      // uri: UPLOAD_URL + '/bank_logos/' + d.bank_logo
                      uri: d.bank_logo
                    }}
                  />
                )}
                right={p =>
                  props.banks.bankLoading &&
                  props.banks.selectedBank.bank_id === d.bank_id ? (
                    <ActivityIndicator animating={true} size='small' />
                  ) : null
                }
              />
              <Divider />
            </>
          ))}
        </ScrollView>
      ) : (
        <NoRecords />
      )}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  banks: makeSelectBanksPage()
});

function mapDispatchToProps(dispatch: any) {
  return {
    banksLoad: () => dispatch(banksLoad()),
    getBankDetails: (bank_id: any) => dispatch(getBankDetails(bank_id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(SelectPaymentPage);
