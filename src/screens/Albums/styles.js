import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';
const {width} = Layout.window;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  albumItem: {
    width: width - 20,
    height: 200,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  albumCover: {
    height: '100%',
    width: '100%',
  },
  albumBottom: {
    zIndex: 99,
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
  btnRemove: {
    position: 'absolute',
    backgroundColor: Colors.white50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 15,
    top: 15,
    borderRadius: 5,
  },
});
