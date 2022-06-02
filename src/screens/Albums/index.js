import {ActivityIndicator, FlatList, Pressable, View} from 'react-native';
import React, {useRef} from 'react';
import {Container, Header, Padding, VImage, VText} from '../../components';
import styles from './styles';
import {albumStore} from '../../stores';
import {Observer} from 'mobx-react-lite';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants';
import {PlusSvg} from '../../assets/svg';
import {flow} from 'mobx';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Albums = ({navigation}) => {
  const {bottom} = useSafeAreaInsets();
  const refList = useRef({refs: []}).current;
  const onCreateAlbumPress = React.useCallback(() => {
    navigation.navigate('CreateAlbum');
  }, []);
  const onEndReached = React.useCallback(() => {
    console.log('come');
    albumStore.fetchAlbums(true);
  }, []);
  const renderAlbumItem = React.useCallback(({item, index}) => {
    const onPress = () => {
      flow(albumStore.fetchPhotos(item.id));
      refList.refs[index].measure((x, y, width, height, pageX, pageY) => {
        navigation.navigate('AlbumDetail', {
          album: item,
          specs: {
            width,
            height,
            pageX,
            pageY,
          },
        });
      });
    };
    return (
      <Pressable
        onPress={onPress}
        ref={ref => (refList.refs[index] = ref)}
        style={styles.albumItem}>
        <VImage disabledPress isCover data={item} />
        {/* <TouchableOpacity style={styles.btnRemove}>
          <TrashCanSvg />
        </TouchableOpacity> */}
        <View style={styles.albumBottom}>
          <LinearGradient
            style={styles.bottomBg}
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          />
          <VText color={Colors.white} fontWeight={500}>
            {item.title}
          </VText>
          <VText color={Colors.white} fontSize="small">
            {item.mediaItemsCount || 0} items
          </VText>
        </View>
      </Pressable>
    );
  }, []);
  const renderListFooter = React.useCallback(
    () => (
      <Padding paddingBottom={bottom} paddingTop={15}>
        <Observer>
          {() =>
            albumStore.fetchingAlbums && (
              <ActivityIndicator color={Colors.primary} size="large" />
            )
          }
        </Observer>
      </Padding>
    ),
    [],
  );
  const albumKeyExtractor = React.useCallback(item => item.id, []);
  return (
    <Container disableLast disableFirst>
      <Header
        title="Your Albums"
        rightIcon={<PlusSvg size={18} color={Colors.primary} />}
        onRightPress={onCreateAlbumPress}
      />
      <View style={styles.container}>
        <Observer>
          {() => (
            <FlatList
              data={albumStore.sortedAlbums.slice()}
              renderItem={renderAlbumItem}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
              keyExtractor={albumKeyExtractor}
              ListFooterComponent={renderListFooter}
            />
          )}
        </Observer>
      </View>
    </Container>
  );
};

export default Albums;
