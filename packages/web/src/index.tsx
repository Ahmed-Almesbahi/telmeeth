// Security precaution
(window as any).eval = global.eval = (payload: string) => {
  const error = new Error(`This app does not allow window.eval().`);
  Object.assign(error, { payload });

  throw error;
};

console.warn = (...args: any) => {
  // console.log('arg', ...args);
  // let log = true;
  // ignoreMessages.forEach(ignoreMessage => {
  //   const message = args.join(' ').slice(0, -1);
  //   if (/^\/.*\/[a-z]*$/.test(ignoreMessage)) {
  //     const regex = newRegExp(ignoreMessage);
  //     if (regex.test(message)) log = false;
  //   } else if (message.indexOf(ignoreMessage) > -1) {
  //     log = false;
  //   }
  //   if (!log) return false;
  //   return true;
  // });
  // if (log) overloadedConsole[type](...args);
};

//import 'react-app-polyfill/stable';

import "@babel/polyfill";
import "react-app-polyfill/ie9";
import "resize-observer-polyfill/dist/ResizeObserver.global";
import * as Sentry from "@sentry/browser";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

import { ComponentType } from "react";
import { AppRegistry } from "react-native-web";

import App from "@telmeeth/app/App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function(registration) {
      // console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(err) {
      console.log("Service worker registration failed, error:", err);
    });
}

Sentry.init({
  dsn: __DEV__
    ? ""
    : "https://9ac13e49a72341f190b19af221485e7c@sentry.io/1816979"
});

const render = (AppComponent: ComponentType) => {
  AppRegistry.registerComponent("telmeeth", () => AppComponent);
  AppRegistry.runApplication("telmeeth", {
    rootTag: document.getElementById("root")
  });
};

render(App);
