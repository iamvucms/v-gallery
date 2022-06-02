import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {VText} from '..';
import styles from './styles';
import {ArrowLeftSvg} from '../../assets/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Header = ({
  title,
  titleProps,
  leftIcon = <ArrowLeftSvg size={28} />,
  onLeftPress,
  onRightPress,
  rightIcon,
}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: top + 10,
        },
      ]}>
      {onLeftPress && (
        <TouchableOpacity onPress={onLeftPress} style={styles.btnBack}>
          {typeof leftIcon === 'function' ? leftIcon() : leftIcon}
        </TouchableOpacity>
      )}
      <VText lineHeight={20} fontSize={20} fontWeight={600} {...titleProps}>
        {title}
      </VText>
      {onRightPress && (
        <TouchableOpacity onPress={onRightPress} style={styles.btnRight}>
          {typeof rightIcon === 'function' ? rightIcon() : rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
