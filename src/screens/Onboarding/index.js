import {TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {Colors, Layout} from '../../constants';
import {OnboardingData} from '../../constants/data';
import {Padding, VText} from '../../components';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ChevronRightSvg} from '../../assets/svg';
import {CommonActions} from '@react-navigation/native';
import {autorun} from 'mobx';
import {appStore} from '../../stores';
const {height, width} = Layout.window;
const BackGroundColors = [Colors.primary, Colors.secondary, Colors.orange];
const ImageContainerBackgroundColors = [
  Colors.secondary,
  Colors.orange,
  Colors.primary,
];
const Onboarding = ({navigation}) => {
  const anim = useSharedValue(1);
  useEffect(() => {
    autorun(() => {
      if (appStore.onboardingComplete) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'HomeTab',
              },
            ],
          }),
        );
      }
    });
  }, []);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      anim.value = x;
    },
  });
  const renderOnboardingPage = React.useCallback(
    ({item, index}) => (
      <OnboardingItem anim={anim} item={item} index={index} key={index} />
    ),
    [],
  );
  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      anim.value,
      [0, width, width * 2],
      BackGroundColors,
    ),
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          anim.value,
          [0, width, width * 2],
          [200, 200, 0],
        ),
      },
    ],
  }));
  const onHomePress = React.useCallback(() => {
    appStore.setOnboardingComplete(true);
  }, []);
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.decorationContainer}>
        <View
          style={[
            styles.ball,
            {
              top: -10,
              left: -10,
            },
          ]}
        />
        <View
          style={[
            styles.ball,
            {
              top: height / 2,
              left: -40,
            },
          ]}
        />
        <View
          style={[
            styles.ball,
            {
              top: height - 30,
              left: 20,
            },
          ]}
        />
        <View
          style={[
            styles.ball,
            {
              top: height - 40,
              right: -40,
              transform: [{scale: 3}],
            },
          ]}
        />
        <View
          style={[
            styles.ball,
            {
              top: height / 4,
              right: -40,
            },
          ]}
        />
      </View>
      <View style={styles.onboardingContainer}>
        <Animated.FlatList
          scrollEventThrottle={20}
          onScroll={onScrollHandler}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={OnboardingData}
          renderItem={renderOnboardingPage}
        />
        <View style={styles.pageIndicatorContainer}>
          {OnboardingData.map((_, index) => (
            <PageIndicatorPoint anim={anim} index={index} key={index} />
          ))}
        </View>
      </View>
      <Animated.View style={[styles.btnGetStartedContainer, buttonStyle]}>
        <TouchableOpacity onPress={onHomePress} style={styles.btnGetStarted}>
          <VText fontWeight={600}>Get Started </VText>
          <ChevronRightSvg size={16} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
const OnboardingItem = ({item, index, anim}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      anim.value,
      [0, width, width * 2],
      ImageContainerBackgroundColors,
    ),
  }));
  const textStyle = useAnimatedStyle(() => ({
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: interpolate(anim.value, inputRange, [0, 1, 0]),
    transform: [
      {
        translateY: interpolate(anim.value, inputRange, [80, 0, 80]),
      },
    ],
  }));
  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(anim.value, inputRange, [200, 0, 200]),
      },
      {
        scale: item.imageScale,
      },
    ],
  }));
  return (
    <Animated.View style={[styles.onboardingItem]}>
      <Animated.View style={[styles.onboardingImageContainer, containerStyle]}>
        <Animated.Image
          source={item.image}
          style={[styles.onboardingImage, imageStyle]}
        />
      </Animated.View>
      <Animated.View style={textStyle}>
        <VText
          fontWeight={500}
          align="center"
          color={Colors.white}
          fontSize="large">
          {item.title}
        </VText>
        <Padding paddingTop={20} paddingHorizontal={20}>
          <VText fontWeight={300} color={Colors.white} align="center">
            {item.description}
          </VText>
        </Padding>
      </Animated.View>
    </Animated.View>
  );
};
const PageIndicatorPoint = ({anim, index}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(
      anim.value,
      inputRange,
      [0.4, 1, 0.4],
      Extrapolate.CLAMP,
    ),
  }));
  return <Animated.View style={[styles.pageIndicatorPoint, style]} />;
};
export default Onboarding;
