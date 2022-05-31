import {ignore} from 'mobx-sync';

export const ignorePersistProperties = (context, keys) => {
  keys.forEach(key => ignore(context, key));
};
export const fetch500PxPhotos = async (query, page, limit) => {
  const data = await fetch(
    `https://api.500px.com/v1/photos/search?type=photos&term=${query}&image_size%5B%5D=1&image_size%5B%5D=2&image_size%5B%5D=32&image_size%5B%5D=31&image_size%5B%5D=33&image_size%5B%5D=34&image_size%5B%5D=35&image_size%5B%5D=36&image_size%5B%5D=2048&image_size%5B%5D=4&image_size%5B%5D=14&include_states=true&formats=jpeg%2Clytro&include_tags=true&exclude_nude=true&page=${page}&rpp=${limit}`,
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
  return photos;
};
