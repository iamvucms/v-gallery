import {ignore} from 'mobx-sync';
import {appStore} from '../stores';

export const ignorePersistProperties = (context, keys) => {
  keys.forEach(key => ignore(context, key));
};
export const fetchMediaItems = async (query, pageToken, limit) => {
  const data = await fetch(
    `https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=${limit}&pageToken=${pageToken}`,
    {
      headers: {
        Authorization: `Bearer ${appStore.user.token}`,
      },
    },
  ).then(res => res.json());
  const photos = data.mediaItems.map(photo => ({
    id: photo.id,
    description: photo.description,
    baseUrl: photo.baseUrl,
    user: {
      username: '',
      avatar: '',
    },
    created_at: photo.created_at,
    width: photo.mediaMetadata.width,
    height: photo.mediaMetadata.height,
  }));
  return {
    photos,
    nextPageToken: data.nextPageToken,
  };
};
