import {Image, Pressable, View} from 'react-native';
import React, {useRef} from 'react';
import styles from './styles';
import {VideoSvg} from '../../assets/svg';

const VImage = ({
  data,
  style,
  onPress,
  isCover,
  disabledPress,
  ...imageProps
}) => {
  const imageRef = useRef();
  const onImagePress = React.useCallback(() => {
    imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
      onPress && onPress(data, {x, y, width, height, pageX, pageY});
    });
  }, []);
  const uri = isCover
    ? data.coverPhotoBaseUrl
    : data.baseUrl + (data.isVideo && !data.isLocalUri ? '=-no' : '');

  return (
    <Pressable
      disabled={disabledPress}
      delayPressOut={300}
      onPress={onImagePress}
      style={styles.container}>
      <Image
        ref={imageRef}
        source={{
          uri,
        }}
        style={[styles.container, style]}
        {...imageProps}
      />
      {data.isVideo && (
        <View style={styles.videoLabel}>
          <VideoSvg />
        </View>
      )}
    </Pressable>
  );
};

export default VImage;
