import React, {Component} from 'react';
import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const dimens = {
  xxsmall: {
    fontSize: normalize(5),
  },
  xsmall: {
    fontSize: normalize(10),
  },
  small: {
    fontSize: normalize(12),
  },
  medium: {
    fontSize: normalize(15),
  },
  large: {
    fontSize: normalize(17),
  },
  xlarge: {
    fontSize: normalize(20),
  },
  xxlarge: {
    fontSize: normalize(24),
  },
};

export default dimens;
