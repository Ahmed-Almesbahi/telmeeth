import React from 'react';
import { Text, View } from 'react-native';

import { Route, Redirect } from 'react-router-dom';

import { STUDENT_TYPE, TEACHER_TYPE } from '../../utils/constants';
import {
  ROUTE_HOME_TEACHER,
  ROUTE_HOME_STUDENT,
  ROUTE_OTP
} from '../../Router';
import { initialStateUserType } from '../User/types';

interface RouteCheckAuthProps {
  component: any;
  requiredSignedIn: boolean;
  // isLoggedIn: boolean;
  path: string;
  user: initialStateUserType;
}

const RouteCheckAuth: React.SFC<RouteCheckAuthProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.requiredSignedIn === true) {
          if (rest.user.user_id > 0 && rest.user.access_token !== '') {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            );
          }
        } else if (rest.requiredSignedIn === false) {
          if (
            rest.user.user_id > 0 &&
            rest.user.access_token !== '' &&
            rest.path !== ROUTE_OTP
          ) {
            return (
              <Redirect
                to={{
                  pathname:
                    rest.user.user_type === TEACHER_TYPE
                      ? ROUTE_HOME_TEACHER
                      : ROUTE_HOME_STUDENT,
                  state: { from: props.location }
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};

export default RouteCheckAuth;
