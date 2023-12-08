/**
 *
 * AttachmentPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Helmet } from '../../components/Helmet';
import { FormattedMessage, injectIntl } from 'react-intl';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer, {
  makeSelectAttachments,
  loadAttachments,
  uploadAttachment
} from './ducks';
import saga from './saga';

import messages from './messages';

import { Appbar } from 'react-native-paper';
import { ROUTE_SETTINGS } from '../../Router';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Form from './form';
import { themeTeacher } from '../App/themes';

import styles from './styles';
import { AttachmentPageProps } from './types';
import LoadingIndicator from '../../components/LoadingIndicator';
import { FONT } from '../../utils/constants';
import { Text } from '../../components';

const AttachmentPage: React.SFC<AttachmentPageProps> = props => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'id', title: props.intl.formatMessage(messages.ID) },
      {
        key: 'personal',
        title: props.intl.formatMessage(messages.personalPicture)
      },
      {
        key: 'certificate',
        title: props.intl.formatMessage(messages.certificate)
      },
      { key: 'other', title: props.intl.formatMessage(messages.other) }
    ]
  });

  // useInjectReducer({ key: "attachments", reducer });
  useInjectSaga({ key: 'attachmentPage', saga });
  useEffect(() => {
    props.loadAttachments();
  }, []);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='Attachments'
        defaultTitle='Description of Attachments'
      />
      <Appbar.Header>
        <Appbar.BackAction
          // icon="menu"
          color='white'
          onPress={() => {
            // props.push(ROUTE_SETTINGS);
            props.navigation.goBack();
          }}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.Attachments} />}
          color='white'
        />
      </Appbar.Header>
      {props.attachments.loading ? (
        <LoadingIndicator />
      ) : (
        <TabView
          // labelStyle={{ borderWidth: 1, borderColor: 'red' }}

          navigationState={state}
          renderScene={SceneMap({
            id: () => (
              <Form
                data={props.attachments.id}
                uploadAttachment={props.uploadAttachment}
                intl={props.intl}
              />
            ),
            personal: () => (
              <Form
                data={props.attachments.personal}
                uploadAttachment={props.uploadAttachment}
                intl={props.intl}
              />
            ),
            certificate: () => (
              <Form
                data={props.attachments.certificate}
                uploadAttachment={props.uploadAttachment}
                intl={props.intl}
              />
            ),
            other: () => (
              <Form
                data={props.attachments.other}
                uploadAttachment={props.uploadAttachment}
                intl={props.intl}
              />
            )
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: themeTeacher.colors.primary
              }}
              renderLabel={({ route, focused, color }: any) => (
                <Text
                  style={{
                    color,

                    fontSize: 12,
                    textAlign: 'center',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    padding: 0,
                    marginTop: 8,
                    marginBottom: 8,
                    width: '100%'
                  }}
                  // numberOfLines={1}
                >
                  {route.title}
                </Text>
              )}
              activeColor='black'
              inactiveColor='gray'
              style={{ backgroundColor: 'white' }}
              labelStyle={{
                color: 'black'
              }}
            />
          )}
          onIndexChange={index => setState({ ...state, index })}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
        />
      )}

      {/* <ScrollView style={styles.bodyContainer}>
        <FormattedMessage {...messages.header} />
      </ScrollView> */}
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  attachments: makeSelectAttachments()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadAttachments: () => dispatch(loadAttachments()),
    uploadAttachment: (data: any) => dispatch(uploadAttachment(data))
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
)(AttachmentPage);
