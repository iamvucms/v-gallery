import {View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {Container, VImage} from '../../components';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Layout} from '../../constants';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../stores';
const {width, height} = Layout.window;
const PhotoDetailModal = observer(({route}) => {
  const {image, specs} = appStore.photoDetailData || {};
  const anim = useSharedValue(0);
  useEffect(() => {
    anim.value = 0;
    anim.value = withTiming(1);
  }, []);

  const imageContainerStyle = useAnimatedStyle(() => {
    if (!image) {
      return {};
    }
    const {height: actualHeight, width: actualWidth} = image.mediaMetadata;
    const isPortrait = actualWidth < actualHeight;
    const targetWidth = isPortrait ? actualWidth : width;
    const targetHeight = isPortrait
      ? actualHeight
      : (width / actualWidth) * actualHeight;
    const targetX = (width - targetWidth) / 2;
    const targetY = (height - targetHeight) / 2;
    return {
      left: interpolate(anim.value, [0, 1], [specs.pageX, targetX]),
      top: interpolate(anim.value, [0, 1], [specs.pageY, targetY]),
      width: interpolate(anim.value, [0, 1], [specs.width, targetWidth]),
      height: interpolate(anim.value, [0, 1], [specs.height, targetHeight]),
    };
  });
  return (
    <React.Fragment>
      {appStore.isPhotoDetailVisible && (
        <Container disableFirst disableLast>
          <View style={styles.container}>
            <Animated.View style={[styles.backdrop]}></Animated.View>
            <Animated.View style={[styles.imageContainer, imageContainerStyle]}>
              <VImage resizeMode="cover" data={image} />
            </Animated.View>
          </View>
        </Container>
      )}
    </React.Fragment>
  );
});

export default PhotoDetailModal;
