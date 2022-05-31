import {View} from 'react-native';
import React from 'react';

const Padding = ({
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  padding = 0,
  paddingHorizontal = 0,
  paddingVertical = 0,
  children,
}) => {
  return (
    <View
      style={{
        ...(paddingBottom && {paddingBottom: paddingBottom}),
        ...(paddingLeft && {paddingLeft: paddingLeft}),
        ...(paddingRight && {paddingRight: paddingRight}),
        ...(paddingTop && {paddingTop: paddingTop}),
        ...(padding && {padding: padding}),
        ...(paddingHorizontal && {
          paddingHorizontal: paddingHorizontal,
        }),
        ...(paddingVertical && {
          paddingVertical: paddingVertical,
        }),
      }}>
      {children}
    </View>
  );
};

export default React.memo(Padding);
