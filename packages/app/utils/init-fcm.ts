// import * as firebase from 'firebase/app';
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
// import 'firebase/messaging';
// import 'firebase/database';
// import { Platform } from 'components/Platform/index.web';

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {
  clientId:
    '180836230620-q7f404fug60rslrne322baoml65jiar6.apps.googleusercontent.com',
  appId: '1:180836230620:ios:ddb33efb860a3f97',
  apiKey: 'AIzaSyBfr98ge4lPHhWojMh6aXzrNVzpArxthzE',
  databaseURL: 'https://telmeeth-app.firebaseio.com',
  storageBucket: 'telmeeth-app.appspot.com',
  messagingSenderId: '180836230620',
  projectId: 'telmeeth-app',

  // enable persistence by adding the below flag
  persistence: true
};

// pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
  clientId:
    '180836230620-vcmuehcbr3k1ab9p0o6dtt0gv3br4q74.apps.googleusercontent.com',
  appId: '1:180836230620:android:abada0a12297ff05',
  apiKey: 'AIzaSyAdWB8dh12qVq0t-DqzcOUzdKB5H4kYits',
  databaseURL: 'https://telmeeth-app.firebaseio.com',
  storageBucket: 'telmeeth-app.appspot.com',
  messagingSenderId: '180836230620',
  projectId: 'telmeeth-app',

  // enable persistence by adding the below flag
  persistence: true
};

export const initializedFirebaseApp = firebase.initializeApp(
  Platform.OS === 'ios' ? iosConfig : androidConfig,
  'Telmeeth'
);

// console.log('initializedFirebaseApp', initializedFirebaseApp);
// we need to check if messaging is supported by the browser
let messaging: any;
try {
  messaging = initializedFirebaseApp.messaging();
} catch (e) {
  console.log('e', e);
}

// console.log('messaging', messaging);

export { messaging };

export default firebase;
