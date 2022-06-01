import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60.364 60.364"
    height={size}
    width={size}>
    <Path
      fill={color}
      d="m54.454 23.18-18.609-.002-.001-17.268a5.91 5.91 0 1 0-11.819 0v17.269L5.91 23.178a5.91 5.91 0 0 0 0 11.819h18.115v19.457a5.91 5.91 0 0 0 11.82.002V34.997h18.611a5.908 5.908 0 0 0 5.908-5.907 5.906 5.906 0 0 0-5.91-5.91z"
    />
  </Svg>
);

export default SvgComponent;
