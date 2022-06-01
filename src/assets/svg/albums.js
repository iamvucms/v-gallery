import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256">
    <Path
      style={{
        fill: 'none',
        stroke: color,
        strokeWidth: 15.99987221,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: 4,
        strokeDasharray: 'none',
        strokeOpacity: 1,
      }}
      fill={color}
      d="m16 80 111.947-64.025M16 80l112 64M16 176l112 64M128 16l112 64M128 144l112-64M128 240l112-64M16 128l112 64M128 192l111.947-63.998M16 128l42.032-23.987M16 176l42.033-24.009M239.947 128.002l-41.98-23.987M240 176l-42.034-24.01"
    />
  </Svg>
);

export default SvgComponent;
