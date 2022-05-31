import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import VImage from '../VImage';
import {Colors, Layout} from '../../constants';
import Padding from '../Padding';
import {appStore} from '../../stores';
const {width} = Layout.window;
const ITEM_WIDTH = width * 0.8;
const PhotoCarousel = ({data = []}) => {
  const animX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      animX.value = x;
    },
  });
  const renderImageItem = React.useCallback(({item, index}) => {
    return <CarouselImage anim={animX} data={item} index={index} />;
  }, []);
  const renderCarouselPageIndicatorItem = (_, index) => {
    return <CarouselPoint index={index} anim={animX} />;
  };
  const imageKeyExtractor = React.useCallback(item => `${item.id}`, []);
  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={{
          width: ITEM_WIDTH,
          overflow: 'visible',
        }}
        pagingEnabled
        ListHeaderComponent={<Padding paddingLeft={(width - ITEM_WIDTH) / 2} />}
        scrollEventThrottle={20}
        onScroll={scrollHandler}
        data={data}
        renderItem={renderImageItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={imageKeyExtractor}
      />
      <View style={styles.pageIndicator}>
        {data.map(renderCarouselPageIndicatorItem)}
      </View>
    </View>
  );
};

export default React.memo(PhotoCarousel);
const CarouselImage = React.memo(({data, index, anim}) => {
  const [inputRange] = useState([
    ITEM_WIDTH * (index - 1),
    ITEM_WIDTH * index,
    ITEM_WIDTH * (index + 1),
  ]);
  const onImagePress = React.useCallback((image, specs) => {
    appStore.setPhotoDetailData(true, image, specs);
  }, []);
  const imageContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(anim.value, inputRange, [
          -0.15 * ITEM_WIDTH,
          0,
          0.15 * ITEM_WIDTH,
        ]),
      },
      {
        scale: interpolate(anim.value, inputRange, [0.7, 1, 0.7]),
      },
    ],
    opacity: interpolate(anim.value, inputRange, [0.5, 1, 0.5]),
  }));
  return (
    <Animated.View style={[styles.carouselImage, imageContainerStyle]}>
      <VImage onPress={onImagePress} style={styles.image} data={data} />
    </Animated.View>
  );
});
const CarouselPoint = React.memo(({index, anim}) => {
  const [inputRange] = useState([
    ITEM_WIDTH * (index - 1),
    ITEM_WIDTH * index,
    ITEM_WIDTH * (index + 1),
  ]);
  const pointStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      anim.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    ),
    backgroundColor: Colors.primary,
    height: 8,
    width: interpolate(anim.value, inputRange, [8, 16, 8], Extrapolate.CLAMP),
    borderRadius: 4,
    marginHorizontal: 5,
  }));
  return <Animated.View style={pointStyle} />;
});
