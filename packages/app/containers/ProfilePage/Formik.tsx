import * as React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ProfileFormProps } from './types';
import Header from './header';
import { TextInput, HelperText, Button as Buttonx } from 'react-native-paper';
import styles from './styles';
import { View, ScrollView, Text } from 'react-native';
import { MaterialCommunityIcons } from '../../components';
import { TEACHER_TYPE } from '../../utils/constants';
import DateTimePicker from '../../components/DateTimePicker';
import { Platform } from '../../components/Platform';
import moment from 'moment';
import Dropdown from '../../components/SelectPicker';
import { compose } from '../../utils/helper';
// import { compose } from 'redux';

const ProfileForm: React.SFC<ProfileFormProps> = ({
  profile,
  intl,
  onSubmit,
  navigation,
  userType
}) => {
  const [state, setState] = React.useState({
    isDateTimePickerVisible: false
    // date: ''
  });

  const _formik: any = React.useRef(null);

  let defaultFields, ProfilePageSchema;
  defaultFields = {
    first_name: profile.data.first_name ? profile.data.first_name : '',
    last_name: profile.data.last_name ? profile.data.last_name : '',
    gender: profile.data.gender ? profile.data.gender : '',
    // birth_date: state.date
    birth_date: profile.data.birth_date ? profile.data.birth_date : '',
    identity_name: '',
    identity_number: '',
    edu_cert_id: '',
    major_id: '',
    job: ''
  };
  ProfilePageSchema = yup.object().shape({
    first_name: yup
      .string()
      .required(intl.formatMessage(messages.usernameRequired)),
    last_name: yup
      .string()
      .required(intl.formatMessage(messages.usernameRequired)),
    gender: yup
      .string()
      .required(intl.formatMessage(messages.usernameRequired)),
    birth_date: yup
      .string()
      .required(intl.formatMessage(messages.usernameRequired))
  });
  if (userType === TEACHER_TYPE) {
    defaultFields = {
      ...defaultFields,
      identity_name: profile.data.identity_name
        ? profile.data.identity_name
        : '',
      identity_number: profile.data.identity_number
        ? profile.data.identity_number
        : '',
      edu_cert_id: profile.data.edu_cert_id ? profile.data.edu_cert_id : '',
      major_id: profile.data.major_id ? profile.data.major_id : '',
      job: profile.data.job ? profile.data.job : ''
    };
    ProfilePageSchema.concat(
      yup.object().shape({
        identity_name: yup
          .string()
          .required(intl.formatMessage(messages.usernameRequired)),
        identity_number: yup
          .string()
          .required(intl.formatMessage(messages.usernameRequired)),
        edu_cert_id: yup
          .string()
          .required(intl.formatMessage(messages.usernameRequired)),
        major_id: yup
          .string()
          .required(intl.formatMessage(messages.usernameRequired)),
        job: yup
          .string()
          .required(intl.formatMessage(messages.usernameRequired))
      })
    );
  }

  const showDateTimePicker = () => {
    setState({ ...state, isDateTimePickerVisible: true });
  };

  const hideDateTimePicker = () => {
    setState({ ...state, isDateTimePickerVisible: false });
  };

  const handleDatePicked = (date: any) => {
    _formik.current.setFieldValue(
      'birth_date',
      moment(date.getTime()).format('DD-MM-YYYY')
    );
    hideDateTimePicker();
  };

  return (
    <>
      <Formik
        ref={_formik}
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
            <>
              <Header navigation={navigation}>
                <Buttonx
                  // contentStyle={styles.contentStyleButton}
                  onPress={() => handleSubmit()}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  color='white'
                >
                  <FormattedMessage {...messages.save} />
                </Buttonx>
              </Header>

              <ScrollView style={styles.bodyContainer}>
                <View style={styles.flexDirectorRow}>
                  <View style={styles.iconColumn}>
                    <MaterialCommunityIcons
                      size={40}
                      color='gray'
                      name='account-outline'
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      // id='ContactPagefirst_name'
                      // theme={{ colors: { text: "red", placeholder: "red" } }}
                      style={styles.textInput}
                      onChangeText={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      error={
                        errors.first_name && touched.first_name ? true : false
                      }
                      value={values.first_name}
                      label={intl.formatMessage(messages.first_name)}
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.first_name && touched.first_name ? true : false
                      }
                    >
                      {errors.first_name}
                    </HelperText>

                    <TextInput
                      // id='ContactPagelast_name'
                      style={styles.textInput}
                      onChangeText={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      error={
                        errors.last_name && touched.last_name ? true : false
                      }
                      value={values.last_name}
                      label={intl.formatMessage(messages.last_name)}
                    />
                    <HelperText
                      type='error'
                      visible={
                        errors.last_name && touched.last_name ? true : false
                      }
                    >
                      {errors.last_name}
                    </HelperText>

                    <View style={styles.flexDirectorRow}>
                      {/* <TextInput
                        id='ContactPagegender'
                        style={[styles.textInput, { width: '45%' }]}
                        onChangeText={handleChange('gender')}
                        onBlur={handleBlur('gender')}
                        error={errors.gender && touched.gender ? true : false}
                        value={values.gender ? values.gender : 'Select Gender'}
                        label={<FormattedMessage {...messages.gender} />}
                      /> */}

                      <Dropdown
                        label={<FormattedMessage {...messages.gender} />}
                        // intl.formatMessage(messages.gender)
                        placeholder='Select Gender'
                        selected={values.gender}
                        onSelect={value => {
                          setFieldValue('gender', value);
                          // props.loadChildItems(value);
                        }}
                        style={{
                          width: '45%'
                        }}
                        options={[
                          {
                            label: intl.formatMessage(messages.male),
                            // intl.formatMessage(messages.male),
                            value: 'Male'
                          },
                          {
                            label: intl.formatMessage(messages.female),
                            value: 'Female'
                          }
                        ]}
                      />

                      <HelperText
                        type='error'
                        visible={errors.gender && touched.gender ? true : false}
                      >
                        {errors.gender}
                      </HelperText>

                      <TextInput
                        // id='ContactPagedob'
                        style={[styles.textInput, { width: '45%' }]}
                        onChangeText={handleChange('birth_date')}
                        onFocus={() => {
                          if (Platform.OS === 'web') {
                          } else {
                            showDateTimePicker();
                          }
                        }}
                        onBlur={() => {
                          handleBlur('birth_date');
                        }}
                        // onBlur={handleBlur('birth_date')}
                        error={
                          errors.birth_date && touched.birth_date ? true : false
                        }
                        value={values.birth_date}
                        label={intl.formatMessage(messages.dob)}
                      />
                      <HelperText
                        type='error'
                        visible={
                          errors.birth_date && touched.birth_date ? true : false
                        }
                      >
                        {errors.birth_date}
                      </HelperText>
                    </View>

                    {userType === TEACHER_TYPE ? (
                      <View style={styles.flexDirectorRow}>
                        {/* <TextInput
                          id='ContactPageid_type'
                          style={[styles.textInput, { width: '45%' }]}
                          onChangeText={handleChange('identity_name')}
                          onBlur={handleBlur('identity_name')}
                          error={
                            errors.identity_name && touched.identity_name
                              ? true
                              : false
                          }
                          value={values.identity_name}
                          label={<FormattedMessage {...messages.id_type} />}
                        /> */}
                        <Dropdown
                          label={<FormattedMessage {...messages.id_type} />}
                          placeholder='Select ID Type'
                          selected={values.identity_name}
                          onSelect={value => {
                            setFieldValue('identity_name', value);
                            // props.loadChildItems(value);
                          }}
                          style={{
                            width: '45%'
                          }}
                          options={[
                            {
                              label: intl.formatMessage(messages.nationalId),
                              value: 'National ID'
                            },
                            {
                              label: intl.formatMessage(messages.passportId),
                              value: 'Passport ID'
                            }
                          ]}
                        />

                        <HelperText
                          type='error'
                          visible={
                            errors.identity_name && touched.identity_name
                              ? true
                              : false
                          }
                        >
                          {errors.identity_name}
                        </HelperText>

                        <TextInput
                          id='ContactPageid_number'
                          style={[styles.textInput, { width: '45%' }]}
                          onChangeText={handleChange('identity_number')}
                          onBlur={handleBlur('identity_number')}
                          error={
                            errors.identity_number && touched.identity_number
                              ? true
                              : false
                          }
                          // @ts-ignore
                          value={values.identity_number}
                          label={intl.formatMessage(messages.id_number)}
                        />
                        <HelperText
                          type='error'
                          visible={
                            errors.identity_number && touched.identity_number
                              ? true
                              : false
                          }
                        >
                          {errors.identity_number}
                        </HelperText>
                      </View>
                    ) : null}
                  </View>
                </View>
                {userType === TEACHER_TYPE ? (
                  <View style={styles.flexDirectorRow}>
                    <View style={styles.iconColumn}>
                      <MaterialCommunityIcons
                        size={40}
                        color='gray'
                        name='school'
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      {/* <TextInput
                        id='ContactPageedu_cert'
                        style={styles.textInput}
                        onChangeText={handleChange('edu_cert_id')}
                        onBlur={handleBlur('edu_cert_id')}
                        error={
                          errors.edu_cert_id && touched.edu_cert_id
                            ? true
                            : false
                        }
                        value={values.edu_cert_id}
                        label={<FormattedMessage {...messages.edu_cert} />}
                      /> */}

                      <Dropdown
                        label={<FormattedMessage {...messages.edu_cert} />}
                        placeholder='Select Educational Certification'
                        selected={values.edu_cert_id}
                        onSelect={value => {
                          setFieldValue('edu_cert_id', value);
                        }}
                        style={{
                          width: '100%'
                        }}
                        // options={profile.data.educational_certificates.map(
                        //   d => ({
                        //     lable: 'xxx',
                        //     value: 'gggg'
                        //   })
                        // )}
                        options={
                          profile.data.educational_certificates &&
                          profile.data.educational_certificates.length > 0
                            ? profile.data.educational_certificates.map(d => {
                                return {
                                  value: d.edu_cert_id,
                                  label: d.edu_cert_name
                                };
                              })
                            : [{ value: 0, label: 'N/A' }]
                        }
                      />

                      <HelperText
                        type='error'
                        visible={
                          errors.edu_cert_id && touched.edu_cert_id
                            ? true
                            : false
                        }
                      >
                        {errors.edu_cert_id}
                      </HelperText>

                      {/* <TextInput
                        id='ContactPagemajor'
                        style={styles.textInput}
                        onChangeText={handleChange('major_id')}
                        onBlur={handleBlur('major_id')}
                        error={
                          errors.major_id && touched.major_id ? true : false
                        }
                        value={values.major_id}
                        label={<FormattedMessage {...messages.major} />}
                      />
                      <HelperText
                        type='error'
                        visible={
                          errors.major_id && touched.major_id ? true : false
                        }
                      >
                        {errors.major_id}
                      </HelperText> */}

                      <TextInput
                        // id='ContactPagejob'
                        style={styles.textInput}
                        onChangeText={handleChange('job')}
                        onBlur={handleBlur('job')}
                        error={errors.job && touched.job ? true : false}
                        value={values.job}
                        label={intl.formatMessage(messages.job)}
                      />
                      <HelperText
                        type='error'
                        visible={errors.job && touched.job ? true : false}
                      >
                        {errors.job}
                      </HelperText>
                    </View>
                  </View>
                ) : null}
                <HelperText type='error' visible={error}>
                  {error}
                </HelperText>
              </ScrollView>
            </>
          );
        }}
        onSubmit={onSubmit}
      />
      <DateTimePicker
        isVisible={state.isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
    </>
  );
};

// const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>;

export default compose(injectIntl)(ProfileForm);
