import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
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
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 53,
    paddingHorizontal: 20,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white50,
  },
});
