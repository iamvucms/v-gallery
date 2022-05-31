import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Container, Padding, VImage, VText} from '../../components';
import styles from './styles';
import {HeartSvg} from '../../assets/svg';
import {Colors, Layout} from '../../constants';
import {Observer} from 'mobx-react-lite';
import {galleryStore} from '../../stores';
import Animated, {
  BounceIn,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import {EmptyBoxSrc} from '../../assets/images';
const {width} = Layout.window;
const ITEM_WIDTH = (width - 30) / 2;
const Favorite = ({navigation}) => {
  const renderFavoriteItem = React.useCallback(({item, index}) => {
    const isOdd = index % 2 === 0;
    const EnteringAnimation = isOdd ? FadeInLeft : FadeInRight;
    const ExitingAnimation = isOdd ? FadeOutLeft : FadeOutRight;
    return (
      <Animated.View
        key={item.id}
        entering={EnteringAnimation.delay(index * 100)}
        exiting={ExitingAnimation}
        style={[
          styles.photoItem,
          {
            width: ITEM_WIDTH,
            height: ITEM_WIDTH * 1.2,
          },
        ]}>
        <TouchableOpacity
          onPress={() => galleryStore.removeFavorite(item.id)}
          style={styles.btnHeart}>
          <HeartSvg color={Colors.primary} />
        </TouchableOpacity>
        <VImage data={item} />
      </Animated.View>
    );
  }, []);
  const renderEmptyComponent = React.useCallback(() => {
    const onPress = () => {
      navigation.navigate('Home');
    };
    return (
      <View style={styles.emptyContainer}>
        <Image style={styles.emptyImage} source={EmptyBoxSrc} />
        <VText align="center" fontWeight={300} color={Colors.secondary}>
          You don't have any favorite photos
        </VText>
        <TouchableOpacity onPress={onPress}>
          <Padding padding={7}>
            <VText color={Colors.primary}>Discover New</VText>
          </Padding>
        </TouchableOpacity>
      </View>
    );
  }, []);
  const favoritePhotosKeyExtractor = React.useCallback(
    item => `${item.id}`,
    [],
  );
  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <VText fontSize="h6" fontWeight={500}>
            Favorite
          </VText>
          <Animated.View entering={BounceIn}>
            <Padding paddingHorizontal={5}>
              <HeartSvg size={30} color={Colors.primary} />
            </Padding>
          </Animated.View>
          <VText fontSize="h6" fontWeight={500}>
            Photos
          </VText>
        </View>
      </View>
      <Observer>
        {() => (
          <FlatList
            style={styles.photoList}
            contentContainerStyle={{}}
            data={galleryStore.favoritePhotos.slice()}
            renderItem={renderFavoriteItem}
            numColumns={2}
            keyExtractor={favoritePhotosKeyExtractor}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </Observer>
    </Container>
  );
};

export default Favorite;
