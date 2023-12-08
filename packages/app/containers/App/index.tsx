/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useState, useEffect, useRef } from 'react';
import { I18nManager, StatusBar } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser, makeSelectUserType } from '../User/ducks';
import { makeSelectLocale } from '../LanguagePage/ducks';

import { Icon } from '../../components';

import { ThemeContext } from '../../hooks/useThemeContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { themeStudent, themeTeacher } from './themes';
// Import i18n messages
import { translationMessages } from '../../i18nFix';

// import { Routes } from '../../Router';

// Import Language Provider
import LanguageProvider from '../LanguagePage/provider';
import { STUDENT_TYPE, TEACHER_TYPE } from '../../utils/constants';
//
// import RouteCheckAuth from './routeCheckAuth';
import Snackbar from '../Snackbar';

import { AppProps } from './types';
import PushNotification from '../PushNotification';
import RNRestart from 'react-native-restart';
import { Platform } from '../../components/Platform';

import * as NavigationService from '../../NavigationService';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from '../../components/NavigationContainer';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { UnloggedRoutes, DrawerRoutes } from '../../Router';
import DrawerContent from '../DrawerPage';
import {
  AppLayoutProvider,
  getLayoutConsumerState
} from '../../hooks/LayoutContext';
import Responsive from '../../components/Responsive';
import { View } from 'react-native';

// console.log('createAppContainer', createAppContainer);

let AppContainer: any = () => {
  return null;
};

let initialRouteName;
let routes = {};
let loaded = false;

const useComponentWillMount = (func: any) => {
  const willMount = useRef(true);
  if (willMount.current) {
    func();
  }
  useComponentDidMount(() => {
    willMount.current = false;
  });
};

const useComponentDidMount = (func: any) => useEffect(func, []);

const App: React.SFC<AppProps> = props => {
  const initialState = {
    theme: props.type === TEACHER_TYPE ? themeTeacher : themeStudent
  };
  const navigator = useRef(null);
  const [state, setState] = useState(initialState);
  const [_state, _setState] = useState(props.language);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    NavigationService.setNavigator(navigator.current);
    console.log('updated');
  }, [reload]);

  useEffect(() => {
    // console.log('should reload');
    // loaded = false;
    // NavigationService.setNavigator(navigator.current);
    if (!loaded) {
      loaded = true;
    } else {
      // console.log('looaded reload');
      AppContainer = getAppContainer();

      setReload(!reload);
    }
  }, [props.user.access_token]);

  const getAppContainer = () => {
    if (props.user.access_token != '') {
      if (props.type === TEACHER_TYPE) {
        initialRouteName = 'HomeTeacherDrawer';
        routes = {
          HomeTeacherDrawer: {
            screen: createDrawerNavigator(DrawerRoutes, {
              initialRouteName: 'HomeTeacher',
              contentComponent: (p: any) => <DrawerContent {...p} />
            })
          }
          // Launcher: {
          //   ...UnloggedRoutes.Launcher
          // }
        };
      } else {
        initialRouteName = 'HomeStudentDrawer';
        routes = {
          HomeStudentDrawer: {
            screen: createDrawerNavigator(DrawerRoutes, {
              initialRouteName: 'HomeStudent',
              contentComponent: (p: any) => <DrawerContent {...p} />
            })
          }
        };
      }
    } else {
      initialRouteName = 'Launcher';
      routes = {
        ...UnloggedRoutes
      };
    }

    console.log('routers', routes);

    const StackNavigator = createStackNavigator(routes, {
      initialRouteName: initialRouteName,
      headerMode: 'none'
      // defaultNavigationOptions: {
      //   header: null
      // }
    });
    return createAppContainer(StackNavigator);
  };

  useComponentWillMount(() => {
    AppContainer = getAppContainer();
  });

  // if (loaded === false) {
  //   AppContainer = getAppContainer();
  //   loaded = true;
  // }

  useEffect(() => {
    if (_state !== props.language) {
      if (Platform.OS !== 'web') {
        setTimeout(() => {
          RNRestart.Restart();
        }, 200);
      }
    }
  }, [props.language]);

  const test = () => {};

  const handleThemeChange = (themeName: number | null | typeof test) => {
    // console.log(themeName);

    if (themeName === STUDENT_TYPE) {
      setState({ theme: themeStudent });
    } else if (themeName === TEACHER_TYPE) {
      setState({ theme: themeTeacher });
    }
    return null;
  };

  I18nManager.forceRTL(props.language == 'ar' ? true : false);

  console.log(' getLayoutConsumerState();', getLayoutConsumerState());

  // console.log('AppContainer', AppContainer);
  return (
    <LanguageProvider messages={translationMessages}>
      <PaperProvider theme={state.theme}>
        <StatusBar
          backgroundColor={state.theme.colors.primary}
          barStyle='light-content'
        />
        <ThemeContext.Provider
          // @ts-ignore
          value={handleThemeChange}
        >
          <Snackbar>
            <PushNotification>
              <AppLayoutProvider>
                <Responsive
                  large={<AppContainer ref={navigator} />}
                  xlarge={
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <DrawerContent {...props} />
                      <AppContainer ref={navigator} />
                    </View>
                  }
                />
              </AppLayoutProvider>
            </PushNotification>
          </Snackbar>
        </ThemeContext.Provider>
      </PaperProvider>
    </LanguageProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  type: makeSelectUserType(),
  language: makeSelectLocale(),
  user: makeSelectUser()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
