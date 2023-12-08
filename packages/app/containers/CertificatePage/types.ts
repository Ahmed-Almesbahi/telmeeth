import {
  LOAD_CERTIFICATES,
  LOAD_CERTIFICATES_SUCCESS,
  LOAD_CERTIFICATES_ERROR,
  DOWNLOAD_CERTIFICATE,
  DOWNLOAD_CERTIFICATE_SUCCESS,
  DOWNLOAD_CERTIFICATE_ERROR
} from './ducks';
import { LanguageOption } from '../LanguagePage/types';
import { NavigationStackProp } from 'react-navigation-stack';

export interface CertifactePageProps {
  certificates: initialStateCertificateType;
  loadCertificates: () => void;
  downloadCertificate: (uid: any) => void;
  language: LanguageOption;
  navigation: NavigationStackProp;
  intl: any;
}

export interface CertificateDataType {
  item_id: number;
  user_id: number;
  edu_type_name: string;
  edu_type_name_ar: string;
  subject_name: string;
  subject_name_ar: string;
  total_hours: number;
  complate_lessons: number;
  unique_id: string;
  registraion_date: number;
}
export interface CertificateTotalDataType {
  total_completed_lesson: number;
  total_hours: number;
  registraion_date: string;
  user_id: number;
  unique_id: string;
}
export interface initialStateCertificateType {
  data: Array<CertificateDataType>;
  total_data: CertificateTotalDataType;
  pdfUrl?: Array<string>;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface loadCertificatesAction {
  type: typeof LOAD_CERTIFICATES;
}

export interface certificatesLoadedAction {
  type: typeof LOAD_CERTIFICATES_SUCCESS;
  data: Array<CertificateDataType>;
  total_data: CertificateTotalDataType;
}

export interface certificateLoadingErrorAction {
  type: typeof LOAD_CERTIFICATES_ERROR;
  error: string;
}

export interface downloadCertificateAction {
  type: typeof DOWNLOAD_CERTIFICATE;
  subject_ids: string;
}

export interface downloadCertificateSuccessAction {
  type: typeof DOWNLOAD_CERTIFICATE_SUCCESS;
  pdfUrl: Array<string>;
}

export interface downloadCertificateErrorAction {
  type: typeof DOWNLOAD_CERTIFICATE_ERROR;
  error: string;
}

export type CertificateActionTypes =
  | loadCertificatesAction
  | certificatesLoadedAction
  | certificateLoadingErrorAction
  | downloadCertificateAction
  | downloadCertificateSuccessAction
  | downloadCertificateErrorAction;
