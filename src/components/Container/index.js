import {StatusBar, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

const Container = ({children, disableFirst, disableLast, statusBarProps}) => {
  const {bottom, top} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      {!disableFirst && <View style={[styles.bar, {height: top}]} />}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        {...statusBarProps}
      />
      <View style={styles.container}>{children}</View>
      {!disableLast && (
        <View style={[styles.bar, {height: bottom > 0 ? bottom : 0}]} />
      )}
    </View>
  );
};

export default Container;
