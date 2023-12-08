import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormChangeMobilePageProps } from './types';
import Header from '../../components/Header';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Appbar
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView } from 'react-native';
import { compose } from 'redux';
import { ROUTE_SETTINGS } from '../../Router';

const FormChangeMobilePage: React.SFC<FormChangeMobilePageProps> = ({
  intl,
  onSubmit,
  navigation,
  ...props
}) => {
  const DefaultFields = {
    mobile_no: ''
  };
  const Schema = yup.object().shape({
    mobile_no: yup
      .string()
      .matches(/^[5]\d{8}$/, intl.formatMessage(messages.betweenDigits))
      .required(intl.formatMessage(messages.mobile_noRequired))
  });

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
        isSubmitting
      }) => (
        <>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                // push(ROUTE_SETTINGS);
                navigation.goBack();
              }}
              color='white'
            />
            <Appbar.Content
              title={<FormattedMessage {...messages.title} />}
              color='white'
            />
            <Buttonx
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              color='white'
            >
              {intl.formatMessage(messages.save)}
            </Buttonx>
          </Appbar.Header>

          <View style={styles.bodyContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('mobile_no')}
              onBlur={handleBlur('mobile_no')}
              error={errors.mobile_no && touched.mobile_no ? true : false}
              value={values.mobile_no}
              label={intl.formatMessage(messages.mobile_no)}
            />
            <HelperText
              type='error'
              visible={errors.mobile_no && touched.mobile_no}
            >
              {errors.mobile_no}
            </HelperText>

            <HelperText type='error' visible={error}>
              {error}
            </HelperText>
          </View>
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};

export default FormChangeMobilePage;
