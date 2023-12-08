import React from 'react';
import { Appbar } from 'react-native-paper';
import { ROUTE_SETTINGS } from '../../Router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { NavigationStackProp } from 'react-navigation-stack';

interface HeaderProps {
  navigation: NavigationStackProp;
}

const Header: React.SFC<HeaderProps> = ({ navigation, children }) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          navigation.goBack();
        }}
        color='white'
      />
      <Appbar.Content
        title={<FormattedMessage {...messages.personalProfile} />}
        color='white'
      />
      {children}
    </Appbar.Header>
  );
};

export default Header;
