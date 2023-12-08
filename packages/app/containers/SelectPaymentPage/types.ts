import {
  LOAD_BANKS,
  LOAD_BANKS_SUCCESS,
  LOAD_BANKS_ERROR,
  banksLoad,
  GET_BANK_DETAILS,
  GET_BANK_DETAILS_SUCCESS,
  GET_BANK_DETAILS_ERROR,
  getBankDetails
} from './ducks';

import { match } from 'react-router';
import { setDrawerTab } from '../DrawerPage/ducks';
import { initialStateNotificationType } from '../NotificationPage/types';
import { NavigationStackProp } from 'react-navigation-stack';
// import { FormikActions } from 'formik';

// import { UserType } from '../User/types';

// export interface RequestParams {
//   id?: string;
// }

export interface SelectPaymentPageProps {
  banksLoad: typeof banksLoad;
  getBankDetails: typeof getBankDetails;
  banks: initialStateBankType;
  navigation: NavigationStackProp;
  //   timeDifferenceLoad: typeof timeDifferenceLoad;
  //   match: match<RequestParams>;
  //   request: initialStateRequestType;
  //   setTab: typeof setDrawerTab;
  //   acceptLesson: typeof acceptLesson;
  //   notification: initialStateNotificationType;
  //   // userType: UserType;
  //   // intl: any;
}

export interface PaymentDataType {
  bank_id: number;
  account_number: string;
  bank_name: string;
  due_amount: number;
  due_date: string;
  iban_number: string;
  orginal_due_amount: number;
  payment_id: number;
  payment_status: number;
  payment_step: string;
  student_credit: number;
  tax_number: string;
  teacher_balance: number;
  teacher_bank: string;
  teacher_credit: number;
  teacher_id: number;
}
export interface BankDataType {
  bank_id: number;
  bank_name: string;
  telmeeth_ac_no: string;
  bank_logo: string;
  iban_number: string;
  tax_number: number;
}

export interface initialStateBankType {
  data: Array<BankDataType>;
  selected: PaymentDataType;
  selectedBank: {
    bank_id: number;
    bank_logo: string;
    bank_name: string;
    iban_number: string;
    tax_number: number;
    telmeeth_ac_no: string;
  };
  bankLoading: boolean;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface banksLoadAction {
  type: typeof LOAD_BANKS;
}

export interface banksLoadedAction {
  type: typeof LOAD_BANKS_SUCCESS;
  data: Array<BankDataType>;
}

export interface banksLoadingErrorAction {
  type: typeof LOAD_BANKS_ERROR;
  error: string;
}

export interface getBankDetailsAction {
  type: typeof GET_BANK_DETAILS;
  bank_id: number;
}

export interface getBankDetailsLoadedAction {
  type: typeof GET_BANK_DETAILS_SUCCESS;
  data: PaymentDataType;
}

export interface getBankDetailsLoadingErrorAction {
  type: typeof GET_BANK_DETAILS_ERROR;
  error: string;
}

export type BanksActionTypes =
  | banksLoadAction
  | banksLoadedAction
  | banksLoadingErrorAction
  | getBankDetailsAction
  | getBankDetailsLoadedAction
  | getBankDetailsLoadingErrorAction;
