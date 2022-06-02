import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useRef} from 'react';
import {
  Container,
  Header,
  LoadingIndicatorModal,
  VImage,
  VText,
} from '../../components';
import {Colors, isAndroid, Layout} from '../../constants';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import styles from './styles';
import {CheckSvg} from '../../assets/svg';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Animated, {FadeIn} from 'react-native-reanimated';
import {albumStore, appStore, galleryStore} from '../../stores';
import {flowResult, toJS} from 'mobx';
const {width} = Layout.window;
const CreateAlbumTitle = ({navigation, route}) => {
  const {photos} = route.params;
  const listRef = useRef();
  const list2Ref = useRef();
  const state = useLocalObservable(() => ({
    title: '',
    screenType: 'title',
    photos: photos.map((photo, index) => ({
      ...photo,
      isCover: index === 0,
    })),
    setTitle: title => {
      state.title = title;
    },
    setCover: photoId => {
      state.photos.forEach(photo => {
        photo.isCover = photo.id === photoId;
      });
    },
    setScreenType: screenType => {
      state.screenType = screenType;
    },
    get isCoverScreen() {
      return state.screenType === 'cover';
    },
    get isTitleScreen() {
      return state.screenType === 'title';
    },
    get cover() {
      return this.photos.find(photo => photo.isCover);
    },
    get coverIndex() {
      return this.photos.findIndex(photo => photo.isCover);
    },
    get allowNext() {
      return this.title.length > 0;
    },
  }));
  const renderRightHeader = React.useCallback(
    () => (
      <Observer>
        {() => (
          <VText
            fontWeight={500}
            color={
              state.isTitleScreen && !state.allowNext
                ? Colors.gray
                : Colors.primary
            }>
            {state.isCoverScreen ? 'Select' : 'Done'}
          </VText>
        )}
      </Observer>
    ),
    [],
  );
  const onBackPress = React.useCallback(() => {
    if (state.isCoverScreen) {
      state.setScreenType('title');
    } else {
      navigation.goBack();
    }
  }, []);
  const onDonePress = React.useCallback(async () => {
    if (state.isCoverScreen) {
      state.setScreenType('title');
    } else if (state.allowNext) {
      Keyboard.dismiss();
      await flowResult(
        albumStore.createAlbum(
          state.title,
          toJS(state.photos),
          toJS(state.cover),
        ),
      );
      navigation.navigate('Albums');
      galleryStore.clearSelectedPhotos();
    }
  }, []);
  const onSelectCoverPress = React.useCallback(() => {
    state.setScreenType('cover');
  }, []);
  const onScrollToIndexFailed = React.useCallback(() => {
    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: state.coverIndex,
      });
    }, 500);
  }, []);
  const onListScrollEnd = React.useCallback(
    ({
      nativeEvent: {
        contentOffset: {x},
      },
    }) => {
      const nextIndex = Math.round(x / width);
      list2Ref.current?.scrollToIndex({
        index: nextIndex,
        viewPosition: 0.5,
        animated: true,
      });
      state.setCover(state.photos[nextIndex].id);
    },
    [],
  );
  const renderPhotoItem = React.useCallback(({item}) => {
    return (
      <View style={styles.coverPhotoItem}>
        <VImage data={item} />
      </View>
    );
  }, []);
  const renderSmallPhotoItem = React.useCallback(({item, index}) => {
    const onPress = () => {
      state.setCover(item.id);
      listRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      list2Ref.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
        animated: true,
      });
    };
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.smallPhotoItem}>
        <VImage disabledPress data={item} />
        <Observer>
          {() =>
            item.isCover && (
              <Animated.View entering={FadeIn} style={styles.checkedMask}>
                <CheckSvg size={30} color={Colors.white} />
              </Animated.View>
            )
          }
        </Observer>
      </TouchableOpacity>
    );
  }, []);
  const photoKeyExtractor = React.useCallback(item => {
    return `${item.id}`;
  }, []);

  return (
    <Container disableFirst>
      <Observer>
        {() => (
          <Header
            title={state.isCoverScreen ? 'Select Cover' : 'Select Title'}
            onLeftPress={onBackPress}
            rightIcon={renderRightHeader}
            onRightPress={onDonePress}
          />
        )}
      </Observer>
      <View style={styles.container}>
        <Observer>
          {() =>
            state.isCoverScreen ? (
              <Animated.View style={styles.coverContainer} entering={FadeIn}>
                <FlatList
                  initialScrollIndex={state.coverIndex}
                  onScrollToIndexFailed={onScrollToIndexFailed}
                  onMomentumScrollEnd={onListScrollEnd}
                  ref={listRef}
                  bounces={false}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  data={photos}
                  renderItem={renderPhotoItem}
                  keyExtractor={photoKeyExtractor}
                />
                <View style={styles.photoList}>
                  <Observer>
                    {() => (
                      <FlatList
                        ref={list2Ref}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={state.photos.slice()}
                        renderItem={renderSmallPhotoItem}
                      />
                    )}
                  </Observer>
                </View>
              </Animated.View>
            ) : (
              <View style={styles.titleContainer}>
                <Observer>
                  {() => (
                    <View style={styles.coverPhoto}>
                      <VImage onPress={onSelectCoverPress} data={state.cover} />
                    </View>
                  )}
                </Observer>
                <Observer>
                  {() => (
                    <TextInput
                      autoFocus
                      placeholder="Enter title"
                      placeholderTextColor={Colors.gray}
                      value={state.title}
                      onChangeText={txt => state.setTitle(txt)}
                      style={styles.titleInput}
                    />
                  )}
                </Observer>
              </View>
            )
          }
        </Observer>
      </View>
      {!isAndroid && <KeyboardSpacer />}
      <Observer>
        {() => albumStore.creatingAlbum && <LoadingIndicatorModal />}
      </Observer>
    </Container>
  );
};

export default CreateAlbumTitle;
