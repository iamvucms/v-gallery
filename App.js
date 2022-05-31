import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigationStack from './src/navigation';
import {trunk} from './src/stores';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider} from '@gorhom/portal';
import {PhotoDetailModal} from './src/components';
const App = () => {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    trunk
      .init()
      .then(() => {
        setLoaded(true);
      })
      .then(() => {
        console.log('err');
      });
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <PortalProvider>
          <AppNavigationStack />
          <PhotoDetailModal />
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
