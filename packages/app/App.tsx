import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './configureStore';

import { HelmetProvider } from './components/Helmet';

// Import root app
import AppEntry from './containers/App';

// Create redux store with history
const initialState = {};
const { persistor, store } = configureStore(initialState);
const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppEntry />
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};
export { store };
export default App;
