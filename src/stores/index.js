import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncTrunk} from 'mobx-sync';
import {AppStore} from './appStore';
import {GalleryStore} from './galleryStore';
//stores
export const appStore = new AppStore();
export const galleryStore = new GalleryStore();
const store = {
  app: appStore,
  gallery: galleryStore,
};
export const trunk = new AsyncTrunk(store, {storage: AsyncStorage});
