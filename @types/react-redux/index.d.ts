export * from 'react-redux';

declare module 'react-redux' {
  import { Context } from 'react';
  import { Store } from 'redux';

  export const ReactReduxContext: Context<{
    store: Store;
    storeState: any;
  }>;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
