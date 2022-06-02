import {flowResult} from 'mobx';
import {Observer, useLocalObservable} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  FadeInLeft,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {
  ArrowLeftSvg,
  CameraSvg,
  CloseSvg,
  FlipCameraSvg,
  PhotoSvg,
  UploadSvg,
  VideoSvg,
} from '../../assets/svg';
import {Container, Header, LoadingIndicatorModal} from '../../components';
import {Colors} from '../../constants';
import {galleryStore} from '../../stores';
import styles from './styles';

const Capture = ({navigation, route}) => {
  const {type = 'photo'} = route.params || {};
  const isPhoto = type === 'photo';
  const {bottom} = useSafeAreaInsets();
  const cameraRef = useRef();
  const anim = useSharedValue(isPhoto ? 0 : 1);
  const animRecord = useSharedValue(0);
  const state = useLocalObservable(() => ({
    type,
    recording: false,
    cameraType: RNCamera.Constants.Type.back,
    media: null,
    setType: type => {
      state.type = type;
    },
    setCameraType: type => {
      state.cameraType = type;
    },
    setMedia: media => {
      state.media = media;
    },
    setCaptureVideoState: captureVideoState => {
      state.captureVideoState = captureVideoState;
    },
    setRecording: recording => {
      state.recording = recording;
    },
    get isCaptured() {
      return !!this.media;
    },
  }));
  const onBackPress = React.useCallback(() => navigation.goBack(), []);
  const onFlipPress = React.useCallback(() => {
    state.setCameraType(
      state.cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  }, []);
  const onReCapturePress = React.useCallback(() => {
    state.setMedia(null);
  }, []);
  const uploadMedia = async () => {
    await flowResult(
      galleryStore.createMedia(state.media.uri, state.media.mimeType),
    );
    navigation.navigate('Home');
  };
  const onCapturePress = React.useCallback(async () => {
    try {
      if (state.type === 'video') {
        anim.value = withTiming(0);
        state.setType('photo');
      } else {
        if (state.isCaptured) {
          uploadMedia();
        } else {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.5,
            base64: false,
            pauseAfterCapture: true,
          });
          const isPng = photo.uri.endsWith('.png');
          state.setMedia({
            ...photo,
            mimeType: isPng ? 'image/png' : 'image/jpeg',
          });
        }
      }
    } catch (e) {
      console.log({onCapturePress: e});
    }
  }, []);
  const onVideoCapturePress = React.useCallback(async () => {
    if (state.type === 'photo') {
      anim.value = withTiming(1);
      state.setType('video');
    } else {
      if (state.isCaptured) {
        uploadMedia();
      } else {
        if (!state.recording) {
          animRecord.value = withTiming(1);
          state.setRecording(true);
          const video = await cameraRef.current.recordAsync({
            quality: RNCamera.Constants.VideoQuality['720p'],
          });
          state.setMedia({
            ...video,
            mimeType: 'video/mp4',
            isVideo: true,
          });
        } else {
          animRecord.value = withTiming(0);
          state.setRecording(false);
          cameraRef.current.stopRecording();
        }
      }
    }
  }, []);
  const renderHeaderLeft = React.useCallback(
    () => <ArrowLeftSvg size={28} color={Colors.white} />,
    [],
  );
  const captureButtonStyle = useAnimatedStyle(() => ({
    opacity: 1 - anim.value * 0.5,
    borderColor: interpolateColor(
      anim.value,
      [0, 1],
      [Colors.white50, Colors.white],
    ),
    transform: [
      {
        scale: interpolate(anim.value, [0, 1], [1, 0.5]),
      },
    ],
    marginLeft: interpolate(anim.value, [0, 1], [80, -80]),
  }));
  const captureVideoButtonStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      anim.value,
      [0, 1],
      [Colors.white, Colors.white50],
    ),
    opacity: anim.value + 0.5,
    transform: [
      {
        scale: interpolate(anim.value, [0, 1], [0.7, 1]),
      },
    ],
  }));
  const videoIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(animRecord.value, [0, 1], [1, 10]),
      },
    ],
  }));
  const pauseSquareStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: animRecord.value,
      },
    ],
  }));
  const onLibraryPress = React.useCallback(() => {
    navigation.navigate('MediaPicker', {
      type: state.type,
    });
  }, []);
  return (
    <Container
      statusBarProps={{barStyle: 'light-content'}}
      disableFirst
      disableLast>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Observer>
            {() => (
              <Header
                title={`Capture ${state.type === 'video' ? 'Video' : 'Photo'}`}
                titleProps={{color: Colors.white}}
                onLeftPress={onBackPress}
                leftIcon={renderHeaderLeft}
              />
            )}
          </Observer>
          <LinearGradient
            style={styles.headerBg}
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0)']}
          />
        </View>
        <View style={styles.cameraContainer}>
          <Observer>
            {() =>
              !state.isCaptured ? (
                <RNCamera
                  type={state.cameraType}
                  ref={cameraRef}
                  style={styles.camera}
                />
              ) : state.media.isVideo ? (
                <Video
                  resizeMode="cover"
                  source={{
                    uri: state?.media?.uri,
                  }}
                  style={styles.capturedImage}
                  repeat
                  playInBackground={false}
                />
              ) : (
                <Image
                  source={{
                    uri: state?.media?.uri,
                  }}
                  style={styles.capturedImage}
                />
              )
            }
          </Observer>
        </View>
        <View
          style={[
            styles.bottomContainer,
            {
              marginBottom: bottom || 20,
            },
          ]}>
          <Observer>
            {() =>
              !state.isCaptured ? (
                <Animated.View entering={FadeInLeft} style={styles.btnLibrary}>
                  <TouchableOpacity
                    onPress={onLibraryPress}
                    style={styles.innerBtn}>
                    <PhotoSvg size={30} color={Colors.white} />
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <Animated.View
                  entering={FadeInLeft}
                  style={[styles.btnLibrary, styles.btnCancel]}>
                  <TouchableOpacity
                    onPress={onReCapturePress}
                    style={[styles.innerBtn]}>
                    <CloseSvg color={Colors.white} size={16} />
                  </TouchableOpacity>
                </Animated.View>
              )
            }
          </Observer>
          <Observer>
            {() =>
              !state.isCaptured && (
                <TouchableOpacity onPress={onFlipPress} style={styles.btnFlip}>
                  <FlipCameraSvg />
                </TouchableOpacity>
              )
            }
          </Observer>

          <Observer>
            {() => (
              <Animated.View
                style={[
                  styles.btnCapture,
                  captureButtonStyle,
                  state.isCaptured &&
                    state.type !== 'photo' && {
                      opacity: 0,
                    },
                ]}>
                <TouchableOpacity
                  onPress={onCapturePress}
                  style={styles.innerBtn}>
                  {state.isCaptured ? (
                    <UploadSvg size={25} color={Colors.primary} />
                  ) : (
                    <CameraSvg size={28} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            )}
          </Observer>
          <Observer>
            {() => (
              <Animated.View
                style={[
                  styles.btnCapture,
                  captureVideoButtonStyle,
                  state.isCaptured &&
                    state.type !== 'video' && {
                      opacity: 0,
                    },
                ]}>
                <TouchableOpacity
                  onPress={onVideoCapturePress}
                  style={[styles.innerBtn, {borderRadius: 99}]}>
                  {state.isCaptured ? (
                    <UploadSvg size={25} color={Colors.primary} />
                  ) : (
                    <>
                      <Animated.View style={videoIconStyle}>
                        <VideoSvg size={30} color={Colors.primary} />
                      </Animated.View>
                      <Animated.View
                        style={[styles.pauseSquare, pauseSquareStyle]}
                      />
                    </>
                  )}
                </TouchableOpacity>
              </Animated.View>
            )}
          </Observer>
        </View>
      </View>
      <Observer>
        {() => !!galleryStore.creatingMedia && <LoadingIndicatorModal />}
      </Observer>
    </Container>
  );
};

export default Capture;
