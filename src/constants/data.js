import {
  GallerySrc,
  PersonWithComputerSrc,
  SquareCheckSrc,
} from '../assets/images';
import React from 'react';
import {
  AlbumsSvg,
  CameraSvg,
  HeartSvg,
  HomeSvg,
  PhotoSvg,
  ProfileSvg,
  SearchSvg,
  VideoSvg,
} from '../assets/svg';
import {Colors} from './colors';

export const OnboardingData = [
  {
    title: 'Welcome to the Photo Gallery',
    description:
      'VGallery is a simple photo gallery app that allows you to view photos from google photos.',
    image: GallerySrc,
    imageScale: 0.9,
  },
  {
    title: 'Browser your photos by many ways',
    description:
      'We have many ways to browse your photos, swipe, scroll and more.',
    image: PersonWithComputerSrc,
    imageScale: 0.9,
  },
  {
    title: 'All your photos in one place',
    description:
      'We have a simple and easy way to view all your photos in one place.',
    image: SquareCheckSrc,
    imageScale: 0.9,
  },
];
export const TabBarData = [
  {
    title: 'Home',
    icon: <HomeSvg color={Colors.white} />,
    routeName: 'Home',
  },
  {
    title: 'Search',
    icon: <SearchSvg color={Colors.white} />,
    routeName: 'Search',
  },
  {
    title: 'Albums',
    icon: <AlbumsSvg color={Colors.white} />,
    routeName: 'Albums',
  },
  {
    title: 'Favorite',
    icon: <HeartSvg color={Colors.white} />,
    routeName: 'Favorite',
  },
];
export const DrawerData = [
  {
    title: 'Home',
    routeName: 'Home',
  },
  {
    title: 'New Album',
    routeName: 'CreateAlbum',
  },
  {
    title: 'New Media',
    routeName: 'Capture',
  },
  {
    title: 'Search',
    routeName: 'Search',
  },
  {
    title: 'Favorite',
    routeName: 'Favorite',
  },
  {
    title: 'Terms & Privacy',
    routeName: 'TermsAndPrivacy',
  },
];
export const CreateOptions = [
  {
    icon: <CameraSvg color={Colors.white} size={16} />,
    routeName: 'Capture',
    params: {
      type: 'photo',
    },
    bgColor: Colors.secondary,
  },
  {
    icon: <VideoSvg color={Colors.white} />,
    routeName: 'Capture',
    params: {
      type: 'video',
    },
    bgColor: Colors.orange,
  },
  {
    icon: <AlbumsSvg color={Colors.white} />,
    routeName: 'CreateAlbum',
    bgColor: Colors.green,
  },
];
export const FETCH_MEDIA_LIMIT = 40;
export const SEARCH_MEDIA_LIMIT = 30;
export const FETCH_ALBUM_LIMIT = 10;
export const FETCH_ALBUM_PHOTO_LIMIT = 20;
