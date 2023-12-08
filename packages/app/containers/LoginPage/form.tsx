import React from 'react';
import { View } from 'react-native';

import { TextInput, HelperText } from 'react-native-paper';
import Button from '../../components/Button';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles';

interface innerLoginFormProps {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
  handleSubmit: () => void;
  isSubmitting: boolean;
  intl: any;
}

const innerLoginForm: React.SFC<innerLoginFormProps> = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  intl
}) => (
  <View>
    <TextInput
      // id='formLoginUsername'
      keyboardType={'numeric'}
      style={styles.textInput}
      onChangeText={handleChange('mobile')}
      onBlur={handleBlur('mobile')}
      error={errors.mobile && touched.mobile ? true : false}
      value={values.mobile}
      theme={{ colors: { text: 'white' } }}
      label={intl.formatMessage(messages.mobile)}
    />
    <HelperText
      type='error'
      visible={errors.mobile && touched.mobile ? true : false}
    >
      {errors.mobile}
    </HelperText>

    <View style={styles.buttonWrapper}>
      <Button
        roundness
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        <FormattedMessage {...messages.signin} />
      </Button>
    </View>
  </View>
);

export default innerLoginForm;
