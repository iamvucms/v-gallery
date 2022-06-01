import {action, computed, flow, makeObservable, observable} from 'mobx';
import {ignorePersistProperties, fetchMediaItems} from '../utils';

export class GalleryStore {
  photos = [];
  favoritePhotos = [];
  searchResults = [];
  nextPageToken = '';
  fetchingPhotos = false;
  nextSearchPageToken = '';
  searching = false;
  constructor() {
    ignorePersistProperties(this, [
      'nextPageToken',
      'fetchingPhotos',
      'searching',
      'nextSearchPageToken',
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
      const pageToken = isFetchMore ? this.nextPageToken : '';
      const limit = 40;
      const {photos, nextPageToken} = yield fetchMediaItems(
        '',
        pageToken,
        limit,
      );
      this.nextPageToken = nextPageToken;
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
      const pageToken = isFetchMore ? this.nextSearchPageToken : '';
      const {photos, nextPageToken} = yield fetchMediaItems(
        query,
        pageToken,
        30,
      );
      this.nextSearchPageToken = nextPageToken;
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
