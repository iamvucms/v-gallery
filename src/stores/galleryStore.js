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
    this.fetchingPhotos = true;
    try {
      this.currentPage = isFetchMore ? this.currentPage + 1 : 1;
      const limit = isFetchMore ? 20 : 49;
      const photos = yield fetch500PxPhotos('', this.currentPage, limit);
      this.photos = isFetchMore ? [...this.photos, ...photos] : photos;
    } catch (err) {
      console.log({fetchPhotos: err});
    }
    this.fetchingPhotos = false;
  }
  *fetchResults(query, isFetchMore) {
    this.searching = true;
    try {
      this.currentSearchPage = isFetchMore ? this.currentSearchPage + 1 : 1;
      const photos = yield fetch500PxPhotos(query, this.currentPage, 30);
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
