import {Modal, Pressable, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import styles from './styles';
import {PlusSvg} from '../../assets/svg';
import {Colors, CreateOptions, isAndroid} from '../../constants';
import Animated, {
  BounceIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Portal} from '@gorhom/portal';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';

const CaptureButton = () => {
  const navigation = useNavigation();
  const anim = useSharedValue(0);
  const ref = useRef();
  const state = useLocalObservable(() => ({
    isVisible: false,
    specs: null,
    setVisible: (visible, specs) => {
      state.isVisible = visible;
      state.specs = specs;
    },
  }));
  const onPress = React.useCallback(() => {
    ref.current?.measure?.((x, y, width, height, pageX, pageY) => {
      state.setVisible(true, {width, height, pageX, pageY});
      anim.value = withSpring(1);
    });
  }, []);
  const onHide = React.useCallback(callback2 => {
    const callback = () => {
      if (typeof callback2 === 'function') {
        callback2();
      }
      state.setVisible(false);
    };
    anim.value = withTiming(
      0,
      {},
      isFinished => isFinished && runOnJS(callback)(),
    );
  }, []);
  const backdropStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(anim.value, [0, 1], [1, 35]),
      },
    ],
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${interpolate(anim.value, [0, 1], [0, 45])}deg`,
      },
    ],
  }));
  const renderCaptureItem = (_, index) => {
    return (
      <CaptureItem
        navigation={navigation}
        key={index}
        index={index}
        anim={anim}
        hide={onHide}
      />
    );
  };
  const Container = isAndroid ? Modal : Portal;
  return (
    <React.Fragment>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        ref={ref}
        style={styles.container}>
        <Animated.View entering={BounceIn.delay(1200)}>
          <PlusSvg color={Colors.white} />
        </Animated.View>
      </TouchableOpacity>
      <Observer>
        {() => {
          return (
            !!state.isVisible && (
              <Container
                statusBarTranslucent
                visible={true}
                animationType="none"
                transparent>
                <View style={styles.overlayContainer}>
                  <View
                    style={[
                      state.isVisible && {
                        top: state.specs?.pageY,
                        left: state.specs?.pageX,
                        width: state.specs?.width,
                        height: state.specs?.height,
                      },
                    ]}>
                    <Animated.View style={[styles.backdrop, backdropStyle]}>
                      <Pressable
                        onPress={onHide}
                        style={styles.backdropInner}
                      />
                    </Animated.View>
                    {CreateOptions.map(renderCaptureItem)}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={onHide}
                      style={[styles.container]}>
                      <Animated.View style={buttonStyle}>
                        <PlusSvg color={Colors.white} />
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Container>
            )
          );
        }}
      </Observer>
    </React.Fragment>
  );
};

export default CaptureButton;
const CaptureItem = React.memo(({index, anim, navigation, hide}) => {
  const captureOption = CreateOptions[index];
  const captureItemStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          anim.value,
          [0, 1],
          [0, index === 1 ? -120 : -80],
        ),
      },
      {
        translateX: interpolate(
          anim.value,
          [0, 1],
          [0, index === 1 ? 0 : (index - 1) * 80],
        ),
      },
    ],
    backgroundColor: captureOption.bgColor,
  }));
  const onPress = React.useCallback(() => {
    const callback = () => {
      navigation.navigate(captureOption.routeName, captureOption.params);
    };
    hide(callback);
  }, []);
  return (
    <Animated.View style={[styles.captureItem, captureItemStyle]}>
      <TouchableOpacity onPress={onPress} style={styles.btnCaptureItem}>
        {captureOption.icon}
      </TouchableOpacity>
    </Animated.View>
  );
});
