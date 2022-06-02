import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {
  Container,
  Padding,
  PhotoCarousel,
  PhotoGallery,
  VText,
} from '../../components';
import {MenuBarsSvg} from '../../assets/svg';
import {Colors} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {autorun, flow, flowResult} from 'mobx';
import {albumStore, appStore, galleryStore} from '../../stores';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import {CommonActions} from '@react-navigation/native';

const Home = ({navigation}) => {
  const {bottom} = useSafeAreaInsets();
  const state = useLocalObservable(() => ({
    refreshing: false,
    setRefreshing: value => {
      state.refreshing = value;
    },
  }));
  useEffect(() => {
    autorun(() => {
      if (!appStore.isLogined) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Onboarding',
              },
            ],
          }),
        );
      }
    });
    flow(galleryStore.fetchPhotos());
    flow(albumStore.fetchAlbums());
  }, []);
  const renderListHeader = () => (
    <Observer>
      {() => <PhotoCarousel data={galleryStore.carouselPhotos} />}
    </Observer>
  );
  const renderListFooter = () => (
    <Observer>
      {() => (
        <Padding paddingVertical={bottom}>
          {galleryStore.fetchingPhotos && (
            <ActivityIndicator size="large" color={Colors.primary} />
          )}
        </Padding>
      )}
    </Observer>
  );
  const onRefresh = React.useCallback(async () => {
    state.setRefreshing(true);
    await flowResult(galleryStore.fetchPhotos());
    state.setRefreshing(false);
  }, []);
  const onMenuPress = React.useCallback(() => {
    appStore.setDrawerMenuNavigationVisible(true);
  }, []);
  return (
    <Container disableLast>
      <View style={styles.header}>
        <View>
          <VText fontSize="h5" fontWeight={500}>
            Let's control
          </VText>
          <VText fontSize="h5" fontWeight={500}>
            your{' '}
            <VText fontSize="h5" fontWeight={500} color={Colors.primary}>
              world
            </VText>
          </VText>
        </View>
        <TouchableOpacity onPress={onMenuPress} style={styles.btnMenu}>
          <MenuBarsSvg size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Observer>
          {() => (
            <PhotoGallery
              refreshing={state.refreshing}
              onRefresh={onRefresh}
              data={galleryStore.feedPhotos}
              listFooter={renderListFooter}
              listHeader={renderListHeader}
              onFetchMore={() => galleryStore.fetchPhotos(true)}
            />
          )}
        </Observer>
      </View>
    </Container>
  );
};

export default Home;
