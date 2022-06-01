import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16">
    <Path
      fill={color}
      d="m14.431 3.323-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
    />
  </Svg>
);

export default SvgComponent;
