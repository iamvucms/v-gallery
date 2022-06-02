import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {
  Container,
  Header,
  Padding,
  PhotoGallery,
  VImage,
  VText,
} from '../../components';
import styles from './styles';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, Layout} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {CloseSvg} from '../../assets/svg';
import {albumStore, appStore} from '../../stores';
import {Observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {width} = Layout.window;
const COVER_WIDTH = width;
const COVER_HEIGHT = width * 0.6;
const AlbumDetail = ({navigation, route}) => {
  const anim = useSharedValue(0);
  const {bottom, top} = useSafeAreaInsets();
  const {album, specs} = route.params;
  useEffect(() => {
    anim.value = 0;
    anim.value = withTiming(1);
  }, []);
  const onBackPress = React.useCallback(() => {
    const callback = () => navigation.goBack();
    anim.value = withTiming(
      0,
      {},
      isFinished => isFinished && runOnJS(callback)(),
    );
  }, []);
  const onFetchMore = React.useCallback(() => {
    albumStore.fetchPhotos(album.id, true);
  }, []);
  const headerStyle = useAnimatedStyle(() => ({
    left: interpolate(anim.value, [0, 1], [specs.pageX, 0]),
    top: interpolate(anim.value, [0, 1], [specs.pageY, 0]),
    width: interpolate(anim.value, [0, 1], [specs.width, COVER_WIDTH]),
    height: interpolate(anim.value, [0, 1], [specs.height, COVER_HEIGHT]),
    borderRadius: interpolate(anim.value, [0, 1], [10, 0]),
    overflow: 'hidden',
  }));
  const containerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(anim.value, [0, 1], [0, COVER_HEIGHT + 20]),
    opacity: interpolate(anim.value, [0.5, 1], [0, 1]),
  }));
  const renderListFooter = React.useCallback(() => {
    return (
      <Padding paddingBottom={bottom} paddingTop={15}>
        <Observer>
          {() =>
            albumStore.fetchingAlbumPhotos && (
              <ActivityIndicator color={Colors.primary} size="large" />
            )
          }
        </Observer>
      </Padding>
    );
  }, []);
  return (
    <Container disableFirst disableLast>
      <Animated.View style={[styles.header, headerStyle]}>
        <TouchableOpacity
          onPress={onBackPress}
          style={[
            styles.btnBack,
            {
              top,
            },
          ]}>
          <CloseSvg size={16} color={Colors.black50} />
        </TouchableOpacity>
        <VImage isCover data={album} />
        <View style={styles.albumBottom}>
          <LinearGradient
            style={styles.bottomBg}
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
          />
          <VText color={Colors.white} fontWeight={500}>
            {album.title}
          </VText>
          <VText color={Colors.white} fontSize="small">
            {album.mediaItemsCount || 0} items
          </VText>
        </View>
      </Animated.View>
      <Animated.View style={[styles.container, containerStyle]}>
        <Observer>
          {() => (
            <PhotoGallery
              data={albumStore.photos.slice()}
              onFetchMore={onFetchMore}
              listFooter={renderListFooter}
            />
          )}
        </Observer>
      </Animated.View>
    </Container>
  );
};

export default AlbumDetail;
