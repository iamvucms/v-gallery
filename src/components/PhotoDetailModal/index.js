import {Pressable, StatusBar, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {VImage, VPlayer, VText, Padding} from '../../components';
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
import {Observer, observer} from 'mobx-react-lite';
import {appStore, galleryStore} from '../../stores';
import {autorun, toJS} from 'mobx';
const {width, height} = Layout.window;
import {Portal} from '@gorhom/portal';
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {CloseSvg, HeartSvg} from '../../assets/svg';
const PhotoDetailModal = observer(() => {
  const {image, specs} = toJS(appStore.photoDetailData) || {};
  const anim = useSharedValue(0);
  const animY = useSharedValue(0);
  const animScale = useSharedValue(1);
  const animFocalX = useSharedValue(0);
  const animFocalY = useSharedValue(0);
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
  const panGestureHandler = useAnimatedGestureHandler({
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
  const pinchGestureHandler = useAnimatedGestureHandler({
    onActive: ({scale, focalY, focalX}) => {
      animScale.value = scale;
      animFocalX.value = width / 2 - focalX;
      animFocalY.value = height / 2 - focalY;
    },
    onEnd: () => {
      animScale.value = withTiming(1);
      animFocalX.value = withTiming(0);
      animFocalY.value = withTiming(0);
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
    const targetHeight = Math.min(
      (targetWidth / actualWidth) * actualHeight,
      height,
    );
    const targetX = (width - targetWidth) / 2;
    const targetY = (height - targetHeight) / 2;
    return {
      left: interpolate(anim.value, [0, 1], [specs.pageX, targetX]),
      top: interpolate(anim.value, [0, 1], [specs.pageY, targetY]),
      width: interpolate(anim.value, [0, 1], [specs.width, targetWidth]),
      height: interpolate(anim.value, [0, 1], [specs.height, targetHeight]),
      borderRadius: interpolate(
        anim.value,
        [0, 1],
        [specs.borderRadius || 5, 0],
      ),
      transform: [
        {
          translateY: animY.value,
        },
        {
          translateX: -animFocalX.value,
        },
        {
          translateY: -animFocalY.value,
        },
        {
          scale: animScale.value,
        },
        {
          translateX: animFocalX.value,
        },
        {
          translateY: animFocalY.value,
        },
      ],
    };
  });
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: anim.value * interpolate(animY.value, [0, height * 0.3], [1, 0]),
  }));
  return (
    <React.Fragment>
      <Portal>
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
          <Animated.View
            style={[
              styles.container,
              {zIndex: appStore.isPhotoDetailVisible ? 99 : -99},
            ]}>
            <PanGestureHandler
              maxPointers={1}
              onGestureEvent={panGestureHandler}>
              <Animated.View
                style={[
                  styles.container,
                  {
                    zIndex: appStore.isPhotoDetailVisible ? 99 : -99,
                  },
                ]}>
                {appStore.isPhotoDetailVisible && (
                  <Animated.View style={[styles.header, opacityStyle]}>
                    <TouchableOpacity
                      onPress={onBackPress}
                      style={styles.btnHeader}>
                      <CloseSvg size={16} />
                    </TouchableOpacity>
                    <Observer>
                      {() => {
                        const isFavorite = galleryStore.favoritePhotos.find(
                          i => i.id === image.id,
                        );
                        const onFavoritePress = () => {
                          if (isFavorite) {
                            galleryStore.removeFavorite(image.id);
                          } else {
                            galleryStore.addFavorite(image);
                          }
                        };
                        return (
                          <TouchableOpacity
                            onPress={onFavoritePress}
                            style={styles.btnHeader}>
                            <HeartSvg
                              color={isFavorite ? Colors.primary : Colors.black}
                            />
                          </TouchableOpacity>
                        );
                      }}
                    </Observer>
                  </Animated.View>
                )}
                <Animated.View style={[styles.backdrop, opacityStyle]}>
                  <Pressable
                    onPress={onBackPress}
                    style={styles.backdropInner}
                  />
                </Animated.View>
                {appStore.isPhotoDetailVisible && (
                  <Animated.View
                    style={[styles.imageContainer, imageContainerStyle]}>
                    {image.isVideo ? (
                      <VPlayer uri={image.baseUrl} />
                    ) : (
                      <VImage resizeMode="cover" data={image} />
                    )}
                  </Animated.View>
                )}
                {appStore.isPhotoDetailVisible && (
                  <Animated.View
                    entering={FadeInUp}
                    style={[styles.authorContainer, opacityStyle]}>
                    <VText
                      fontSize="medium"
                      fontWeight={700}
                      color={Colors.white}>
                      {image.title}
                    </VText>
                    <Padding paddingTop={8} />
                    <VText
                      numberOfLines={2}
                      color={Colors.white}
                      fontWeight={300}>
                      {image.description}
                    </VText>
                    <Padding paddingBottom={bottom > 0 ? bottom : 20} />
                    <LinearGradient
                      style={styles.bottomBg}
                      colors={[
                        'rgba(0,0,0,0)',
                        'rgba(0,0,0,0.5)',
                        'rgba(0,0,0,0.8)',
                      ]}
                    />
                  </Animated.View>
                )}
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </Portal>
    </React.Fragment>
  );
});

export default PhotoDetailModal;
