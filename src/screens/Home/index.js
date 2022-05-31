import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Container, PhotoGallery} from '../../components';
const data = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/1/200/300',
    baseUrl: 'https://picsum.photos/id/1/200/300',
    mimeType: 'image/jpeg',
    filename: 'image1.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/1/200/300',
      displayName: 'display-name',
    },
  },
  // generate more data
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/2/200/300',
    baseUrl: 'https://picsum.photos/id/2/200/300',
    mimeType: 'image/jpeg',
    filename: 'image2.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/2/200/300',
      displayName: 'display-name',
    },
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/1/200/300',
    baseUrl: 'https://picsum.photos/id/1/200/300',
    mimeType: 'image/jpeg',
    filename: 'image1.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/1/200/300',
      displayName: 'display-name',
    },
  },
  // generate more data
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/2/200/300',
    baseUrl: 'https://picsum.photos/id/2/200/300',
    mimeType: 'image/jpeg',
    filename: 'image2.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/2/200/300',
      displayName: 'display-name',
    },
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/1/200/300',
    baseUrl: 'https://picsum.photos/id/1/200/300',
    mimeType: 'image/jpeg',
    filename: 'image1.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/1/200/300',
      displayName: 'display-name',
    },
  },
  // generate more data
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/2/200/300',
    baseUrl: 'https://picsum.photos/id/2/200/300',
    mimeType: 'image/jpeg',
    filename: 'image2.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/2/200/300',
      displayName: 'display-name',
    },
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/1/200/300',
    baseUrl: 'https://picsum.photos/id/1/200/300',
    mimeType: 'image/jpeg',
    filename: 'image1.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/1/200/300',
      displayName: 'display-name',
    },
  },
  // generate more data
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/2/200/300',
    baseUrl: 'https://picsum.photos/id/2/200/300',
    mimeType: 'image/jpeg',
    filename: 'image2.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/2/200/300',
      displayName: 'display-name',
    },
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/1/200/300',
    baseUrl: 'https://picsum.photos/id/1/200/300',
    mimeType: 'image/jpeg',
    filename: 'image1.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/1/200/300',
      displayName: 'display-name',
    },
  },
  // generate more data
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/2/200/300',
    baseUrl: 'https://picsum.photos/id/2/200/300',
    mimeType: 'image/jpeg',
    filename: 'image2.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/2/200/300',
      displayName: 'display-name',
    },
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/1/200/300',
    baseUrl: 'https://picsum.photos/id/1/200/300',
    mimeType: 'image/jpeg',
    filename: 'image1.jpg',
    mediaMetadata: {
      width: 200,
      height: 300,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/1/200/300',
      displayName: 'display-name',
    },
  },
  // generate more data
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    productUrl: 'https://picsum.photos/id/2/300/200',
    baseUrl: 'https://picsum.photos/id/2/300/200',
    mimeType: 'image/jpeg',
    filename: 'image2.jpg',
    mediaMetadata: {
      width: 300,
      height: 200,
      creationTime: 1588897880000,
    },
    contributorInfo: {
      profilePictureBaseUrl: 'https://picsum.photos/id/2/300/200',
      displayName: 'display-name',
    },
  },
];
const Home = () => {
  return (
    <Container>
      <PhotoGallery data={data} />
    </Container>
  );
};

export default Home;
