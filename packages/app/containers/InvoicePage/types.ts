import {
  LOAD_INVOICES,
  LOAD_INVOICES_SUCCESS,
  LOAD_INVOICES_ERROR,
  loadInvoices
} from './ducks';
import { UserType } from '../User/types';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface InvoicePageProps {
  loadInvoies: typeof loadInvoices;
  invoices: initialStateInvoiceType;
  userType: UserType;
  language: LanguageOption;
  navigation: NavigationStackProp;
}

export interface InvoiceProps {
  data: InvoiceType;
  userType: UserType;
  language: LanguageOption;
}

export interface InvoiceType {
  // Common Data
  creditearn_discount: number;
  hours: string;
  lesson_actual_start_time: string;
  lesson_actual_end_time: string;
  lesson_date: string;
  original_amt: number;
  promocode_discount: number;
  students: number;
  subject_name: string;
  teaching_location: string;
  teaching_type_name: string;
  total_amount: number;
  unique_id: number;

  // Data for teacher
  student_name: string;
  teacher_amount: number;
  telmeeth_amount: number;
  telmeeth_tax: number;
  order_id: number;
  total_due: number;

  // Data for student
  teacher_name: string;
  is_like: boolean;
  lesson_id: number;
  lesson_request_id: number;
  subject_id: number;
  teacher_id: number;

  name: string;
  name_ar: string;
  item_id: number;
}

export interface initialStateInvoiceType {
  data: Array<InvoiceType>;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface loadInvoicesAction {
  type: typeof LOAD_INVOICES;
  page: number;
}

export interface invoicesLoadedAction {
  type: typeof LOAD_INVOICES_SUCCESS;
  data: Array<InvoiceType>;
}
export interface invoiceLoadingErrorAction {
  type: typeof LOAD_INVOICES_ERROR;
  error: string;
}

export type InvoiceActionTypes =
  | loadInvoicesAction
  | invoicesLoadedAction
  | invoiceLoadingErrorAction;
