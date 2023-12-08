import React, { PureComponent } from 'react';

import {
  Animated,
  Image,
  StyleSheet,
  PanResponder,
  View,
  Easing,
  ViewPropTypes,
  I18nManager
} from 'react-native';

import PropTypes from 'prop-types';

const TRACK_SIZE = 4;
const THUMB_SIZE = 20;

function Rect(this: any, x: number, y: number, width: number, height: number) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rect.prototype.containsPoint = function(x: number, y: number) {
  return (
    x >= this.x &&
    y >= this.y &&
    x <= this.x + this.width &&
    y <= this.y + this.height
  );
};

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0
  }
  // decay : { // This has a serious bug
  //   velocity     : 1,
  //   deceleration : 0.997
  // }
};

interface SliderProps {
  /**
   * Initial value of the slider. The value should be between minimumValue
   * and maximumValue, which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * *This is not a controlled component*, e.g. if you don't update
   * the value, the component won't be reset to its inital value.
   */
  value: number;

  /**
   * If true the user won't be able to move the slider.
   * Default value is false.
   */
  disabled?: boolean;

  /**
   * Initial minimum value of the slider. Default value is 0.
   */
  minimumValue: number;

  /**
   * Initial maximum value of the slider. Default value is 1.
   */
  maximumValue: number;

  /**
   * Step value of the slider. The value should be between 0 and
   * (maximumValue - minimumValue). Default value is 0.
   */
  step: number;

  /**
   * The color used for the track to the left of the button. Overrides the
   * default blue gradient image.
   */
  minimumTrackTintColor: string;

  /**
   * The color used for the track to the right of the button. Overrides the
   * default blue gradient image.
   */
  maximumTrackTintColor?: string;

  /**
   * The color used for the thumb.
   */
  thumbTintColor?: string;

  /**
   * The size of the touch area that allows moving the thumb.
   * The touch area has the same center has the visible thumb.
   * This allows to have a visually small thumb while still allowing the user
   * to move it easily.
   * The default is {width: 40, height: 40}.
   */
  thumbTouchSize?: any;

  /**
   * Callback continuously called while the user is dragging the slider.
   */
  onValueChange: (value: number) => void;

  /**
   * Callback called when the user starts changing the value (e.g. when
   * the slider is pressed).
   */
  onSlidingStart?: () => void;

  /**
   * Callback called when the user finishes changing the value (e.g. when
   * the slider is released).
   */
  onSlidingComplete?: () => void;

  /**
   * The style applied to the slider container.
   */
  styles?: any;
  style?: any;

  /**
   * The style applied to the track.
   */
  trackStyle: any;

  /**
   * The style applied to the thumb.
   */
  thumbStyle?: any;

  /**
   * Sets an image for the thumb.
   */
  thumbImage?: any;

  /**
   * Set this to true to visually see the thumb touch rect in green.
   */
  debugTouchArea?: boolean;

  /**
   * Set to true to animate values with default 'timing' animation type
   */
  animateTransitions?: boolean;

  /**
   * Custom Animation type. 'spring' or 'timing'.
   */
  animationType?: 'spring' | 'timing';

  /**
   * Used to configure the animation parameters.  These are the same parameters in the Animated library.
   */
  animationConfig?: object;
}

export default class Slider extends PureComponent<SliderProps, {}> {
  _panResponder: any;
  _previousLeft: any;
  _containerSize: any;
  _trackSize: any;
  _thumbSize: any;
  static defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0,
    minimumTrackTintColor: '#3f3f3f',
    maximumTrackTintColor: '#b3b3b3',
    thumbTintColor: '#343434',
    thumbTouchSize: { width: 40, height: 40 },
    debugTouchArea: false,
    animationType: 'timing'
  };

  state = {
    containerSize: { width: 0, height: 0 },
    trackSize: { width: 0, height: 0 },
    thumbSize: { width: 0, height: 0 },
    allMeasured: false,
    value: new Animated.Value(this.props.value)
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
  }

  componentWillReceiveProps(nextProps: { value: any }) {
    const newValue = nextProps.value;

    if (this.props.value !== newValue) {
      if (this.props.animateTransitions) {
        this._setCurrentValueAnimated(newValue);
      } else {
        this._setCurrentValue(newValue);
      }
    }
  }

  render() {
    const {
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      thumbImage,
      styles,
      style,
      trackStyle,
      thumbStyle,
      debugTouchArea,
      onValueChange,
      thumbTouchSize,
      animationType,
      animateTransitions,
      ...other
    } = this.props;
    const {
      value,
      containerSize,
      trackSize,
      thumbSize,
      allMeasured
    } = this.state;
    const mainStyles = styles || defaultStyles;
    const thumbLeft = value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: I18nManager.isRTL
        ? [0, -(containerSize.width - thumbSize.width)]
        : [0, containerSize.width - thumbSize.width]
      // extrapolate: 'clamp',
    });
    const minimumTrackWidth = value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - thumbSize.width]
      // extrapolate: 'clamp',
    });
    const valueVisibleStyle: any = {};
    if (!allMeasured) {
      valueVisibleStyle.opacity = 0;
    }

    const minimumTrackStyle = {
      position: 'absolute',
      width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
      backgroundColor: minimumTrackTintColor,
      ...valueVisibleStyle
    };

    const touchOverflowStyle = this._getTouchOverflowStyle();

    return (
      <View
        {...other}
        style={[mainStyles.container, style]}
        onLayout={this._measureContainer}
      >
        <View
          style={[
            { backgroundColor: maximumTrackTintColor },
            mainStyles.track,
            trackStyle
          ]}
          renderToHardwareTextureAndroid
          onLayout={this._measureTrack}
        />
        <Animated.View
          renderToHardwareTextureAndroid
          style={[mainStyles.track, trackStyle, minimumTrackStyle]}
        />
        <Animated.View
          onLayout={this._measureThumb}
          renderToHardwareTextureAndroid
          style={[
            { backgroundColor: thumbTintColor },
            mainStyles.thumb,
            thumbStyle,
            {
              transform: [{ translateX: thumbLeft }, { translateY: 0 }],
              ...valueVisibleStyle
            }
          ]}
        >
          {this._renderThumbImage()}
        </Animated.View>
        <View
          renderToHardwareTextureAndroid
          style={[defaultStyles.touchArea, touchOverflowStyle]}
          {...this._panResponder.panHandlers}
        >
          {debugTouchArea === true &&
            this._renderDebugThumbTouchRect(minimumTrackWidth)}
        </View>
      </View>
    );
  }

  _getPropsForComponentUpdate(props: {
    [x: string]: any;
    value: any;
    onValueChange: any;
    onSlidingStart: any;
    onSlidingComplete: any;
    style: any;
    trackStyle: any;
    thumbStyle: any;
  }) {
    const {
      value,
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      style,
      trackStyle,
      thumbStyle,
      ...otherProps
    } = props;

    return otherProps;
  }

  _handleStartShouldSetPanResponder = (
    e: object /* gestureState: object */
  ): boolean =>
    // Should we become active when the user presses down on the thumb?
    this._thumbHitTest(e);

  _handleMoveShouldSetPanResponder(/* e: object, gestureState: object */): boolean {
    // Should we become active when the user moves a touch over the thumb?
    return false;
  }

  _handlePanResponderGrant = (/* e: object, gestureState: object */) => {
    this._previousLeft = this._getThumbLeft(this._getCurrentValue());
    this._fireChangeEvent('onSlidingStart');
  };

  _handlePanResponderMove = (e: object, gestureState: object) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onValueChange');
  };

  _handlePanResponderRequestEnd(e: object, gestureState: object) {
    // Should we allow another component to take over this pan?
    return false;
  }

  _handlePanResponderEnd = (e: object, gestureState: object) => {
    if (this.props.disabled) {
      return;
    }

    this._setCurrentValue(this._getValue(gestureState));
    this._fireChangeEvent('onSlidingComplete');
  };

  _measureContainer = (x: object) => {
    this._handleMeasure('containerSize', x);
  };

  _measureTrack = (x: object) => {
    this._handleMeasure('trackSize', x);
  };

  _measureThumb = (x: object) => {
    this._handleMeasure('thumbSize', x);
  };

  _handleMeasure = (name: string, x: any) => {
    const { width, height } = x.nativeEvent.layout;
    const size = { width, height };

    const storeName = `_${name}`;
    // @ts-ignore
    const currentSize = this[storeName];
    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return;
    }
    // @ts-ignore
    this[storeName] = size;

    if (this._containerSize && this._trackSize && this._thumbSize) {
      this.setState({
        containerSize: this._containerSize,
        trackSize: this._trackSize,
        thumbSize: this._thumbSize,
        allMeasured: true
      });
    }
  };

  _getRatio = (value: number) =>
    (value - this.props.minimumValue) /
    (this.props.maximumValue - this.props.minimumValue);

  _getThumbLeft = (value: number) => {
    const nonRtlRatio = this._getRatio(value);
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
    return (
      ratio * (this.state.containerSize.width - this.state.thumbSize.width)
    );
  };

  _getValue = (gestureState: any) => {
    const length = this.state.containerSize.width - this.state.thumbSize.width;
    const thumbLeft = this._previousLeft + gestureState.dx;

    const nonRtlRatio = thumbLeft / length;
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;

    if (this.props.step) {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          this.props.minimumValue +
            Math.round(
              (ratio * (this.props.maximumValue - this.props.minimumValue)) /
                this.props.step
            ) *
              this.props.step
        )
      );
    }
    return Math.max(
      this.props.minimumValue,
      Math.min(
        this.props.maximumValue,
        ratio * (this.props.maximumValue - this.props.minimumValue) +
          this.props.minimumValue
      )
    );
  };

  // @ts-ignore
  _getCurrentValue = () => this.state.value.__getValue();

  _setCurrentValue = (value: number) => {
    this.state.value.setValue(value);
  };

  _setCurrentValueAnimated = (value: number) => {
    const animationType: any = this.props.animationType;
    const animationConfig = Object.assign(
      {},
      // @ts-ignore
      DEFAULT_ANIMATION_CONFIGS[animationType],
      this.props.animationConfig,
      {
        toValue: value
      }
    );

    // @ts-ignore
    Animated[animationType](this.state.value, animationConfig).start();
  };

  _fireChangeEvent = (event: React.ReactText) => {
    // @ts-ignore
    if (this.props[event]) {
      // @ts-ignore
      this.props[event](this._getCurrentValue());
    }
  };

  _getTouchOverflowSize = () => {
    const state = this.state;
    const props = this.props;

    const size: any = {};
    if (state.allMeasured === true) {
      size.width = Math.max(
        0,
        props.thumbTouchSize.width - state.thumbSize.width
      );
      size.height = Math.max(
        0,
        props.thumbTouchSize.height - state.containerSize.height
      );
    }

    return size;
  };

  _getTouchOverflowStyle = () => {
    const { width, height } = this._getTouchOverflowSize();

    const touchOverflowStyle: any = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }

    return touchOverflowStyle;
  };

  _thumbHitTest = (e: any) => {
    const nativeEvent = e.nativeEvent;
    const thumbTouchRect = this._getThumbTouchRect();
    return thumbTouchRect.containsPoint(
      nativeEvent.locationX,
      nativeEvent.locationY
    );
  };

  _getThumbTouchRect = () => {
    const state = this.state;
    const props = this.props;
    const touchOverflowSize = this._getTouchOverflowSize();

    // @ts-ignore
    return new Rect(
      touchOverflowSize.width / 2 +
        this._getThumbLeft(this._getCurrentValue()) +
        (state.thumbSize.width - props.thumbTouchSize.width) / 2,
      touchOverflowSize.height / 2 +
        (state.containerSize.height - props.thumbTouchSize.height) / 2,
      props.thumbTouchSize.width,
      props.thumbTouchSize.height
    );
  };

  _renderDebugThumbTouchRect = (thumbLeft: any) => {
    const thumbTouchRect = this._getThumbTouchRect();
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height
    };

    return (
      <Animated.View
        style={[defaultStyles.debugThumbTouchArea, positionStyle]}
        pointerEvents='none'
      />
    );
  };

  _renderThumbImage = () => {
    const { thumbImage } = this.props;

    if (!thumbImage) return;

    return <Image source={thumbImage} />;
  };
}

var defaultStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center'
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5
  }
});
