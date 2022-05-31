import {computed, flow, makeObservable, observable} from 'mobx';

export class GalleryStore {
  photos = [];
  tags = [];
  currentPage = 1;
  constructor() {
    makeObservable(this, {
      photos: observable,
      tags: observable,
      feedPhotos: computed,
      carouselPhotos: computed,
      fetchPhotos: flow,
    });
  }
  get feedPhotos() {
    return this.photos.slice(10);
  }
  get carouselPhotos() {
    return this.photos.slice(0, 10);
  }
  *fetchPhotos(isFetchMore = false) {
    const type = this.tags.join('+');
    this.currentPage = isFetchMore ? this.currentPage + 1 : 1;
    const data = yield fetch(
      `https://api.500px.com/v1/photos/search?type=photos&term=${type}&image_size%5B%5D=1&image_size%5B%5D=2&image_size%5B%5D=32&image_size%5B%5D=31&image_size%5B%5D=33&image_size%5B%5D=34&image_size%5B%5D=35&image_size%5B%5D=36&image_size%5B%5D=2048&image_size%5B%5D=4&image_size%5B%5D=14&include_states=true&formats=jpeg%2Clytro&include_tags=true&exclude_nude=true&page=${
        this.currentPage
      }&rpp=${isFetchMore ? 20 : 50}`,
    ).then(res => res.json());
    const photos = data.photos.map(photo => ({
      id: photo.id,
      description: photo.description,
      baseUrl: [...photo.image_url].pop(),
      user: {
        username: photo.user.username,
        avatar: photo.user.avatars.default.https,
      },
      created_at: photo.created_at,
      width: photo.width,
      height: photo.height,
    }));
    this.photos = isFetchMore ? [...this.photos, ...photos] : photos;
  }
}
