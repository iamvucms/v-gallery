import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 455 455"
    height={size}
    width={size}>
    <Path
      fill={color}
      d="M326.632 10.346c-38.733 0-74.991 17.537-99.132 46.92-24.141-29.383-60.399-46.92-99.132-46.92C57.586 10.346 0 67.931 0 138.714 0 194.14 33.049 258.249 98.23 329.26c50.162 54.649 104.729 96.96 120.257 108.626l9.01 6.769 9.009-6.768c15.53-11.667 70.099-53.979 120.26-108.625C421.95 258.251 455 194.141 455 138.714c0-70.783-57.586-128.368-128.368-128.368z"
    />
  </Svg>
);

export default SvgComponent;
