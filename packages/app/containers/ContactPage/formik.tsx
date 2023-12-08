import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormContactPageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import { DrawerContext } from '../../hooks/useDrawerContext';
import Dropdown from '../../components/SelectPicker';
import { compose } from 'redux';
import { DrawerActions } from 'react-navigation-drawer';
import Responsive from '../../components/Responsive';

const FormContactPage: React.SFC<FormContactPageProps> = ({
  intl,
  onSubmit,
  navigation
}) => {
  const DefaultFields = {
    contact_type: '',
    contact_description: ''
  };
  const Schema = yup.object().shape({
    contact_type: yup
      .string()
      .required(intl.formatMessage(messages.subjectRequired)),
    contact_description: yup
      .string()
      .required(intl.formatMessage(messages.messageRequired))
  });

  // const openDrawer: any = React.useContext(DrawerContext);

  return (
    <Formik
      initialValues={DefaultFields}
      validationSchema={Schema}
      render={({
        values,
        errors,
        error,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => {
        return (
          <>
            <Header
              navigation={navigation}
              title={intl.formatMessage(messages.contactUs)}
              left={
                <Responsive
                  large={
                    <Appbar.Action
                      icon='menu'
                      onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer());
                      }}
                      color='white'
                    />
                  }
                  xlarge={null}
                />
              }
            >
              <Buttonx
                theme={{ colors: { primary: 'white' } }}
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                <FormattedMessage {...messages.submit} />
              </Buttonx>
            </Header>

            <ScrollView style={styles.bodyContainer}>
              <Dropdown
                label={intl.formatMessage(messages.subject)}
                placeholder='Select Subject'
                selected={values.contact_type}
                onSelect={(value: string | number) => {
                  setFieldValue('contact_type', value);
                  // props.loadChildItems(value);
                }}
                options={[
                  {
                    label: intl.formatMessage(messages.suggestion),
                    value: 'Suggestion'
                  },
                  {
                    label: intl.formatMessage(messages.complaints),
                    value: 'Complaints'
                  }
                ]}
              />
              <HelperText
                type='error'
                visible={
                  errors.contact_type && touched.contact_type ? true : false
                }
              >
                {errors.contact_type}
              </HelperText>

              <TextInput
                // id='username'
                style={styles.textInput}
                onChangeText={handleChange('contact_description')}
                onBlur={handleBlur('contact_description')}
                multiline
                numberOfLines={5}
                error={
                  errors.contact_description && touched.contact_description
                    ? true
                    : false
                }
                value={values.contact_description}
                label={intl.formatMessage(messages.writeHere)}
              />
              <HelperText
                type='error'
                visible={
                  errors.contact_description && touched.contact_description
                    ? true
                    : false
                }
              >
                {errors.contact_description}
              </HelperText>

              <HelperText type='error' visible={error}>
                {error}
              </HelperText>
            </ScrollView>
          </>
        );
      }}
      onSubmit={onSubmit}
    />
  );
};

export default compose(injectIntl)(FormContactPage);
