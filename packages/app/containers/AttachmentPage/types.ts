import {
  LOAD_ATTACHMENTS,
  LOAD_ATTACHMENTS_SUCCESS,
  LOAD_ATTACHMENTS_ERROR,
  UPLOAD_ATTACHMENTS,
  UPLOAD_ATTACHMENTS_SUCCESS,
  UPLOAD_ATTACHMENTS_ERROR,
  loadAttachments,
  uploadAttachment
} from './ducks';
import { NavigationStackProp } from 'react-navigation-stack';

export interface AttachmentPageProps {
  navigation: NavigationStackProp;
  loadAttachments: typeof loadAttachments;
  uploadAttachment: typeof uploadAttachment;
  attachments: initialStateAttachmentType;
  intl: any;
}

export interface AttachmentFormProps {
  data: AttachmentType;
  uploadAttachment: typeof uploadAttachment;
  intl: any;
}

export interface AttachmentType {
  attachement_id: number;
  attachement_name: string;
  attachement_type: string;
  user_id: number;
}

export interface initialStateAttachmentType {
  data: Array<AttachmentType>;
  id: AttachmentType;
  personal: AttachmentType;
  certificate: AttachmentType;
  other: AttachmentType;
  loading: boolean;
  loaded: boolean;
  isRefreshing: boolean;
  error: string;
}

export interface loadAttachmentsAction {
  type: typeof LOAD_ATTACHMENTS;
}

export interface attachmentsLoadedAction {
  type: typeof LOAD_ATTACHMENTS_SUCCESS;
  data: Array<AttachmentType>;
}

export interface attachmentsLoadingErrorAction {
  type: typeof LOAD_ATTACHMENTS_ERROR;
  error: string;
}

export interface uploadAttachmentAction {
  type: typeof UPLOAD_ATTACHMENTS;
  data: any;
}

export interface uploadAttachmentSuccessAction {
  type: typeof UPLOAD_ATTACHMENTS_SUCCESS;
  message: string;
}

export interface uploadAttachmentErrorAction {
  type: typeof UPLOAD_ATTACHMENTS_ERROR;
  error: string;
}

export type AttachmentActionTypes =
  | loadAttachmentsAction
  | attachmentsLoadedAction
  | attachmentsLoadingErrorAction
  | uploadAttachmentAction
  | uploadAttachmentSuccessAction
  | uploadAttachmentErrorAction;
