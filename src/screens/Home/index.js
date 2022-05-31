import {TouchableOpacity, View} from 'react-native';
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
import {galleryStore} from '../../stores';
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

  return (
    <Container disableLast>
      <View style={styles.header}>
        <View>
          <VText fontSize="h5" fontWeight={500}>
            Let's discover
          </VText>
          <VText fontSize="h5" fontWeight={500}>
            the{' '}
            <VText fontSize="h5" fontWeight={500} color={Colors.primary}>
              world
            </VText>
          </VText>
        </View>
        <TouchableOpacity style={styles.btnMenu}>
          <MenuBarsSvg size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <PhotoGallery
          listFooter={<Padding bottom={bottom} />}
          listHeader={renderListHeader}
        />
      </View>
    </Container>
  );
};

export default Home;
