/**
 * Create the store with dynamic reducers
 */
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { createLogger } from 'redux-logger';
// import sagaLoginPage from './containers/LoginPage/saga';
// import sagaSchedulePage from './containers/SchedulePage/saga';
import sagas from './utils/sagas';

import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/hardSet';

function myLogger(level, message, error = '') {
  // ignore error
  if (error === 'Generator is already running') return;

  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log(
      `redux-saga ${level}: ${message}\n${(error && error.stack) || error}`
    );
  } else {
    //  console[level](message, error)
  }
}

export function configureStore(initialState = {}) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions: any = { logger: myLogger };

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const persistConfig = {
    key: 'telmeeth@1.1',
    storage: AsyncStorage,
    // debug: true,
    // stateReconciler: autoMergeLevel2
    // whitelist: ["loginPage"]
    blacklist: [
      // "router",
      'loginPage',
      'notifications',
      'invoices',
      'items',
      'drawer',
      'createSchedulePage',
      'schedules',
      'request',
      'location',
      'attachments',
      // 'language',
      'range',
      // 'homeTeacher',
      'schedules',
      'certificates'
    ]
  };
  const persistedReducer = persistReducer(persistConfig, createReducer());

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  let middlewares;
  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
      collapsed: true
    });
    middlewares = [sagaMiddleware, logger];
  } else {
    middlewares = [sagaMiddleware];
  }

  const enhancers = [applyMiddleware(...middlewares)];

  const store: any = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store, undefined, () => {
    // Get persisted state
    Object.keys(store.getState())
      // We always have static reducers loaded
      .filter(reducerKey => !Object.keys(createReducer()).includes(reducerKey))
      .forEach(reducerKey => {
        // ignore router
        if (reducerKey !== 'router') {
          // Create empty reducers for keys that don't have loaded dynamic reducer yet
          // They will be replaced by a real ones.
          store.injectedReducers[reducerKey] = (state: any = null) => state;
        }
      });
  });
  // const rootSagas = [sagaLoginPage];
  // const rootSagas = [sagaLoginPage, sagaSchedulePage];
  // Extensions
  sagaMiddleware.run(sagas);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  store.persistor = persistor;
  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return { store, persistor };
}
