import {View, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, Layout} from '../../constants';
import {autorun} from 'mobx';
import {VText, Padding} from '..';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Observer} from 'mobx-react-lite';
import {CheckSvg, CloseSvg} from '../../assets/svg';
import {appStore} from '../../stores';
const {height} = Layout.window;
const ConfirmModal = () => {
  const anim = useSharedValue(0);
  useEffect(() => {
    autorun(() => {
      if (appStore.confirmModal) {
        anim.value = withTiming(2, {duration: 700});
      } else {
        anim.value = withTiming(0, {duration: 500});
      }
    });
  }, []);
  const onBackDropPress = () => {
    appStore.setConfirmModal(false);
  };
  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          anim.value,
          [0, 1],
          [height, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [1, 2], [0, 1]),
  }));
  const {bottom} = useSafeAreaInsets();
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable
          onPress={onBackDropPress}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
      <View style={styles.confirmContainer}>
        <View style={styles.header}>
          <Observer>
            {() => (
              <VText fontSize="large" fontWeight={600} align="center">
                {appStore.confirmModalData.title}
              </VText>
            )}
          </Observer>
        </View>
        <Padding paddingVertical={15}>
          <Observer>
            {() => (
              <VText fontWeight={300} align="center">
                {appStore.confirmModalData.description}
              </VText>
            )}
          </Observer>
        </Padding>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => appStore.confirmModalData?.onConfirm?.()}
            style={styles.button}>
            <CheckSvg size={18} color={Colors.white} />
            <Padding paddingLeft={5} />
            <VText fontWeight={700} color={Colors.white}>
              {' Sure'}
            </VText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => appStore.setConfirmModal()}
            style={[
              styles.button,
              {
                backgroundColor: Colors.secondary,
              },
            ]}>
            <CloseSvg size={12} color={Colors.white} />
            <Padding paddingLeft={5} />
            <VText fontWeight={700} color={Colors.white}>
              {' Cancel'}
            </VText>
          </TouchableOpacity>
        </View>
        <Padding paddingBottom={bottom} />
      </View>
    </Animated.View>
  );
};

export default ConfirmModal;
