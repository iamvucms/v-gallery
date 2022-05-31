import {Pressable, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabBarData} from '../../constants';
import Animated, {BounceIn, FadeInDown} from 'react-native-reanimated';
const BottomTabBar = ({state, navigation}) => {
  const {bottom} = useSafeAreaInsets();
  const renderTabItem = (_, index) => {
    const isActive = state.index === index;
    const tab = TabBarData[index];
    const onPress = () => {
      navigation.navigate(tab.routeName);
    };
    return (
      <Pressable key={tab.routeName} onPress={onPress} style={styles.tabItem}>
        {tab.icon}
        {isActive && (
          <Animated.View style={styles.activeLine} entering={BounceIn} />
        )}
      </Pressable>
    );
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(1000)}
      style={[
        styles.container,
        {
          bottom: bottom > 0 ? bottom : 20,
        },
      ]}>
      {state.routes.map(renderTabItem)}
    </Animated.View>
  );
};

export default React.memo(BottomTabBar);
