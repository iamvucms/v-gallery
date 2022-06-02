import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';
const {width} = Layout.window;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaItem: {
    width: (width - 10) / 3,
    aspectRatio: 1,
    marginBottom: 5,
  },
  mediaPreviewImage: {
    width: '100%',
    height: '100%',
  },
  videoLabel: {
    position: 'absolute',
    backgroundColor: Colors.white50,
    padding: 5,
    right: 5,
    top: 5,
    borderRadius: 5,
  },
  bottomButtonContainer: {
    height: 44,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 40,
  },
  btnUpload: {
    height: 44,
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
