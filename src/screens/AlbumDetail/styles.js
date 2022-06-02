import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    zIndex: 99,
  },
  albumBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
  },
  bottomBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -99,
  },
  btnBack: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: Colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
