import {View, ActivityIndicator, Modal} from 'react-native';
import React from 'react';
import {Portal} from '@gorhom/portal';
import styles from './styles';
import {Colors, isAndroid} from '../../constants';

const LoadingIndicatorModal = () => {
  const Container = isAndroid ? Modal : Portal;
  return (
    <Container transparent visible={true} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    </Container>
  );
};

export default React.memo(LoadingIndicatorModal);
