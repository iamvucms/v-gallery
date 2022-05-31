import {action, computed, flow, makeObservable, observable} from 'mobx';
import {ignorePersistProperties, fetch500PxPhotos} from '../utils';

export class GalleryStore {
  photos = [];
  favoritePhotos = [];
  searchResults = [];
  currentPage = 1;
  fetchingPhotos = false;
  currentSearchPage = 1;
  searching = false;
  constructor() {
    ignorePersistProperties(this, [
      'currentPage',
      'fetchingPhotos',
      'searching',
      'currentSearchPage',
    ]);
    makeObservable(this, {
      photos: observable,
      favoritePhotos: observable,
      searchResults: observable,
      searching: observable,
      feedPhotos: computed,
      fetchingPhotos: observable,
      carouselPhotos: computed,
      fetchPhotos: flow,
      fetchResults: flow,
      addFavorite: action,
      removeFavorite: action,
    });
  }
  get feedPhotos() {
    return this.photos.slice(10);
  }
  get carouselPhotos() {
    return this.photos.slice(0, 10);
  }
  *fetchPhotos(isFetchMore = false) {
    if (this.fetchingPhotos) return;
    this.fetchingPhotos = true;
    try {
      this.currentPage = isFetchMore ? this.currentPage + 1 : 1;
      const limit = 40;
      const photos = yield fetch500PxPhotos('', this.currentPage, limit);
      this.photos = isFetchMore ? [...this.photos, ...photos] : photos;
    } catch (err) {
      console.log({fetchPhotos: err});
    }
    this.fetchingPhotos = false;
  }
  *fetchResults(query, isFetchMore) {
    if (this.searching) return;
    this.searching = true;
    try {
      this.currentSearchPage = isFetchMore ? this.currentSearchPage + 1 : 1;
      const photos = yield fetch500PxPhotos(query, this.currentSearchPage, 30);
      this.searchResults = isFetchMore
        ? [...this.searchResults, ...photos]
        : photos;
    } catch (err) {
      console.log({fetchResults: err});
    }
    this.searching = false;
  }
  addFavorite(photo) {
    this.favoritePhotos.push({...photo});
  }
  removeFavorite(photoId) {
    this.favoritePhotos = this.favoritePhotos.filter(
      favorite => favorite.id !== photoId,
    );
  }
  getIsFavorite(photoId) {
    return !!this.favoritePhotos.find(favorite => favorite.id === photoId);
  }
}
