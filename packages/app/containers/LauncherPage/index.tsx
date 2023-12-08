import React, { useEffect, useState, useContext } from 'react';
import {
  Animated,
  View,
  ImageBackground,
  StatusBar,
  Platform
} from 'react-native';

// import { compose } from 'redux';
import { connect } from 'react-redux';
import { setUserType, makeSelectUser } from '../User/ducks';
import { createStructuredSelector } from 'reselect';
// import { makeSelectVersion } from '../App/selectors';
import { changeLocale, makeSelectLocale } from '../LanguagePage/ducks';

import RNRestart from 'react-native-restart';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles';
import Text from '../../components/Text';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Switch } from 'react-native-paper';
import { ThemeContext } from '../../hooks/useThemeContext';
import { STUDENT_TYPE, TEACHER_TYPE, API_URL } from '../../utils/constants';
import { ROUTE_LOGIN } from '../../Router';
import { LanguageOption } from '../LanguagePage/types';
import { compose } from '../../utils/helper';
import { NavigationStackProp } from 'react-navigation-stack';
import { initialStateUserType } from '../User/types';

interface LauncherBackgroundProps {
  language: LanguageOption;
}

const LauncherBackground: React.SFC<LauncherBackgroundProps> = props => {
  return props.language === 'ar' ? (
    <ImageBackground
      style={styles.container1}
      source={require('./../../images/launcherBackground-ar.png')}
    >
      {props.children}
    </ImageBackground>
  ) : (
    <ImageBackground
      style={styles.container1}
      source={require('./../../images/launcherBackground.png')}
    >
      {props.children}
    </ImageBackground>
  );
};

interface LauncherPageProps {
  language: LanguageOption;
  changeLocale: typeof changeLocale;
  setUserType: typeof setUserType;
  navigation: NavigationStackProp;
  user: initialStateUserType;
}

const LauncherPage: React.SFC<LauncherPageProps> = props => {
  const initialState = {
    anim: new Animated.Value(0)
  };
  const [state, setState] = useState(initialState);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    // if (props.user.user_id > 0) {
    //   if (props.user.user_type === TEACHER_TYPE) {
    //     props.navigation.replace('HomeTeacher');
    //   } else {
    //     props.navigation.replace('HomeStudent');
    //   }
    // }
    // StatusBar && StatusBar.setBarStyle('default');
    Animated.timing(state.anim, { toValue: 3000, duration: 3000 }).start();
  }, []);

  const fadeIn = (delay: number, from = 0) => {
    const { anim } = state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp'
          })
        }
      ]
    };
  };
  return (
    <LauncherBackground language={props.language}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <View style={styles.section1}>
          <Logo
          // type={props.type}
          />
          {/* <Animated.Image
          resizeMode="center"
          style={[fadeIn(0), styles.logo]}
          source={require("./../../images/telmeeth-icon-teacher.png")}
        /> */}
        </View>
        <Animated.View style={[styles.section2, fadeIn(1000, 10)]}>
          <Button
            style={{
              backgroundColor: '#ff3366',
              marginLeft: 5,
              marginRight: 5
            }}
            roundness
            onPress={() => {
              props.setUserType(STUDENT_TYPE);
              // @ts-ignore
              theme(STUDENT_TYPE);
              props.navigation.push('Login');
            }}
          >
            <FormattedMessage {...messages.student} />
          </Button>
          <Button
            style={{
              backgroundColor: '#6fda44',
              marginLeft: 5,
              marginRight: 5
            }}
            roundness
            onPress={() => {
              props.setUserType(TEACHER_TYPE);
              // @ts-ignore
              theme(TEACHER_TYPE);

              props.navigation.push('Login');
            }}
          >
            <FormattedMessage {...messages.teacher} />
          </Button>
        </Animated.View>
        <View style={styles.languageContainer}>
          <Text light>ENGLISH</Text>
          <Switch
            style={{ marginHorizontal: 10 }}
            value={props.language == 'en' ? false : true}
            onValueChange={() => {
              props.changeLocale(
                props.language == LanguageOption.English
                  ? LanguageOption.Arabic
                  : LanguageOption.English
              );
              if (Platform.OS !== 'web') {
                setTimeout(() => {
                  RNRestart.Restart();
                }, 200);
              }
            }}
          />
          <Text light>عربي</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <Text style={{ color: 'white', fontSize: 10 }}>Build Beta</Text>
          {/* <Text style={{ color: "white", fontSize: 10 }}>
              Build {props.version} Beta
            </Text> */}
        </View>
      </View>
    </LauncherBackground>
  );
};

const mapStateToProps = createStructuredSelector({
  // version: makeSelectVersion(),
  language: makeSelectLocale(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch: any) {
  return {
    setUserType: (type: number) => dispatch(setUserType(type)),
    changeLocale: (language: LanguageOption) => dispatch(changeLocale(language))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(LauncherPage);
