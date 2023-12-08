import { createSelector } from 'reselect';
import produce from 'immer';
import {
  LanguageActionTypes,
  initialStateLanguageType,
  LanguageOption
} from './types';
import { DEFAULT_LOCALE } from '../../i18nFix';

/*
 *
 * LanguagePage constants
 *
 */
export const UPDATE_LANGUAGE = 'app/LanguagePage/UPDATE_LANGUAGE';
export const UPDATE_LANGUAGE_SUCCESS =
  'app/LanguagePage/UPDATE_LANGUAGE_SUCCESS';
export const UPDATE_LANGUAGE_ERROR = 'app/LanguagePage/UPDATE_LANGUAGE_ERROR';
export const CHANGE_LOCALE = 'app/LanguagePage/CHANGE_LOCALE';

/*
 *
 * LanguagePage reducer
 *
 */
export const initialState: initialStateLanguageType = {
  locale: LanguageOption.English,
  loading: false,
  error: '',
  loaded: false,
  rand: Math.random()
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action: LanguageActionTypes) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_LANGUAGE:
        draft.loading = true;
        draft.error = '';
        break;

      case UPDATE_LANGUAGE_SUCCESS:
        draft.locale = action.locale;
        draft.loading = false;
        draft.loaded = true;
        draft.rand = Math.random();
        break;

      case UPDATE_LANGUAGE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

/**
 * Direct selector to the LanguagePage state domain
 */

const selectLanguagePageDomain = (state: any) => state.language || initialState;

/**
 * Default selector used by LanguagePage
 */

export const makeSelectLanguage = () =>
  createSelector(
    selectLanguagePageDomain,
    substate => substate
  );

export const makeSelectLocale = () =>
  createSelector(
    selectLanguagePageDomain,
    languageState => languageState.locale
  );

/**
 * update the language, this action starts the request saga
 * @return {object} An action object with a type of UPDATE_LANGUAGE
 */
export function updateLanguage(lang: LanguageOption): LanguageActionTypes {
  return {
    type: UPDATE_LANGUAGE,
    lang
  };
}

/**
 * Dispatched when the language are updated by the request saga
 *
 *
 * @return {object}      An action object with a type of UPDATE_LANGUAGE_SUCCESS passing the repos
 */
export function languageUpdated(locale: LanguageOption): LanguageActionTypes {
  return {
    type: UPDATE_LANGUAGE_SUCCESS,
    locale
  };
}

/**
 * Dispatched when updating the language fails
 *
 * @param  {object} error The error
 * @return {object}       An action object with a type of UPDATE_LANGUAGE_ERROR passing the error
 */
export function languageUpdatingError(error: string): LanguageActionTypes {
  return {
    type: UPDATE_LANGUAGE_ERROR,
    error
  };
}

export function changeLocale(
  languageLocale: LanguageOption
): LanguageActionTypes {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  };
}
