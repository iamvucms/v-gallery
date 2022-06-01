import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Albums, Favorite, Home, Onboarding, Search} from '../screens';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationConfig} from './config';
import {BottomTabBar, Padding, VText} from '../components';
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
import {LogoutSvg} from '../assets/svg';
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
      <BottomTab.Screen name="Albums" component={Albums} />
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
  const onLogoutPress = React.useCallback(() => {
    appStore.setConfirmModal(
      true,
      'Logout',
      'Are you sure you want to logout?',
      () => {
        appStore.setDrawerMenuNavigationVisible(false);
        appStore.logout();
      },
    );
  }, []);
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
          <Observer>
            {() => (
              <Padding paddingBottom={15}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: appStore?.user?.photo,
                  }}
                />
                <VText align="center" fontWeight={500} color={Colors.secondary}>
                  {appStore?.user?.name}
                </VText>
              </Padding>
            )}
          </Observer>
          <Observer>
            {() =>
              appStore.drawerMenuNavigationVisible &&
              DrawerData.map(renderDrawerItem)
            }
          </Observer>
        </View>
        <TouchableOpacity onPress={onLogoutPress} style={styles.btnLogout}>
          <LogoutSvg size={26} />
          <Padding paddingHorizontal={10}>
            <VText color={Colors.white}>Logout</VText>
          </Padding>
        </TouchableOpacity>
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
    paddingBottom: 80,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 53,
    marginBottom: 5,
    alignSelf: 'center',
    borderRadius: 999,
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
  btnLogout: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    borderRadius: 99,
    alignSelf: 'center',
  },
});
