import {
  POST_PAYMENT,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_ERROR,
  postPayment
} from './ducks';
import { initialStateBankType } from '../SelectPaymentPage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface PaymentPageProps {
  navigation: NavigationStackProp;
  postPayment: typeof postPayment;
  banks: initialStateBankType;
  intl: any;
}

export interface PaymentFormProps {
  data: any;
  bank: any;
  // push: typeof push;
  // postPayment: typeof postPayment;
  // banks: initialStateBankType;
  onSubmit: any;
  intl: any;
  navigation: NavigationStackProp;
  ref?: any;
}

export interface initialStatePaymentType {
  // data: Array<BankDataType>;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface postPaymentAction {
  type: typeof POST_PAYMENT;
  data: any;
}

export interface postPaymentSuccessAction {
  type: typeof POST_PAYMENT_SUCCESS;
  data: any;
}

export interface postPaymentErrorAction {
  type: typeof POST_PAYMENT_ERROR;
  error: string;
}

export type PaymentActionTypes =
  | postPaymentAction
  | postPaymentSuccessAction
  | postPaymentErrorAction;
