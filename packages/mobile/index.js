/**
 * @format
 */

import React from 'react';
import { AppRegistry, YellowBox, View } from 'react-native';
import App from '@telmeeth/app/App';
import { name as appName } from './app.json';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useEffect } from 'react';
import bgMessaging from './bgMessaging';
import CodePushDialog from './CodePushDialog';
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: __DEV__
    ? ''
    : 'https://3a25346335c84ba4b442dc8e8e4f43ac@sentry.io/1816972',
  debug: true
});

console.warn = e => {
  // console.log('sss', e);
};

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
global.FormData = global.originalFormData || global.FormData;

if (window.FETCH_SUPPORT) {
  window.FETCH_SUPPORT.blob = false;
} else {
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
}

const CodePushProgress = () => {
  useEffect(() => {
    codePush.getUpdateMetadata().then(update => {
      if (update) {
        Sentry.setRelease(update.appVersion + '-codepush:' + update.label);
      }
    });
  }, []);
  console.disableYellowBox = true;

  const isIOS = Platform.OS === 'ios';
  const productionKey_iOS = 'FlUcOtjFyRHav64dcP_t-WymfLZZG2cEbGsDMb';
  const stagingKey_iOS = 'Umwur0RrcMIS81DSW9O6s1JEy6BbfLxjdCNYO';

  const productionKey_android = 'Nbxr-xDwyH1aiK25GFsL9EmyesbuO72N9Anw-';
  const stagingKey_android = 'N087sdD2WqTiadmmVr2NeS8xFGhP3M2Oky6-W';

  const stagingKey = isIOS ? stagingKey_iOS : stagingKey_android;
  const productionKey = isIOS ? productionKey_iOS : productionKey_android;

  // const deploymentKey = __DEV__ ? stagingKey : productionKey;
  const deploymentKey = productionKey;

  return (
    <View style={{ flex: 1 }}>
      <CodePushDialog
        isCheckOnResume
        deploymentKey={deploymentKey}
        optionTexts={{
          UpdateConfirmText: 'Do you want to update now ?',
          UpdateMandatoryText: 'Please update to the newest version.',
          UpdatedText:
            'The latest version of Telmeeth is installed. Restart the app for updates to take effect.',
          RestartConfirmText: 'Do you want to restart now ?',
          RestartMandatoryText: '',
          UpdateText: 'The newer version of Telmeeth is available.',
          NeedUpdateStoreText: 'The latest version of Telmeeth is available.'
        }}
      />
      <App />
    </View>
  );
};

AppRegistry.registerComponent(appName, () => CodePushProgress);

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
);
