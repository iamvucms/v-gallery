import {ignorePersistProperties} from '../utils';

const {makeObservable, observable, computed, action} = require('mobx');

export class AppStore {
  onboardingComplete = false;
  drawerMenuNavigationVisible = false;
  confirmModal = false;
  confirmModalData = {};
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
      confirmModal: observable,
      confirmModalData: observable,
      isPhotoDetailVisible: computed,
      isLogined: computed,
      setPhotoDetailData: action,
      setOnboardingComplete: action,
      setDrawerMenuNavigationVisible: action,
      setUser: action,
      logout: action,
      setConfirmModal: action,
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
  logout() {
    this.user = null;
  }
  setConfirmModal(confirmModal, title, description, onConfirm) {
    this.confirmModal = confirmModal;
    if (title && description) {
      this.confirmModalData = {title, description};
    }
    if (onConfirm) {
      this.confirmModalData.onConfirm = () => {
        onConfirm();
        this.setConfirmModal(false);
      };
    }
  }
  get isPhotoDetailVisible() {
    return !!this.photoDetailData;
  }
  get isLogined() {
    return !!this.user;
  }
}
