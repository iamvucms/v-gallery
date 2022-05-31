import {Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors} from '../../constants';
export const FontWeights = {
  300: 'Rubik-Light',
  400: 'Rubik-Regular',
  500: 'Rubik-Medium',
  600: 'Rubik-SemiBold',
  700: 'Rubik-Bold',
  800: 'Rubik-ExtraBold',
  900: 'Rubik-Black',
};
export const FontSizes = {
  normal: 16,
  small: 14,
  medium: 18,
  large: 20,
  h6: 24,
  h5: 28,
  h4: 32,
  h3: 36,
  h2: 40,
  h1: 44,
};
const VText = ({
  children,
  fontWeight = 400,
  fontSize = 'normal',
  color = Colors.typography,
  lineHeightRatio,
  lineHeight,
  style,
  align = 'left',
  ...restProps
}) => {
  const size = isNaN(fontSize) ? FontSizes[fontSize] : fontSize;
  const textStyles = {
    fontFamily: FontWeights[fontWeight],
    color,
    fontSize: size,
    ...(lineHeightRatio && {lineHeight: size * lineHeightRatio}),
    ...(lineHeight && {lineHeight}),
    textAlign: align,
  };
  return (
    <Text style={[styles.base, textStyles, style]} {...restProps}>
      {children}
    </Text>
  );
};

export default VText;
