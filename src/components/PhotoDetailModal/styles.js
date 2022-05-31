import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  backdropInner: {
    flex: 1,
  },
  authorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
});
