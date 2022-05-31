import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  photoItem: {
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  photoList: {
    marginHorizontal: 5,
  },
  btnHeart: {
    height: 36,
    width: 36,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
    backgroundColor: Colors.white50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  emptyImage: {
    height: 80,
    width: 80,
    marginBottom: 15,
  },
});
