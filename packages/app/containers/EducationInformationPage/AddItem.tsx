import * as React from 'react';
import {
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  FAB,
  HelperText,
  Button
} from 'react-native-paper';
// import { Button } from "../../components";
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles';
import { saveOtherEducationInformation } from './ducks';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const InnerForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting
}: //   ajaxError
any) => (
  <>
    <TextInput
      style={styles.textInput}
      onChangeText={handleChange('item_name')}
      onBlur={handleBlur('item_name')}
      error={errors.item_name && touched.item_name}
      value={values.item_name}
      label='name'
      // label={<FormattedMessage {...messages.item_name} />}
    />
    <HelperText type='error' visible={errors.item_name && touched.item_name}>
      {errors.item_name}
    </HelperText>

    <Button
      mode='contained'
      onPress={handleSubmit}
      loading={isSubmitting}
      disabled={isSubmitting}
    >
      <FormattedMessage {...messages.add} />
    </Button>
  </>
);

interface AddItemProps {
  onSubmit?: (parent_id: any, item_name: string, action: any) => void;
}

const AddItem: React.SFC<AddItemProps> = props => {
  const schema = yup.object().shape({
    item_name: yup.string().required()
  });

  return (
    <Formik
      initialValues={{ item_name: '' }}
      validationSchema={schema}
      render={p => <InnerForm {...p} />}
      onSubmit={(values, action) => {
        props.onSubmit && props.onSubmit(null, values.item_name, action);
      }}
    />
  );
};

export default AddItem;
