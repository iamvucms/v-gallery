import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 99,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: -99,
  },
  backdropInner: {
    ...StyleSheet.absoluteFillObject,
  },
  captureItem: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderColor: Colors.white,
    borderWidth: 2,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
    borderRadius: 99,
  },
  btnCaptureItem: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
});
