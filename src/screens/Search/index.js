import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {PhotoGallery, VText} from '../../components';
import {CloseSvg, SearchSvg} from '../../assets/svg';
import {Colors} from '../../constants';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import Animated, {FadeIn} from 'react-native-reanimated';
import {EmptyBoxSrc} from '../../assets/images';
import {galleryStore} from '../../stores';
import {autorun, flow} from 'mobx';
const Search = () => {
  const state = useLocalObservable(() => ({
    keyword: '',
    setKeyword: keyword => {
      state.keyword = keyword;
    },
    clearKeyword: () => {
      state.keyword = '';
    },
    get isClearButtonVisible() {
      return state.keyword.length > 0;
    },
  }));
  useEffect(() => {
    let to = null;
    autorun(() => {
      const keyword = state.keyword;
      clearTimeout(to);
      to = setTimeout(() => {
        flow(galleryStore.fetchResults(keyword.toLocaleLowerCase()));
      }, 300);
    });
  }, []);
  const renderEmptyComponent = React.useCallback(() => (
    <View style={styles.emptyContainer}>
      <Observer>
        {() =>
          galleryStore.searching ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <>
              <Image style={styles.emptyImage} source={EmptyBoxSrc} />
              <VText align="center" fontWeight={300} color={Colors.secondary}>
                {`Sorry, we couldn't find any photos\nmatching your search.`}
              </VText>
            </>
          )
        }
      </Observer>
    </View>
  ));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <SearchSvg size={18} color={Colors.white} />
          </View>
          <Observer>
            {() => (
              <TextInput
                placeholder="Type your keyword"
                style={styles.searchInput}
                value={state.keyword}
                onChangeText={txt => state.setKeyword(txt)}
              />
            )}
          </Observer>
          <Observer>
            {() =>
              state.isClearButtonVisible && (
                <Animated.View entering={FadeIn}>
                  <TouchableOpacity
                    onPress={() => state.clearKeyword()}
                    style={styles.btnClear}>
                    <CloseSvg size={8} color={Colors.white} />
                  </TouchableOpacity>
                </Animated.View>
              )
            }
          </Observer>
        </View>
      </View>
      <Observer>
        {() => (
          <PhotoGallery
            data={galleryStore.searchResults}
            title="Result"
            emptyComponent={renderEmptyComponent}
          />
        )}
      </Observer>
    </View>
  );
};

export default Search;
