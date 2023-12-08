import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateSingleInvoicePageType,
  SingleInvoicePageActionTypes,
  SingleInvoiceType
} from './types';

/*
 *
 * SingleInvoicePage constants
 *
 */
export const SELECT_INVOICE = 'app/SingleInvoicePage/SELECT_INVOICE';
export const RECEIVED_PAYMENT = 'app/SingleInvoicePage/RECEIVED_PAYMENT';
export const RECEIVED_PAYMENT_SUCCESS =
  'app/SingleInvoicePage/RECEIVED_PAYMENT_SUCCESS';
export const RECEIVED_PAYMENT_ERROR =
  'app/SingleInvoicePage/RECEIVED_PAYMENT_ERROR';
export const LOAD_LESSON_DETAILS = 'app/SingleInvoicePage/LOAD_LESSON_DETAILS';
export const LOAD_LESSON_DETAILS_SUCCESS =
  'app/SingleInvoicePage/LOAD_LESSON_DETAILS_SUCCESS';
export const LOAD_LESSON_DETAILS_ERROR =
  'app/SingleInvoicePage/LOAD_LESSON_DETAILS_ERROR';
export const LIKE_TEACHER = 'app/SingleInvoicePage/LIKE_TEACHER';
export const LIKE_TEACHER_SUCCESS =
  'app/SingleInvoicePage/LIKE_TEACHER_SUCCESS';
export const LIKE_TEACHER_ERROR = 'app/SingleInvoicePage/LIKE_TEACHER_ERROR';
export const RATE_TEACHER = 'app/SingleInvoicePage/RATE_TEACHER';
export const RATE_TEACHER_SUCCESS =
  'app/SingleInvoicePage/RATE_TEACHER_SUCCESS';
export const RATE_TEACHER_ERROR = 'app/SingleInvoicePage/RATE_TEACHER_ERROR';

/*
 *
 * SingleInvoicePage reducer
 *
 */
export const initialState: initialStateSingleInvoicePageType = {
  data: {
    // Common Data
    creditearn_discount: 0,
    hours: '',
    lesson_actual_start_time: '',
    lesson_actual_end_time: '',
    lesson_date: '',
    original_amt: 0,
    promocode_discount: 0,
    students: 0,
    name: '',
    name_ar: '',
    teaching_location: '',
    teaching_type_name: '',
    total_amount: 0,
    unique_id: 0,

    // Data for teacher
    student_name: '',
    teacher_amount: 0,
    telmeeth_amount: 0,
    telmeeth_tax: 0,
    order_id: 0,
    total_due: 0,

    // Data for student
    teacher_name: '',
    is_like: false,
    lesson_id: 0,
    lesson_request_id: 0,
    item_id: 0,
    teacher_id: 0,

    // Special for Single Invoice
    total_hours: '',
    actual_number_of_students: 0,

    subject_name: '',
    subject_id: 0
  },
  error: '',
  loaded: false,
  loading: false
};

export default (state = initialState, action: SingleInvoicePageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_INVOICE:
        draft.data = action.data;
        break;

      case RECEIVED_PAYMENT:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case RECEIVED_PAYMENT_SUCCESS:
        draft.loading = false;
        draft.loaded = true;
        break;

      case RECEIVED_PAYMENT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_LESSON_DETAILS:
        draft.loading = true;
        draft.error = '';
        // draft.data.repositories = false;
        break;

      case LOAD_LESSON_DETAILS_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_LESSON_DETAILS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LIKE_TEACHER:
        draft.loading = true;
        draft.error = '';
        break;

      case LIKE_TEACHER_SUCCESS:
        // draft.teachers = draft.teachers.map(teacher =>
        //   teacher.user_id === action.teacher_id
        //     ? { ...teacher, is_like: !teacher.is_like }
        //     : teacher
        // );
        draft.loading = false;
        draft.loaded = true;
        break;

      case LIKE_TEACHER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case RATE_TEACHER:
        draft.loading = true;
        draft.error = '';
        break;

      case RATE_TEACHER_SUCCESS:
        // draft.teachers = draft.teachers.map(teacher =>
        //   teacher.user_id === action.teacher_id
        //     ? { ...teacher, is_like: !teacher.is_like }
        //     : teacher
        // );
        draft.loading = false;
        draft.loaded = true;
        break;

      case RATE_TEACHER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the singleInvoicePage state domain
 */
const selectSingleInvoicePageDomain = (state: any) =>
  state.singleInvoice || initialState;

/**
 * Default selector used by SingleInvoicePage
 */
export const makeSelectSingleInvoicePage = () =>
  createSelector(
    selectSingleInvoicePageDomain,
    substate => substate
  );

/*
 *
 * SingleInvoicePage actions
 *
 */

/**
 * Select Single Invoice , this function must use outsize this container
 *
 * @export
 * @param {SingleInvoiceType} data
 * @returns {SingleInvoicePageActionTypes}
 */
export function selectInvoice(
  data: SingleInvoiceType
): SingleInvoicePageActionTypes {
  return {
    type: SELECT_INVOICE,
    data
  };
}

/**
 * Received A payment, this action starts the request saga
 *
 * @export
 * @param {number} lesson_id
 * @returns {SingleInvoicePageActionTypes} An action object with a type of RECEIVED_PAYMENT
 */
export function receivedPayment(
  lesson_id: number
): SingleInvoicePageActionTypes {
  return {
    type: RECEIVED_PAYMENT,
    lesson_id
  };
}

/**
 * Dispatched when the payment are received by the request saga
 *
 *
 * @return {object}      An action object with a type of RECEIVED_PAYMENT_SUCCESS passing the repos
 */
export function receivedPaymentSuccess(): SingleInvoicePageActionTypes {
  return {
    type: RECEIVED_PAYMENT_SUCCESS
  };
}

/**
 * Dispatched when end the lesson fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of RECEIVED_PAYMENT_ERROR passing the error
 */
export function receivedPaymentError(
  error: string
): SingleInvoicePageActionTypes {
  return {
    type: RECEIVED_PAYMENT_ERROR,
    error
  };
}

/**
 * Received A payment, this action starts the request saga
 *
 * @export
 * @param {number} lesson_id
 * @returns {SingleInvoicePageActionTypes} An action object with a type of LOAD_LESSON_DETAILS
 */
export function loadLessonDetails(
  lesson_id: number
): SingleInvoicePageActionTypes {
  return {
    type: LOAD_LESSON_DETAILS,
    lesson_id
  };
}

/**
 * Dispatched when the payment are received by the request saga
 *
 *
 * @return {object}      An action object with a type of LOAD_LESSON_DETAILS_SUCCESS passing the repos
 */
export function loadLessonDetailsSuccess(
  data: SingleInvoiceType
): SingleInvoicePageActionTypes {
  return {
    type: LOAD_LESSON_DETAILS_SUCCESS,
    data
  };
}

/**
 * Dispatched when end the lesson fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_LESSON_DETAILS_ERROR passing the error
 */
export function loadLessonDetailsError(
  error: string
): SingleInvoicePageActionTypes {
  return {
    type: LOAD_LESSON_DETAILS_ERROR,
    error
  };
}

/**
 * dispatch like teacher, this action starts the request saga
 *
 * @param  {number} teacher_id the teacher id to like
 *
 * @return {object} An action object with a type of LIKE_TEACHER
 */
export function likeTeacher(teacher_id: number): SingleInvoicePageActionTypes {
  return {
    type: LIKE_TEACHER,
    teacher_id
  };
}

/**
 * Dispatched when the like teacher are loaded by the request saga
 *
 * @param  {number} teacher_id the teacher id to like
 *
 * @return {object}      An action object with a type of LIKE_TEACHER_SUCCESS passing the repos
 */
export function likeTeacherUpdated(
  teacher_id: number
): SingleInvoicePageActionTypes {
  return {
    type: LIKE_TEACHER_SUCCESS,
    teacher_id
  };
}

/**
 * Dispatched when like teacher fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of LIKE_TEACHER_ERROR passing the error
 */
export function likeTeacherError(error: string): SingleInvoicePageActionTypes {
  return {
    type: LIKE_TEACHER_ERROR,
    error
  };
}

/**
 * dispatch rate teacher, this action starts the request saga
 *
 * @param  {number} teacher_id the teacher id to rate
 *
 * @return {object} An action object with a type of RATE_TEACHER
 */
export function rateTeacher(
  teacher_id: number,
  item_id: number,
  lesson_id: number,
  rating: number
): SingleInvoicePageActionTypes {
  return {
    type: RATE_TEACHER,
    teacher_id,
    item_id,
    lesson_id,
    rating
  };
}

/**
 * Dispatched when the rate teacher are loaded by the request saga
 *
 * @param  {number} teacher_id the teacher id to rate
 *
 * @return {object}      An action object with a type of RATE_TEACHER_SUCCESS passing the repos
 */
export function rateTeacherUpdated(
  teacher_id: number
): SingleInvoicePageActionTypes {
  return {
    type: RATE_TEACHER_SUCCESS,
    teacher_id
  };
}

/**
 * Dispatched when rate teacher fails
 *
 * @param  {string} error The error
 *
 * @return {object}       An action object with a type of RATE_TEACHER_ERROR passing the error
 */
export function rateTeacherError(error: string): SingleInvoicePageActionTypes {
  return {
    type: RATE_TEACHER_ERROR,
    error
  };
}
