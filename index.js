/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
AppRegistry.registerComponent(appName, () => App);
GoogleSignin.configure({
  iosClientId:
    '62284682844-rdn68dofliaesf2f4lsmidhh2ach7t5e.apps.googleusercontent.com',
});
