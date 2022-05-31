import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26.39 26.39"
    height={size}
    width={size}>
    <Path
      fill={color}
      d="M3.588 24.297s-.024.59.553.59l6.652-.008.01-5.451s-.094-.898.777-.898h2.761c1.031 0 .968.898.968.898l-.012 5.434h6.512c.732 0 .699-.734.699-.734V14.076L13.33 5.913l-9.742 8.164v10.22z"
    />
    <Path
      fill={color}
      d="M0 13.317s.826 1.524 2.631 0l10.781-9.121 10.107 9.064c2.088 1.506 2.871 0 2.871 0L13.412 1.504 0 13.317zM23.273 4.175h-2.599l.011 3.153 2.588 2.197z"
    />
  </Svg>
);

export default SvgComponent;
