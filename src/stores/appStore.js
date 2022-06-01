import {ignorePersistProperties} from '../utils';

const {makeObservable, observable, computed, action} = require('mobx');

export class AppStore {
  onboardingComplete = false;
  drawerMenuNavigationVisible = false;
  photoDetailData = null;
  user = null;
  constructor() {
    ignorePersistProperties(this, [
      'onboardingComplete',
      'photoDetailData',
      'drawerMenuNavigationVisible',
    ]);
    makeObservable(this, {
      onboardingComplete: observable,
      photoDetailData: observable,
      drawerMenuNavigationVisible: observable,
      user: observable,
      isPhotoDetailVisible: computed,
      isLogined: computed,
      setPhotoDetailData: action,
      setOnboardingComplete: action,
      setDrawerMenuNavigationVisible: action,
      setUser: action,
    });
  }
  setOnboardingComplete(onboardingComplete) {
    this.onboardingComplete = onboardingComplete;
  }
  setPhotoDetailData(visible, image, specs) {
    if (visible) {
      this.photoDetailData = {image, specs};
    } else {
      this.photoDetailData = null;
    }
  }
  setDrawerMenuNavigationVisible(visible) {
    this.drawerMenuNavigationVisible = visible;
  }
  setUser(user) {
    this.user = user;
  }
  get isPhotoDetailVisible() {
    return !!this.photoDetailData;
  }
  get isLogined() {
    return !!this.user;
  }
}
