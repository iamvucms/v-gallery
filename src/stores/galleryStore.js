import {action, computed, flow, makeObservable, observable} from 'mobx';
import {appStore} from '.';
import {FETCH_MEDIA_LIMIT, SEARCH_MEDIA_LIMIT} from '../constants';
import {
  ignorePersistProperties,
  fetchMediaItems,
  processError,
  uploadMediaItem,
} from '../utils';

export class GalleryStore {
  photos = [];
  favoritePhotos = [];
  searchResults = [];
  nextPageToken = '';
  fetchingPhotos = false;
  nextSearchPageToken = '';
  searching = false;
  creatingMedia = false;
  constructor() {
    ignorePersistProperties(this, [
      'nextPageToken',
      'fetchingPhotos',
      'searching',
      'nextSearchPageToken',
      'creatingMedia',
    ]);
    makeObservable(this, {
      photos: observable,
      favoritePhotos: observable,
      searchResults: observable,
      searching: observable,
      feedPhotos: computed,
      fetchingPhotos: observable,
      creatingMedia: observable,
      carouselPhotos: computed,
      fetchPhotos: flow,
      fetchResults: flow,
      createMedia: flow,
      createMultipleMedia: flow,
      addFavorite: action,
      removeFavorite: action,
      toggleSelectedPhoto: action,
      clearSelectedPhotos: action,
      numberOfSelectedPhotos: computed,
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
      if (typeof pageToken === 'undefined') {
        return;
      }
      const {photos, nextPageToken, error} = yield fetchMediaItems(
        {},
        pageToken,
        FETCH_MEDIA_LIMIT,
      );
      if (error) {
        throw error;
      }
      this.nextPageToken = nextPageToken;
      this.photos = isFetchMore ? [...this.photos, ...photos] : photos;
    } catch (err) {
      processError(err, 'fetchPhotos');
    }
    this.fetchingPhotos = false;
  }
  *fetchResults(query, isFetchMore) {
    if (this.searching) return;
    this.searching = true;
    try {
      const pageToken = isFetchMore ? this.nextSearchPageToken : '';
      if (typeof pageToken === 'undefined') {
        return;
      }
      const {photos, nextPageToken, error} = yield fetchMediaItems(
        {},
        pageToken,
        SEARCH_MEDIA_LIMIT,
      );
      if (error) {
        throw error;
      }
      this.nextSearchPageToken = nextPageToken;
      this.searchResults = isFetchMore
        ? [...this.searchResults, ...photos]
        : photos;
    } catch (err) {
      processError(err, 'fetchResults');
    }
    this.searching = false;
  }
  *createMedia(fileUri, mimeType, preventUpdateLoadingState = false) {
    if (!preventUpdateLoadingState) {
      this.creatingMedia = true;
    }
    try {
      const {mediaItems, error} = yield uploadMediaItem(fileUri, mimeType);
      if (error) {
        throw error;
      }
      this.photos = [...mediaItems, ...this.photos];
    } catch (err) {
      processError(err, 'createMedia');
    }
    if (!preventUpdateLoadingState) {
      this.creatingMedia = false;
    }
  }
  *createMultipleMedia(files = []) {
    this.creatingMedia = true;
    try {
      for (const file of files) {
        yield this.createMedia(file.uri, file.mimeType, true);
      }
    } catch (err) {
      processError(err, 'createMultipleMedia');
    }
    this.creatingMedia = false;
  }
  addFavorite(photo) {
    this.favoritePhotos.push({...photo});
  }
  removeFavorite(photoId) {
    this.favoritePhotos = this.favoritePhotos.filter(
      favorite => favorite.id !== photoId,
    );
  }
  toggleSelectedPhoto(photoId) {
    const photo = this.photos.find(photo => photo.id === photoId);
    if (photo) {
      photo.selected = !!!photo.selected;
    }
  }
  clearSelectedPhotos() {
    this.photos.forEach(photo => {
      photo.selected = false;
    });
  }
  getSelectedPhotos() {
    return this.photos.filter(photo => photo.selected);
  }
  getIsFavorite(photoId) {
    return !!this.favoritePhotos.find(favorite => favorite.id === photoId);
  }
  get numberOfSelectedPhotos() {
    return this.photos.filter(photo => photo.selected).length;
  }
}
