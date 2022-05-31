import {Pressable, StatusBar, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {VImage, VText, Padding} from '../../components';
import Animated, {
  FadeInUp,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, Layout} from '../../constants';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../stores';
import {autorun, toJS} from 'mobx';
const {width, height} = Layout.window;
import {Portal} from '@gorhom/portal';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const PhotoDetailModal = observer(() => {
  const {image, specs} = toJS(appStore.photoDetailData) || {};
  const anim = useSharedValue(0);
  const animY = useSharedValue(0);
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    autorun(() => {
      if (!appStore.isPhotoDetailVisible) {
        anim.value = withTiming(0);
      } else {
        anim.value = withTiming(1);
      }
    });
  }, []);
  const onBackPress = React.useCallback(() => {
    const callback = () => appStore.setPhotoDetailData(false);
    anim.value = withTiming(
      0,
      {},
      isFinished => isFinished && runOnJS(callback)(),
    );
  }, []);
  const gestureHandler = useAnimatedGestureHandler({
    onActive: ({translationY, translationX}) => {
      animY.value = translationY * 0.4;
    },
    onEnd: ({translationY}) => {
      if (translationY > height * 0.3) {
        runOnJS(onBackPress)();
        animY.value = withTiming(0);
      } else {
        animY.value = withTiming(0);
      }
    },
  });
  const imageContainerStyle = useAnimatedStyle(() => {
    if (!image || !specs) {
      return {
        width: 0,
        height: 0,
      };
    }
    const {height: actualHeight, width: actualWidth} = image;
    const isPortrait = actualWidth < actualHeight;
    const targetWidth = isPortrait ? Math.min(actualWidth, width) : width;
    const targetHeight = isPortrait
      ? Math.min(actualHeight, height)
      : (width / actualWidth) * actualHeight;
    const targetX = (width - targetWidth) / 2;
    const targetY = (height - targetHeight) / 2;
    return {
      left: interpolate(anim.value, [0, 1], [specs.pageX, targetX]),
      top: interpolate(anim.value, [0, 1], [specs.pageY, targetY]),
      width: interpolate(anim.value, [0, 1], [specs.width, targetWidth]),
      height: interpolate(anim.value, [0, 1], [specs.height, targetHeight]),
      borderRadius: interpolate(anim.value, [0, 1], [5, 0]),
      transform: [
        {
          translateY: animY.value,
        },
      ],
    };
  });
  const backdropOpacity = useAnimatedStyle(() => ({
    opacity: anim.value * interpolate(animY.value, [0, height * 0.3], [1, 0]),
  }));
  return (
    <React.Fragment>
      <Portal>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.container,
              {
                zIndex: appStore.isPhotoDetailVisible ? 99 : -99,
              },
            ]}>
            <Animated.View style={[styles.backdrop, backdropOpacity]}>
              <Pressable onPress={onBackPress} style={styles.backdropInner} />
            </Animated.View>
            {image && specs && (
              <Animated.View
                style={[styles.imageContainer, imageContainerStyle]}>
                <VImage resizeMode="cover" data={image} />
              </Animated.View>
            )}
            {appStore.isPhotoDetailVisible && (
              <Animated.View entering={FadeInUp} style={styles.authorContainer}>
                <VText fontSize="medium" fontWeight={700} color={Colors.white}>
                  {image.user.username}
                </VText>
                <Padding paddingTop={8} />
                <VText numberOfLines={2} color={Colors.white} fontWeight={300}>
                  {image.description}
                </VText>
                <Padding paddingBottom={bottom > 0 ? bottom : 20} />
              </Animated.View>
            )}
          </Animated.View>
        </PanGestureHandler>
      </Portal>
    </React.Fragment>
  );
});

export default PhotoDetailModal;
