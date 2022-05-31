import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../constants';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  decorationContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -99,
  },
  ball: {
    position: 'absolute',
    backgroundColor: Colors.white50,
    height: 80,
    width: 80,
    borderRadius: 99,
  },
  onboardingContainer: {
    flex: 1,
  },
  onboardingItem: {
    width: Layout.window.width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 75,
  },
  onboardingImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 999,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  onboardingImage: {
    height: 100,
    width: 100,
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    paddingBottom: 100,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageIndicatorPoint: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginHorizontal: 5,
  },
  btnGetStartedContainer: {
    backgroundColor: Colors.white,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    borderRadius: 99,
  },
  btnGetStarted: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
});
