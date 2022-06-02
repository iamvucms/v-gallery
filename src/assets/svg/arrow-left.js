import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="arrowLeftIconTitle"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    color={color}
    viewBox="0 0 24 24">
    <Path d="m9 6-6 6 6 6M21 12H4M3 12h1" />
  </Svg>
);

export default SvgComponent;
