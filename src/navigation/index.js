import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Onboarding, PhotoDetail} from '../screens';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationConfig} from './config';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationConfig}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const AppNavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigationConfig}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigationStack;
