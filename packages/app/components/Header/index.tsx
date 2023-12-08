import React from 'react';
import { Appbar } from 'react-native-paper';
import { ROUTE_SETTINGS } from '../../Router';
import { NavigationStackProp } from 'react-navigation-stack';

interface HeaderProps {
  left?: any;
  right?: any;
  navigation: NavigationStackProp;
  title: string;
}

const Header: React.SFC<HeaderProps> = props => {
  return (
    <Appbar.Header>
      {props.left}
      <Appbar.Content color='white' title={props.title} />
      {props.right ? props.right : props.children}
    </Appbar.Header>
  );
};

export default Header;
