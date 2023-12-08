import React, { useRef, useEffect, useState } from 'react';
import { View, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { TextInput, HelperText } from 'react-native-paper';
import { Text, Button } from '../../components';

import Countdown from 'react-countdown-now';
import Renderer from './Renderer';
import SafeAreaView from 'react-native-safe-area-view';

import styles from './styles';
import { LanguageOption } from '../LanguagePage/types';

const countdownTime = Date.now() + 5000;

interface innerLoginFormProps {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
  handleSubmit: any;
  submitForm: any;
  setFieldValue: any;
  setErrors: any;
  setSubmiting?: any;
  isSubmitting: any;
  resendOtp: any;
  language: LanguageOption;
}

const innerLoginForm: React.SFC<innerLoginFormProps> = props => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    submitForm,
    setFieldValue,
    setErrors,
    setSubmiting,
    isSubmitting,
    resendOtp
  } = props;

  const [countdown, setCountdown] = useState(Date.now() + 60000);
  useEffect(() => {
    passcCode1.current.focus();
  }, []);

  const resetCountdown = () => {
    setCountdown(Date.now() + 60000);
    setFieldValue('passCode1', '');
    setFieldValue('passCode2', '');
    setFieldValue('passCode3', '');
    setFieldValue('passCode4', '');
    passcCode1.current.focus();
  };

  const passcCode1: any = useRef(null);
  const passcCode2: any = useRef(null);
  const passcCode3: any = useRef(null);
  const passcCode4: any = useRef(null);

  //
  // refs.textInput.focus();
  return (
    <>
      <View style={{ flex: 1 }}>
        <View
          style={[
            props.language == 'ar'
              ? styles.flexDirectionRowReverse
              : styles.flexDirectionRow,
            { marginBottom: 10 }
          ]}
        >
          <TextInput
            // id='passCode1'
            style={styles.textInput}
            onChangeText={v => {
              let value = v.replace(/[^0-9]/g, '');
              setFieldValue('passCode1', value);
              if (value.length === 1) {
                passcCode2.current.focus();
              }
            }}
            onFocus={(v: any) => setFieldValue('passCode1', '')}
            onBlur={handleBlur('passCode1')}
            error={errors.passCode1 && touched.passCode1 ? true : false}
            value={values.passCode1}
            ref={passcCode1}
            keyboardType={'numeric'}
            maxLength={1}
            underlineColor='transparence'
          />

          <TextInput
            // id='passCode2'
            style={styles.textInput}
            onChangeText={(v: any) => {
              let value = v.replace(/[^0-9]/g, '');
              setFieldValue('passCode2', value);
              if (value.length === 1) {
                passcCode3.current.focus();
              }
            }}
            onFocus={(v: any) => {
              setFieldValue('passCode2', '');
            }}
            onBlur={handleBlur('passCode2')}
            error={errors.passCode2 && touched.passCode2 ? true : false}
            value={values.passCode2}
            ref={passcCode2}
            keyboardType={'numeric'}
            maxLength={1}
            underlineColor='transparence'
          />
          <TextInput
            // id='passCode3'
            style={styles.textInput}
            onChangeText={(v: any) => {
              let value = v.replace(/[^0-9]/g, '');
              setFieldValue('passCode3', value);
              if (value.length === 1) {
                passcCode4.current.focus();
              }
            }}
            onFocus={(v: any) => {
              setFieldValue('passCode3', '');
            }}
            onBlur={handleBlur('passCode3')}
            error={errors.passCode3 && touched.passCode3 ? true : false}
            value={values.passCode3}
            ref={passcCode3}
            keyboardType={'numeric'}
            maxLength={1}
            underlineColor='transparence'
          />
          <TextInput
            // id='passCode4'
            style={styles.textInput}
            onChangeText={(v: any) => {
              let value = v.replace(/[^0-9]/g, '');
              setFieldValue('passCode4', value);
              Keyboard.dismiss();
            }}
            onFocus={(v: any) => {
              setFieldValue('passCode4', '');
            }}
            onBlur={handleBlur('passCode4')}
            error={errors.passCode4 && touched.passCode4 ? true : false}
            value={values.passCode4}
            ref={passcCode4}
            keyboardType={'numeric'}
            maxLength={1}
            underlineColor='transparence'
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <HelperText
            type='error'
            visible={errors.passCode4 && touched.passCode4 ? true : false}
          >
            {errors.passCode4}
          </HelperText>
          <Countdown
            date={countdown}
            key={countdown}
            renderer={p => (
              <Renderer
                {...p}
                resetCountdown={resetCountdown}
                resend={() => resendOtp(values, { setErrors, setSubmiting })}
              />
            )}
          />
        </View>
      </View>

      <SafeAreaView style={{}} forceInset={{ top: 'never', bottom: 'always' }}>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            roundness
            style={{ width: '100%', marginBottom: 0 }}
            contentStyle={{ width: '100%' }}
          >
            <FormattedMessage {...messages.continue} />
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

innerLoginForm.propTypes = {
  values: PropTypes.shape({
    passCode1: PropTypes.string.isRequired,
    passCode2: PropTypes.string.isRequired,
    passCode3: PropTypes.string.isRequired,
    passCode4: PropTypes.string.isRequired
  }),
  errors: PropTypes.shape({
    passCode1: PropTypes.string,
    passCode2: PropTypes.string,
    passCode3: PropTypes.string,
    passCode4: PropTypes.string
  }),
  touched: PropTypes.shape({
    passCode1: PropTypes.bool,
    passCode2: PropTypes.bool,
    passCode3: PropTypes.bool,
    passCode4: PropTypes.bool
  }),
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
};

export default React.memo(innerLoginForm);
