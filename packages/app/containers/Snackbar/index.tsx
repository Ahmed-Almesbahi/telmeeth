/**
 *
 * Snackbar
 *
 */

import React, { memo } from 'react';
import { View } from 'react-native';

// import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeSelectSnackbar, hideSnackbar } from './ducks';
import { SnackbarProps } from './types';
import { createStructuredSelector } from 'reselect';

import { Snackbar as SnackbarPaper } from 'react-native-paper';

import messages from './messages';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from '../../utils/helper';

const Snackbar: React.SFC<SnackbarProps> = props => {
  return (
    <View style={{ flex: 1 }}>
      {props.children}
      <SnackbarPaper
        visible={props.snackbar.visible}
        onDismiss={() => props.hideSnackbar()}
        action={
          props.action
            ? props.action
            : {
                label: props.intl.formatMessage(messages.hide),
                onPress: () => {
                  props.hideSnackbar();
                }
              }
        }
        theme={props.theme}
        style={props.style}
      >
        {props.snackbar.message}
      </SnackbarPaper>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  snackbar: makeSelectSnackbar()
});

function mapDispatchToProps(dispatch: any) {
  return {
    hideSnackbar: () => dispatch(hideSnackbar())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(Snackbar);
