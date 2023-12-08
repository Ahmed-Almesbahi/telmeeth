/**
 *
 * InvitePage
 *
 */

import React, { memo, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from './saga';

import { Helmet } from '../../components/Helmet';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import { Appbar, Headline, List, Surface } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import { GlobalStyle, Text } from '../../components';
import Share from './share';

import styles from './styles';

import reducer, { loadInvites, makeSelectInvites } from './ducks';
import { makeSelectUser } from '../User/ducks';
import { initialStateUserType } from '../User/types';
import { InvitePageProps } from './types';
import { DrawerActions } from 'react-navigation-drawer';
import Responsive from '../../components/Responsive';

const InvitePage = ({
  invites,
  loadInvites,
  user,
  intl,
  ...props
}: InvitePageProps) => {
  // useInjectReducer({ key: "invites", reducer });
  useInjectSaga({ key: 'invitePage', saga });
  useEffect(() => {
    loadInvites();
  }, []);
  // const openDrawer: any = React.useContext(DrawerContext);
  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='INVITATIONS'
        defaultTitle='Description of INVITATIONS'
      />
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
          title={<FormattedMessage {...messages.invitation} />}
          color='white'
        />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={[GlobalStyle.alignCenter, { marginBottom: 20 }]}>
            <Text style={GlobalStyle.textAlignCenter}>
              <FormattedMessage {...messages.earnCredit} />
            </Text>
            <View style={styles.code}>
              <Headline>{user.invitation_code}</Headline>
            </View>
            <Share
              title={intl.formatMessage(messages.shareTitle, {
                invitation_code: user.invitation_code
              })}
              shareUrl='https://telmeeth.com'
            />
          </View>
          <View>
            <Surface style={styles.surface}>
              <List.Item
                title={<FormattedMessage {...messages.yourCredit} />}
                titleStyle={{ textAlign: 'center', color: 'white' }}
                style={{ backgroundColor: '#afaeae' }}
              />
            </Surface>
            <Surface style={styles.surface}>
              <List.Item
                title={<FormattedMessage {...messages.studentsHours} />}
                right={() => (
                  <Text style={styles.marginTop8}>
                    {invites.data.total_student_lessons} (
                    {invites.data.current_student_lesson_count}/
                    {invites.data.student_lesson_limit})
                  </Text>
                )}
              />
            </Surface>
            <Surface style={styles.surface}>
              <List.Item
                title={<FormattedMessage {...messages.teacherHours} />}
                right={() => (
                  <Text style={styles.marginTop8}>
                    {invites.data.total_teacher_lessons} (
                    {invites.data.current_teacher_lesson_count}/
                    {invites.data.teacher_lesson_limit})
                  </Text>
                )}
              />
            </Surface>
            <Surface style={styles.surface}>
              <List.Item
                title={<FormattedMessage {...messages.creditEarned} />}
                right={() => (
                  <Text style={styles.marginTop8}>
                    {invites.data.credit_earned}
                    <FormattedMessage {...messages.currency} />
                  </Text>
                )}
              />
            </Surface>
            <Surface style={styles.surface}>
              <List.Item
                title={<FormattedMessage {...messages.creditSpent} />}
                right={() => (
                  <Text style={styles.marginTop8}>
                    {invites.data.credit_spent}
                    <FormattedMessage {...messages.currency} />
                  </Text>
                )}
              />
            </Surface>
            <Surface style={styles.surface}>
              <List.Item
                title={<FormattedMessage {...messages.creditBalance} />}
                right={() => (
                  <Text style={styles.marginTop8}>
                    {invites.data.credit_balance}
                    <FormattedMessage {...messages.currency} />
                  </Text>
                )}
              />
            </Surface>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

InvitePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  invites: makeSelectInvites(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadInvites: () => dispatch(loadInvites()),
    dispatch
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
)(InvitePage);
