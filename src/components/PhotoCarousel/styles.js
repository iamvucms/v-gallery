import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';
const {width} = Layout.window;
export default StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  carouselImage: {
    height: 200,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
  },
  pageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingTop: 20,
  },
});
