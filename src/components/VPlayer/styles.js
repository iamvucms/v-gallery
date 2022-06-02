import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  video: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
