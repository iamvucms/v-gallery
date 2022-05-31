import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Favorite, Home, Onboarding, Search} from '../screens';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationConfig} from './config';
import {BottomTabBar, VText} from '../components';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, DrawerData, Layout} from '../constants';
import Animated, {
  FadeInRight,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {navigationRef} from './navigationRef';
import {autorun} from 'mobx';
import {appStore} from '../stores';
import {Observer} from 'mobx-react-lite';
import {AvatarSrc} from '../assets/images';
const {width} = Layout.window;
const drawerWidth = width * 0.5;
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const HomeTab = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={navigationConfig}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Search" component={Search} />
      <BottomTab.Screen name="Favorite" component={Favorite} />
    </BottomTab.Navigator>
  );
};
const AppNavigationStack = () => {
  const anim = useSharedValue(0);
  useEffect(() => {
    autorun(() => {
      if (appStore.drawerMenuNavigationVisible) {
        anim.value = withTiming(1);
      } else {
        anim.value = withTiming(0);
      }
    });
  }, []);
  const renderDrawerItem = (item, index) => {
    const onPress = () => {
      appStore.setDrawerMenuNavigationVisible(false);
      navigationRef.navigate(item.routeName);
    };
    return (
      <Animated.View
        key={item.routeName}
        entering={FadeInRight.delay(index * 100)}>
        <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
          <VText fontWeight={500}>{item.title}</VText>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const menuStyle = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: -anim.value * drawerWidth},
        {
          scale: interpolate(anim.value, [0, 1], [0.8, 1]),
        },
      ],
    }),
    [],
  );
  const appStyle = useAnimatedStyle(
    () => ({
      transform: [
        {translateX: -anim.value * drawerWidth},
        {
          scale: interpolate(anim.value, [0, 1], [1, 0.8]),
        },
      ],
      borderRadius: anim.value * 20,
    }),
    [],
  );
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.navigationContainer, appStyle]}>
        <Observer>
          {() =>
            appStore.drawerMenuNavigationVisible && (
              <Pressable
                onPress={() => appStore.setDrawerMenuNavigationVisible(false)}
                style={styles.overlay}
              />
            )
          }
        </Observer>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={navigationConfig}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="HomeTab" component={HomeTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </Animated.View>
      <Animated.View style={[styles.drawerContainer, menuStyle]}>
        <View style={styles.drawerMenu}>
          <Image style={styles.avatar} source={AvatarSrc} />
          <Observer>
            {() =>
              appStore.drawerMenuNavigationVisible &&
              DrawerData.map(renderDrawerItem)
            }
          </Observer>
        </View>
      </Animated.View>
    </View>
  );
};

export default AppNavigationStack;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.app_background,
  },
  navigationContainer: {
    width,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  drawerContainer: {
    width: drawerWidth,
    height: '100%',
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  avatar: {
    width: 200,
    height: 200,
  },
  drawerMenu: {
    flex: 1,
  },
  drawerItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    marginVertical: 7,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
