import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';
export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLine: {
    position: 'absolute',
    bottom: -8,
    width: 25,
    backgroundColor: Colors.white,
    height: 3,
    borderRadius: 3,
  },
});
