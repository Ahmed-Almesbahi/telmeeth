import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { TEACHER_TYPE } from '../../utils/constants';
import { LanguageOption } from '../../containers/LanguagePage/types';

interface LauncherBackgroundProps {
  type: number;
  language: LanguageOption;
}

const LauncherBackground: React.SFC<LauncherBackgroundProps> = props => {
  if (props.type === TEACHER_TYPE) {
    return props.language === 'ar' ? (
      <ImageBackground
        style={styles.containerBackground}
        source={require('./../../images/teacherBackground-ar.png')}
      >
        {props.children}
      </ImageBackground>
    ) : (
      <ImageBackground
        style={styles.containerBackground}
        source={require('./../../images/teacherBackground.png')}
      >
        {props.children}
      </ImageBackground>
    );
  } else {
    return props.language === 'ar' ? (
      <ImageBackground
        style={styles.containerBackground}
        source={require('./../../images/studentBackground-ar.png')}
      >
        {props.children}
      </ImageBackground>
    ) : (
      <ImageBackground
        style={styles.containerBackground}
        source={require('./../../images/studentBackground.png')}
      >
        {props.children}
      </ImageBackground>
    );
  }
};

LauncherBackground.propTypes = {
  type: PropTypes.number.isRequired
};

export default LauncherBackground;
