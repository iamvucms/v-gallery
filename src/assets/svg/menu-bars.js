import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M3 16h18v2H3v-2Zm0-5h18v2H3v-2Zm0-5h18v2H3V6Z"
      fill={color}
      fillRule="evenodd"
    />
  </Svg>
);

export default SvgComponent;
