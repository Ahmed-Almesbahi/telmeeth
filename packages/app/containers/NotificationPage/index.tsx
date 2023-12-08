/**
 *
 * NotificationPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from '../../components/Helmet';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import styles from './styles';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Appbar, ActivityIndicator } from 'react-native-paper';
import { DrawerContext } from '../../hooks/useDrawerContext';
import Notficiaton from './notification';
import NoRecords from '../../components/NoRecords';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  NOTIFICATION_TYPE_REQUEST_TEACHER,
  NOTIFICATION_TYPE_CANCEL_REQUEST,
  NOTIFICATION_TYPE_BOOKED_REQUEST,
  NOTIFICATION_TYPE_SETTING,
  NOTIFICATION_TYPE_PAYMENT,
  NOTIFICATION_TYPE_ONMYWAY,
  TEACHER_TYPE
} from '../../utils/constants';
import { makeSelectUserType } from '../User/ducks';
import {
  ROUTE_SETTINGS,
  ROUTE_HOME_TEACHER,
  ROUTE_HOME_STUDENT,
  ROUTE_REQUEST
} from '../../Router';
import reducer, {
  loadNotifications,
  makeSelectNotifications,
  deleteNotification,
  selectNotification
} from './ducks';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { NotificationPageProps } from './types';
import saga from './saga';
import { DrawerActions } from 'react-navigation-drawer';
import Responsive from '../../components/Responsive';

let page = 0;

const NotificationPage: React.SFC<NotificationPageProps> = props => {
  useInjectSaga({ key: 'notificationPage', saga });
  // useInjectReducer({ key: "notifications", reducer });

  useEffect(() => {
    props.loadNotifications(page);
  }, []);

  // const getNotifications = async (page = 0) => {
  //   props.loadNotifications(page);
  //   // setState({ ...state, loading: true });
  //   // try {
  //   //   const response = await API.getNotifications(page, 10);
  //   //   let listData = state.data;
  //   //   let data = listData.concat(response.data); //concate list with response
  //   //   setState({ ...state, loaded: true, loading: false, data: data });
  //   // } catch (e) {
  //   //   setState({
  //   //     ...state,
  //   //     loading: false,
  //   //     error: e.message
  //   //   });
  //   // }
  // };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!props.notifications.loading) return null;
    return <ActivityIndicator animating={true} />;
  };

  const handleLoadMore = () => {
    if (
      !props.notifications.loading &&
      props.notifications.stopLoading === false
    ) {
      page = page + 1; // increase page by 1
      console.log('page', page);
      props.loadNotifications(page); // method for API call
    }
  };

  const navigateToScreen = (data: any) => {
    switch (data.notification_type) {
      case NOTIFICATION_TYPE_REQUEST_TEACHER:
        if (data.is_previous) {
          //notificationScreenView.showErrorMessage(notificationScreenView.getActvity().getString(R.string.msg_lesson_not_accessible), true);
        } else {
          props.selectNotification(data);
          // TODO: Need to check this
          // props.push(ROUTE_REQUEST + '/' + data.notification_id);
          props.navigation.push('Request');
          //notificationScreenView.navigateToNewBookingRequest(notificationData);
        }
        break;
      case NOTIFICATION_TYPE_CANCEL_REQUEST:
      case NOTIFICATION_TYPE_BOOKED_REQUEST:
        if (data.is_previous) {
          // notificationScreenView.showErrorMessage(
          //   notificationScreenView
          //     .getActvity()
          //     .getString(R.string.msg_lesson_not_accessible),
          //   true
          // );
        } else {
          // notificationScreenView.navigateToBooking(notificationData);
        }
        break;
      case NOTIFICATION_TYPE_SETTING:
        props.navigation.push('Settings');
        // notificationScreenView.navigateToSetting();
        break;
      case NOTIFICATION_TYPE_PAYMENT:
        if (props.type === TEACHER_TYPE) {
          props.navigation.push('HomeTeacher');
        } else {
          props.navigation.push('HomeStudent');
        }
        break;
      case NOTIFICATION_TYPE_ONMYWAY:
        if (data.is_previous) {
          // notificationScreenView.showErrorMessage(
          //   notificationScreenView
          //     .getActvity()
          //     .getString(R.string.msg_lesson_not_accessible),
          //   true
          // );
        } else {
          if (props.type === TEACHER_TYPE) {
            props.navigation.push('HomeTeacher');
          } else {
            props.navigation.push('HomeStudent');
          }
        }
        break;
      default:
        if (props.type === TEACHER_TYPE) {
          props.navigation.push('HomeTeacher');
        } else {
          props.navigation.push('HomeStudent');
        }
        break;
    }
  };

  const content = () => {
    if (props.notifications.error != '' && page === 0) {
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
          <Text>{props.notifications.error}</Text>
        </View>
      );
    }

    if (!props.notifications.loaded && page === 0) {
      return <LoadingIndicator />;
    }

    if (props.notifications.data.length > 0) {
      return (
        <View style={styles.bodyContainer}>
          <FlatList
            data={props.notifications.data}
            extraData={props.notifications}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.isRefreshing}
            //     onRefresh={this.onRefresh.bind(this)}
            //   />
            // }
            renderItem={({ item }) => (
              <Notficiaton
                onPress={navigateToScreen}
                onDelete={(notification_id: number) =>
                  props.deleteNotification(notification_id)
                }
                data={item}
              />
            )}
            keyExtractor={(data: any, index: number) => index.toString()}
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

  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='NOTIFICATIONS'
        defaultTitle='Description of NotificationPage'
      />
      <Appbar.Header>
        {/* <Appbar.Action
          icon='menu'
          onPress={() => {
            // props.navigation.openDrawer()
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
          title={<FormattedMessage {...messages.notifications} />}
          color='white'
        />
      </Appbar.Header>
      {content()}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  notifications: makeSelectNotifications()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadNotifications: (page: number) => dispatch(loadNotifications(page)),
    deleteNotification: (notification_id: number) =>
      dispatch(deleteNotification(notification_id)),
    selectNotification: (data: any) => dispatch(selectNotification(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(NotificationPage);
