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
import {flow} from 'mobx';
import {appStore, galleryStore} from '../../stores';
import {Observer} from 'mobx-react-lite';

const Home = () => {
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    flow(galleryStore.fetchPhotos());
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
