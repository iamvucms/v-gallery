import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import styles from './styles';
import {Container, Header, Padding, VImage, VText} from '../../components';
import {Colors} from '../../constants';
import {galleryStore} from '../../stores';
import {Observer} from 'mobx-react-lite';
import {CheckSvg} from '../../assets/svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {toJS} from 'mobx';
const CreateAlbum = ({navigation}) => {
  const {bottom} = useSafeAreaInsets();
  const onBackPress = React.useCallback(() => {
    navigation.goBack();
    galleryStore.clearSelectedPhotos();
  }, []);
  const onNextPress = React.useCallback(() => {
    const photos = toJS(galleryStore.getSelectedPhotos());
    if (photos.length > 0) {
      navigation.navigate('CreateAlbumTitle', {
        photos: toJS(galleryStore.getSelectedPhotos()),
      });
    }
  }, []);
  const renderRightHeader = React.useCallback(() => {
    return (
      <VText fontWeight={500} color={Colors.primary}>
        Next
      </VText>
    );
  }, []);
  const renderPhotoItem = React.useCallback(({item, index}) => {
    const onPress = () => {
      galleryStore.toggleSelectedPhoto(item.id);
    };
    const marginHorizontal = (index + 2) % 3 === 0 ? 5 : 0;
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.photoItem,
          {
            marginHorizontal,
          },
        ]}>
        <VImage disabledPress data={item} style={styles.photo} />
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
  const photoKeyExtractor = React.useCallback(item => {
    return `${item.id}`;
  }, []);
  const renderListFooter = React.useCallback(
    () => (
      <Padding paddingBottom={bottom}>
        <Observer>
          {() =>
            galleryStore.fetchingPhotos && (
              <ActivityIndicator color={Colors.primary} size="large" />
            )
          }
        </Observer>
      </Padding>
    ),
    [bottom],
  );
  const onEndReached = React.useCallback(() => {
    galleryStore.fetchPhotos(true);
  }, []);
  return (
    <Container disableFirst disableLast>
      <Observer>
        {() => (
          <Header
            title={
              galleryStore.numberOfSelectedPhotos === 0
                ? 'Create New Album'
                : `${galleryStore.numberOfSelectedPhotos} Selected`
            }
            onLeftPress={onBackPress}
            rightIcon={renderRightHeader}
            onRightPress={onNextPress}
          />
        )}
      </Observer>
      <View style={styles.container}>
        <Observer>
          {() => (
            <FlatList
              data={galleryStore.photos.slice()}
              renderItem={renderPhotoItem}
              keyExtractor={photoKeyExtractor}
              numColumns={3}
              ListFooterComponent={renderListFooter}
              onEndReachedThreshold={0.5}
              onEndReached={onEndReached}
            />
          )}
        </Observer>
      </View>
    </Container>
  );
};

export default CreateAlbum;
