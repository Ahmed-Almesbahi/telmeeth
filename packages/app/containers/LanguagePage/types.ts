import {
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_ERROR,
  CHANGE_LOCALE,
  updateLanguage
} from './ducks';
import { mapDispatchToProps } from '../DrawerPage';
import { NavigationStackProp } from 'react-navigation-stack';

export enum LanguageOption {
  English = 'en',
  Arabic = 'ar'
}

export interface LanguageProviderProps {
  locale?: LanguageOption;
  messages: any;
  children: React.ReactNode;
}

export interface LanguagePageProps {
  navigation: NavigationStackProp;
  // updateLanguage: typeof updateLanguage;
  dispatch: typeof mapDispatchToProps;
  language: initialStateLanguageType;
}

export interface initialStateLanguageType {
  locale: LanguageOption;
  loading: boolean;
  error: string;
  loaded: boolean;
  rand: number;
}

export interface updateLanguageAction {
  type: typeof UPDATE_LANGUAGE;
  lang: LanguageOption;
}
export interface languageUpdatedAction {
  type: typeof UPDATE_LANGUAGE_SUCCESS;
  locale: LanguageOption;
}
export interface languageUpdatingErrorAction {
  type: typeof UPDATE_LANGUAGE_ERROR;
  error: string;
}
export interface changeLocaleAction {
  type: typeof CHANGE_LOCALE;
  locale: LanguageOption;
}

export type LanguageActionTypes =
  | updateLanguageAction
  | languageUpdatedAction
  | languageUpdatingErrorAction
  | changeLocaleAction;
