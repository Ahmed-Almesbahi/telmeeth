import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import styles from './styles';

interface PulseProps {
  color?: string;
  diameter?: number;
  duration?: number;
  image?: object;
  initialDiameter: number;
  numPulses?: number;
  pulseStyle?: object;
  speed?: number;
  style?: object;
}
interface PulseState {
  maxDiameter?: any;
  numPulses?: any;
  duration?: any;
  speed?: any;
  color?: any;
  image?: any;
  pulses?: any;
  pulseStyle?: any;
  started?: any;
  style?: any;
}

export default class Pulse extends Component<PulseProps, PulseState> {
  static defaultProps = {
    color: 'blue',
    diameter: 400,
    duration: 1000,
    image: null,
    initialDiameter: 0,
    numPulses: 3,
    pulseStyle: {},
    speed: 10,
    style: {
      top: 0,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };

  createPulseTimer: any;
  timer: any;

  constructor(props: any) {
    super(props);

    this.state = {
      color: this.props.color,
      duration: this.props.duration,
      image: this.props.image,
      maxDiameter: this.props.diameter,
      numPulses: this.props.numPulses,
      pulses: [],
      pulseStyle: this.props.pulseStyle,
      speed: this.props.speed,
      started: false,
      style: this.props.style
    };
  }

  mounted = true;

  componentDidMount() {
    const { numPulses, duration, speed } = this.state;

    this.setState({ started: true });

    let a = 0;
    while (a < numPulses) {
      this.createPulseTimer = setTimeout(() => {
        this.createPulse(a);
      }, a * duration);

      a++;
    }

    this.timer = setInterval(() => {
      this.updatePulse();
    }, speed);
  }

  componentWillUnmount() {
    this.mounted = false;
    clearTimeout(this.createPulseTimer);
    clearInterval(this.timer);
  }

  createPulse = (pKey: any) => {
    if (this.mounted) {
      let pulses = this.state.pulses;

      let pulse = {
        pulseKey: pulses.length + 1,
        diameter: this.props.initialDiameter,
        opacity: 0.5,
        centerOffset: (this.state.maxDiameter - this.props.initialDiameter) / 2
      };

      pulses.push(pulse);

      this.setState({ pulses });
    }
  };

  updatePulse = () => {
    if (this.mounted) {
      const pulses = this.state.pulses.map((p: any, i: any) => {
        let maxDiameter = this.state.maxDiameter;
        let newDiameter = p.diameter > maxDiameter ? 0 : p.diameter + 2;
        let centerOffset = (maxDiameter - newDiameter) / 2;
        let opacity = Math.abs(newDiameter / this.state.maxDiameter - 1);

        let pulse = {
          pulseKey: i + 1,
          diameter: newDiameter,
          opacity: opacity > 0.5 ? 0.5 : opacity,
          centerOffset: centerOffset
        };

        return pulse;
      });

      this.setState({ pulses });
    }
  };

  render() {
    const {
      color,
      image,
      maxDiameter,
      pulses,
      pulseStyle,
      started,
      style
    } = this.state;
    const containerStyle = [styles.container, style];
    const pulseWrapperStyle = { width: maxDiameter, height: maxDiameter };

    return (
      <View style={containerStyle}>
        {started && (
          <View style={pulseWrapperStyle}>
            {pulses.map((pulse: any) => (
              <View
                key={pulse.pulseKey}
                style={[
                  styles.pulse,
                  {
                    backgroundColor: color,
                    width: pulse.diameter,
                    height: pulse.diameter,
                    opacity: pulse.opacity,
                    borderRadius: pulse.diameter / 2,
                    top: pulse.centerOffset,
                    left: pulse.centerOffset
                  },
                  pulseStyle
                ]}
              />
            ))}
            {this.props.children}
            {image && <Image style={image.style} source={image.source} />}
          </View>
        )}
      </View>
    );
  }
}
