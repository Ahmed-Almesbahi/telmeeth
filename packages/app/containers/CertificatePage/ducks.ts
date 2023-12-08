import { createSelector } from 'reselect';
import produce from 'immer';
import {
  initialStateCertificateType,
  CertificateActionTypes,
  CertificateDataType,
  CertificateTotalDataType
} from './types';

/*
 *
 * CertificatePage constants
 *
 */
export const LOAD_CERTIFICATES = 'app/CertificatePage/LOAD_CERTIFICATES';
export const LOAD_CERTIFICATES_SUCCESS =
  'app/CertificatePage/LOAD_CERTIFICATES_SUCCESS';
export const LOAD_CERTIFICATES_ERROR =
  'app/CertificatePage/LOAD_CERTIFICATES_ERROR';
export const DOWNLOAD_CERTIFICATE = 'app/CertificatePage/DOWNLOAD_CERTIFICATE';
export const DOWNLOAD_CERTIFICATE_SUCCESS =
  'app/CertificatePage/DOWNLOAD_CERTIFICATE_SUCCESS';
export const DOWNLOAD_CERTIFICATE_ERROR =
  'app/CertificatePage/DOWNLOAD_CERTIFICATE_ERROR';

/*
 *
 * CertificatePage reducer
 *
 */

export const initialState: initialStateCertificateType = {
  data: [],
  total_data: {
    total_completed_lesson: 0,
    total_hours: 0,
    registraion_date: '',
    user_id: 0,
    unique_id: ''
  },
  pdfUrl: [],
  loading: false,
  error: '',
  loaded: false,
  isRefreshing: false //for pull to refresh
};

/* eslint-disable default-case, no-param-reassign */
export default (
  state = initialState,
  action: CertificateActionTypes
): initialStateCertificateType =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CERTIFICATES:
        draft.loading = true;
        draft.error = '';
        break;

      case LOAD_CERTIFICATES_SUCCESS:
        action.data.map(d => draft.data.push(d));
        draft.total_data = action.total_data;
        draft.loading = false;
        draft.loaded = true;
        break;

      case LOAD_CERTIFICATES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case DOWNLOAD_CERTIFICATE:
        draft.loading = true;
        draft.error = '';
        break;

      case DOWNLOAD_CERTIFICATE_SUCCESS:
        draft.pdfUrl = action.pdfUrl;
        draft.loading = false;
        break;

      case DOWNLOAD_CERTIFICATE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

/**
 * Direct selector to the CertificatePage state domain
 */

const selectCertificatePageDomain = (state: any) =>
  state.certificates || initialState;

/**
 * Default selector used by CertificatePage
 */

export const makeSelectCertificates = () =>
  createSelector(
    selectCertificatePageDomain,
    substate => substate
  );

/**
 * Load the certificates, this action starts the request saga
 * @return {object} An action object with a type of LOAD_CERTIFICATES
 */
export function loadCertificates(): CertificateActionTypes {
  return {
    type: LOAD_CERTIFICATES
  };
}

/**
 * Dispatched when the certificates are loaded by the request saga
 *
 * @param  {array} data The certificate data
 * @param  {object} total_data The certificate data
 *
 * @return {object}      An action object with a type of LOAD_CERTIFICATES_SUCCESS passing the repos
 */
export function certificatesLoaded(
  data: Array<CertificateDataType>,
  total_data: CertificateTotalDataType
): CertificateActionTypes {
  return {
    type: LOAD_CERTIFICATES_SUCCESS,
    data,
    total_data
  };
}

/**
 * Dispatched when loading the certificate fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_CERTIFICATES_ERROR passing the error
 */
export function certificateLoadingError(error: string): CertificateActionTypes {
  return {
    type: LOAD_CERTIFICATES_ERROR,
    error
  };
}

/**
 * Download the certificate, this action starts the request saga
 * @param  {number} subject_ids The certificate subject_ids
 * @return {object} An action object with a type of DOWNLOAD_CERTIFICATE
 */
export function downloadCertificate(
  subject_ids: string
): CertificateActionTypes {
  return {
    type: DOWNLOAD_CERTIFICATE,
    subject_ids
  };
}

/**
 * Dispatched when the certificates are response by the request saga
 *
 * @param  {array} pdfUrl The certificate pdf URLS to download
 *
 * @return {object}      An action object with a type of DOWNLOAD_CERTIFICATE_SUCCESS passing the repos
 */
export function downloadCertificateSuccess(
  pdfUrl: Array<string>
): CertificateActionTypes {
  return {
    type: DOWNLOAD_CERTIFICATE_SUCCESS,
    pdfUrl
  };
}

/**
 * Dispatched when delete the certificate fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of DOWNLOAD_CERTIFICATE_ERROR passing the error
 */
export function downloadCertificateError(
  error: string
): CertificateActionTypes {
  return {
    type: DOWNLOAD_CERTIFICATE_ERROR,
    error
  };
}
