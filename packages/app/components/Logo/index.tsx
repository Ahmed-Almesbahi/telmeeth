import React, { useState, useEffect, memo } from 'react';
import { Animated, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { TEACHER_TYPE } from '../../utils/constants';

// import console = require("console");

interface IProps {
  type?: number;
}

const Logo = (props: IProps) => {
  const initialState = {
    anim: new Animated.Value(0)
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
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
  if (props.type === TEACHER_TYPE) {
    return (
      <Animated.Image
        // resizeMode='center'
        resizeMode='contain'
        style={[fadeIn(0), styles.logo]}
        source={require('./../../images/telmeeth-icon-teacher.png')}
      />
    );
  } else {
    return (
      <Animated.Image
        // resizeMode='center'
        resizeMode='contain'
        style={[fadeIn(0), styles.logo]}
        source={require('./../../images/telmeeth-icon-student.png')}
      />
    );
  }
};

// Logo.propTypes = {
//   type: PropTypes.string.isRequired
// };

export default memo(Logo);
