/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { FunctionComponent } from 'react';
import Text from '../../components/Text';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './ducks';
import { LanguageProviderProps, LanguageOption } from './types';
import { compose } from 'redux';

const LanguageProvider: FunctionComponent<LanguageProviderProps> = props => {
  const locale = props.locale ? props.locale : LanguageOption.English;
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[locale]}
      textComponent={Text}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale
  })
);

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(LanguageProvider);
