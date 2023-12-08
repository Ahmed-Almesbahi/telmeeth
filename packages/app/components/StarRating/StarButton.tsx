// React and react native imports
import React, { Component } from 'react';
import { Image, StyleSheet, ViewPropTypes, I18nManager } from 'react-native';
import PropTypes from 'prop-types';

// Third party imports
import Button from '../ReactNativeButton';
import { MaterialCommunityIcons } from '../index';

interface StarButtonProps {
  buttonStyle?: any;
  disabled: boolean;
  halfStarEnabled: boolean;
  icoMoonJson?: string;
  iconSet: string;
  rating: number;
  reversed: boolean;
  starColor: string;
  starIconName: string | object | number;
  starSize: number;
  activeOpacity: number;
  starStyle?: any;
  onStarButtonPress: (arg1: any) => void;
}

const defaultProps = {
  buttonStyle: {},
  icoMoonJson: undefined,
  starStyle: {}
};

class StarButton extends Component<StarButtonProps, {}> {
  constructor(props: any) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress(event: any) {
    const { halfStarEnabled, starSize, rating, onStarButtonPress } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  }

  renderIcon() {
    const {
      reversed,
      starColor,
      starIconName,
      starSize,
      starStyle
    } = this.props;

    const Icon = MaterialCommunityIcons;
    let iconElement;

    const newStarStyle = {
      transform: [
        {
          scaleX: reversed ? -1 : 1
        }
      ],
      ...StyleSheet.flatten(starStyle)
    };

    if (typeof starIconName === 'string') {
      iconElement = (
        <Icon
          name={starIconName}
          size={starSize}
          color={starColor}
          // style={newStarStyle}
          style={{
            transform: [
              {
                scaleX: I18nManager.isRTL ? -1 : 1
              }
            ]
          }}
        />
      );
    } else {
      const imageStyle = {
        width: starSize,
        height: starSize,
        resizeMode: 'contain'
      };

      const iconStyles = [imageStyle, newStarStyle];

      iconElement = <Image source={starIconName} style={iconStyles} />;
    }

    return iconElement;
  }

  render() {
    const { activeOpacity, buttonStyle, disabled } = this.props;
    // return null;
    return (
      <Button
        activeOpacity={activeOpacity}
        disabled={disabled}
        containerStyle={buttonStyle}
        onPress={this.onButtonPress}
      >
        {this.renderIcon()}
      </Button>
    );
  }
}

// StarButton.defaultProps = defaultProps;

export default StarButton;
