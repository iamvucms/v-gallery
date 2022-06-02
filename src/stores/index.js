import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncTrunk} from 'mobx-sync';
import {AlbumStore} from './albumStore';
import {AppStore} from './appStore';
import {GalleryStore} from './galleryStore';
//stores
export const appStore = new AppStore();
export const galleryStore = new GalleryStore();
export const albumStore = new AlbumStore();
const store = {
  app: appStore,
  gallery: galleryStore,
  album: albumStore,
};
export const trunk = new AsyncTrunk(store, {storage: AsyncStorage});
