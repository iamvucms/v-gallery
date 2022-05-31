import {Image, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import styles from './styles';
import {PinchGestureHandler, ScrollView} from 'react-native-gesture-handler';
import VText from '../VText';
import {Layout} from '../../constants';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import VImage from '../VImage';
import {useNavigation} from '@react-navigation/native';
import {appStore} from '../../stores';
const {width} = Layout.window;
const MAX_COLUMN = 6;
const MIN_COLUMN = 1;
const PADDING = 10;
const getGridItemSize = (column, margin = 10) => {
  return (width - margin * (column + 1)) / column;
};
const SCALE_THRESHOLD = 0.3;
const PhotoGallery = ({data = []}) => {
  const animGridSize = useSharedValue(getGridItemSize(3));
  const animColumn = useSharedValue(3);
  const animGridLayout = useSharedValue(1);
  useEffect(() => {}, []);
  const gridItemStyle = useAnimatedStyle(() => ({
    height: animGridSize.value,
    width: animGridSize.value,
  }));
  const girdContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: animGridLayout.value,
      },
    ],
  }));
  const onImagePress = React.useCallback((image, specs) => {
    appStore.setPhotoDetailData(image, specs);
  }, []);
  const renderGridItem = (item, index) => {
    return (
      <Animated.View key={item.id} style={[styles.gridItem, gridItemStyle]}>
        <VImage onPress={onImagePress} style={styles.image} data={item} />
      </Animated.View>
    );
  };
  const pingestureHandler = useAnimatedGestureHandler({
    onActive: ({scale}) => {
      animGridLayout.value = 1 - (1 - scale) * 0.1;
    },
    onEnd: ({scale}) => {
      if (scale > 1 + SCALE_THRESHOLD && animColumn.value > MIN_COLUMN) {
        animColumn.value = animColumn.value - 1;
      } else if (scale < 1 - SCALE_THRESHOLD && animColumn.value < MAX_COLUMN) {
        animColumn.value = animColumn.value + 1;
      }
      const size =
        (width - PADDING * (animColumn.value + 1)) / animColumn.value;
      animGridSize.value = withTiming(size);
      animGridLayout.value = withSpring(1);
    },
  });
  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={pingestureHandler}>
        <Animated.ScrollView
          style={[styles.gridModeContainer, girdContainerStyle]}>
          <View style={styles.gridContainer}>{data.map(renderGridItem)}</View>
        </Animated.ScrollView>
      </PinchGestureHandler>
    </View>
  );
};

export default React.memo(PhotoGallery);
