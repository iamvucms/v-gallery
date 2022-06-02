import {action, computed, flow, makeObservable, observable} from 'mobx';
import {appStore} from '.';
import {
  FETCH_ALBUM_LIMIT,
  FETCH_ALBUM_PHOTO_LIMIT,
  FETCH_MEDIA_LIMIT,
} from '../constants';
import {
  createAlbum,
  fetchAlbums,
  fetchMediaItems,
  ignorePersistProperties,
} from '../utils';

export class AlbumStore {
  albums = [];
  photos = [];
  fetchingAlbums = false;
  fetchingAlbumPhotos = false;
  creatingAlbum = false;
  nextPageToken = '';
  nextMediaPageToken = '';
  constructor() {
    ignorePersistProperties(this, [
      'nextPageToken',
      'nextMediaPageToken',
      'fetchingAlbums',
      'fetchingAlbumPhotos',
      'creatingAlbum',
    ]);
    makeObservable(this, {
      albums: observable,
      fetchingAlbums: observable,
      fetchingAlbumPhotos: observable,
      creatingAlbum: observable,
      photos: observable,
      fetchAlbums: flow,
      createAlbum: flow,
      fetchPhotos: flow,
      sortedAlbums: computed,
    });
  }
  *fetchAlbums(isFetchMore) {
    if (this.fetchingAlbums) {
      return;
    }
    this.fetchingAlbums = true;
    const token = isFetchMore ? this.nextPageToken : '';
    if (typeof token === 'undefined') {
      return;
    }
    try {
      const {albums, nextPageToken, error} = yield fetchAlbums(
        token,
        FETCH_ALBUM_LIMIT,
      );
      if (error) {
        throw error;
      }
      this.nextPageToken = nextPageToken;
      this.albums = isFetchMore ? [...this.albums, ...albums] : albums;
    } catch (err) {
      if (err?.code === 401) {
        appStore.logout();
      } else {
        console.log({fetchAlbums: err});
      }
    }
    this.fetchingAlbums = false;
  }

  *createAlbum(title, photos, cover) {
    if (this.creatingAlbum) {
      return;
    }
    this.creatingAlbum = true;
    try {
      const mediaIds = photos.map(photo => photo.id);
      const {album} = yield createAlbum(title, mediaIds, cover.id);
      this.albums.push(album);
      return {
        ...album,
        coverPhotoBaseUrl: cover.baseUrl,
        mediaItemsCount: photos.length,
      };
    } catch (e) {}
    this.creatingAlbum = false;
  }
  *fetchPhotos(albumId, isFetchMore = false) {
    if (this.fetchingAlbumPhotos) {
      return;
    }
    this.fetchingAlbumPhotos = true;
    try {
      if (!isFetchMore) {
        this.photos = [];
      }
      const token = isFetchMore ? this.nextMediaPageToken : '';
      if (typeof token === 'undefined') {
        return;
      }
      const {photos, nextPageToken, error} = yield fetchMediaItems(
        {albumId},
        token,
        FETCH_ALBUM_PHOTO_LIMIT,
      );
      if (error) {
        throw error;
      }
      this.photos = isFetchMore ? [...this.photos, ...photos] : photos;
      this.nextMediaPageToken = nextPageToken;
    } catch (e) {
      if (e?.code === 401) {
        appStore.logout();
      } else {
        console.log({fetchPhotos: e});
      }
    }
    this.fetchingAlbumPhotos = false;
  }
  get sortedAlbums() {
    return [...this.albums].sort(
      (a, b) => parseInt(b.mediaItemsCount) - parseInt(a.mediaItemsCount),
    );
  }
}
