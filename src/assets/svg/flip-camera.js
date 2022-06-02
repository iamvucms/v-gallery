import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../constants';

const SvgComponent = ({size = 20, color = Colors.black}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 311.63 311.63"
    height={size}
    width={size}>
    <Path
      fill={color}
      d="M299.13 124.494h-21v25h8.5v76H176.249a32.606 32.606 0 0 1 .324 25H299.13c6.903 0 12.5-5.597 12.5-12.5v-101c0-6.903-5.597-12.5-12.5-12.5zM95.54 189.938c-4.881-4.881-12.797-4.881-17.678 0-4.882 4.882-4.882 12.796 0 17.678l18.259 18.259H25v-76h8.5v-25h-21c-6.903 0-12.5 5.597-12.5 12.5v101c0 6.903 5.597 12.5 12.5 12.5H96.121l-18.259 18.259c-4.882 4.882-4.882 12.796 0 17.678 2.44 2.44 5.64 3.661 8.839 3.661s6.398-1.221 8.839-3.661l39.598-39.598c4.882-4.882 4.882-12.796 0-17.678L95.54 189.938zM89.369 161.229c1.829.498 3.751.768 5.738.768h120.228c12.049 0 21.817-9.768 21.817-21.817V65.402c0-11.612-9.072-21.101-20.515-21.775V33.329c0-6.721-5.449-12.171-12.171-12.171h-22.904c-6.722 0-12.17 5.449-12.17 12.171v10.256H95.107c-12.049 0-21.817 9.768-21.817 21.817v74.777c-.001 10.063 6.814 18.53 16.079 21.05zm65.852-100.667c23.322 0 42.229 18.906 42.229 42.229 0 23.322-18.906 42.229-42.229 42.229-23.322 0-42.229-18.906-42.229-42.229s18.906-42.229 42.229-42.229z"
    />
  </Svg>
);

export default SvgComponent;