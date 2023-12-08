/**
 *
 * InvoicePage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, FlatList, Button } from 'react-native';
import PropTypes from 'prop-types';
import { Helmet } from '../../components/Helmet';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import reducer, { loadInvoices, makeSelectInvoices } from './ducks';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';

import { Appbar, ActivityIndicator } from 'react-native-paper';

import { DrawerContext } from '../../hooks/useDrawerContext';
import Invoice from './invoice';
import NoRecords from '../../components/NoRecords';

import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { InvoicePageProps } from './types';
import { makeSelectUserType } from '../User/ducks';
import { makeSelectLocale } from '../LanguagePage/ducks';
import { Text } from '../../components';
import { DrawerActions } from 'react-navigation-drawer';
import Responsive from '../../components/Responsive';

let page = 0;

const InvoicePage: React.SFC<InvoicePageProps> = props => {
  useInjectSaga({ key: 'invoicePage', saga });
  // useInjectReducer({ key: "invoices", reducer });
  useEffect(() => {
    props.loadInvoies(page);
  }, []);

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!props.invoices.loading) return null;
    return <ActivityIndicator animating={true} />;
  };

  const handleLoadMore = () => {
    if (!props.invoices.loading) {
      page = page + 1; // increase page by 1
      props.loadInvoies(page); // method for API call
    }
  };

  const content = () => {
    if (props.invoices.error != '' && page === 0) {
      return (
        <View
          style={[
            styles.bodyContainer,
            {
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          <Text>{props.invoices.error}</Text>
        </View>
      );
    }

    if (!props.invoices.loaded && page === 0) {
      return <LoadingIndicator />;
    }

    if (props.invoices.data.length > 0) {
      return (
        <View style={styles.bodyContainer}>
          <FlatList
            data={props.invoices.data}
            extraData={props.invoices}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.isRefreshing}
            //     onRefresh={this.onRefresh.bind(this)}
            //   />
            // }
            renderItem={({ item }) => (
              <Invoice
                data={item}
                userType={props.userType}
                language={props.language}
              />
            )}
            keyExtractor={(data, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.4}
            onEndReached={handleLoadMore}
          />
        </View>
      );
    } else {
      return <NoRecords />;
    }
  };

  return (
    <View style={styles.container}>
      <Helmet titleTemplate='INVOICES' defaultTitle='Description of INVOICES' />
      <Appbar.Header>
        {/* <Appbar.Action
          icon='menu'
          onPress={() => {
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
          color='white'
        /> */}
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
          title={<FormattedMessage {...messages.invoices3} />}
          color='white'
        />
      </Appbar.Header>
      {content()}
    </View>
  );
};

// InvoicePage.navigationOptions = ({ navigation, ...props }) => {
//   return {
//     headerTitle:
//       typeof navigation.state.params === 'undefined' ||
//       typeof navigation.state.params.headerTitle === 'undefined'
//         ? 'INVOICES'
//         : navigation.state.params.headerTitle,
//     headerLeft: () => (
//       <Button
//         onPress={() => alert('This is a button!')}
//         title='Info'
//         color='red'
//       />
//     )
//   };
// };

const mapStateToProps = createStructuredSelector({
  invoices: makeSelectInvoices(),
  userType: makeSelectUserType(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadInvoies: (page: number) => dispatch(loadInvoices(page))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl
)(InvoicePage);
