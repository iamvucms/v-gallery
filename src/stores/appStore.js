import {ignorePersistProperties} from '../utils';

const {makeObservable, observable, computed, action} = require('mobx');

export class AppStore {
  onboardingComplete = false;
  drawerMenuNavigationVisible = false;
  photoDetailData = null;
  constructor() {
    ignorePersistProperties(this, [
      'photoDetailData',
      'drawerMenuNavigationVisible',
    ]);
    makeObservable(this, {
      onboardingComplete: observable,
      photoDetailData: observable,
      drawerMenuNavigationVisible: observable,
      isPhotoDetailVisible: computed,
      setPhotoDetailData: action,
      setOnboardingComplete: action,
      setDrawerMenuNavigationVisible: action,
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
  get isPhotoDetailVisible() {
    return !!this.photoDetailData;
  }
}
