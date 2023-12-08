/**
 *
 * EducationInformation
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import { compose } from '../../utils/helper';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';
import reducer, {
  makeSelectItems,
  loadItems,
  loadChildItems,
  saveEducationInformation,
  loadParentItems,
  deleteEducationInformation,
  saveOtherEducationInformation
} from './ducks';
import { useInjectReducer } from '../../utils/injectReducer';
import { EducationInformationPageProps } from './types';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

import Dropdown from '../../components/SelectPicker';
import {
  Appbar,
  HelperText,
  Button as Buttonx,
  Portal,
  Dialog,
  Paragraph
} from 'react-native-paper';
import { Button } from '../../components';
import { Helmet } from '../../components/Helmet';
import styles from './styles';
import LoadingIndicator from '../../components/LoadingIndicator';
import { ROUTE_TEACHING_INFORMATION } from '../../Router';
import { getItemId } from './utils';
import ItemsList from './itemsList';
import { makeSelectUserType } from '../User/ducks';
import { makeSelectLanguage, makeSelectLocale } from '../LanguagePage/ducks';

const EducationInformation: React.SFC<
  EducationInformationPageProps
> = props => {
  // useInjectReducer({ key: "items", reducer });
  useInjectSaga({ key: 'educationInformation', saga });

  const [state, setState] = useState({
    visible: false,
    loading: false,
    fadeVisible: true,
    imageIndex: 0,
    isImageViewVisible: false
  });

  const _showDialog = () => setState({ ...state, visible: true });
  const _hideDialog = () => setState({ ...state, visible: false });

  useEffect(() => {
    props.loadItems();

    if (props.navigation.getParam('id', 0)) {
      props.loadParentItems(props.navigation.getParam('id', 0));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Helmet
        titleTemplate='EDUCATION INFORMATION'
        defaultTitle='Description of EDUCATION INFORMATION'
      />
      <Appbar.Header>
        <Appbar.BackAction
          color='white'
          onPress={() => {
            props.navigation.push('TeachingInformation');
          }}
        />
        <Appbar.Content
          title={<FormattedMessage {...messages.educationInformation} />}
          color='white'
        />
        {props.navigation.getParam('id', 0) ? (
          <Buttonx
            mode='text'
            loading={props.items.isSubmitting}
            // disabled={!props.items.readyToSubmit}
            onPress={_showDialog}
            color='white'
          >
            <FormattedMessage {...messages.delete} />
          </Buttonx>
        ) : null}
      </Appbar.Header>
      {props.items.loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={styles.bodyContainer}>
          <Dropdown
            label={<FormattedMessage {...messages.educationInformation} />}
            placeholder='Select Education Information'
            selected={props.items.selectedRoot}
            onSelect={(parent_id: number | string) => {
              const p_id =
                typeof parent_id === 'string'
                  ? parseFloat(parent_id)
                  : parent_id;
              props.loadChildItems(p_id);
            }}
            options={props.items.data.map(d => {
              return {
                value: d.id,
                label: props.language === 'ar' ? d.name_ar : d.name
              };
            })}
          />
          {[1, 2, 3, 4].map((value, index) => {
            return (
              <ItemsList
                key={value}
                items={props.items}
                userType={props.userType}
                level={value}
                intl={props.intl}
                language={props.language}
                onSubmit={(parent_id, item_name, action) => {
                  return props.saveOtherEducationInformation(
                    parent_id,
                    item_name,
                    action
                  );
                }}
                loadChildItems={props.loadChildItems}
              />
            );
          })}
        </ScrollView>
      )}
      <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
        <Button
          contentStyle={styles.contentStyleButton}
          onPress={() => {
            props.saveEducationInformation(
              props.navigation.getParam('id', 0)
                ? parseFloat(props.navigation.getParam('id', 0))
                : 0,
              getItemId(props)
            );
          }}
          loading={props.items.isSubmitting}
          disabled={!props.items.readyToSubmit}
        >
          <FormattedMessage {...messages.submit} />
        </Button>
        <HelperText
          type='error'
          visible={props.items.error != '' ? true : false}
        >
          {props.items.error}
        </HelperText>
      </View>

      <Portal>
        <Dialog visible={state.visible} onDismiss={_hideDialog}>
          <Dialog.Content>
            <Paragraph>
              <FormattedMessage {...messages.sureToDelete} />
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode='text' onPress={_hideDialog}>
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button
              mode='text'
              onPress={() => {
                setState({
                  ...state,
                  visible: false,
                  loading: true,
                  fadeVisible: false
                });
                props.deleteEducationInformation(
                  parseFloat(props.navigation.getParam('id', 0))
                );
              }}
            >
              <FormattedMessage {...messages.confirm} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectItems(),
  userType: makeSelectUserType(),
  language: makeSelectLocale()
});

function mapDispatchToProps(dispatch: any) {
  return {
    loadItems: () => dispatch(loadItems()),
    loadParentItems: (education_information_id: string) =>
      dispatch(loadParentItems(education_information_id)),
    deleteEducationInformation: (education_information_id: number) =>
      dispatch(deleteEducationInformation(education_information_id)),
    saveEducationInformation: (
      education_information_id: number,
      item_id: number
    ) => dispatch(saveEducationInformation(education_information_id, item_id)),
    saveOtherEducationInformation: (
      parent_id: number,
      item_name: string,
      action: any
    ) => dispatch(saveOtherEducationInformation(parent_id, item_name, action)),
    loadChildItems: (parent_id: number) => dispatch(loadChildItems(parent_id))
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
)(EducationInformation);
