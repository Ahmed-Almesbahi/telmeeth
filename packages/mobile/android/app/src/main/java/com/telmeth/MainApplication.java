package com.telmeeth;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.RNFetchBlob.RNFetchBlobPackage; 
import com.microsoft.codepush.react.CodePush;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.zmxv.RNSound.RNSoundPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.wheelpicker.WheelPickerPackage;

import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;


import io.invertase.firebase.RNFirebasePackage;

// // optional packages - add/remove as appropriate
// // import io.invertase.firebase.admob.RNFirebaseAdMobPackage;

// // import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
// // import io.invertase.firebase.auth.RNFirebaseAuthPackage;
// // import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
// import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
// // import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
// // import io.invertase.firebase.functions.RNFirebaseFunctionsPackage;
// // import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
// // import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
// // import io.invertase.firebase.perf.RNFirebasePerformancePackage;
// // import io.invertase.firebase.storage.RNFirebaseStoragePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          packages.add(new RNFetchBlobPackage());
          packages.add(new VectorIconsPackage());
          packages.add(new ReactNativeRestartPackage());
          packages.add(new CodePush("xxxxxx", MainApplication.this, BuildConfig.DEBUG));
          packages.add(new RNSharePackage());
          packages.add(new RNSoundPackage());
          packages.add(new MapsPackage());
          packages.add(new RNDeviceInfo());
          packages.add(new ImagePickerPackage());
          packages.add(new GeolocationPackage());
          packages.add(new WheelPickerPackage());
          packages.add(new ReanimatedPackage());
          packages.add(new RNGestureHandlerPackage());

         packages.add(new RNFirebasePackage());
        //   // add/remove these packages as appropriate
        //   // // new RNFirebaseAdMobPackage(),
        //   // new RNFirebaseAnalyticsPackage(),
        //   // new RNFirebaseAuthPackage(),
        //   // new RNFirebaseRemoteConfigPackage(),
        //    packages.add(new RNFirebaseCrashlyticsPackage());
        packages.add(new RNFirebaseDatabasePackage());
        //   // new RNFirebaseFirestorePackage(),
        //   // new RNFirebaseFunctionsPackage(),
        //   // new RNFirebaseInstanceIdPackage(),
        //   // new RNFirebaseLinksPackage(),
          packages.add(new RNFirebaseMessagingPackage());
          packages.add(new RNFirebaseNotificationsPackage());
        //   // new RNFirebasePerformancePackage(),
        //   // new RNFirebaseStoragePackage(),

          
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "packages/mobile/index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
