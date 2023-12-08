import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { PaymentFormProps } from './types';
import {
  TextInput,
  HelperText,
  Button as Buttonx,
  Surface,
  Divider
} from 'react-native-paper';
import styles from './styles';
import { View, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '../../components';
import { TEACHER_TYPE } from '../../utils/constants';
import DateTimePicker from '../../components/DateTimePicker';
import { Platform } from '../../components/Platform';
import moment from 'moment';
import Dropdown from '../../components/SelectPicker';
import { compose } from 'redux';

import ImagePicker from '../../components/ImagePicker';
import { MediaTypeOptions } from '../../components/ImagePicker/types';

const PaymentForm: React.SFC<PaymentFormProps> = React.forwardRef(
  (props, ref: any) => {
    const [state, setState] = React.useState({
      isDateTimePickerVisible: false
      // date: ''
    });
    const datePickerRef: any = React.useRef(null);
    const yourname: any = React.useRef(null);
    const transaction_date: any = React.useRef(null);
    const [image, setImage] = React.useState();

    //   const _formik = React.useRef(null);

    let defaultFields, ProfilePageSchema;
    defaultFields = {
      payment_name: props.data.payment_name ? props.data.payment_name : '',
      teacher_bank: props.data.teacher_bank ? props.data.teacher_bank : '',
      account_number: props.data.account_number
        ? props.data.account_number
        : '',
      trasaction_date: props.data.trasaction_date
        ? props.data.trasaction_date
        : '',
      document: props.data.document ? props.data.document : '',

      bank_id: props.bank.bank_id ? props.bank.bank_id : '',
      due_amount: props.data.due_amount >= 0 ? props.data.due_amount : '',
      iban_number: props.bank.iban_number ? props.bank.iban_number : '',
      tax_number: props.bank.tax_number ? props.bank.tax_number : ''
    };

    ProfilePageSchema = yup.object().shape({
      payment_name: yup.string().required(),
      teacher_bank: yup.string().required(),
      account_number: yup.string().required(),
      trasaction_date: yup.string().required()
    });

    const showDateTimePicker = () => {
      transaction_date.current.blur();
      setState({ ...state, isDateTimePickerVisible: true });
    };

    const hideDateTimePicker = () => {
      setState({ ...state, isDateTimePickerVisible: false });
    };

    const handleDatePicked = (date: any) => {
      ref.current.setFieldValue(
        'trasaction_date',
        moment(date.getTime()).format('YYYY-MM-DD')
      );

      hideDateTimePicker();
    };

    const _pickImage = async (e: any) => {
      if (Platform.OS === 'web') {
        let response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3]
        });

        ref.current.setFieldValue('document', response);
      } else {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
        // @ts-ignore
        ImagePicker.showImagePicker(options, (response: any) => {
          // console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let extension: any = /[.]/.exec(response.uri)
              ? /[^.]+$/.exec(response.uri)
              : ['png'];

            // setImage({
            //   name: 'document',
            //   filename: 'image' + '.' + extension[0],
            //   type: response.type,
            //   data: response.data
            // });

            ref.current.setFieldValue('document', {
              name: 'document',
              filename: 'image' + '.' + extension[0],
              type: response.type,
              data: response.data
            });
          }
        });
      }
    };

    const { intl } = props;

    return (
      <>
        <Formik
          ref={ref}
          initialValues={defaultFields}
          validationSchema={ProfilePageSchema}
          render={({
            values,
            errors,
            error,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            ...rest
          }) => {
            return (
              <Surface style={styles.surface}>
                <TextInput
                  // theme={{ colors: { text: "red", placeholder: "red" } }}
                  // style={styles.textInput}
                  onChangeText={handleChange('payment_name')}
                  onBlur={handleBlur('payment_name')}
                  error={
                    errors.payment_name && touched.payment_name ? true : false
                  }
                  style={{
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                  ref={yourname}
                  value={values.payment_name}
                  label={intl.formatMessage(messages.yourName)}
                />
                {errors.payment_name && touched.payment_name ? (
                  <HelperText
                    type='error'
                    visible={
                      errors.payment_name && touched.payment_name ? true : false
                    }
                  >
                    {errors.payment_name}
                  </HelperText>
                ) : null}

                <Divider />
                <TextInput
                  // theme={{ colors: { text: "red", placeholder: "red" } }}
                  // style={styles.textInput}
                  onChangeText={handleChange('teacher_bank')}
                  onBlur={handleBlur('teacher_bank')}
                  error={
                    errors.teacher_bank && touched.teacher_bank ? true : false
                  }
                  style={{
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                  value={values.teacher_bank}
                  label={intl.formatMessage(messages.yourBankName)}
                />
                {errors.teacher_bank && touched.teacher_bank ? (
                  <HelperText
                    type='error'
                    visible={
                      errors.teacher_bank && touched.teacher_bank ? true : false
                    }
                  >
                    {errors.teacher_bank}
                  </HelperText>
                ) : null}

                <Divider />
                <TextInput
                  // theme={{ colors: { text: "red", placeholder: "red" } }}
                  // style={styles.textInput}
                  onChangeText={handleChange('account_number')}
                  onBlur={handleBlur('account_number')}
                  error={
                    errors.account_number && touched.account_number
                      ? true
                      : false
                  }
                  style={{
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                  value={values.account_number}
                  label={intl.formatMessage(messages.yourBankNo)}
                />
                {errors.account_number && touched.account_number ? (
                  <HelperText
                    type='error'
                    visible={
                      errors.account_number && touched.account_number
                        ? true
                        : false
                    }
                  >
                    {errors.account_number}
                  </HelperText>
                ) : null}

                <Divider />

                <TextInput
                  // theme={{ colors: { text: "red", placeholder: "red" } }}
                  // style={styles.textInput}
                  onChangeText={handleChange('trasaction_date')}
                  onBlur={handleBlur('trasaction_date')}
                  error={
                    errors.trasaction_date && touched.trasaction_date
                      ? true
                      : false
                  }
                  style={{
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                  ref={transaction_date}
                  onFocus={() => {
                    if (Platform.OS === 'web') {
                    } else {
                      showDateTimePicker();
                    }
                  }}
                  value={values.trasaction_date}
                  label={intl.formatMessage(messages.transactionDate)}
                />
                {errors.trasaction_date && touched.trasaction_date ? (
                  <HelperText
                    type='error'
                    visible={
                      errors.trasaction_date && touched.trasaction_date
                        ? true
                        : false
                    }
                  >
                    {errors.trasaction_date}
                  </HelperText>
                ) : null}

                <Divider />

                <TextInput
                  // theme={{ colors: { text: "red", placeholder: "red" } }}
                  // style={styles.textInput}
                  onChangeText={handleChange('document')}
                  onBlur={handleBlur('document')}
                  onFocus={(e: any) => {
                    _pickImage(e);
                    // handleBlur('document')
                  }}
                  error={errors.document && touched.document ? true : false}
                  style={{
                    width: '100%',
                    backgroundColor: 'white'
                  }}
                  value={
                    values.document && values.document.name
                      ? values.document.name
                      : ''
                  }
                  label={intl.formatMessage(messages.pictureOfreceipt)}
                />

                {errors.document && touched.document ? (
                  <HelperText
                    type='error'
                    visible={errors.document && touched.document ? true : false}
                  >
                    {errors.document}
                  </HelperText>
                ) : null}
              </Surface>
            );
          }}
          onSubmit={props.onSubmit}
        />
        <DateTimePicker
          ref={datePickerRef}
          isVisible={state.isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
      </>
    );
  }
);

// const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>;

export default PaymentForm;
