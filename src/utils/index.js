import {statusCodes} from '@react-native-google-signin/google-signin';
import {ignore} from 'mobx-sync';
import {appStore} from '../stores';

export const ignorePersistProperties = (context, keys) => {
  keys.forEach(key => ignore(context, key));
};
export const processError = (error, label) => {
  if (error?.code === 401) {
    appStore.logout();
  } else {
    console.log({[label || 'processError']: error});
  }
};
export const toDisplayableUri = uri => {
  return uri.replace(/^file:\/\//, '');
};
export const normalizePhotos = (mediaItems = []) => {
  return mediaItems.map(photo => ({
    id: photo.id,
    description: photo.description,
    baseUrl: photo.baseUrl,
    user: {
      username: '',
      avatar: '',
    },
    title: photo.filename,
    description: photo.mediaMetadata?.photo?.cameraMake
      ? `Taken by ${photo.mediaMetadata.photo.cameraMake} - ${photo.mediaMetadata.photo.cameraModel}`
      : 'No description',
    isVideo: photo.mimeType.includes('video'),
    isLocalUri: photo.baseUrl.includes('file://'),
    created_at: photo.created_at,
    width: parseInt(photo.mediaMetadata.width),
    height: parseInt(photo.mediaMetadata.height),
  }));
};
export const fetchMediaItems = async (query = {}, pageToken, limit) => {
  try {
    const data = await fetch(
      `https://photoslibrary.googleapis.com/v1/mediaItems:search?pageSize=${limit}&pageToken=${pageToken}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...query,
        }),
      },
    ).then(res => res.json());
    if (data.error) {
      return {
        error: data.error,
      };
    }
    const photos = normalizePhotos(data.mediaItems);
    return {
      photos,
      nextPageToken: data.nextPageToken,
    };
  } catch (e) {
    console.log(e);
  }
};
export const fetchAlbums = async (pageToken, limit) => {
  try {
    const data = await fetch(
      `https://photoslibrary.googleapis.com/v1/albums?pageSize=${limit}&pageToken=${pageToken}`,
      {
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
        },
      },
    ).then(res => res.json());
    if (data.error) {
      return {
        error: data.error,
      };
    }
    const albums = data.albums;
    return {
      albums,
      nextPageToken: data.nextPageToken,
    };
  } catch (e) {
    console.log(e);
  }
};
export const createAlbum = async (
  title,
  mediaItemIds,
  coverPhotoMediaItemId,
) => {
  try {
    const album = await fetch(
      'https://photoslibrary.googleapis.com/v1/albums',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          album: {
            title,
          },
        }),
      },
    ).then(res => res.json());
    if (album.error) {
      return {
        error: album.error,
      };
    }
    const albumId = album.id;
    await fetch(
      `https://photoslibrary.googleapis.com/v1/albums/${albumId}:batchAddMediaItems`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaItemIds,
        }),
      },
    ).then(res => res.json());
    const albumData = await fetch(
      `https://photoslibrary.googleapis.com/v1/albums/${albumId}?updateMask=coverPhotoMediaItemId`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverPhotoMediaItemId,
        }),
      },
    ).then(x => x.json());
    return {
      album: {
        ...albumData,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
export const uploadMediaItem = async (fileUri, mimeType) => {
  try {
    const dataBinary = await fetch(fileUri).then(x => x.blob());
    const uploadToken = await fetch(
      'https://photoslibrary.googleapis.com/v1/uploads',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
          'Content-Type': 'application/octet-stream',
          'X-Goog-Upload-Content-Type': mimeType,
          'X-Goog-Upload-Protocol': 'raw',
        },
        body: dataBinary,
      },
    ).then(x => x.text());
    const extension = fileUri.split('.').pop();
    const data = await fetch(
      'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${appStore.user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newMediaItems: [
            {
              description: '',
              simpleMediaItem: {
                uploadToken,
                fileName: `VGALLERY_${new Date().toISOString()}.${extension}`,
              },
            },
          ],
        }),
      },
    ).then(x => x.json());
    if (data.error) {
      return {
        error: data.error,
      };
    }
    const mediaItems = normalizePhotos(
      data.newMediaItemResults.map(x => ({
        ...x.mediaItem,
        baseUrl: fileUri,
      })),
    );
    return {
      mediaItems,
    };
  } catch (e) {
    console.log(e);
  }
};
