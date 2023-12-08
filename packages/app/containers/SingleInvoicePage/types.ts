import {
  SELECT_INVOICE,
  RECEIVED_PAYMENT_ERROR,
  RECEIVED_PAYMENT_SUCCESS,
  RECEIVED_PAYMENT,
  receivedPayment,
  LIKE_TEACHER,
  LIKE_TEACHER_SUCCESS,
  LIKE_TEACHER_ERROR,
  likeTeacher,
  RATE_TEACHER,
  RATE_TEACHER_SUCCESS,
  RATE_TEACHER_ERROR,
  rateTeacher,
  LOAD_LESSON_DETAILS,
  LOAD_LESSON_DETAILS_SUCCESS,
  LOAD_LESSON_DETAILS_ERROR
} from './ducks';
import { InvoiceType } from '../InvoicePage/types';
import { UserType } from '../User/types';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface SingleInvoicePageProps {
  intl: any;
  singleInvoice: initialStateSingleInvoicePageType;
  navigation: NavigationStackProp;
  receivedPayment: typeof receivedPayment;
  likeTeacher: typeof likeTeacher;
  rateTeacher: typeof rateTeacher;
  userType: UserType;
  language: LanguageOption;
}

export interface SingleInvoiceType extends InvoiceType {
  total_hours: string;
  actual_number_of_students: number;
}

export interface initialStateSingleInvoicePageType {
  data: SingleInvoiceType;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface selectInvoiceAction {
  type: typeof SELECT_INVOICE;
  data: SingleInvoiceType;
}

export interface receivedPaymentAction {
  type: typeof RECEIVED_PAYMENT;
  lesson_id: number;
}
export interface receivedPaymentSuccessAction {
  type: typeof RECEIVED_PAYMENT_SUCCESS;
}
export interface receivedPaymentErrorAction {
  type: typeof RECEIVED_PAYMENT_ERROR;
  error: string;
}

export interface loadLessonDetailsAction {
  type: typeof LOAD_LESSON_DETAILS;
  lesson_id: number;
}
export interface loadLessonDetailsSuccessAction {
  type: typeof LOAD_LESSON_DETAILS_SUCCESS;
  data: SingleInvoiceType;
}
export interface loadLessonDetailsErrorAction {
  type: typeof LOAD_LESSON_DETAILS_ERROR;
  error: string;
}

export interface likeTeacherAction {
  type: typeof LIKE_TEACHER;
  teacher_id: number;
}

export interface likeTeacherUpdatedAction {
  type: typeof LIKE_TEACHER_SUCCESS;
  teacher_id: number;
}

export interface likeTeacherErrorAction {
  type: typeof LIKE_TEACHER_ERROR;
  error: string;
}

export interface rateTeacherAction {
  type: typeof RATE_TEACHER;
  teacher_id: number;
  item_id: number;
  lesson_id: number;
  rating: number;
}

export interface rateTeacherUpdatedAction {
  type: typeof RATE_TEACHER_SUCCESS;
  teacher_id: number;
}

export interface rateTeacherErrorAction {
  type: typeof RATE_TEACHER_ERROR;
  error: string;
}

export type SingleInvoicePageActionTypes =
  | selectInvoiceAction
  | receivedPaymentAction
  | receivedPaymentSuccessAction
  | receivedPaymentErrorAction
  | loadLessonDetailsAction
  | loadLessonDetailsSuccessAction
  | loadLessonDetailsErrorAction
  | likeTeacherAction
  | likeTeacherUpdatedAction
  | likeTeacherErrorAction
  | rateTeacherAction
  | rateTeacherUpdatedAction
  | rateTeacherErrorAction;
