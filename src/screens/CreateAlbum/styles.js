import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';
const {width} = Layout.window;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  photoItem: {
    width: (width - 10) / 3,
    aspectRatio: 0.65,
    marginBottom: 5,
  },
  checkbox: {
    position: 'absolute',
    zIndex: 1,
    height: 24,
    width: 24,
    borderRadius: 99,
    borderColor: Colors.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 10,
  },
});
