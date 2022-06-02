import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';
const {width} = Layout.window;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  coverPhotoItem: {
    width,
    height: '100%',
  },
  photoList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  smallPhotoItem: {
    width: 60,
    height: 60,
    marginHorizontal: 7,
    borderColor: Colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
  },
  checkedMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  coverContainer: {
    flex: 1,
  },
  coverPhoto: {
    height: 80,
    width: 80,
    borderRadius: 5,
    overflow: 'hidden',
  },
  titleInput: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    marginTop: 15,
    color: Colors.primary,
    textAlign: 'center',
    width: '80%',
  },
});
