import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Video from 'react-native-video';
import {appStore} from '../../stores';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import {Colors} from '../../constants';
const VPlayer = ({uri}) => {
  const state = useLocalObservable(() => ({
    loading: true,
    setLoading: value => {
      state.loading = value;
    },
  }));
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: `${uri}=dv`,
        }}
        onLoad={() => state.setLoading(false)}
        style={styles.video}
        resizeMode="cover"
        onError={e => console.log(e)}
        repeat
      />
      <Observer>
        {() =>
          state.loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          )
        }
      </Observer>
    </View>
  );
};

export default VPlayer;
