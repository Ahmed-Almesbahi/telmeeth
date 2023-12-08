/**
 *
 * ProfilePage
 *
 */

import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import saga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer, {
  loadProfiles,
  makeSelectProfiles,
  updateProfile
} from './ducks';

import { Helmet } from '../../components/Helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import styles from './styles';

import messages from './messages';

import { ProfilePageProps } from './types';
import LoadingIndicator from '../../components/LoadingIndicator';

import ProfileForm from './Formik';
import Header from './header';
import { makeSelectUserType } from '../User/ducks';

const ProfilePage = (props: ProfilePageProps) => {
  // useInjectReducer({ key: "profile", reducer });
  useInjectSaga({ key: 'profilePage', saga });
  useEffect(() => {
    props.loadProfiles();
  }, []);

  if (props.profile.loading) {
    return (
      <>
        <Header navigation={props.navigation} children={null} />
        <LoadingIndicator />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='PERSONAL PROFILE'
        defaultTitle='Description of PERSONAL PROFILE'
      />

      <ProfileForm
        profile={props.profile}
        userType={props.userType}
        intl={props.intl}
        onSubmit={props.onSubmit}
        navigation={props.navigation}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfiles(),
  userType: makeSelectUserType()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadProfiles: () => dispatch(loadProfiles()),
    onSubmit: (data: any, action: any) => dispatch(updateProfile(data, action))
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
)(ProfilePage);
