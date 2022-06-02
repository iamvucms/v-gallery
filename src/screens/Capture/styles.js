import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  camera: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  bottomContainer: {
    position: 'absolute',
    zIndex: 99,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCapture: {
    backgroundColor: Colors.white,
    height: 80,
    width: 80,
    borderWidth: 10,
    borderColor: Colors.white50,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLibrary: {
    position: 'absolute',
    left: 20,
  },
  btnFlip: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    position: 'absolute',
    right: 20,
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  innerBtn: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  btnCancel: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.white,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseSquare: {
    position: 'absolute',
    zIndex: 99,
    height: 20,
    width: 20,
    borderRadius: 5,
    backgroundColor: Colors.white,
  },
});
