/**
 *
 * ChangeMobilePage
 *
 */

import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';

// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { connect } from 'react-redux';
// import { useInjectReducer } from 'utils/injectReducer';
import reducer, {
  makeSelectChangeMobilePage,
  updateMobileNumber
} from './ducks';
import { ChangeMobilePageProps } from './types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import FormChangeMobilePage from './formik';

import { Appbar } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { Helmet } from '../../components/Helmet';

import styles from './styles';

const ChangeMobilePage = (props: ChangeMobilePageProps) => {
  // useInjectReducer({ key: 'changeMobilePage', reducer });
  useInjectSaga({ key: 'changeMobilePage', saga });
  // const openDrawer = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <FormChangeMobilePage
        intl={props.intl}
        onSubmit={props.onSubmit}
        navigation={props.navigation}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  changeMobilePage: makeSelectChangeMobilePage()
});

function mapDispatchToProps(dispatch: any) {
  return {
    onSubmit: (data: any, action: any) =>
      dispatch(updateMobileNumber(data, action))
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
)(ChangeMobilePage);
