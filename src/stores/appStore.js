import {ignorePersistProperties} from '../utils';

const {makeObservable, observable, computed, action} = require('mobx');

export class AppStore {
  onboardingComplete = false;
  photoDetailData = null;
  constructor() {
    ignorePersistProperties(this, ['photoDetailData']);
    makeObservable(this, {
      onboardingComplete: observable,
      photoDetailData: observable,
      isPhotoDetailVisible: computed,
      setPhotoDetailData: action,
      setOnboardingComplete: action,
    });
  }
  setOnboardingComplete(onboardingComplete) {
    this.onboardingComplete = onboardingComplete;
  }
  setPhotoDetailData(image, specs) {
    console.log(image, specs);
    this.photoDetailData = {image, specs};
  }
  get isPhotoDetailVisible() {
    return !!this.photoDetailData;
  }
}
