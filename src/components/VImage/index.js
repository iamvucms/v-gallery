import {Image, Pressable} from 'react-native';
import React, {useRef} from 'react';
import styles from './styles';
import {Colors} from '../../constants';

const VImage = ({data, style, onPress, ...imageProps}) => {
  const imageRef = useRef();
  const onImagePress = React.useCallback(() => {
    imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onPress && onPress(data, {x, y, width, height, pageX, pageY});
    });
  }, []);
  return (
    <Pressable
      delayPressOut={300}
      onPress={onImagePress}
      style={styles.container}>
      <Image
        ref={imageRef}
        source={{
          uri: data.baseUrl,
        }}
        style={[styles.container, style]}
        {...imageProps}
      />
    </Pressable>
  );
};

export default VImage;
