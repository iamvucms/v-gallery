import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 53,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    backgroundColor: Colors.secondary,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  searchIcon: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    color: Colors.white,
    flex: 1,
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
  },
  btnClear: {
    height: 24,
    width: 24,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  emptyContainer: {
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    height: 80,
    width: 80,
    marginBottom: 15,
  },
});
