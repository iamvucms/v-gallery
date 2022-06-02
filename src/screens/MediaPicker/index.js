import {
  View,
  Text,
  FlatList,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import {
  Container,
  Header,
  LoadingIndicatorModal,
  VText,
} from '../../components';
import styles from './styles';
import {CheckSvg, CloseSvg, VideoSvg} from '../../assets/svg';
import {Colors, isAndroid} from '../../constants';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {flow, flowResult, toJS} from 'mobx';
import {galleryStore} from '../../stores';
const MediaPicker = ({navigation}) => {
  const state = useLocalObservable(() => ({
    medias: [],
    fetching: false,
    nextPageCursor: '',
    toggleSelect: uri => {
      const media = state.medias.find(media => media.image.uri === uri);
      if (media) {
        media.selected = !media.selected;
      }
    },
    setMedias: medias => {
      state.medias = medias;
    },
    setFetching: value => {
      state.fetching = value;
    },
    get allowUpload() {
      return state.medias.some(media => media.selected);
    },
    get selectedLength() {
      return state.medias.filter(media => media.selected).length;
    },
    get selectedMedias() {
      return state.medias.filter(media => media.selected);
    },
  }));
  useEffect(() => {
    state.setFetching(true);
    const init = async () => {
      if (isAndroid) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
      CameraRoll.getPhotos({
        assetType: 'All',
        first: 30,
      })
        .then(data => {
          const medias = data.edges.map(edge => {
            const extension = edge.node.image.uri.split('.').pop();
            const isVideo = edge.node.type.includes('video');
            const mimeType = isVideo
              ? `video/${extension}`
              : `image/${extension === 'jpg' ? 'jpeg' : extension}`;
            return {
              ...edge.node,
              mimeType,
            };
          });
          state.setFetching(false);
          state.setMedias(medias);
        })
        .catch(err => {
          state.setFetching(false);
          console.log(err);
        });
    };
    init();
  }, []);
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
  }, []);
  const onUploadPress = React.useCallback(async () => {
    const files = toJS(state.selectedMedias).map(media => ({
      uri: media.image.uri,
      mimeType: media.mimeType,
    }));
    await flowResult(galleryStore.createMultipleMedia(files));
    navigation.navigate('Home');
  }, []);
  const renderMediaItem = React.useCallback(({item, index}) => {
    const marginHorizontal = (index + 2) % 3 === 0 ? 5 : 0;
    const isVideo = item.type === 'video';
    const onPress = () => {
      state.toggleSelect(item.image.uri);
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.mediaItem, {marginHorizontal}]}>
        <Image
          style={styles.mediaPreviewImage}
          source={{
            uri: item.image.uri,
          }}
        />
        {isVideo && (
          <View style={styles.videoLabel}>
            <VideoSvg />
          </View>
        )}
        <Observer>
          {() => (
            <View
              style={[
                styles.checkbox,
                item.selected && {
                  backgroundColor: Colors.primary,
                },
              ]}>
              {item.selected && <CheckSvg size={16} color={Colors.white} />}
            </View>
          )}
        </Observer>
      </TouchableOpacity>
    );
  }, []);
  const mediaKeyExtractor = React.useCallback(item => `${item.image.uri}`, []);
  return (
    <Container disableFirst>
      <Header
        title="Media Picker"
        leftIcon={<CloseSvg size={16} />}
        onLeftPress={onBackPress}
      />
      <View style={styles.container}>
        <Observer>
          {() => (
            <FlatList
              data={state.medias.slice()}
              renderItem={renderMediaItem}
              keyExtractor={mediaKeyExtractor}
              numColumns={3}
            />
          )}
        </Observer>
        <Observer>
          {() =>
            state.allowUpload && (
              <Animated.View
                entering={FadeInDown}
                style={styles.bottomButtonContainer}>
                <TouchableOpacity
                  onPress={onUploadPress}
                  style={styles.btnUpload}>
                  <Observer>
                    {() => (
                      <VText fontWeight={500} color={Colors.white}>
                        Upload ({state.selectedLength})
                      </VText>
                    )}
                  </Observer>
                </TouchableOpacity>
              </Animated.View>
            )
          }
        </Observer>
      </View>
      <Observer>
        {() => galleryStore.creatingMedia && <LoadingIndicatorModal />}
      </Observer>
    </Container>
  );
};

export default MediaPicker;
