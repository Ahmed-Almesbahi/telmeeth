import {
  UPDATE_MOBILE_NUMBER_ERROR,
  UPDATE_MOBILE_NUMBER_SUCCESS,
  UPDATE_MOBILE_NUMBER,
  updateMobileNumber
} from './ducks';
import { FormikActions } from 'formik';
import { NavigationStackProp } from 'react-navigation-stack';

export interface ChangeMobilePageProps {
  onSubmit: typeof updateMobileNumber;
  intl: any;
  navigation: NavigationStackProp;
}

export interface FormChangeMobilePageProps {
  onSubmit: typeof updateMobileNumber;
  intl: any;
  navigation: NavigationStackProp;
}

export interface initialStateChangeMobilePageType {
  mobile_no: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface updateMobileNumberAction {
  type: typeof UPDATE_MOBILE_NUMBER;
  data: any;
  action: FormikActions<any>;
}
export interface updateMobileNumberSuccessAction {
  type: typeof UPDATE_MOBILE_NUMBER_SUCCESS;
}
export interface updateMobileNumberErrorAction {
  type: typeof UPDATE_MOBILE_NUMBER_ERROR;
}

export type ChangeMobilePageActionTypes =
  | updateMobileNumberAction
  | updateMobileNumberSuccessAction
  | updateMobileNumberErrorAction;
