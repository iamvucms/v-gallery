import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncTrunk} from 'mobx-sync';
import {AppStore} from './appStore';
//stores
export const appStore = new AppStore();

const store = {
  app: appStore,
};
export const trunk = new AsyncTrunk(store, {storage: AsyncStorage});
